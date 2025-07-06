import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CategoryService } from './category.service';
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  // ყველა ძირითადი კატეგორია სუბკატეგორიებით
  @Get()
  async getMainCategories() {
    return this.categoryService.getCategoriesWithSubcategories();
  }
  // მხოლოდ ძირითადი კატეგორიები (სუბკატეგორიების გარეშე)
  @Get('main-only')
  async getMainCategoriesOnly() {
    return this.categoryService.getMainCategories();
  }
  // ყველა კატეგორია სუბკატეგორიებით (ძველი endpoint)
  @Get('with-subcategories')
  async getCategoriesWithSubcategories() {
    return this.categoryService.getCategoriesWithSubcategories();
  }
  // სრული იერარქია
  @Get('hierarchy')
  async getFullHierarchy() {
    return this.categoryService.getFullHierarchy();
  }
  // ყველა სუბკატეგორია (parentId არა null)
  @Get('subcategories')
  async getAllSubcategories() {
    return this.categoryService.getAllSubcategories();
  }
  // კონკრეტული კატეგორიის წამოღება
  @Get(':id')
  async getCategoryById(@Param('id') categoryId: string) {
    return this.categoryService.getCategoryById(categoryId);
  }
  // კონკრეტული კატეგორიის ქვეკატეგორიები
  @Get(':id/subcategories')
  async getSubCategories(@Param('id') parentId: string) {
    return this.categoryService.getSubCategories(parentId);
  }
  // კატეგორია ქვეკატეგორიებით
  @Get(':id/with-children')
  async getCategoryWithChildren(@Param('id') categoryId: string) {
    return this.categoryService.getCategoryWithChildren(categoryId);
  }
  // კატეგორიის შექმნა (ძირითადი)
  @Post()
  async createCategory(
    @Body()
    categoryData: {
      name: string;
      description?: string;
      image?: string;
      parentId?: string;
      exercises?: any[];
    },
  ) {
    return this.categoryService.createCategory(categoryData);
  }
  // სუბკატეგორიის შექმნა (კონკრეტული კატეგორიისთვის)
  @Post(':id/subcategories')
  async createSubcategory(
    @Param('id') parentId: string,
    @Body()
    subcategoryData: {
      name: string;
      description?: string;
      image?: string;
      exercises?: any[];
    },
  ) {
    return this.categoryService.createCategory({
      ...subcategoryData,
      parentId,
    });
  }
  // კატეგორიის განახლება
  @Put(':id')
  async updateCategory(
    @Param('id') categoryId: string,
    @Body() updateData: any,
  ) {
    return this.categoryService.updateCategory(categoryId, updateData);
  }
  // კატეგორიის წაშლა
  @Delete(':id')
  async deleteCategory(@Param('id') categoryId: string) {
    await this.categoryService.deleteCategory(categoryId);
    return { message: 'კატეგორია წარმატებით წაიშალა' };
  }
  // კატეგორიაში სავარჯიშოს დამატება
  @Post(':id/exercises')
  async addExerciseToCategory(
    @Param('id') categoryId: string,
    @Body()
    exercise: {
      name: string;
      description?: string;
      duration?: number;
      difficulty: string;
      instructions?: string;
      images?: string[];
      videos?: string[];
      categoryId: string;
    },
  ) {
    return this.categoryService.addExerciseToCategory(categoryId, exercise);
  }
  // ყველა კატეგორიისა და სუბკატეგორიის წაშლა (მხოლოდ დეველოპმენტისთვის)
  @Delete('all')
  async deleteAllCategoriesAndSubcategories() {
    return this.categoryService.deleteAllCategoriesAndSubcategories();
  }
  @Get(':id/exercises-and-complexes')
  async getCategoryExercisesAndComplexes(@Param('id') id: string) {
    return this.categoryService.getCategoryExercisesAndComplexes(id);
  }
}
// course-categories controller
@Controller('course-categories')
export class CourseCategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  // GET /course-categories - კურსების კატეგორიების მიღება
  @Get()
  async getCourseCategories() {
    return this.categoryService.getMainCategories();
  }
  // GET /course-categories/dropdown - ჩამოსაშლელი სიისთვის მარტივი ფორმატი
  @Get('dropdown')
  async getCategoriesForDropdown(): Promise<{ id: string; name: string }[]> {
    const categories = await this.categoryService.getMainCategories();
    return categories.map((cat) => ({
      id: String(cat._id),
      name: cat.name,
    }));
  }
  // GET /course-categories/:id/subcategories - კატეგორიის სუბკატეგორიები
  @Get(':id/subcategories')
  async getCourseSubcategories(@Param('id') categoryId: string): Promise<any> {
    return this.categoryService.getSubCategories(categoryId);
  }
  // GET /course-categories/:id/subcategories/dropdown - სუბკატეგორიების ჩამოსაშლელი
  @Get(':id/subcategories/dropdown')
  async getSubcategoriesForDropdown(
    @Param('id') categoryId: string,
  ): Promise<{ id: string; name: string; categoryId: string }[]> {
    const subcategories =
      await this.categoryService.getSubCategories(categoryId);
    return subcategories.map((subcat) => ({
      id: String(subcat._id),
      name: subcat.name,
      categoryId: String(subcat.parentId),
    }));
  }
  // GET /course-categories/with-subcategories-dropdown - ყველა კატეგორია სუბკატეგორიებით ჩამოსაშლელისთვის
  @Get('with-subcategories-dropdown')
  async getCategoriesWithSubcategoriesForDropdown(): Promise<
    {
      id: string;
      name: string;
      subcategories: { id: string; name: string }[];
    }[]
  > {
    const categoriesWithSubs =
      await this.categoryService.getCategoriesWithSubcategories();
    return categoriesWithSubs.map((cat: any) => ({
      id: String(cat._id),
      name: String(cat.name),
      subcategories:
        cat.subcategories?.map((sub: any) => ({
          id: String(sub._id),
          name: String(sub.name),
        })) || [],
    }));
  }
}
