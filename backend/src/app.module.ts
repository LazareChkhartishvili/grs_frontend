import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { SetModule } from './set/set.module';
import { ExerciseModule } from './exercise/exercise.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db',
    ),
    AuthModule,
    UserModule,
    CategoryModule,
    SetModule,
    ExerciseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
