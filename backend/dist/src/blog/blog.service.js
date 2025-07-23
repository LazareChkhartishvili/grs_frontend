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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blog_schema_1 = require("../schemas/blog.schema");
let BlogService = class BlogService {
    constructor(blogModel) {
        this.blogModel = blogModel;
    }
    async create(createBlogDto) {
        try {
            console.log('📝 Creating new blog post:', {
                title: createBlogDto.title,
                categoryId: createBlogDto.categoryId
            });
            const createdBlog = new this.blogModel({
                ...createBlogDto,
                categoryId: new mongoose_2.Types.ObjectId(createBlogDto.categoryId),
            });
            const result = await createdBlog.save();
            console.log('✅ Blog post created successfully:', result._id);
            return result;
        }
        catch (error) {
            console.error('❌ Error creating blog post:', error);
            throw new common_1.BadRequestException('Failed to create blog post');
        }
    }
    async findAll(query = {}) {
        try {
            console.log('📚 Fetching blog posts with query:', query);
            const filter = { isActive: true };
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
            const blogs = await this.blogModel
                .find(filter)
                .populate('categoryId', 'name description image')
                .sort({ publishDate: -1, createdAt: -1 })
                .exec();
            console.log(`✅ Found ${blogs.length} blog posts`);
            return blogs;
        }
        catch (error) {
            console.error('❌ Error fetching blog posts:', error);
            throw new common_1.BadRequestException('Failed to fetch blog posts');
        }
    }
    async findOne(id) {
        try {
            console.log('📖 Fetching blog post by ID:', id);
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                throw new common_1.BadRequestException('Invalid blog post ID');
            }
            const blog = await this.blogModel
                .findOne({ _id: new mongoose_2.Types.ObjectId(id), isActive: true })
                .populate('categoryId', 'name description image')
                .exec();
            if (!blog) {
                throw new common_1.NotFoundException(`Blog post with ID ${id} not found`);
            }
            await this.blogModel.updateOne({ _id: new mongoose_2.Types.ObjectId(id) }, { $inc: { viewsCount: 1 } });
            console.log('✅ Blog post found:', blog.title);
            return blog;
        }
        catch (error) {
            console.error('❌ Error fetching blog post:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to fetch blog post');
        }
    }
    async update(id, updateBlogDto) {
        try {
            console.log('📝 Updating blog post:', id);
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                throw new common_1.BadRequestException('Invalid blog post ID');
            }
            const updateData = { ...updateBlogDto };
            if (updateBlogDto.categoryId) {
                updateData.categoryId = new mongoose_2.Types.ObjectId(updateBlogDto.categoryId);
            }
            const updatedBlog = await this.blogModel
                .findByIdAndUpdate(new mongoose_2.Types.ObjectId(id), updateData, { new: true, runValidators: true })
                .populate('categoryId', 'name description image')
                .exec();
            if (!updatedBlog) {
                throw new common_1.NotFoundException(`Blog post with ID ${id} not found`);
            }
            console.log('✅ Blog post updated successfully');
            return updatedBlog;
        }
        catch (error) {
            console.error('❌ Error updating blog post:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to update blog post');
        }
    }
    async remove(id) {
        try {
            console.log('🗑️ Deleting blog post:', id);
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                throw new common_1.BadRequestException('Invalid blog post ID');
            }
            const result = await this.blogModel
                .findByIdAndUpdate(new mongoose_2.Types.ObjectId(id), { isActive: false }, { new: true })
                .exec();
            if (!result) {
                throw new common_1.NotFoundException(`Blog post with ID ${id} not found`);
            }
            console.log('✅ Blog post deleted successfully');
        }
        catch (error) {
            console.error('❌ Error deleting blog post:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to delete blog post');
        }
    }
    async findFeatured() {
        try {
            console.log('⭐ Fetching featured blog posts');
            const blogs = await this.blogModel
                .find({
                isActive: true,
                isPublished: true,
                isFeatured: true
            })
                .populate('categoryId', 'name description image')
                .sort({ publishDate: -1 })
                .limit(6)
                .exec();
            console.log(`✅ Found ${blogs.length} featured blog posts`);
            return blogs;
        }
        catch (error) {
            console.error('❌ Error fetching featured blog posts:', error);
            throw new common_1.BadRequestException('Failed to fetch featured blog posts');
        }
    }
    async findByCategory(categoryId) {
        try {
            console.log('📂 Fetching blog posts by category:', categoryId);
            if (!mongoose_2.Types.ObjectId.isValid(categoryId)) {
                throw new common_1.BadRequestException('Invalid category ID');
            }
            const blogs = await this.blogModel
                .find({
                categoryId: new mongoose_2.Types.ObjectId(categoryId),
                isActive: true,
                isPublished: true
            })
                .populate('categoryId', 'name description image')
                .sort({ publishDate: -1 })
                .exec();
            console.log(`✅ Found ${blogs.length} blog posts in category`);
            return blogs;
        }
        catch (error) {
            console.error('❌ Error fetching blog posts by category:', error);
            throw new common_1.BadRequestException('Failed to fetch blog posts by category');
        }
    }
    async search(searchTerm) {
        try {
            console.log('🔍 Searching blog posts with term:', searchTerm);
            const blogs = await this.blogModel
                .find({
                isActive: true,
                isPublished: true,
                $or: [
                    { 'title.ka': { $regex: searchTerm, $options: 'i' } },
                    { 'title.en': { $regex: searchTerm, $options: 'i' } },
                    { 'title.ru': { $regex: searchTerm, $options: 'i' } },
                    { 'description.ka': { $regex: searchTerm, $options: 'i' } },
                    { 'description.en': { $regex: searchTerm, $options: 'i' } },
                    { 'description.ru': { $regex: searchTerm, $options: 'i' } },
                    { tags: { $in: [new RegExp(searchTerm, 'i')] } }
                ]
            })
                .populate('categoryId', 'name description image')
                .sort({ publishDate: -1 })
                .exec();
            console.log(`✅ Found ${blogs.length} blog posts matching search`);
            return blogs;
        }
        catch (error) {
            console.error('❌ Error searching blog posts:', error);
            throw new common_1.BadRequestException('Failed to search blog posts');
        }
    }
    async findPopular(limit = 6) {
        try {
            console.log('🔥 Fetching popular blog posts');
            const blogs = await this.blogModel
                .find({
                isActive: true,
                isPublished: true
            })
                .populate('categoryId', 'name description image')
                .sort({ viewsCount: -1, likesCount: -1 })
                .limit(limit)
                .exec();
            console.log(`✅ Found ${blogs.length} popular blog posts`);
            return blogs;
        }
        catch (error) {
            console.error('❌ Error fetching popular blog posts:', error);
            throw new common_1.BadRequestException('Failed to fetch popular blog posts');
        }
    }
    async incrementLikes(id) {
        try {
            console.log('👍 Incrementing likes for blog post:', id);
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                throw new common_1.BadRequestException('Invalid blog post ID');
            }
            const blog = await this.blogModel
                .findByIdAndUpdate(new mongoose_2.Types.ObjectId(id), { $inc: { likesCount: 1 } }, { new: true })
                .populate('categoryId', 'name description image')
                .exec();
            if (!blog) {
                throw new common_1.NotFoundException(`Blog post with ID ${id} not found`);
            }
            console.log('✅ Likes incremented successfully');
            return blog;
        }
        catch (error) {
            console.error('❌ Error incrementing likes:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to increment likes');
        }
    }
    async findAllWithArticles(query = {}) {
        try {
            console.log('📚 Fetching blogs with articles');
            const filter = { isActive: true };
            if (query.isPublished !== undefined) {
                filter.isPublished = query.isPublished === 'true';
            }
            if (query.isFeatured !== undefined) {
                filter.isFeatured = query.isFeatured === 'true';
            }
            if (query.categoryId) {
                filter.categoryId = new mongoose_2.Types.ObjectId(query.categoryId);
            }
            const blogs = await this.blogModel
                .find(filter)
                .populate({
                path: 'articles',
                match: { isActive: true },
                select: 'title excerpt author readTime viewsCount likesCount createdAt',
                options: { sort: { createdAt: -1 } }
            })
                .populate('categoryId', 'name description image')
                .sort({ sortOrder: 1, createdAt: -1 })
                .exec();
            console.log(`✅ Found ${blogs.length} blogs with articles`);
            return blogs;
        }
        catch (error) {
            console.error('❌ Error fetching blogs with articles:', error);
            throw new common_1.BadRequestException('Failed to fetch blogs with articles');
        }
    }
    async findOneWithArticles(id) {
        try {
            console.log('📖 Fetching blog with articles by ID:', id);
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                throw new common_1.BadRequestException('Invalid blog ID');
            }
            const blog = await this.blogModel
                .findOne({ _id: new mongoose_2.Types.ObjectId(id), isActive: true })
                .populate({
                path: 'articles',
                match: { isActive: true },
                select: 'title excerpt author readTime viewsCount likesCount createdAt',
                options: { sort: { createdAt: -1 } }
            })
                .populate('categoryId', 'name description image')
                .exec();
            if (!blog) {
                throw new common_1.NotFoundException(`Blog with ID ${id} not found`);
            }
            console.log('✅ Blog found with articles:', blog.title);
            return blog;
        }
        catch (error) {
            console.error('❌ Error fetching blog with articles:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to fetch blog with articles');
        }
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_schema_1.Blog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BlogService);
//# sourceMappingURL=blog.service.js.map