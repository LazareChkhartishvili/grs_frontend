import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseComplexController } from './exercise-complex.controller';
import { ExerciseComplexService } from './exercise-complex.service';
import {
  ExerciseComplex,
  ExerciseComplexSchema,
} from '../schemas/exercise-complex.schema';
import { Exercise, ExerciseSchema } from '../schemas/exercise.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExerciseComplex.name, schema: ExerciseComplexSchema },
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
  ],
  controllers: [ExerciseComplexController],
  providers: [ExerciseComplexService],
  exports: [ExerciseComplexService],
})
export class ExerciseComplexModule {} 