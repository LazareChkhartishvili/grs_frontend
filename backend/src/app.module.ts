import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './subcategory/subcategory.module';
import { SetModule } from './set/set.module';
import { VideoModule } from './video/video.module';
import { ExerciseModule } from './exercise/exercise.module';
import { ExerciseComplexModule } from './exercise-complex/exercise-complex.module';
import { CourseModule } from './course/course.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { API_CONFIG } from './config/api';

@Module({
  imports: [
    MongooseModule.forRoot(API_CONFIG.MONGODB_URI),
    CategoryModule,
    SubCategoryModule,
    SetModule,
    VideoModule,
    ExerciseModule,
    ExerciseComplexModule,
    CourseModule,
    ArticleModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
