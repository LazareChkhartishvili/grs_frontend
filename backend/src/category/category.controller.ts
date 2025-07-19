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

  @Post(':id/sets/:setId')
  addSet(
    @Param('id') id: string,
    @Param('setId') setId: string,
  ) {
    return this.categoryService.addSet(id, setId);
  }
}