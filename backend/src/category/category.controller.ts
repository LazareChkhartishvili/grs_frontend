import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: any) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Get(':id/sets')
  getCategorySets(@Param('id') id: string) {
    return this.categoryService.getCategorySets(id);
  }

  @Get(':id/complete')
  getCategoryComplete(@Param('id') id: string) {
    return this.categoryService.getCategoryComplete(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: any) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }

  @Post(':id/subcategories/:subcategoryId')
  addSubcategory(
    @Param('id') id: string,
    @Param('subcategoryId') subcategoryId: string,
  ) {
    return this.categoryService.addSubcategory(id, subcategoryId);
  }

  @Delete(':id/subcategories/:subcategoryId')
  removeSubcategory(
    @Param('id') id: string,
    @Param('subcategoryId') subcategoryId: string,
  ) {
    return this.categoryService.removeSubcategory(id, subcategoryId);
  }

  @Get(':id/subcategories')
  getSubcategories(@Param('id') id: string) {
    return this.categoryService.getSubcategories(id);
  }

  @Get(':id/subcategories/:subcategoryId')
  getSubCategoryById(
    @Param('id') categoryId: string,
    @Param('subcategoryId') subCategoryId: string,
  ) {
    return this.categoryService.getSubCategoryById(categoryId, subCategoryId);
  }

  @Patch(':id/subcategories/:subcategoryId')
  updateSubCategory(
    @Param('id') categoryId: string,
    @Param('subcategoryId') subCategoryId: string,
    @Body() updateCategoryDto: any,
  ) {
    return this.categoryService.updateSubCategory(categoryId, subCategoryId, updateCategoryDto);
  }

  @Get(':id/subcategories/:subcategoryId/sets')
  getSubCategorySets(
    @Param('id') categoryId: string,
    @Param('subcategoryId') subCategoryId: string,
  ) {
    return this.categoryService.getSubCategorySets(categoryId, subCategoryId);
  }

  @Post(':id/subcategories')
  createSubcategory(
    @Param('id') parentId: string,
    @Body() createCategoryDto: any,
  ) {
    return this.categoryService.createSubcategory(parentId, createCategoryDto);
  }

  @Post(':id/sets/:setId')
  addSet(
    @Param('id') id: string,
    @Param('setId') setId: string,
  ) {
    return this.categoryService.addSet(id, setId);
  }
}