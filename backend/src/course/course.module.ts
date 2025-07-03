import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from '../schemas/course.schema';
import { Lesson, LessonSchema } from '../schemas/lesson.schema';
import { Review, ReviewSchema } from '../schemas/review.schema';
import { Category, CategorySchema } from '../schemas/category.schema';
import { SubCategory, SubCategorySchema } from '../schemas/subcategory.schema';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  providers: [CourseService],
  controllers: [CourseController],
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Lesson.name, schema: LessonSchema },
      { name: Review.name, schema: ReviewSchema },
      { name: Category.name, schema: CategorySchema },
      { name: SubCategory.name, schema: SubCategorySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  exports: [CourseService],
})
export class CourseModule {}
