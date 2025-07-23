import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    private uploadToCloudinary;
    createJson(createArticleDto: CreateArticleDto): Promise<import("../schemas/article.schema").Article>;
    create(files: Express.Multer.File[], createArticleDto: any): Promise<import("../schemas/article.schema").Article>;
    findAll(query: any): Promise<import("../schemas/article.schema").Article[]>;
    findFeatured(): Promise<import("../schemas/article.schema").Article[]>;
    findPopular(limit?: string): Promise<import("../schemas/article.schema").Article[]>;
    search(searchTerm: string): Promise<import("../schemas/article.schema").Article[]>;
    findByCategory(categoryId: string): Promise<import("../schemas/article.schema").Article[]>;
    findByBlog(blogId: string): Promise<import("../schemas/article.schema").Article[]>;
    findOne(id: string): Promise<import("../schemas/article.schema").Article>;
    update(id: string, files: Express.Multer.File[], updateArticleDto: any): Promise<import("../schemas/article.schema").Article>;
    remove(id: string): Promise<void>;
    incrementLikes(id: string): Promise<import("../schemas/article.schema").Article>;
}
