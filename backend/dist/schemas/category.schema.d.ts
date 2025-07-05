import { Document, Types } from 'mongoose';
export type CategoryDocument = Category & Document;
export declare class Exercise {
    name: string;
    description?: string;
    duration?: number;
    difficulty?: string;
    instructions?: string;
    images?: string[];
    videos?: string[];
}
export declare class Category {
    name: string;
    description?: string;
    image?: string;
    code?: string;
    parentId?: Types.ObjectId;
    level: number;
    isActive: boolean;
    exercises?: Exercise[];
    sortOrder: number;
}
export declare const CategorySchema: any;
