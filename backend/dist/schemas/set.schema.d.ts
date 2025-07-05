import { Document, Types } from 'mongoose';
export type SetDocument = Set & Document;
export declare class SetExercise {
    exerciseId: Types.ObjectId;
    repetitions: number;
    sets: number;
    restTime: number;
    duration: number;
    notes?: string;
    order: number;
}
export declare class Set {
    name: string;
    description?: string;
    image?: string;
    categoryId: Types.ObjectId;
    subcategoryId?: Types.ObjectId;
    exercises: SetExercise[];
    totalDuration: number;
    totalCalories: number;
    difficulty: string;
    level: string;
    tags?: string[];
    targetMuscles?: string[];
    equipment?: string[];
    warmupInstructions?: string;
    cooldownInstructions?: string;
    generalNotes?: string;
    createdBy?: Types.ObjectId;
    isActive: boolean;
    isPublic: boolean;
    isFeatured: boolean;
    usageCount: number;
    rating: number;
    reviewsCount: number;
    sortOrder: number;
    schedule?: {
        dayOfWeek: number;
        timeOfDay: string;
        isRecommended: boolean;
    }[];
    relatedSets?: Types.ObjectId[];
    prerequisites?: Types.ObjectId[];
    goals?: string[];
    ageGroup?: {
        minAge: number;
        maxAge: number;
    };
    targetGender: string;
    suitableConditions?: string[];
    contraindicatedConditions?: string[];
}
export declare const SetSchema: import("mongoose").Schema<Set, import("mongoose").Model<Set, any, any, any, Document<unknown, any, Set> & Set & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Set, Document<unknown, {}, import("mongoose").FlatRecord<Set>> & import("mongoose").FlatRecord<Set> & {
    _id: Types.ObjectId;
}>;
