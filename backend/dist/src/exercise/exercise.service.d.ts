import { Model } from 'mongoose';
import { Exercise, ExerciseDocument } from '../schemas/exercise.schema';
import { ExerciseComplexDocument } from '../schemas/exercise-complex.schema';
export declare class ExerciseService {
    private exerciseModel;
    private exerciseComplexModel;
    constructor(exerciseModel: Model<ExerciseDocument>, exerciseComplexModel: Model<ExerciseComplexDocument>);
    getAllExercises(): Promise<ExerciseDocument[]>;
    getExercisesByCategory(categoryId: string): Promise<ExerciseDocument[]>;
    getExercisesBySubcategory(subcategoryId: string): Promise<ExerciseDocument[]>;
    getExerciseById(exerciseId: string): Promise<ExerciseDocument>;
    createExercise(exerciseData: {
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
        imageData?: string;
        imageMimeType?: string;
        imageSize?: number;
        complexId?: string;
    }): Promise<{
        exercise: ExerciseDocument;
        complex?: ExerciseComplexDocument;
    }>;
    updateExercise(exerciseId: string, updateData: Partial<Exercise>): Promise<ExerciseDocument>;
    deleteExercise(exerciseId: string): Promise<void>;
    getExercisesByDifficulty(difficulty: string): Promise<ExerciseDocument[]>;
    searchExercises(searchTerm: string): Promise<ExerciseDocument[]>;
    getCategoriesWithExercises(): Promise<any[]>;
}
