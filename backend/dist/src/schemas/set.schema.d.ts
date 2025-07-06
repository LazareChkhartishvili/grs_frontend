import { Document, Types } from 'mongoose';
export type SetDocument = Set & Document;
export declare class Set {
    name: string;
    description: string;
    price: number;
    categoryId: Types.ObjectId;
    subcategoryId: Types.ObjectId;
    setNumber: string;
    isActive: boolean;
    sortOrder: number;
    videos: Types.ObjectId[];
    subscriptionPlans: {
        period: number;
        price: number;
    }[];
}
export declare const SetSchema: import("mongoose").Schema<Set, import("mongoose").Model<Set, any, any, any, Document<unknown, any, Set> & Set & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Set, Document<unknown, {}, import("mongoose").FlatRecord<Set>> & import("mongoose").FlatRecord<Set> & {
    _id: Types.ObjectId;
}>;
