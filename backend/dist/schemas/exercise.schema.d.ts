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
export declare const ExerciseSchema: any;
