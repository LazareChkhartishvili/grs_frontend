import { Document, Types } from 'mongoose';
export type ArticleDocument = Article & Document;
export declare class TableOfContentItem {
    id: number;
    title: string;
    anchor: string;
}
export declare class Article {
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    categoryId: Types.ObjectId;
    authorId?: Types.ObjectId;
    mainImage?: string;
    images?: string[];
    readTimeMinutes: number;
    commentsCount: number;
    viewsCount: number;
    isPublished: boolean;
    isFeatured: boolean;
    publishedAt?: Date;
    tableOfContents?: TableOfContentItem[];
    tags?: string[];
    relatedArticleIds?: Types.ObjectId[];
    metaTitle?: string;
    metaDescription?: string;
}
export declare const ArticleSchema: any;
