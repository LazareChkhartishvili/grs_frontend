import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../schemas/article.schema';
import { Comment, CommentDocument } from '../schemas/comment.schema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  // ყველა გამოქვეყნებული სტატიის მიღება pagination-ით
  async findAll(
    options: {
      page?: number;
      limit?: number;
      category?: string;
      published?: boolean;
      sort?: string;
      order?: 'asc' | 'desc';
    } = {},
  ) {
    const {
      page = 1,
      limit = 10,
      category,
      published = true,
      sort = 'publishedAt',
      order = 'desc',
    } = options;

    const query: any = {};
    if (published !== undefined) query.isPublished = published;
    if (category) query.categoryId = category;

    const sortOptions: any = {};
    sortOptions[sort] = order === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    const [articles, total] = await Promise.all([
      this.articleModel
        .find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .select('-content') // მთავარ სიაში content არ გვინდა performance-ისთვის
        .exec(),
      this.articleModel.countDocuments(query),
    ]);

    return {
      data: articles,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    };
  }

  // კონკრეტული სტატიის მიღება ID-ით
  async findById(id: string): Promise<ArticleDocument> {
    const article = await this.articleModel
      .findById(id)
      .populate('categoryId', 'name description')
      .populate('authorId', 'name email avatar')
      .populate(
        'relatedArticleIds',
        'title slug excerpt mainImage readTimeMinutes',
      )
      .exec();

    if (!article) {
      throw new NotFoundException('სტატია ვერ მოიძებნა');
    }

    // ნახვების რაოდენობის გაზრდა
    await this.articleModel.findByIdAndUpdate(id, { $inc: { viewsCount: 1 } });

    return article;
  }

  // სტატიის მიღება slug-ით
  async findBySlug(slug: string): Promise<ArticleDocument> {
    const article = await this.articleModel
      .findOne({ slug, isPublished: true })
      .populate('categoryId', 'name description')
      .populate('authorId', 'name email avatar')
      .populate(
        'relatedArticleIds',
        'title slug excerpt mainImage readTimeMinutes',
      )
      .exec();

    if (!article) {
      throw new NotFoundException('სტატია ვერ მოიძებნა');
    }

    // ნახვების რაოდენობის გაზრდა
    await this.articleModel.findOneAndUpdate(
      { slug },
      { $inc: { viewsCount: 1 } },
    );

    return article;
  }

  // კატეგორიის მიხედვით სტატიები
  async findByCategory(
    categoryId: string,
    options: { page?: number; limit?: number } = {},
  ) {
    return this.findAll({ ...options, category: categoryId });
  }

  // ძიება
  async search(query: string, options: { page?: number; limit?: number } = {}) {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const searchQuery = {
      $text: { $search: query },
      isPublished: true,
    };

    const [articles, total] = await Promise.all([
      this.articleModel
        .find(searchQuery, { score: { $meta: 'textScore' } })
        .populate('categoryId', 'name description')
        .populate('authorId', 'name email')
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(limit)
        .select('-content')
        .exec(),
      this.articleModel.countDocuments(searchQuery),
    ]);

    return {
      data: articles,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    };
  }

  // რჩეული სტატიები (featured)
  async getFeatured(limit: number = 5): Promise<ArticleDocument[]> {
    return this.articleModel
      .find({ isFeatured: true, isPublished: true })
      .populate('categoryId', 'name description')
      .populate('authorId', 'name email')
      .sort({ publishedAt: -1 })
      .limit(limit)
      .select('-content')
      .exec();
  }

  // ახალი სტატიის შექმნა (ადმინისთვის)
  async create(articleData: {
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    categoryId: string;
    authorId?: string;
    mainImage?: string;
    images?: string[];
    readTimeMinutes?: number;
    tags?: string[];
    relatedArticleIds?: string[];
    metaTitle?: string;
    metaDescription?: string;
    tableOfContents?: Array<{ id: number; title: string; anchor: string }>;
    isPublished?: boolean;
    isFeatured?: boolean;
  }): Promise<ArticleDocument> {
    const article = new this.articleModel({
      ...articleData,
      publishedAt: articleData.isPublished ? new Date() : undefined,
    });

    return article.save();
  }

  // სტატიის განახლება (ადმინისთვის)
  async update(id: string, updateData: any): Promise<ArticleDocument> {
    // თუ isPublished true გახდა და ადრე არ იყო publishedAt, ვაყენებთ მიმდინარე თარიღს
    if (updateData.isPublished && !updateData.publishedAt) {
      const existingArticle = await this.articleModel.findById(id);
      if (existingArticle && !existingArticle.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    const article = await this.articleModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('categoryId', 'name description')
      .populate('authorId', 'name email')
      .exec();

    if (!article) {
      throw new NotFoundException('სტატია ვერ მოიძებნა');
    }

    return article;
  }

  // სტატიის წაშლა (ადმინისთვის)
  async delete(id: string): Promise<void> {
    const result = await this.articleModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('სტატია ვერ მოიძებნა');
    }

    // სტატიის კომენტარების წაშლა
    await this.commentModel.deleteMany({ articleId: id });
  }

  // სტატიის კომენტარების მიღება
  async getComments(articleId: string): Promise<CommentDocument[]> {
    return this.commentModel
      .find({ articleId, isApproved: true })
      .populate('parentCommentId')
      .sort({ publishedAt: -1 })
      .exec();
  }

  // ახალი კომენტარის დამატება
  async addComment(
    articleId: string,
    commentData: {
      author: { name: string; email: string; avatar?: string };
      content: string;
      parentCommentId?: string;
    },
  ): Promise<CommentDocument> {
    const comment = new this.commentModel({
      articleId,
      ...commentData,
      publishedAt: new Date(),
    });

    const savedComment = await comment.save();

    // სტატიის კომენტარების რაოდენობის განახლება
    await this.articleModel.findByIdAndUpdate(articleId, {
      $inc: { commentsCount: 1 },
    });

    return savedComment;
  }

  // კომენტარის დამტკიცება (ადმინისთვის)
  async approveComment(commentId: string): Promise<CommentDocument> {
    const comment = await this.commentModel.findByIdAndUpdate(
      commentId,
      { isApproved: true },
      { new: true },
    );

    if (!comment) {
      throw new NotFoundException('კომენტარი ვერ მოიძებნა');
    }

    return comment;
  }

  // კომენტარის წაშლა (ადმინისთვის)
  async deleteComment(commentId: string): Promise<void> {
    const comment = await this.commentModel.findByIdAndDelete(commentId);
    if (!comment) {
      throw new NotFoundException('კომენტარი ვერ მოიძებნა');
    }

    // სტატიის კომენტარების რაოდენობის განახლება
    await this.articleModel.findByIdAndUpdate(comment.articleId, {
      $inc: { commentsCount: -1 },
    });
  }
}
