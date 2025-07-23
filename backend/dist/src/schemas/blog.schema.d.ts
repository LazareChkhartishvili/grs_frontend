import { Document, Types } from 'mongoose';
export type BlogDocument = Blog & Document;
export declare class LocalizedString {
    ka: string;
    en: string;
    ru: string;
}
export declare class Blog {
    title: LocalizedString;
    description: LocalizedString;
    excerpt: LocalizedString;
    imageUrl: string;
    categoryId: Types.ObjectId;
    link: string;
    tags: string[];
    isPublished: boolean;
    isFeatured: boolean;
    publishDate: Date;
    viewsCount: number;
    likesCount: number;
    isActive: boolean;
    sortOrder: number;
    articles: Types.ObjectId[];
}
export declare const BlogSchema: import("mongoose").Schema<Blog, import("mongoose").Model<Blog, any, any, any, Document<unknown, any, Blog> & Blog & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Blog, Document<unknown, {}, import("mongoose").FlatRecord<Blog>> & import("mongoose").FlatRecord<Blog> & {
    _id: Types.ObjectId;
}>;
