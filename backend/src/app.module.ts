import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './subcategory/subcategory.module';
import { ExerciseModule } from './exercise/exercise.module';
import { ExerciseComplexModule } from './exercise-complex/exercise-complex.module';
import { CourseModule } from './course/course.module';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { VideoModule } from './video/video.module';
import { SetModule } from './set/set.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db',
    ),
    CategoryModule,
    SubCategoryModule,
    ExerciseModule,
    ExerciseComplexModule,
    CourseModule,
    UserModule,
    ArticleModule,
    VideoModule,
    SetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
