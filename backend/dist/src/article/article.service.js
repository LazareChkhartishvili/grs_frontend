"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const article_schema_1 = require("../schemas/article.schema");
const comment_schema_1 = require("../schemas/comment.schema");
let ArticleService = class ArticleService {
    articleModel;
    commentModel;
    constructor(articleModel, commentModel) {
        this.articleModel = articleModel;
        this.commentModel = commentModel;
    }
    async findAll(options = {}) {
        const { page = 1, limit = 10, category, published = true, sort = 'publishedAt', order = 'desc', } = options;
        const query = {};
        if (published !== undefined)
            query.isPublished = published;
        if (category)
            query.categoryId = category;
        const sortOptions = {};
        sortOptions[sort] = order === 'desc' ? -1 : 1;
        const skip = (page - 1) * limit;
        const [articles, total] = await Promise.all([
            this.articleModel
                .find(query)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit)
                .select('-content')
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
    async findById(id) {
        const article = await this.articleModel
            .findById(id)
            .populate('categoryId', 'name description')
            .populate('authorId', 'name email avatar')
            .populate('relatedArticleIds', 'title slug excerpt mainImage readTimeMinutes')
            .exec();
        if (!article) {
            throw new common_1.NotFoundException('სტატია ვერ მოიძებნა');
        }
        await this.articleModel.findByIdAndUpdate(id, { $inc: { viewsCount: 1 } });
        return article;
    }
    async findBySlug(slug) {
        const article = await this.articleModel
            .findOne({ slug, isPublished: true })
            .populate('categoryId', 'name description')
            .populate('authorId', 'name email avatar')
            .populate('relatedArticleIds', 'title slug excerpt mainImage readTimeMinutes')
            .exec();
        if (!article) {
            throw new common_1.NotFoundException('სტატია ვერ მოიძებნა');
        }
        await this.articleModel.findOneAndUpdate({ slug }, { $inc: { viewsCount: 1 } });
        return article;
    }
    async findByCategory(categoryId, options = {}) {
        return this.findAll({ ...options, category: categoryId });
    }
    async search(query, options = {}) {
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
    async getFeatured(limit = 5) {
        return this.articleModel
            .find({ isFeatured: true, isPublished: true })
            .populate('categoryId', 'name description')
            .populate('authorId', 'name email')
            .sort({ publishedAt: -1 })
            .limit(limit)
            .select('-content')
            .exec();
    }
    async create(articleData) {
        const article = new this.articleModel({
            ...articleData,
            publishedAt: articleData.isPublished ? new Date() : undefined,
        });
        return article.save();
    }
    async update(id, updateData) {
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
            throw new common_1.NotFoundException('სტატია ვერ მოიძებნა');
        }
        return article;
    }
    async delete(id) {
        const result = await this.articleModel.findByIdAndDelete(id);
        if (!result) {
            throw new common_1.NotFoundException('სტატია ვერ მოიძებნა');
        }
        await this.commentModel.deleteMany({ articleId: id });
    }
    async getComments(articleId) {
        return this.commentModel
            .find({ articleId, isApproved: true })
            .populate('parentCommentId')
            .sort({ publishedAt: -1 })
            .exec();
    }
    async addComment(articleId, commentData) {
        const comment = new this.commentModel({
            articleId,
            ...commentData,
            publishedAt: new Date(),
        });
        const savedComment = await comment.save();
        await this.articleModel.findByIdAndUpdate(articleId, {
            $inc: { commentsCount: 1 },
        });
        return savedComment;
    }
    async approveComment(commentId) {
        const comment = await this.commentModel.findByIdAndUpdate(commentId, { isApproved: true }, { new: true });
        if (!comment) {
            throw new common_1.NotFoundException('კომენტარი ვერ მოიძებნა');
        }
        return comment;
    }
    async deleteComment(commentId) {
        const comment = await this.commentModel.findByIdAndDelete(commentId);
        if (!comment) {
            throw new common_1.NotFoundException('კომენტარი ვერ მოიძებნა');
        }
        await this.articleModel.findByIdAndUpdate(comment.articleId, {
            $inc: { commentsCount: -1 },
        });
    }
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(article_schema_1.Article.name)),
    __param(1, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ArticleService);
//# sourceMappingURL=article.service.js.map