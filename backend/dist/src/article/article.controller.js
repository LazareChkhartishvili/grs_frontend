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
exports.ArticleController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const article_service_1 = require("./article.service");
const create_article_dto_1 = require("./dto/create-article.dto");
const cloudinary_config_1 = require("../cloudinary.config");
const streamifier = require("streamifier");
let ArticleController = class ArticleController {
    constructor(articleService) {
        this.articleService = articleService;
        this.uploadToCloudinary = (file, resource_type) => {
            return new Promise((resolve, reject) => {
                const upload = cloudinary_config_1.default.uploader.upload_stream({
                    resource_type,
                    folder: 'grs/articles',
                    transformation: resource_type === 'image' ? [
                        { width: 1400, height: 518, crop: 'fill' },
                        { quality: 'auto' },
                        { fetch_format: 'auto' }
                    ] : undefined
                }, (error, result) => {
                    if (error)
                        return reject(error);
                    resolve(result);
                });
                streamifier.createReadStream(file.buffer).pipe(upload);
            });
        };
    }
    async createJson(createArticleDto) {
        console.log('📝 Creating article with JSON data');
        console.log('Body received:', createArticleDto);
        try {
            const result = await this.articleService.create(createArticleDto);
            return result;
        }
        catch (error) {
            console.error('❌ Error in create article JSON controller:', error);
            throw new common_1.BadRequestException(error.message || 'Failed to create article');
        }
    }
    async create(files, createArticleDto) {
        console.log('📝 Creating article with file upload');
        console.log('Files received:', files?.length || 0);
        console.log('Body received:', Object.keys(createArticleDto));
        try {
            const parsedData = {
                ...createArticleDto,
                title: JSON.parse(createArticleDto.title),
                excerpt: JSON.parse(createArticleDto.excerpt),
                content: JSON.parse(createArticleDto.content),
                author: JSON.parse(createArticleDto.author),
                tableOfContents: createArticleDto.tableOfContents ? JSON.parse(createArticleDto.tableOfContents) : [],
                tags: createArticleDto.tags ? JSON.parse(createArticleDto.tags) : [],
            };
            let featuredImages = [];
            if (files && files.length > 0) {
                console.log(`📤 Uploading ${files.length} images to Cloudinary...`);
                const uploadPromises = files.map(file => this.uploadToCloudinary(file, 'image'));
                const uploadResults = await Promise.all(uploadPromises);
                featuredImages = uploadResults.map((result) => result.secure_url);
                console.log('✅ Images uploaded successfully:', featuredImages);
            }
            const articleData = {
                ...parsedData,
                featuredImages,
            };
            const result = await this.articleService.create(articleData);
            return result;
        }
        catch (error) {
            console.error('❌ Error in create article controller:', error);
            throw new common_1.BadRequestException(error.message || 'Failed to create article');
        }
    }
    async findAll(query) {
        console.log('📚 GET /articles - Query params:', query);
        return this.articleService.findAll(query);
    }
    async findFeatured() {
        console.log('⭐ GET /articles/featured');
        return this.articleService.findFeatured();
    }
    async findPopular(limit) {
        console.log('🔥 GET /articles/popular - Limit:', limit);
        const limitNum = limit ? parseInt(limit, 10) : 6;
        return this.articleService.findPopular(limitNum);
    }
    async search(searchTerm) {
        console.log('🔍 GET /articles/search - Term:', searchTerm);
        if (!searchTerm) {
            throw new common_1.BadRequestException('Search term is required');
        }
        return this.articleService.search(searchTerm);
    }
    async findByCategory(categoryId) {
        console.log('📂 GET /articles/category/:categoryId - Category:', categoryId);
        return this.articleService.findByCategory(categoryId);
    }
    async findByBlog(blogId) {
        console.log('📚 GET /articles/blog/:blogId - Blog ID:', blogId);
        return this.articleService.findByBlog(blogId);
    }
    async findOne(id) {
        console.log('📖 GET /articles/:id - ID:', id);
        return this.articleService.findOne(id);
    }
    async update(id, files, updateArticleDto) {
        console.log('📝 PATCH /articles/:id - ID:', id);
        console.log('Files received:', files?.length || 0);
        try {
            const parsedData = {};
            if (updateArticleDto.title)
                parsedData.title = JSON.parse(updateArticleDto.title);
            if (updateArticleDto.excerpt)
                parsedData.excerpt = JSON.parse(updateArticleDto.excerpt);
            if (updateArticleDto.content)
                parsedData.content = JSON.parse(updateArticleDto.content);
            if (updateArticleDto.author)
                parsedData.author = JSON.parse(updateArticleDto.author);
            if (updateArticleDto.tableOfContents)
                parsedData.tableOfContents = JSON.parse(updateArticleDto.tableOfContents);
            if (updateArticleDto.tags)
                parsedData.tags = JSON.parse(updateArticleDto.tags);
            ['categoryId', 'readTime', 'isPublished', 'isFeatured', 'isActive', 'sortOrder'].forEach(field => {
                if (updateArticleDto[field] !== undefined) {
                    parsedData[field] = updateArticleDto[field];
                }
            });
            if (files && files.length > 0) {
                console.log(`📤 Uploading ${files.length} new images to Cloudinary...`);
                const uploadPromises = files.map(file => this.uploadToCloudinary(file, 'image'));
                const uploadResults = await Promise.all(uploadPromises);
                const newImages = uploadResults.map((result) => result.secure_url);
                parsedData.featuredImages = newImages;
                console.log('✅ New images uploaded successfully:', newImages);
            }
            const result = await this.articleService.update(id, parsedData);
            return result;
        }
        catch (error) {
            console.error('❌ Error in update article controller:', error);
            throw new common_1.BadRequestException(error.message || 'Failed to update article');
        }
    }
    async remove(id) {
        console.log('🗑️ DELETE /articles/:id - ID:', id);
        return this.articleService.remove(id);
    }
    async incrementLikes(id) {
        console.log('👍 POST /articles/:id/like - ID:', id);
        return this.articleService.incrementLikes(id);
    }
};
exports.ArticleController = ArticleController;
__decorate([
    (0, common_1.Post)('json'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_dto_1.CreateArticleDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "createJson", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 10)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('featured'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findFeatured", null);
__decorate([
    (0, common_1.Get)('popular'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findPopular", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)('blog/:blogId'),
    __param(0, (0, common_1.Param)('blogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findByBlog", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 10)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/like'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "incrementLikes", null);
exports.ArticleController = ArticleController = __decorate([
    (0, common_1.Controller)('articles'),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
//# sourceMappingURL=article.controller.js.map