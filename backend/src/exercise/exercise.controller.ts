import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  // ყველა სავარჯიშო
  @Get()
  async getAllExercises() {
    return this.exerciseService.getAllExercises();
  }

  // კონკრეტული სავარჯიშო ID-ით
  @Get(':id')
  async getExerciseById(@Param('id') id: string) {
    return this.exerciseService.getExerciseById(id);
  }

  // კატეგორიის სავარჯიშოები (GHRS მსგავსად: Orthopedics, Neurology...)
  @Get('category/:categoryId')
  async getExercisesByCategory(@Param('categoryId') categoryId: string) {
    return this.exerciseService.getExercisesByCategory(categoryId);
  }

  @Get('subcategory/:subcategoryId')
  async getExercisesBySubcategory(
    @Param('subcategoryId') subcategoryId: string,
  ) {
    return this.exerciseService.getExercisesBySubcategory(subcategoryId);
  }

  // სირთულის მიხედვით (easy, medium, hard)
  @Get('difficulty/:difficulty')
  async getExercisesByDifficulty(@Param('difficulty') difficulty: string) {
    return this.exerciseService.getExercisesByDifficulty(difficulty);
  }

  // ძიება სახელით/აღწერით
  @Get('search/:searchTerm')
  async searchExercises(@Param('searchTerm') searchTerm: string) {
    return this.exerciseService.searchExercises(searchTerm);
  }

  // კატეგორიები თავიანთი სავარჯიშოებით (GHRS Featured Exercises მსგავსად)
  @Get('by-categories/grouped')
  async getCategoriesWithExercises() {
    return this.exerciseService.getCategoriesWithExercises();
  }

  // ახალი სავარჯიშოს შექმნა (და კომპლექსში დამატება თუ complexId მოცემულია)
  @Post()
  async createExercise(
    @Body()
    exerciseData: {
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
      complexId?: string; // კომპლექსის ID (არასავალდებულო)
    },
  ) {
    return this.exerciseService.createExercise(exerciseData);
  }

  // სავარჯიშოს განახლება
  @Put(':id')
  async updateExercise(
    @Param('id') id: string,
    @Body()
    updateData: {
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
    },
  ) {
    return this.exerciseService.updateExercise(id, updateData);
  }

  // სავარჯიშოს წაშლა (soft delete)
  @Delete(':id')
  async deleteExercise(@Param('id') id: string) {
    await this.exerciseService.deleteExercise(id);
    return { message: 'სავარჯიშო წარმატებით წაიშალა' };
  }
}
