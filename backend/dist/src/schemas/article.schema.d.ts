import { Document, Types } from 'mongoose';
export type ArticleDocument = Article & Document;
export declare class LocalizedString {
    ka: string;
    en: string;
    ru: string;
}
export declare class TableOfContentItem {
    title: LocalizedString;
    anchor: string;
}
export declare class Author {
    name: string;
    bio?: string;
    avatar?: string;
}
export declare class Article {
    title: LocalizedString;
    slug: string;
    excerpt: LocalizedString;
    content: LocalizedString;
    blogId: Types.ObjectId;
    categoryId: Types.ObjectId;
    featuredImages: string[];
    author: Author;
    readTime: string;
    commentsCount: number;
    tableOfContents: TableOfContentItem[];
    tags: string[];
    isPublished: boolean;
    isFeatured: boolean;
    publishDate: Date;
    viewsCount: number;
    likesCount: number;
    isActive: boolean;
    sortOrder: number;
    comments: Types.ObjectId[];
}
export declare const ArticleSchema: import("mongoose").Schema<Article, import("mongoose").Model<Article, any, any, any, Document<unknown, any, Article> & Article & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Article, Document<unknown, {}, import("mongoose").FlatRecord<Article>> & import("mongoose").FlatRecord<Article> & {
    _id: Types.ObjectId;
}>;
