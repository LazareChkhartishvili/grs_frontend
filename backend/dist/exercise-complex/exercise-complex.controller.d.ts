import { ExerciseComplexService } from './exercise-complex.service';
export declare class ExerciseComplexController {
    private readonly exerciseComplexService;
    constructor(exerciseComplexService: ExerciseComplexService);
    getAllComplexes(): unknown;
    getComplexById(id: string): unknown;
    getComplexByIdWithExercises(id: string): unknown;
    getComplexesBySubcategory(subcategoryId: string): unknown;
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
    }): unknown;
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
    }): unknown;
    deleteComplex(complexId: string): unknown;
    getFeaturedComplexes(): unknown;
    getComplexesByCategory(categoryId: string): unknown;
    getComplexesByPriceRange(minPrice: number, maxPrice: number): unknown;
    getComplexesByDifficulty(difficulty: string): unknown;
    getComplexesByStage(stage: string): unknown;
    getComplexesByTags(tagsParam: string): unknown;
    getCategoriesWithComplexes(): unknown;
    addExerciseToComplex(complexId: string, exerciseId: string): unknown;
    getComplexExercises(complexId: string): unknown;
    removeExerciseFromComplex(complexId: string, exerciseId: string): unknown;
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
    }): unknown;
}
