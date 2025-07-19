import { Document, Types } from 'mongoose';
export type CategoryDocument = Category & Document;
interface LocalizedString {
    ka: string;
    en: string;
    ru: string;
}
export declare class Category {
    name: LocalizedString;
    description?: LocalizedString;
    image?: string;
    subcategories?: Types.ObjectId[];
    sets?: Types.ObjectId[];
    isActive: boolean;
    sortOrder: number;
    isPublished: boolean;
}
export declare const CategorySchema: import("mongoose").Schema<Category, import("mongoose").Model<Category, any, any, any, Document<unknown, any, Category> & Category & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Category, Document<unknown, {}, import("mongoose").FlatRecord<Category>> & import("mongoose").FlatRecord<Category> & {
    _id: Types.ObjectId;
}>;
export {};
