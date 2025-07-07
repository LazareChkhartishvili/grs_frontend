import { ExerciseComplexService } from './exercise-complex.service';
export declare class ExerciseComplexController {
    private readonly exerciseComplexService;
    constructor(exerciseComplexService: ExerciseComplexService);
    getAllComplexes(): Promise<any[]>;
    getComplexById(id: string): Promise<any>;
    getComplexByIdWithExercises(id: string): Promise<any>;
    getComplexesBySubcategory(subcategoryId: string): Promise<import("../schemas/exercise-complex.schema").ExerciseComplexDocument[]>;
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
    }): Promise<import("../schemas/exercise-complex.schema").ExerciseComplexDocument>;
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
    }): Promise<import("../schemas/exercise-complex.schema").ExerciseComplexDocument>;
    deleteComplex(complexId: string): Promise<{
        message: string;
    }>;
    getFeaturedComplexes(): Promise<import("../schemas/exercise-complex.schema").ExerciseComplexDocument[]>;
    getComplexesByCategory(categoryId: string): Promise<import("../schemas/exercise-complex.schema").ExerciseComplexDocument[]>;
    getComplexesByPriceRange(minPrice: number, maxPrice: number): Promise<import("../schemas/exercise-complex.schema").ExerciseComplexDocument[]>;
    getComplexesByDifficulty(difficulty: string): Promise<import("../schemas/exercise-complex.schema").ExerciseComplexDocument[]>;
    getComplexesByStage(stage: string): Promise<import("../schemas/exercise-complex.schema").ExerciseComplexDocument[]>;
    getComplexesByTags(tagsParam: string): Promise<import("../schemas/exercise-complex.schema").ExerciseComplexDocument[]>;
    getCategoriesWithComplexes(): Promise<any[]>;
    addExerciseToComplex(complexId: string, exerciseId: string): Promise<import("../schemas/exercise-complex.schema").ExerciseComplexDocument>;
    getComplexExercises(complexId: string): Promise<import("../schemas/exercise.schema").ExerciseDocument[]>;
    removeExerciseFromComplex(complexId: string, exerciseId: string): Promise<import("../schemas/exercise-complex.schema").ExerciseComplexDocument>;
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
        exercise: import("../schemas/exercise.schema").ExerciseDocument;
        complex: import("../schemas/exercise-complex.schema").ExerciseComplexDocument;
    }>;
}
