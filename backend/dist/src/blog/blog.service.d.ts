import { Model } from 'mongoose';
import { Blog, BlogDocument } from '../schemas/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
export declare class BlogService {
    private blogModel;
    constructor(blogModel: Model<BlogDocument>);
    create(createBlogDto: CreateBlogDto): Promise<Blog>;
    findAll(query?: any): Promise<Blog[]>;
    findOne(id: string): Promise<Blog>;
    update(id: string, updateBlogDto: Partial<CreateBlogDto>): Promise<Blog>;
    remove(id: string): Promise<void>;
    findFeatured(): Promise<Blog[]>;
    findByCategory(categoryId: string): Promise<Blog[]>;
    search(searchTerm: string): Promise<Blog[]>;
    findPopular(limit?: number): Promise<Blog[]>;
    incrementLikes(id: string): Promise<Blog>;
    findAllWithArticles(query?: any): Promise<Blog[]>;
    findOneWithArticles(id: string): Promise<Blog>;
}
