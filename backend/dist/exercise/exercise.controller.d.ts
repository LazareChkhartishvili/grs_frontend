import { ExerciseService } from './exercise.service';
export declare class ExerciseController {
    private readonly exerciseService;
    constructor(exerciseService: ExerciseService);
    getAllExercises(): Promise<import("../schemas/exercise.schema").ExerciseDocument[]>;
    getExerciseById(id: string): Promise<import("../schemas/exercise.schema").ExerciseDocument>;
    getExercisesByCategory(categoryId: string): Promise<import("../schemas/exercise.schema").ExerciseDocument[]>;
    getExercisesBySubcategory(subcategoryId: string): Promise<import("../schemas/exercise.schema").ExerciseDocument[]>;
    getExercisesByDifficulty(difficulty: string): Promise<import("../schemas/exercise.schema").ExerciseDocument[]>;
    searchExercises(searchTerm: string): Promise<import("../schemas/exercise.schema").ExerciseDocument[]>;
    getCategoriesWithExercises(): Promise<any[]>;
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
        exercise: import("../schemas/exercise.schema").ExerciseDocument;
        complex?: import("../schemas/exercise-complex.schema").ExerciseComplexDocument;
    }>;
    updateExercise(id: string, updateData: {
        name?: string;
        description?: string;
        duration?: number;
        difficulty?: string;
        instructions?: string;
        images?: string[];
        videos?: string[];
        repetitions?: number;
        sets?: number;
        restTime?: number;
        calories?: number;
        imageData?: string;
        imageMimeType?: string;
        imageSize?: number;
    }): Promise<import("../schemas/exercise.schema").ExerciseDocument>;
    deleteExercise(id: string): Promise<{
        message: string;
    }>;
}
