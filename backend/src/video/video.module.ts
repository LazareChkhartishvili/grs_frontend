import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { Video, VideoSchema } from '../schemas/video.schema';
import { Category, CategorySchema } from '../schemas/category.schema';
import { SubCategory, SubCategorySchema } from '../schemas/subcategory.schema';
import { Course, CourseSchema } from '../schemas/course.schema';
import { Lesson, LessonSchema } from '../schemas/lesson.schema';
import { Exercise, ExerciseSchema } from '../schemas/exercise.schema';
import { ExerciseComplex, ExerciseComplexSchema } from '../schemas/exercise-complex.schema';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Video.name, schema: VideoSchema },
      { name: Category.name, schema: CategorySchema },
      { name: SubCategory.name, schema: SubCategorySchema },
      { name: Course.name, schema: CourseSchema },
      { name: Lesson.name, schema: LessonSchema },
      { name: Exercise.name, schema: ExerciseSchema },
      { name: ExerciseComplex.name, schema: ExerciseComplexSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService],
})
export class VideoModule {} 