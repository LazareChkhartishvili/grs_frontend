import { ArticleService } from './article.service';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    getAllArticles(page?: string, limit?: string, category?: string, published?: string, sort?: string, order?: 'asc' | 'desc'): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../schemas/article.schema").ArticleDocument> & import("../schemas/article.schema").Article & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    }>;
    searchArticles(query: string, page?: string, limit?: string): Promise<{
        data: Omit<Omit<import("mongoose").Document<unknown, {}, import("../schemas/article.schema").ArticleDocument> & import("../schemas/article.schema").Article & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, never>[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    }>;
    getFeaturedArticles(limit?: string): Promise<import("../schemas/article.schema").ArticleDocument[]>;
    getArticleById(id: string): Promise<import("../schemas/article.schema").ArticleDocument>;
    getArticleBySlug(slug: string): Promise<import("../schemas/article.schema").ArticleDocument>;
    getArticlesByCategory(categoryId: string, page?: string, limit?: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../schemas/article.schema").ArticleDocument> & import("../schemas/article.schema").Article & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    }>;
    createArticle(articleData: {
        title: string;
        content: string;
        excerpt: string;
        slug: string;
        categoryId: string;
        authorId?: string;
        mainImage?: string;
        images?: string[];
        readTimeMinutes?: number;
        tags?: string[];
        relatedArticleIds?: string[];
        metaTitle?: string;
        metaDescription?: string;
        tableOfContents?: Array<{
            id: number;
            title: string;
            anchor: string;
        }>;
        isPublished?: boolean;
        isFeatured?: boolean;
    }): Promise<import("../schemas/article.schema").ArticleDocument>;
    updateArticle(id: string, updateData: any): Promise<import("../schemas/article.schema").ArticleDocument>;
    deleteArticle(id: string): Promise<{
        message: string;
    }>;
    getArticleComments(articleId: string): Promise<import("../schemas/comment.schema").CommentDocument[]>;
    addComment(articleId: string, commentData: {
        author: {
            name: string;
            email: string;
            avatar?: string;
        };
        content: string;
        parentCommentId?: string;
    }): Promise<import("../schemas/comment.schema").CommentDocument>;
}
export declare class CommentController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    approveComment(commentId: string): Promise<import("../schemas/comment.schema").CommentDocument>;
    deleteComment(commentId: string): Promise<{
        message: string;
    }>;
}
