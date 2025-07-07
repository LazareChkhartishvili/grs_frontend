import { SetService } from './set.service';
export declare class SetController {
    private readonly setService;
    constructor(setService: SetService);
    getAllSets(page?: string, limit?: string, categoryId?: string, subcategoryId?: string, difficulty?: string, level?: string, isPublic?: string): Promise<{
        sets: import("../schemas/set.schema").SetDocument[];
        total: number;
        pages: number;
    }>;
    searchSets(query: string, page?: string, limit?: string): Promise<{
        sets: import("../schemas/set.schema").SetDocument[];
        total: number;
        pages: number;
    }>;
    getFeaturedSets(): Promise<import("../schemas/set.schema").SetDocument[]>;
    getSetsByCategory(categoryId: string): Promise<import("../schemas/set.schema").SetDocument[]>;
    getSetsBySubcategory(subcategoryId: string): Promise<import("../schemas/set.schema").SetDocument[]>;
    getSetsByDifficulty(difficulty: string): Promise<import("../schemas/set.schema").SetDocument[]>;
    getSetsByGoals(goals: string): Promise<import("../schemas/set.schema").SetDocument[]>;
    getSetById(id: string): Promise<import("../schemas/set.schema").SetDocument>;
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
    }): Promise<import("../schemas/set.schema").SetDocument>;
    updateSet(id: string, updateData: any): Promise<import("../schemas/set.schema").SetDocument>;
    deleteSet(id: string): Promise<{
        message: string;
    }>;
    addExerciseToSet(setId: string, exerciseData: {
        exerciseId: string;
        repetitions?: number;
        sets?: number;
        restTime?: number;
        duration?: number;
        notes?: string;
    }): Promise<import("../schemas/set.schema").SetDocument>;
    removeExerciseFromSet(setId: string, exerciseId: string): Promise<{
        message: string;
    }>;
    rateSet(setId: string, data: {
        rating: number;
    }): Promise<import("../schemas/set.schema").SetDocument>;
}
