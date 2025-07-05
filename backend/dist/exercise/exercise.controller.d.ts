import { ExerciseService } from './exercise.service';
export declare class ExerciseController {
    private readonly exerciseService;
    constructor(exerciseService: ExerciseService);
    getAllExercises(): unknown;
    getExerciseById(id: string): unknown;
    getExercisesByCategory(categoryId: string): unknown;
    getExercisesBySubcategory(subcategoryId: string): unknown;
    getExercisesByDifficulty(difficulty: string): unknown;
    searchExercises(searchTerm: string): unknown;
    getCategoriesWithExercises(): unknown;
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
    }): unknown;
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
    }): unknown;
    deleteExercise(id: string): unknown;
}
