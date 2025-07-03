import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { SubCategoryService } from './subcategory.service';

@Controller('subcategories')
export class SubCategoryController {
  constructor(private readonly subcategoryService: SubCategoryService) {}

  // ყველა სუბკატეგორიის მიღება
  @Get()
  async getAllSubCategories() {
    return this.subcategoryService.getAllSubCategories();
  }

  // კონკრეტული სუბკატეგორიის მიღება
  @Get(':id')
  async getSubCategoryById(@Param('id') subcategoryId: string) {
    return this.subcategoryService.getSubCategoryById(subcategoryId);
  }

  // კონკრეტული კატეგორიის სუბკატეგორიები
  @Get('category/:categoryId')
  async getSubCategoriesByCategory(@Param('categoryId') categoryId: string) {
    return this.subcategoryService.getSubCategoriesByCategory(categoryId);
  }

  // კონკრეტული კატეგორიის სუბკატეგორიები dropdown-ისთვის
  @Get('category/:categoryId/dropdown')
  async getSubCategoriesDropdown(@Param('categoryId') categoryId: string) {
    const subcategories =
      await this.subcategoryService.getSubCategoriesByCategory(categoryId);
    return subcategories.map((sub) => ({
      id: String(sub._id),
      name: sub.name,
      categoryId: String(sub.categoryId),
    }));
  }

  // კატეგორიები სუბკატეგორიებით
  @Get('with-categories')
  async getCategoriesWithSubCategories() {
    return this.subcategoryService.getCategoriesWithSubCategories();
  }

  // სუბკატეგორიის შექმნა
  @Post()
  async createSubCategory(
    @Body()
    subcategoryData: {
      name: string;
      description?: string;
      image?: string;
      categoryId: string;
      exercises?: any[];
    },
  ) {
    return this.subcategoryService.createSubCategory(subcategoryData);
  }

  // სუბკატეგორიის განახლება
  @Put(':id')
  async updateSubCategory(
    @Param('id') subcategoryId: string,
    @Body() updateData: any,
  ) {
    return this.subcategoryService.updateSubCategory(subcategoryId, updateData);
  }

  // სუბკატეგორიის წაშლა
  @Delete(':id')
  async deleteSubCategory(@Param('id') subcategoryId: string) {
    await this.subcategoryService.deleteSubCategory(subcategoryId);
    return { message: 'სუბკატეგორია წარმატებით წაიშალა' };
  }

  // სუბკატეგორიაში სავარჯიშოს დამატება
  @Post(':id/exercises')
  async addExerciseToSubCategory(
    @Param('id') subcategoryId: string,
    @Body()
    exercise: {
      name: string;
      description?: string;
      duration?: number;
      difficulty?: string;
      instructions?: string;
      images?: string[];
      videos?: string[];
    },
  ) {
    return this.subcategoryService.addExerciseToSubCategory(
      subcategoryId,
      exercise,
    );
  }
}
