import { Document, Types } from 'mongoose';
export type ExerciseDocument = Exercise & Document;
interface LocalizedString {
    ka: string;
    en: string;
    ru: string;
}
export declare class Exercise {
    name: LocalizedString;
    description: LocalizedString;
    recommendations: LocalizedString;
    videoUrl: string;
    thumbnailUrl: string;
    videoDuration: string;
    duration: string;
    difficulty: 'easy' | 'medium' | 'hard';
    repetitions: string;
    sets: string;
    restTime: string;
    isActive: boolean;
    isPublished: boolean;
    sortOrder: number;
    setId: Types.ObjectId;
    categoryId: Types.ObjectId;
    subCategoryId?: Types.ObjectId;
}
export declare const ExerciseSchema: import("mongoose").Schema<Exercise, import("mongoose").Model<Exercise, any, any, any, Document<unknown, any, Exercise> & Exercise & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Exercise, Document<unknown, {}, import("mongoose").FlatRecord<Exercise>> & import("mongoose").FlatRecord<Exercise> & {
    _id: Types.ObjectId;
}>;
export {};
