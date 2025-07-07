import { Document, Types } from 'mongoose';
export type SetDocument = Set & Document;
interface Exercise {
    repetitions: number;
    sets: number;
    restTime: number;
    duration: number;
    order: number;
    videoId?: Types.ObjectId;
}
export declare class Set {
    name: string;
    description: string;
    monthlyPrice: number;
    categoryId: Types.ObjectId;
    subcategoryId: Types.ObjectId;
    setNumber: string;
    isActive: boolean;
    sortOrder: number;
    exercises: Exercise[];
    subscriptionPlans: {
        period: number;
        price: number;
    }[];
    totalCalories: number;
    tags: string[];
    targetMuscles: string[];
    equipment: string[];
    isPublic: boolean;
    isFeatured: boolean;
    usageCount: number;
    rating: number;
    reviewsCount: number;
    relatedSets: Types.ObjectId[];
    prerequisites: Types.ObjectId[];
    goals: string[];
    targetGender: string;
    suitableConditions: string[];
    contraindicatedConditions: string[];
    totalDuration: number;
    difficulty: string;
    level: string;
    schedule: {
        day: number;
        time: string;
    }[];
}
export declare const SetSchema: import("mongoose").Schema<Set, import("mongoose").Model<Set, any, any, any, Document<unknown, any, Set> & Set & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Set, Document<unknown, {}, import("mongoose").FlatRecord<Set>> & import("mongoose").FlatRecord<Set> & {
    _id: Types.ObjectId;
}>;
export {};
