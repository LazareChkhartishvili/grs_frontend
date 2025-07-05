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
exports.CommentController = exports.ArticleController = void 0;
const common_1 = require("@nestjs/common");
const article_service_1 = require("./article.service");
let ArticleController = class ArticleController {
    articleService;
    constructor(articleService) {
        this.articleService = articleService;
    }
    async getAllArticles(page = '1', limit = '10', category, published, sort, order) {
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
    async searchArticles(query, page = '1', limit = '10') {
        if (!query) {
            throw new common_1.NotFoundException('ძიების ტექსტი სავალდებულოა');
        }
        return this.articleService.search(query, {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
        });
    }
    async getFeaturedArticles(limit = '5') {
        return this.articleService.getFeatured(parseInt(limit, 10));
    }
    async getArticleById(id) {
        return this.articleService.findById(id);
    }
    async getArticleBySlug(slug) {
        return this.articleService.findBySlug(slug);
    }
    async getArticlesByCategory(categoryId, page = '1', limit = '10') {
        return this.articleService.findByCategory(categoryId, {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
        });
    }
    async createArticle(articleData) {
        return this.articleService.create(articleData);
    }
    async updateArticle(id, updateData) {
        return this.articleService.update(id, updateData);
    }
    async deleteArticle(id) {
        await this.articleService.delete(id);
        return { message: 'სტატია წარმატებით წაიშალა' };
    }
    async getArticleComments(articleId) {
        return this.articleService.getComments(articleId);
    }
    async addComment(articleId, commentData) {
        return this.articleService.addComment(articleId, commentData);
    }
};
exports.ArticleController = ArticleController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('category')),
    __param(3, (0, common_1.Query)('published')),
    __param(4, (0, common_1.Query)('sort')),
    __param(5, (0, common_1.Query)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getAllArticles", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "searchArticles", null);
__decorate([
    (0, common_1.Get)('featured'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getFeaturedArticles", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getArticleById", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getArticleBySlug", null);
__decorate([
    (0, common_1.Get)('category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getArticlesByCategory", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "createArticle", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "updateArticle", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "deleteArticle", null);
__decorate([
    (0, common_1.Get)(':id/comments'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getArticleComments", null);
__decorate([
    (0, common_1.Post)(':id/comments'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "addComment", null);
exports.ArticleController = ArticleController = __decorate([
    (0, common_1.Controller)('articles'),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
let CommentController = class CommentController {
    articleService;
    constructor(articleService) {
        this.articleService = articleService;
    }
    async approveComment(commentId) {
        return this.articleService.approveComment(commentId);
    }
    async deleteComment(commentId) {
        await this.articleService.deleteComment(commentId);
        return { message: 'კომენტარი წარმატებით წაიშალა' };
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, common_1.Put)(':id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "approveComment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
exports.CommentController = CommentController = __decorate([
    (0, common_1.Controller)('comments'),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], CommentController);
//# sourceMappingURL=article.controller.js.map