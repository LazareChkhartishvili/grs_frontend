import { ExerciseService } from './exercise.service';
export declare class ExerciseController {
    private readonly exerciseService;
    constructor(exerciseService: ExerciseService);
    create(files: Express.Multer.File[], data: any): Promise<import("../schemas/exercise.schema").Exercise>;
    findAll(query: {
        categoryId?: string;
        subCategoryId?: string;
    }): Promise<import("../schemas/exercise.schema").Exercise[]>;
    findBySet(setId: string): Promise<import("../schemas/exercise.schema").Exercise[]>;
    findByCategory(categoryId: string): Promise<import("../schemas/exercise.schema").Exercise[]>;
    findByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Promise<import("../schemas/exercise.schema").Exercise[]>;
    findOne(id: string): Promise<import("../schemas/exercise.schema").Exercise>;
    update(id: string, data: any, files: Express.Multer.File[]): Promise<import("../schemas/exercise.schema").Exercise>;
    remove(id: string): Promise<void>;
}
