import { Document, Types } from 'mongoose';
export type SetDocument = Set & Document;
interface LocalizedString {
    ka: string;
    en: string;
    ru: string;
}
interface Level {
    exerciseCount: number;
    isLocked: boolean;
}
interface Price {
    monthly: number;
    threeMonths: number;
    sixMonths: number;
    yearly: number;
}
interface Levels {
    beginner: Level;
    intermediate: Level;
    advanced: Level;
}
export declare class Set {
    name: LocalizedString;
    description: LocalizedString;
    thumbnailImage: string;
    totalExercises: number;
    totalDuration: string;
    difficultyLevels: number;
    levels: Levels;
    price: Price;
    isActive: boolean;
    isPublished: boolean;
    sortOrder: number;
    categoryId: Types.ObjectId;
    subCategoryId?: Types.ObjectId;
}
export declare const SetSchema: import("mongoose").Schema<Set, import("mongoose").Model<Set, any, any, any, Document<unknown, any, Set> & Set & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Set, Document<unknown, {}, import("mongoose").FlatRecord<Set>> & import("mongoose").FlatRecord<Set> & {
    _id: Types.ObjectId;
}>;
export {};
