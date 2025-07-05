import { SetService } from './set.service';
export declare class SetController {
    private readonly setService;
    constructor(setService: SetService);
    getAllSets(page?: string, limit?: string, categoryId?: string, subcategoryId?: string, difficulty?: string, level?: string, isPublic?: string): unknown;
    searchSets(query: string, page?: string, limit?: string): unknown;
    getFeaturedSets(): unknown;
    getSetsByCategory(categoryId: string): unknown;
    getSetsBySubcategory(subcategoryId: string): unknown;
    getSetsByDifficulty(difficulty: string): unknown;
    getSetsByGoals(goals: string): unknown;
    getSetById(id: string): unknown;
    createSet(setData: {
        name: string;
        description?: string;
        image?: string;
        categoryId: string;
        subcategoryId?: string;
        exercises?: Array<{
            exerciseId: string;
            repetitions?: number;
            sets?: number;
            restTime?: number;
            duration?: number;
            notes?: string;
            order?: number;
        }>;
        difficulty?: string;
        level?: string;
        tags?: string[];
        targetMuscles?: string[];
        equipment?: string[];
        warmupInstructions?: string;
        cooldownInstructions?: string;
        generalNotes?: string;
        createdBy?: string;
        isPublic?: boolean;
        goals?: string[];
        ageGroup?: {
            minAge: number;
            maxAge: number;
        };
        targetGender?: string;
        suitableConditions?: string[];
        contraindicatedConditions?: string[];
    }): unknown;
    updateSet(id: string, updateData: any): unknown;
    deleteSet(id: string): unknown;
    addExerciseToSet(setId: string, exerciseData: {
        exerciseId: string;
        repetitions?: number;
        sets?: number;
        restTime?: number;
        duration?: number;
        notes?: string;
    }): unknown;
    removeExerciseFromSet(setId: string, exerciseId: string): unknown;
    rateSet(setId: string, data: {
        rating: number;
    }): unknown;
}
