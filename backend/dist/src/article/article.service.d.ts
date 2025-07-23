import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { BlogDocument } from '../schemas/blog.schema';
export declare class ArticleService {
    private articleModel;
    private blogModel;
    constructor(articleModel: Model<ArticleDocument>, blogModel: Model<BlogDocument>);
    private generateSlug;
    create(createArticleDto: CreateArticleDto): Promise<Article>;
    findAll(query?: any): Promise<Article[]>;
    findOne(id: string): Promise<Article>;
    update(id: string, updateArticleDto: Partial<CreateArticleDto>): Promise<Article>;
    remove(id: string): Promise<void>;
    findFeatured(): Promise<Article[]>;
    findByCategory(categoryId: string): Promise<Article[]>;
    search(searchTerm: string): Promise<Article[]>;
    findPopular(limit?: number): Promise<Article[]>;
    incrementLikes(id: string): Promise<Article>;
    findByBlog(blogId: string): Promise<Article[]>;
}
