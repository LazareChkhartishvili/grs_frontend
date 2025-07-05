import { Model } from 'mongoose';
import { SetDocument } from '../schemas/set.schema';
export declare class SetService {
    private setModel;
    constructor(setModel: Model<SetDocument>);
    findAll(page?: number, limit?: number, filters?: any): Promise<{
        sets: SetDocument[];
        total: number;
        pages: number;
    }>;
    findById(id: string): Promise<SetDocument>;
    search(query: string, page?: number, limit?: number): Promise<{
        sets: SetDocument[];
        total: number;
        pages: number;
    }>;
    getFeaturedSets(): Promise<SetDocument[]>;
    findByCategory(categoryId: string): Promise<SetDocument[]>;
    findBySubcategory(subcategoryId: string): Promise<SetDocument[]>;
    findByDifficulty(difficulty: string): Promise<SetDocument[]>;
    findByGoals(goals: string[]): Promise<SetDocument[]>;
    create(setData: {
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
    }): Promise<SetDocument>;
    update(id: string, updateData: any): Promise<SetDocument>;
    delete(id: string): Promise<void>;
    addExercise(setId: string, exerciseData: {
        exerciseId: string;
        repetitions?: number;
        sets?: number;
        restTime?: number;
        duration?: number;
        notes?: string;
    }): Promise<SetDocument>;
    removeExercise(setId: string, exerciseId: string): Promise<SetDocument>;
    updateRating(setId: string, rating: number): Promise<SetDocument>;
}
