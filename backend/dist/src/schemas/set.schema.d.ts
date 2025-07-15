import { Document, Types } from 'mongoose';
export type SetDocument = Set & Document;
interface Exercise {
    _id: Types.ObjectId;
    videoId: Types.ObjectId;
    repetitions: number;
    sets: number;
    restTime: number;
    duration: number;
    order: number;
}
export declare class Set {
    _id: Types.ObjectId;
    setId: string;
    name: string;
    title: {
        ka: string;
        en: string;
        ru: string;
    };
    description?: {
        ka?: string;
        en?: string;
        ru?: string;
    };
    videos: Types.ObjectId[];
    exercises: Exercise[];
    categoryId: Types.ObjectId;
    subcategoryId?: Types.ObjectId;
    isActive: boolean;
    sortOrder: number;
    isPublic: boolean;
    viewCount: number;
    monthlyPrice: number;
}
export declare const SetSchema: import("mongoose").Schema<Set, import("mongoose").Model<Set, any, any, any, Document<unknown, any, Set> & Set & Required<{
    _id: Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Set, Document<unknown, {}, import("mongoose").FlatRecord<Set>> & import("mongoose").FlatRecord<Set> & Required<{
    _id: Types.ObjectId;
}>>;
export {};
