import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../schemas/article.schema';
import { CommentDocument } from '../schemas/comment.schema';
export declare class ArticleService {
    private articleModel;
    private commentModel;
    constructor(articleModel: Model<ArticleDocument>, commentModel: Model<CommentDocument>);
    findAll(options?: {
        page?: number;
        limit?: number;
        category?: string;
        published?: boolean;
        sort?: string;
        order?: 'asc' | 'desc';
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, ArticleDocument, {}> & Article & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
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
    findById(id: string): Promise<ArticleDocument>;
    findBySlug(slug: string): Promise<ArticleDocument>;
    findByCategory(categoryId: string, options?: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, ArticleDocument, {}> & Article & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
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
    search(query: string, options?: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, ArticleDocument, {}> & Article & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
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
    getFeatured(limit?: number): Promise<ArticleDocument[]>;
    create(articleData: {
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
    }): Promise<ArticleDocument>;
    update(id: string, updateData: any): Promise<ArticleDocument>;
    delete(id: string): Promise<void>;
    getComments(articleId: string): Promise<CommentDocument[]>;
    addComment(articleId: string, commentData: {
        author: {
            name: string;
            email: string;
            avatar?: string;
        };
        content: string;
        parentCommentId?: string;
    }): Promise<CommentDocument>;
    approveComment(commentId: string): Promise<CommentDocument>;
    deleteComment(commentId: string): Promise<void>;
}
