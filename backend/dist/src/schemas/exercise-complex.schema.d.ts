import { Document, Types } from 'mongoose';
export type ExerciseComplexDocument = ExerciseComplex & Document;
export declare class ExerciseComplex {
    name: string;
    description?: string;
    image?: string;
    categoryId: Types.ObjectId;
    subcategoryId?: Types.ObjectId;
    exerciseIds: Types.ObjectId[];
    totalDuration?: number;
    exerciseCount: number;
    difficulty: string;
    stage: string;
    requiredEquipment?: string[];
    generalInstructions?: string;
    breathingGuidelines?: string;
    recommendedFrequency?: string;
    targetCondition?: string;
    price?: number;
    subscriptionPeriods?: {
        oneMonth?: number;
        threeMonths?: number;
        sixMonths?: number;
    };
    demoVideoUrl?: string;
    relatedComplexes?: Types.ObjectId[];
    discount?: number;
    isActive: boolean;
    sortOrder: number;
    tags?: string[];
    instructorNotes?: string;
    subscriptionOptions?: {
        duration: number;
        price: number;
        discount: number;
    }[];
}
export declare const ExerciseComplexSchema: import("mongoose").Schema<ExerciseComplex, import("mongoose").Model<ExerciseComplex, any, any, any, Document<unknown, any, ExerciseComplex> & ExerciseComplex & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ExerciseComplex, Document<unknown, {}, import("mongoose").FlatRecord<ExerciseComplex>> & import("mongoose").FlatRecord<ExerciseComplex> & {
    _id: Types.ObjectId;
}>;
