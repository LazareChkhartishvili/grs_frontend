import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    private uploadToCloudinary;
    createJson(createBlogDto: CreateBlogDto): Promise<import("../schemas/blog.schema").Blog>;
    create(file: Express.Multer.File, createBlogDto: any): Promise<import("../schemas/blog.schema").Blog>;
    findAll(query: any): Promise<import("../schemas/blog.schema").Blog[]>;
    findFeatured(): Promise<import("../schemas/blog.schema").Blog[]>;
    findPopular(limit?: string): Promise<import("../schemas/blog.schema").Blog[]>;
    search(searchTerm: string): Promise<import("../schemas/blog.schema").Blog[]>;
    findByCategory(categoryId: string): Promise<import("../schemas/blog.schema").Blog[]>;
    findAllWithArticles(query: any): Promise<import("../schemas/blog.schema").Blog[]>;
    findOneWithArticles(id: string): Promise<import("../schemas/blog.schema").Blog>;
    findOne(id: string): Promise<import("../schemas/blog.schema").Blog>;
    update(id: string, file: Express.Multer.File, updateBlogDto: any): Promise<import("../schemas/blog.schema").Blog>;
    remove(id: string): Promise<void>;
    incrementLikes(id: string): Promise<import("../schemas/blog.schema").Blog>;
}
