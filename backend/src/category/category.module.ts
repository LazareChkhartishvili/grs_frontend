import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from '../schemas/category.schema';
import { Set, SetSchema } from '../schemas/set.schema';
import { Video, VideoSchema } from '../schemas/video.schema';
import { Exercise, ExerciseSchema } from 'src/schemas/exercise.schema';
import {
  ExerciseComplex,
  ExerciseComplexSchema,
} from 'src/schemas/exercise-complex.schema';
import { SubCategory, SubCategorySchema } from 'src/schemas/subcategory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: SubCategory.name, schema: SubCategorySchema },
      { name: ExerciseComplex.name, schema: ExerciseComplexSchema },
      { name: Exercise.name, schema: ExerciseSchema },
      { name: Set.name, schema: SetSchema },
      { name: Video.name, schema: VideoSchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
