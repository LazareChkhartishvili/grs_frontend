import { Model } from 'mongoose';
import { ExerciseComplexDocument } from '../schemas/exercise-complex.schema';
import { ExerciseDocument } from '../schemas/exercise.schema';
export declare class ExerciseComplexService {
    private exerciseComplexModel;
    private exerciseModel;
    constructor(exerciseComplexModel: Model<ExerciseComplexDocument>, exerciseModel: Model<ExerciseDocument>);
    getAllComplexes(): Promise<any[]>;
    getComplexById(complexId: string): Promise<any>;
    getComplexByIdWithExercises(complexId: string): Promise<any>;
    getComplexesByCategory(categoryId: string): Promise<ExerciseComplexDocument[]>;
    getComplexesBySubcategory(subcategoryId: string): Promise<ExerciseComplexDocument[]>;
    getComplexesByPriceRange(minPrice: number, maxPrice: number): Promise<ExerciseComplexDocument[]>;
    getComplexesByDifficulty(difficulty: string): Promise<ExerciseComplexDocument[]>;
    getComplexesByStage(stage: string): Promise<ExerciseComplexDocument[]>;
    getComplexesByTags(tags: string[]): Promise<ExerciseComplexDocument[]>;
    createComplex(complexData: {
        subcategoryId: string;
        name: string;
        description?: string;
        image?: string;
        difficulty?: 'easy' | 'medium' | 'hard';
        stage?: 'initial' | 'mid' | 'advanced';
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
        relatedComplexes?: string[];
    }): Promise<ExerciseComplexDocument>;
    updateComplex(complexId: string, updateData: {
        subcategoryId?: string;
        name?: string;
        description?: string;
        image?: string;
        difficulty?: 'easy' | 'medium' | 'hard';
        stage?: 'initial' | 'mid' | 'advanced';
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
        relatedComplexes?: string[];
    }): Promise<ExerciseComplexDocument>;
    deleteComplex(complexId: string): Promise<void>;
    getFeaturedComplexes(): Promise<ExerciseComplexDocument[]>;
    getCategoriesWithComplexes(): Promise<any[]>;
    addExerciseToComplex(complexId: string, exerciseId: string): Promise<ExerciseComplexDocument>;
    getComplexExercises(complexId: string): Promise<ExerciseDocument[]>;
    removeExerciseFromComplex(complexId: string, exerciseId: string): Promise<ExerciseComplexDocument>;
    createAndAddExerciseToComplex(complexId: string, exerciseData: {
        name: string;
        description?: string;
        duration?: number;
        difficulty?: string;
        instructions?: string;
        images?: string[];
        videos?: string[];
        categoryId: string;
        subcategoryId?: string;
        repetitions?: number;
        sets?: number;
        restTime?: number;
        calories?: number;
    }): Promise<{
        exercise: ExerciseDocument;
        complex: ExerciseComplexDocument;
    }>;
}
