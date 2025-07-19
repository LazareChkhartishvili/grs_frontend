import { Model } from 'mongoose';
import { Exercise, ExerciseDocument } from '../schemas/exercise.schema';
import { CreateExerciseDto } from './dto/create-exercise.dto';
export declare class ExerciseService {
    private exerciseModel;
    constructor(exerciseModel: Model<ExerciseDocument>);
    create(createExerciseDto: CreateExerciseDto): Promise<Exercise>;
    findAll(query?: {
        setId?: string;
        categoryId?: string;
        subCategoryId?: string;
    }): Promise<Exercise[]>;
    findOne(id: string): Promise<Exercise>;
    update(id: string, updateExerciseDto: Partial<CreateExerciseDto>): Promise<Exercise>;
    remove(id: string): Promise<void>;
    findBySet(setId: string): Promise<Exercise[]>;
    findByCategory(categoryId: string): Promise<Exercise[]>;
    findByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Promise<Exercise[]>;
}
