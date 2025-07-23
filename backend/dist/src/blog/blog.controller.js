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
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const blog_service_1 = require("./blog.service");
const create_blog_dto_1 = require("./dto/create-blog.dto");
const cloudinary_config_1 = require("../cloudinary.config");
const streamifier = require("streamifier");
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
        this.uploadToCloudinary = (file, resource_type) => {
            return new Promise((resolve, reject) => {
                const upload = cloudinary_config_1.default.uploader.upload_stream({
                    resource_type,
                    folder: 'grs/blogs',
                    transformation: resource_type === 'image' ? [
                        { width: 600, height: 400, crop: 'fill' },
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
    async createJson(createBlogDto) {
        console.log('📝 Creating blog post with JSON data');
        console.log('Body received:', createBlogDto);
        try {
            const result = await this.blogService.create(createBlogDto);
            return result;
        }
        catch (error) {
            console.error('❌ Error in create blog JSON controller:', error);
            throw new common_1.BadRequestException(error.message || 'Failed to create blog post');
        }
    }
    async create(file, createBlogDto) {
        console.log('📝 Creating blog post with file upload');
        console.log('File received:', !!file);
        console.log('Body received:', Object.keys(createBlogDto));
        try {
            const parsedData = {
                ...createBlogDto,
                title: JSON.parse(createBlogDto.title),
                description: JSON.parse(createBlogDto.description),
                excerpt: JSON.parse(createBlogDto.excerpt),
                tags: createBlogDto.tags ? JSON.parse(createBlogDto.tags) : [],
            };
            let imageUrl = createBlogDto.imageUrl || '';
            if (file) {
                console.log('📤 Uploading image to Cloudinary...');
                const uploadResult = await this.uploadToCloudinary(file, 'image');
                imageUrl = uploadResult.secure_url;
                console.log('✅ Image uploaded successfully:', imageUrl);
            }
            const blogData = {
                ...parsedData,
                imageUrl,
            };
            const result = await this.blogService.create(blogData);
            return result;
        }
        catch (error) {
            console.error('❌ Error in create blog controller:', error);
            throw new common_1.BadRequestException(error.message || 'Failed to create blog post');
        }
    }
    async findAll(query) {
        console.log('📚 GET /blogs - Query params:', query);
        return this.blogService.findAll(query);
    }
    async findFeatured() {
        console.log('⭐ GET /blogs/featured');
        return this.blogService.findFeatured();
    }
    async findPopular(limit) {
        console.log('🔥 GET /blogs/popular - Limit:', limit);
        const limitNum = limit ? parseInt(limit, 10) : 6;
        return this.blogService.findPopular(limitNum);
    }
    async search(searchTerm) {
        console.log('🔍 GET /blogs/search - Term:', searchTerm);
        if (!searchTerm) {
            throw new common_1.BadRequestException('Search term is required');
        }
        return this.blogService.search(searchTerm);
    }
    async findByCategory(categoryId) {
        console.log('📂 GET /blogs/category/:categoryId - Category:', categoryId);
        return this.blogService.findByCategory(categoryId);
    }
    async findAllWithArticles(query) {
        console.log('📚 GET /blogs/with-articles - Query params:', query);
        return this.blogService.findAllWithArticles(query);
    }
    async findOneWithArticles(id) {
        console.log('📖 GET /blogs/:id/with-articles - ID:', id);
        return this.blogService.findOneWithArticles(id);
    }
    async findOne(id) {
        console.log('📖 GET /blogs/:id - ID:', id);
        return this.blogService.findOne(id);
    }
    async update(id, file, updateBlogDto) {
        console.log('📝 PATCH /blogs/:id - ID:', id);
        console.log('File received:', !!file);
        try {
            const parsedData = {};
            if (updateBlogDto.title)
                parsedData.title = JSON.parse(updateBlogDto.title);
            if (updateBlogDto.description)
                parsedData.description = JSON.parse(updateBlogDto.description);
            if (updateBlogDto.excerpt)
                parsedData.excerpt = JSON.parse(updateBlogDto.excerpt);
            if (updateBlogDto.tags)
                parsedData.tags = JSON.parse(updateBlogDto.tags);
            ['categoryId', 'link', 'isPublished', 'isFeatured', 'isActive', 'sortOrder'].forEach(field => {
                if (updateBlogDto[field] !== undefined) {
                    parsedData[field] = updateBlogDto[field];
                }
            });
            if (file) {
                console.log('📤 Uploading new image to Cloudinary...');
                const uploadResult = await this.uploadToCloudinary(file, 'image');
                parsedData.imageUrl = uploadResult.secure_url;
                console.log('✅ New image uploaded successfully:', parsedData.imageUrl);
            }
            const result = await this.blogService.update(id, parsedData);
            return result;
        }
        catch (error) {
            console.error('❌ Error in update blog controller:', error);
            throw new common_1.BadRequestException(error.message || 'Failed to update blog post');
        }
    }
    async remove(id) {
        console.log('🗑️ DELETE /blogs/:id - ID:', id);
        return this.blogService.remove(id);
    }
    async incrementLikes(id) {
        console.log('👍 POST /blogs/:id/like - ID:', id);
        return this.blogService.incrementLikes(id);
    }
};
exports.BlogController = BlogController;
__decorate([
    (0, common_1.Post)('json'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blog_dto_1.CreateBlogDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "createJson", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('featured'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findFeatured", null);
__decorate([
    (0, common_1.Get)('popular'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findPopular", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)('with-articles'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findAllWithArticles", null);
__decorate([
    (0, common_1.Get)(':id/with-articles'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findOneWithArticles", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/like'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "incrementLikes", null);
exports.BlogController = BlogController = __decorate([
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
//# sourceMappingURL=blog.controller.js.map