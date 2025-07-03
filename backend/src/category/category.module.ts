import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../schemas/category.schema';
import { SubCategory, SubCategorySchema } from '../schemas/subcategory.schema';
import {
  ExerciseComplex,
  ExerciseComplexSchema,
} from '../schemas/exercise-complex.schema';
import { Exercise, ExerciseSchema } from '../schemas/exercise.schema';
import {
  CategoryController,
  CourseCategoryController,
} from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: SubCategory.name, schema: SubCategorySchema },
      { name: ExerciseComplex.name, schema: ExerciseComplexSchema },
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
  ],
  controllers: [CategoryController, CourseCategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
