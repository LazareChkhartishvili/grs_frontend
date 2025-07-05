import { Document, Types } from 'mongoose';
export type SubCategoryDocument = SubCategory & Document;
export declare class Exercise {
    name: string;
    description?: string;
    duration?: number;
    difficulty?: string;
    instructions?: string;
    images?: string[];
    videos?: string[];
}
export declare class SubCategory {
    name: string;
    description?: string;
    image?: string;
    categoryId: Types.ObjectId;
    categoryCode?: string;
    isActive: boolean;
    exercises?: Exercise[];
    sortOrder: number;
}
export declare const SubCategorySchema: import("mongoose").Schema<SubCategory, import("mongoose").Model<SubCategory, any, any, any, Document<unknown, any, SubCategory, any> & SubCategory & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SubCategory, Document<unknown, {}, import("mongoose").FlatRecord<SubCategory>, {}> & import("mongoose").FlatRecord<SubCategory> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
