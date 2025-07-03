import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Exercise, ExerciseDocument } from '../schemas/exercise.schema';
import {
  ExerciseComplex,
  ExerciseComplexDocument,
} from '../schemas/exercise-complex.schema';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name)
    private exerciseModel: Model<ExerciseDocument>,
    @InjectModel(ExerciseComplex.name)
    private exerciseComplexModel: Model<ExerciseComplexDocument>,
  ) {}

  // ყველა სავარჯიშოს მიღება
  async getAllExercises(): Promise<ExerciseDocument[]> {
    return this.exerciseModel
      .find({ isActive: true })
      .populate('categoryId', 'name description')
      .populate('subcategoryId', 'name description')
      .sort({ sortOrder: 1 })
      .exec();
  }

  // კონკრეტული კატეგორიის სავარჯიშოები
  async getExercisesByCategory(
    categoryId: string,
  ): Promise<ExerciseDocument[]> {
    return this.exerciseModel
      .find({ categoryId, isActive: true })
      .populate('subcategoryId', 'name description')
      .sort({ sortOrder: 1 })
      .exec();
  }

  // კონკრეტული სუბკატეგორიის სავარჯიშოები
  async getExercisesBySubcategory(
    subcategoryId: string,
  ): Promise<ExerciseDocument[]> {
    return this.exerciseModel
      .find({ subcategoryId, isActive: true })
      .populate('categoryId', 'name description')
      .sort({ sortOrder: 1 })
      .exec();
  }

  // კონკრეტული სავარჯიშოს მიღება
  async getExerciseById(exerciseId: string): Promise<ExerciseDocument> {
    const exercise = await this.exerciseModel
      .findById(exerciseId)
      .populate('categoryId', 'name description')
      .populate('subcategoryId', 'name description')
      .exec();

    if (!exercise) {
      throw new NotFoundException('სავარჯიშო ვერ მოიძებნა');
    }

    return exercise;
  }

  // სავარჯიშოს შექმნა (და კომპლექსში დამატება თუ complexId მოცემულია)
  async createExercise(exerciseData: {
    name: string;
    description?: string;
    duration?: number;
    difficulty?: string;
    instructions?: string;
    images?: string[];
    videos?: string[];
    categoryId: string;
    subcategoryId?: string;
    repetitions?: number;
    sets?: number;
    restTime?: number;
    calories?: number;
    imageData?: string;
    imageMimeType?: string;
    imageSize?: number;
    complexId?: string; // კომპლექსის ID
  }): Promise<{
    exercise: ExerciseDocument;
    complex?: ExerciseComplexDocument;
  }> {
    // პირველ ჯერ ვქმნით სავარჯიშოს
    const { complexId, ...exerciseCreateData } = exerciseData;
    const exercise = new this.exerciseModel(exerciseCreateData);
    const savedExercise = await exercise.save();

    // თუ complexId მოცემულია, ვამატებთ კომპლექსში
    if (complexId) {
      const complex = await this.exerciseComplexModel
        .findById(complexId)
        .exec();

      if (!complex) {
        throw new NotFoundException('კომპლექსი ვერ მოიძებნა');
      }

      if (!complex.exerciseIds) {
        complex.exerciseIds = [];
      }

      const exerciseObjectId = new Types.ObjectId(savedExercise._id as string);
      if (!complex.exerciseIds.includes(exerciseObjectId)) {
        complex.exerciseIds.push(exerciseObjectId);
        complex.exerciseCount = complex.exerciseIds.length;
      }

      const updatedComplex = await complex.save();

      return {
        exercise: savedExercise,
        complex: updatedComplex,
      };
    }

    return { exercise: savedExercise };
  }

  // სავარჯიშოს განახლება
  async updateExercise(
    exerciseId: string,
    updateData: Partial<Exercise>,
  ): Promise<ExerciseDocument> {
    const exercise = await this.exerciseModel
      .findByIdAndUpdate(exerciseId, updateData, { new: true })
      .populate('categoryId', 'name description')
      .populate('subcategoryId', 'name description')
      .exec();

    if (!exercise) {
      throw new NotFoundException('სავარჯიშო ვერ მოიძებნა');
    }

    return exercise;
  }

  // სავარჯიშოს წაშლა
  async deleteExercise(exerciseId: string): Promise<void> {
    const exercise = await this.exerciseModel.findById(exerciseId).exec();

    if (!exercise) {
      throw new NotFoundException('სავარჯიშო ვერ მოიძებნა');
    }

    exercise.isActive = false;
    await exercise.save();
  }

  // სირთულის მიხედვით ძიება
  async getExercisesByDifficulty(
    difficulty: string,
  ): Promise<ExerciseDocument[]> {
    return this.exerciseModel
      .find({ difficulty, isActive: true })
      .populate('categoryId', 'name description')
      .populate('subcategoryId', 'name description')
      .sort({ sortOrder: 1 })
      .exec();
  }

  // ძიება სახელით
  async searchExercises(searchTerm: string): Promise<ExerciseDocument[]> {
    return this.exerciseModel
      .find({
        $and: [
          { isActive: true },
          {
            $or: [
              { name: { $regex: searchTerm, $options: 'i' } },
              { description: { $regex: searchTerm, $options: 'i' } },
              { instructions: { $regex: searchTerm, $options: 'i' } },
            ],
          },
        ],
      })
      .populate('categoryId', 'name description')
      .populate('subcategoryId', 'name description')
      .sort({ sortOrder: 1 })
      .exec();
  }

  // კატეგორიები თავიანთი სავარჯიშოებით
  async getCategoriesWithExercises(): Promise<any[]> {
    const exercises = await this.exerciseModel
      .find({ isActive: true })
      .populate('categoryId', 'name description image')
      .populate('subcategoryId', 'name description')
      .sort({ sortOrder: 1 })
      .exec();

    // Group by category
    const grouped = exercises.reduce((acc, exercise) => {
      const categoryId = (
        exercise.categoryId as unknown as { _id: string }
      )._id.toString();
      if (!acc[categoryId]) {
        acc[categoryId] = {
          category: exercise.categoryId,
          exercises: [],
        };
      }
      acc[categoryId].exercises.push(exercise);
      return acc;
    }, {});

    return Object.values(grouped);
  }
}
