import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ExerciseComplexService } from './exercise-complex.service';

@Controller('complexes')
export class ExerciseComplexController {
  constructor(
    private readonly exerciseComplexService: ExerciseComplexService,
  ) {}

  // ყველა კომპლექსი
  @Get()
  async getAllComplexes() {
    return this.exerciseComplexService.getAllComplexes();
  }

  // კონკრეტული კომპლექსი ID-ით
  @Get(':id')
  async getComplexById(@Param('id') id: string) {
    return this.exerciseComplexService.getComplexById(id);
  }

  // კონკრეტული კომპლექსი სავარჯიშოებით
  @Get(':id/with-exercises')
  async getComplexByIdWithExercises(@Param('id') id: string) {
    return this.exerciseComplexService.getComplexByIdWithExercises(id);
  }

  // კომპლექსები სუბკატეგორიაში
  @Get('subcategory/:subcategoryId')
  async getComplexesBySubcategory(
    @Param('subcategoryId') subcategoryId: string,
  ) {
    return this.exerciseComplexService.getComplexesBySubcategory(subcategoryId);
  }

  // ახალი კომპლექსის შექმნა
  @Post()
  async createComplex(
    @Body()
    complexData: {
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
    },
  ) {
    return this.exerciseComplexService.createComplex(complexData);
  }

  // კომპლექსის განახლება
  @Put(':complexId')
  async updateComplex(
    @Param('complexId') complexId: string,
    @Body()
    updateData: {
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
    },
  ) {
    return this.exerciseComplexService.updateComplex(complexId, updateData);
  }

  // კომპლექსის წაშლა (soft delete)
  @Delete(':complexId')
  async deleteComplex(@Param('complexId') complexId: string) {
    await this.exerciseComplexService.deleteComplex(complexId);
    return { message: 'კომპლექსი წარმატებით წაიშალა' };
  }

  // Featured კომპლექსები (GHRS მსგავსად: Featured Exercises)
  @Get('featured/list')
  async getFeaturedComplexes() {
    return this.exerciseComplexService.getFeaturedComplexes();
  }

  // კატეგორიის კომპლექსები (GHRS მსგავსად: Orthopedics)
  @Get('category/:categoryId')
  async getComplexesByCategory(@Param('categoryId') categoryId: string) {
    return this.exerciseComplexService.getComplexesByCategory(categoryId);
  }

  // ფასის რანჯის მიხედვით
  @Get('price-range/:minPrice/:maxPrice')
  async getComplexesByPriceRange(
    @Param('minPrice') minPrice: number,
    @Param('maxPrice') maxPrice: number,
  ) {
    return this.exerciseComplexService.getComplexesByPriceRange(
      minPrice,
      maxPrice,
    );
  }

  // სირთულის მიხედვით (easy, medium, hard)
  @Get('difficulty/:difficulty')
  async getComplexesByDifficulty(@Param('difficulty') difficulty: string) {
    return this.exerciseComplexService.getComplexesByDifficulty(difficulty);
  }

  // ეტაპის მიხედვით (initial, mid, advanced)
  @Get('stage/:stage')
  async getComplexesByStage(@Param('stage') stage: string) {
    return this.exerciseComplexService.getComplexesByStage(stage);
  }

  // ტაგების მიხედვით (rehabilitation, post-stroke, stretching...)
  @Get('tags/:tags')
  async getComplexesByTags(@Param('tags') tagsParam: string) {
    const tags = tagsParam.split(',');
    return this.exerciseComplexService.getComplexesByTags(tags);
  }

  // კატეგორიები თავიანთი კომპლექსებით
  @Get('by-categories/grouped')
  async getCategoriesWithComplexes() {
    return this.exerciseComplexService.getCategoriesWithComplexes();
  }

  // კომპლექსში სავარჯიშოს დამატება
  @Post(':id/exercises/:exerciseId')
  async addExerciseToComplex(
    @Param('id') complexId: string,
    @Param('exerciseId') exerciseId: string,
  ) {
    return this.exerciseComplexService.addExerciseToComplex(
      complexId,
      exerciseId,
    );
  }

  // კომპლექსის სავარჯიშოების მიღება
  @Get(':id/exercises')
  async getComplexExercises(@Param('id') complexId: string) {
    return this.exerciseComplexService.getComplexExercises(complexId);
  }

  // კომპლექსიდან სავარჯიშოს წაშლა
  @Delete(':id/exercises/:exerciseId')
  async removeExerciseFromComplex(
    @Param('id') complexId: string,
    @Param('exerciseId') exerciseId: string,
  ) {
    return this.exerciseComplexService.removeExerciseFromComplex(
      complexId,
      exerciseId,
    );
  }

  // კომპლექსში ახალი სავარჯიშოს შექმნა და დამატება
  @Post(':id/exercises')
  async createAndAddExerciseToComplex(
    @Param('id') complexId: string,
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
    },
  ) {
    return this.exerciseComplexService.createAndAddExerciseToComplex(
      complexId,
      exerciseData,
    );
  }
}
