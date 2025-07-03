import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SetService } from './set.service';
import { SetController } from './set.controller';
import { Set, SetSchema } from '../schemas/set.schema';
import { Category, CategorySchema } from '../schemas/category.schema';
import { SubCategory, SubCategorySchema } from '../schemas/subcategory.schema';
import { Exercise, ExerciseSchema } from '../schemas/exercise.schema';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Set.name, schema: SetSchema },
      { name: Category.name, schema: CategorySchema },
      { name: SubCategory.name, schema: SubCategorySchema },
      { name: Exercise.name, schema: ExerciseSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [SetController],
  providers: [SetService],
  exports: [SetService],
})
export class SetModule {} 