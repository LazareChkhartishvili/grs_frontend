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
let ArticleService = class ArticleService {
    constructor(articleModel, blogModel) {
        this.articleModel = articleModel;
        this.blogModel = blogModel;
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .replace(/\s+/g, '-');
    }
    async create(createArticleDto) {
        try {
            console.log('📝 Creating new article:', {
                title: createArticleDto.title,
                categoryId: createArticleDto.categoryId,
                author: createArticleDto.author.name
            });
            const titleForSlug = createArticleDto.title.en || createArticleDto.title.ka;
            const baseSlug = this.generateSlug(titleForSlug);
            let slug = baseSlug;
            let counter = 1;
            while (await this.articleModel.findOne({ slug })) {
                slug = `${baseSlug}-${counter}`;
                counter++;
            }
            const createdArticle = new this.articleModel({
                ...createArticleDto,
                slug,
                blogId: new mongoose_2.Types.ObjectId(createArticleDto.blogId),
                categoryId: new mongoose_2.Types.ObjectId(createArticleDto.categoryId),
            });
            const result = await createdArticle.save();
            await this.blogModel.findByIdAndUpdate(createArticleDto.blogId, { $push: { articles: result._id } });
            console.log('✅ Article created successfully:', result._id);
            return result;
        }
        catch (error) {
            console.error('❌ Error creating article:', error);
            throw new common_1.BadRequestException(error.message || 'Failed to create article');
        }
    }
    async findAll(query = {}) {
        try {
            console.log('📚 Fetching articles with query:', query);
            const filter = { isActive: true };
            if (query.blogId) {
                filter.blogId = new mongoose_2.Types.ObjectId(query.blogId);
            }
            if (query.categoryId) {
                filter.categoryId = new mongoose_2.Types.ObjectId(query.categoryId);
            }
            if (query.isPublished !== undefined) {
                filter.isPublished = query.isPublished === 'true';
            }
            if (query.isFeatured !== undefined) {
                filter.isFeatured = query.isFeatured === 'true';
            }
            if (query.tags) {
                filter.tags = { $in: Array.isArray(query.tags) ? query.tags : [query.tags] };
            }
            const articles = await this.articleModel
                .find(filter)
                .populate('blogId', 'title description imageUrl')
                .populate('categoryId', 'name description image')
                .sort({ publishDate: -1, createdAt: -1 })
                .exec();
            console.log(`✅ Found ${articles.length} articles`);
            return articles;
        }
        catch (error) {
            console.error('❌ Error fetching articles:', error);
            throw new common_1.BadRequestException('Failed to fetch articles');
        }
    }
    async findOne(id) {
        try {
            console.log('📖 Fetching article by ID:', id);
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                throw new common_1.BadRequestException('Invalid article ID');
            }
            const article = await this.articleModel
                .findOne({ _id: new mongoose_2.Types.ObjectId(id), isActive: true })
                .populate('blogId', 'title description imageUrl')
                .populate('categoryId', 'name description image')
                .exec();
            if (!article) {
                throw new common_1.NotFoundException(`Article with ID ${id} not found`);
            }
            await this.articleModel.updateOne({ _id: new mongoose_2.Types.ObjectId(id) }, { $inc: { viewsCount: 1 } });
            console.log('✅ Article found:', article.title);
            return article;
        }
        catch (error) {
            console.error('❌ Error fetching article:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to fetch article');
        }
    }
    async update(id, updateArticleDto) {
        try {
            console.log('📝 Updating article:', id);
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                throw new common_1.BadRequestException('Invalid article ID');
            }
            const updateData = { ...updateArticleDto };
            if (updateArticleDto.categoryId) {
                updateData.categoryId = new mongoose_2.Types.ObjectId(updateArticleDto.categoryId);
            }
            const updatedArticle = await this.articleModel
                .findByIdAndUpdate(new mongoose_2.Types.ObjectId(id), updateData, { new: true, runValidators: true })
                .populate('blogId', 'title description imageUrl')
                .populate('categoryId', 'name description image')
                .exec();
            if (!updatedArticle) {
                throw new common_1.NotFoundException(`Article with ID ${id} not found`);
            }
            console.log('✅ Article updated successfully');
            return updatedArticle;
        }
        catch (error) {
            console.error('❌ Error updating article:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to update article');
        }
    }
    async remove(id) {
        try {
            console.log('🗑️ Deleting article:', id);
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                throw new common_1.BadRequestException('Invalid article ID');
            }
            const article = await this.articleModel.findById(id);
            if (!article) {
                throw new common_1.NotFoundException(`Article with ID ${id} not found`);
            }
            await this.blogModel.findByIdAndUpdate(article.blogId, { $pull: { articles: new mongoose_2.Types.ObjectId(id) } });
            await this.articleModel
                .findByIdAndUpdate(new mongoose_2.Types.ObjectId(id), { isActive: false }, { new: true })
                .exec();
            console.log('✅ Article deleted successfully');
        }
        catch (error) {
            console.error('❌ Error deleting article:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to delete article');
        }
    }
    async findFeatured() {
        try {
            console.log('⭐ Fetching featured articles');
            const articles = await this.articleModel
                .find({
                isActive: true,
                isPublished: true,
                isFeatured: true
            })
                .populate('blogId', 'title description imageUrl')
                .populate('categoryId', 'name description image')
                .sort({ publishDate: -1 })
                .limit(6)
                .exec();
            console.log(`✅ Found ${articles.length} featured articles`);
            return articles;
        }
        catch (error) {
            console.error('❌ Error fetching featured articles:', error);
            throw new common_1.BadRequestException('Failed to fetch featured articles');
        }
    }
    async findByCategory(categoryId) {
        try {
            console.log('📂 Fetching articles by category:', categoryId);
            if (!mongoose_2.Types.ObjectId.isValid(categoryId)) {
                throw new common_1.BadRequestException('Invalid category ID');
            }
            const articles = await this.articleModel
                .find({
                categoryId: new mongoose_2.Types.ObjectId(categoryId),
                isActive: true,
                isPublished: true
            })
                .populate('blogId', 'title description imageUrl')
                .populate('categoryId', 'name description image')
                .sort({ publishDate: -1 })
                .exec();
            console.log(`✅ Found ${articles.length} articles in category`);
            return articles;
        }
        catch (error) {
            console.error('❌ Error fetching articles by category:', error);
            throw new common_1.BadRequestException('Failed to fetch articles by category');
        }
    }
    async search(searchTerm) {
        try {
            console.log('🔍 Searching articles with term:', searchTerm);
            const articles = await this.articleModel
                .find({
                isActive: true,
                isPublished: true,
                $or: [
                    { 'title.ka': { $regex: searchTerm, $options: 'i' } },
                    { 'title.en': { $regex: searchTerm, $options: 'i' } },
                    { 'title.ru': { $regex: searchTerm, $options: 'i' } },
                    { 'excerpt.ka': { $regex: searchTerm, $options: 'i' } },
                    { 'excerpt.en': { $regex: searchTerm, $options: 'i' } },
                    { 'excerpt.ru': { $regex: searchTerm, $options: 'i' } },
                    { tags: { $in: [new RegExp(searchTerm, 'i')] } }
                ]
            })
                .populate('blogId', 'title description imageUrl')
                .populate('categoryId', 'name description image')
                .sort({ publishDate: -1 })
                .exec();
            console.log(`✅ Found ${articles.length} articles matching search`);
            return articles;
        }
        catch (error) {
            console.error('❌ Error searching articles:', error);
            throw new common_1.BadRequestException('Failed to search articles');
        }
    }
    async findPopular(limit = 6) {
        try {
            console.log('🔥 Fetching popular articles');
            const articles = await this.articleModel
                .find({
                isActive: true,
                isPublished: true
            })
                .populate('blogId', 'title description imageUrl')
                .populate('categoryId', 'name description image')
                .sort({ viewsCount: -1, likesCount: -1 })
                .limit(limit)
                .exec();
            console.log(`✅ Found ${articles.length} popular articles`);
            return articles;
        }
        catch (error) {
            console.error('❌ Error fetching popular articles:', error);
            throw new common_1.BadRequestException('Failed to fetch popular articles');
        }
    }
    async incrementLikes(id) {
        try {
            console.log('👍 Incrementing likes for article:', id);
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                throw new common_1.BadRequestException('Invalid article ID');
            }
            const article = await this.articleModel
                .findByIdAndUpdate(new mongoose_2.Types.ObjectId(id), { $inc: { likesCount: 1 } }, { new: true })
                .populate('blogId', 'title description imageUrl')
                .populate('categoryId', 'name description image')
                .exec();
            if (!article) {
                throw new common_1.NotFoundException(`Article with ID ${id} not found`);
            }
            console.log('✅ Likes incremented successfully');
            return article;
        }
        catch (error) {
            console.error('❌ Error incrementing likes:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to increment likes');
        }
    }
    async findByBlog(blogId) {
        try {
            console.log('📚 Fetching articles by blog:', blogId);
            if (!mongoose_2.Types.ObjectId.isValid(blogId)) {
                throw new common_1.BadRequestException('Invalid blog ID');
            }
            const articles = await this.articleModel
                .find({
                blogId: new mongoose_2.Types.ObjectId(blogId),
                isActive: true,
                isPublished: true
            })
                .populate('blogId', 'title description imageUrl')
                .populate('categoryId', 'name description image')
                .sort({ publishDate: -1 })
                .exec();
            console.log(`✅ Found ${articles.length} articles in blog`);
            return articles;
        }
        catch (error) {
            console.error('❌ Error fetching articles by blog:', error);
            throw new common_1.BadRequestException('Failed to fetch articles by blog');
        }
    }
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(article_schema_1.Article.name)),
    __param(1, (0, mongoose_1.InjectModel)('Blog')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ArticleService);
//# sourceMappingURL=article.service.js.map