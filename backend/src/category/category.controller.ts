import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '../schemas/category.schema';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get('with-subcategories')
  async findAllWithSubcategories(): Promise<Category[]> {
    return this.categoryService.findAllWithSubcategories();
  }

  @Get('full-structure')
  async findAllWithFullStructure(): Promise<Category[]> {
    return this.categoryService.findAllWithFullStructure();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Post()
  async create(@Body() category: Category): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() category: Category,
  ): Promise<Category> {
    return this.categoryService.update(id, category);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.categoryService.delete(id);
  }

  @Post(':id/subcategories')
  async createSubcategories(
    @Param('id') id: string,
    @Body() subcategories: Partial<Category>[]
  ): Promise<Category[]> {
    return this.categoryService.createSubcategories(id, subcategories);
  }
}
