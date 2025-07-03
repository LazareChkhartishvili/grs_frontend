import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // ყველა გამოქვეყნებული სტატიის მიღება pagination-ით
  @Get()
  async getAllArticles(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('category') category?: string,
    @Query('published') published?: string,
    @Query('sort') sort?: string,
    @Query('order') order?: 'asc' | 'desc',
  ) {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      category,
      published: published !== undefined ? published === 'true' : undefined,
      sort,
      order,
    };

    return this.articleService.findAll(options);
  }

  // ძიება
  @Get('search')
  async searchArticles(
    @Query('q') query: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    if (!query) {
      throw new NotFoundException('ძიების ტექსტი სავალდებულოა');
    }

    return this.articleService.search(query, {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });
  }

  // რჩეული სტატიები
  @Get('featured')
  async getFeaturedArticles(@Query('limit') limit: string = '5') {
    return this.articleService.getFeatured(parseInt(limit, 10));
  }

  // კონკრეტული სტატიის მიღება ID-ით
  @Get(':id')
  async getArticleById(@Param('id') id: string) {
    return this.articleService.findById(id);
  }

  // სტატიის მიღება slug-ით
  @Get('slug/:slug')
  async getArticleBySlug(@Param('slug') slug: string) {
    return this.articleService.findBySlug(slug);
  }

  // კატეგორიის მიხედვით სტატიები
  @Get('category/:categoryId')
  async getArticlesByCategory(
    @Param('categoryId') categoryId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.articleService.findByCategory(categoryId, {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });
  }

  // ახალი სტატიის შექმნა (ადმინისთვის)
  @Post()
  async createArticle(
    @Body()
    articleData: {
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
    },
  ) {
    return this.articleService.create(articleData);
  }

  // სტატიის განახლება (ადმინისთვის)
  @Put(':id')
  async updateArticle(@Param('id') id: string, @Body() updateData: any) {
    return this.articleService.update(id, updateData);
  }

  // სტატიის წაშლა (ადმინისთვის)
  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    await this.articleService.delete(id);
    return { message: 'სტატია წარმატებით წაიშალა' };
  }

  // სტატიის კომენტარების მიღება
  @Get(':id/comments')
  async getArticleComments(@Param('id') articleId: string) {
    return this.articleService.getComments(articleId);
  }

  // ახალი კომენტარის დამატება
  @Post(':id/comments')
  async addComment(
    @Param('id') articleId: string,
    @Body()
    commentData: {
      author: { name: string; email: string; avatar?: string };
      content: string;
      parentCommentId?: string;
    },
  ) {
    return this.articleService.addComment(articleId, commentData);
  }
}

// კომენტარების მართვისთვის ცალკე კონტროლერი
@Controller('comments')
export class CommentController {
  constructor(private readonly articleService: ArticleService) {}

  // კომენტარის დამტკიცება (ადმინისთვის)
  @Put(':id/approve')
  async approveComment(@Param('id') commentId: string) {
    return this.articleService.approveComment(commentId);
  }

  // კომენტარის წაშლა (ადმინისთვის)
  @Delete(':id')
  async deleteComment(@Param('id') commentId: string) {
    await this.articleService.deleteComment(commentId);
    return { message: 'კომენტარი წარმატებით წაიშალა' };
  }
}
