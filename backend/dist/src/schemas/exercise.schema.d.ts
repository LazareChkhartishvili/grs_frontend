import { Document, Types } from 'mongoose';
export type ExerciseDocument = Exercise & Document;
export declare class Exercise {
    name: string;
    description?: string;
    duration?: number;
    difficulty: string;
    instructions?: string;
    images?: string[];
    videos?: string[];
    categoryId: Types.ObjectId;
    subcategoryId?: Types.ObjectId;
    imageData?: string;
    imageMimeType?: string;
    imageSize?: number;
    isActive: boolean;
    sortOrder: number;
    repetitions?: number;
    sets?: number;
    restTime?: number;
    calories?: number;
}
export declare const ExerciseSchema: import("mongoose").Schema<Exercise, import("mongoose").Model<Exercise, any, any, any, Document<unknown, any, Exercise> & Exercise & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Exercise, Document<unknown, {}, import("mongoose").FlatRecord<Exercise>> & import("mongoose").FlatRecord<Exercise> & {
    _id: Types.ObjectId;
}>;
