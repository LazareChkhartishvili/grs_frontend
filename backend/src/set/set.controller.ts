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
import { SetService } from './set.service';

@Controller('sets')
export class SetController {
  constructor(private readonly setService: SetService) {}

  // ყველა სეტის მიღება pagination-ით
  @Get()
  async getAllSets(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('category') categoryId?: string,
    @Query('subcategory') subcategoryId?: string,
    @Query('difficulty') difficulty?: string,
    @Query('level') level?: string,
    @Query('public') isPublic?: string,
  ) {
    const filters: Record<string, any> = {};
    if (categoryId) filters.categoryId = categoryId;
    if (subcategoryId) filters.subcategoryId = subcategoryId;
    if (difficulty) filters.difficulty = difficulty;
    if (level) filters.level = level;
    if (isPublic) filters.isPublic = isPublic === 'true';

    return this.setService.findAll(parseInt(page), parseInt(limit), filters);
  }

  // სეტების ძიება
  @Get('search')
  async searchSets(
    @Query('q') query: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    if (!query) {
      return { sets: [], total: 0, pages: 0 };
    }
    return this.setService.search(query, parseInt(page), parseInt(limit));
  }

  // რჩეული სეტები
  @Get('featured')
  async getFeaturedSets() {
    return this.setService.getFeaturedSets();
  }

  // კატეგორიის სეტები
  @Get('category/:categoryId')
  async getSetsByCategory(@Param('categoryId') categoryId: string) {
    return this.setService.findByCategory(categoryId);
  }

  // სუბკატეგორიის სეტები
  @Get('subcategory/:subcategoryId')
  async getSetsBySubcategory(@Param('subcategoryId') subcategoryId: string) {
    return this.setService.findBySubcategory(subcategoryId);
  }

  // სირთულის მიხედვით სეტები
  @Get('difficulty/:difficulty')
  async getSetsByDifficulty(@Param('difficulty') difficulty: string) {
    return this.setService.findByDifficulty(difficulty);
  }

  // მიზნების მიხედვით სეტები
  @Get('goals')
  async getSetsByGoals(@Query('goals') goals: string) {
    const goalsArray = goals.split(',');
    return this.setService.findByGoals(goalsArray);
  }

  // კონკრეტული სეტის მიღება
  @Get(':id')
  async getSetById(@Param('id') id: string) {
    return this.setService.findById(id);
  }

  // ახალი სეტის შექმნა
  @Post()
  async createSet(
    @Body()
    setData: {
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
      ageGroup?: { minAge: number; maxAge: number };
      targetGender?: string;
      suitableConditions?: string[];
      contraindicatedConditions?: string[];
    },
  ) {
    return this.setService.create(setData);
  }

  // სეტის განახლება
  @Put(':id')
  async updateSet(@Param('id') id: string, @Body() updateData: any) {
    return this.setService.update(id, updateData);
  }

  // სეტის წაშლა
  @Delete(':id')
  async deleteSet(@Param('id') id: string) {
    await this.setService.delete(id);
    return { message: 'სეტი წარმატებით წაიშალა' };
  }

  // სეტში სავარჯიშოს დამატება
  @Post(':id/exercises')
  async addExerciseToSet(
    @Param('id') setId: string,
    @Body()
    exerciseData: {
      exerciseId: string;
      repetitions?: number;
      sets?: number;
      restTime?: number;
      duration?: number;
      notes?: string;
    },
  ) {
    return this.setService.addExercise(setId, exerciseData);
  }

  // სეტიდან სავარჯიშოს წაშლა
  @Delete(':setId/exercises/:exerciseId')
  async removeExerciseFromSet(
    @Param('setId') setId: string,
    @Param('exerciseId') exerciseId: string,
  ) {
    await this.setService.removeExercise(setId, exerciseId);
    return { message: 'სავარჯიშო სეტიდან წაიშალა' };
  }

  // სეტის შეფასება
  @Post(':id/rating')
  async rateSet(
    @Param('id') setId: string,
    @Body() data: { rating: number },
  ) {
    if (data.rating < 1 || data.rating > 5) {
      throw new Error('Rating უნდა იყოს 1-დან 5-მდე');
    }
    return this.setService.updateRating(setId, data.rating);
  }
} 