import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './subcategory/subcategory.module';
import { VideoModule } from './video/video.module';
import { SetModule } from './set/set.module';
import { ExerciseModule } from './exercise/exercise.module';
import { ExerciseComplexModule } from './exercise-complex/exercise-complex.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MigrationModule } from './migration/migration.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db',
    ),
    CategoryModule,
    SubCategoryModule,
    VideoModule,
    SetModule,
    ExerciseModule,
    ExerciseComplexModule,
    ArticleModule,
    AuthModule,
    UserModule,
    MigrationModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
