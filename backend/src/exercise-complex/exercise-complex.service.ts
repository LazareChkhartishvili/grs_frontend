/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ExerciseComplex,
  ExerciseComplexDocument,
} from '../schemas/exercise-complex.schema';
import { Exercise, ExerciseDocument } from '../schemas/exercise.schema';

@Injectable()
export class ExerciseComplexService {
  constructor(
    @InjectModel(ExerciseComplex.name)
    private exerciseComplexModel: Model<ExerciseComplexDocument>,
    @InjectModel(Exercise.name)
    private exerciseModel: Model<ExerciseDocument>,
  ) {}

  // ყველა კომპლექსის მიღება
  async getAllComplexes(): Promise<any[]> {
    const complexes = await this.exerciseComplexModel
      .find({ isActive: true })
      .populate('categoryId', 'name description')
      .populate('subcategoryId', 'name description categoryId')
      .populate({
        path: 'subcategoryId',
        populate: {
          path: 'categoryId',
          select: 'name description',
        },
      })
      .sort({ sortOrder: 1 })
      .exec();

    // თითოეული კომპლექსისთვის მანუალურად ვიღებთ სავარჯიშოებს
    const complexesWithExercises = await Promise.all(
      complexes.map(async (complex) => {
        const exercises = await this.exerciseModel
          .find({ _id: { $in: complex.exerciseIds } })
          .populate('categoryId', 'name description')
          .populate('subcategoryId', 'name description')
          .exec();

        return {
          ...complex.toObject(),
          exercises: exercises,
        };
      })
    );

    return complexesWithExercises;
  }

  // კონკრეტული კომპლექსის მიღება
  async getComplexById(complexId: string): Promise<any> {
    const complex = await this.exerciseComplexModel
      .findById(complexId)
      .populate('subcategoryId', 'name description categoryId')
      .populate({
        path: 'subcategoryId',
        populate: {
          path: 'categoryId',
          select: 'name description image',
        },
      })
      .populate('relatedComplexes', 'name description price')
      .exec();

    if (!complex) {
      throw new NotFoundException('კომპლექსი ვერ მოიძებნა');
    }

    // მანუალურად ვიღებთ სავარჯიშოებს
    const exercises = await this.exerciseModel
      .find({ _id: { $in: complex.exerciseIds } })
      .populate('categoryId', 'name description')
      .populate('subcategoryId', 'name description')
      .exec();

    return {
      ...complex.toObject(),
      exercises: exercises,
    };
  }

  // კონკრეტული კომპლექსის მიღება სავარჯიშოებით (მანუალური მიდგომა)
  async getComplexByIdWithExercises(complexId: string): Promise<any> {
    console.log('🔍 Getting complex with exercises:', complexId);
    
    const complex = await this.exerciseComplexModel
      .findById(complexId)
      .populate('subcategoryId', 'name description categoryId')
      .populate({
        path: 'subcategoryId',
        populate: {
          path: 'categoryId',
          select: 'name description image',
        },
      })
      .exec();

    if (!complex) {
      throw new NotFoundException('კომპლექსი ვერ მოიძებნა');
    }

    console.log('📋 Complex exercise IDs:', complex.exerciseIds);

    // მანუალურად ვიღებთ სავარჯიშოებს
    const exercises = await this.exerciseModel
      .find({ _id: { $in: complex.exerciseIds } })
      .populate('categoryId', 'name description')
      .populate('subcategoryId', 'name description')
      .exec();

    console.log('🏃‍♂️ Found exercises:', exercises.length);

    return {
      ...complex.toObject(),
      exercises: exercises,
    };
  }

  // კატეგორიის კომპლექსები (GHRS მსგავსად: Orthopedics კომპლექსები)
  async getComplexesByCategory(
    categoryId: string,
  ): Promise<ExerciseComplexDocument[]> {
    return this.exerciseComplexModel
      .find({ isActive: true })
      .populate({
        path: 'subcategoryId',
        match: { categoryId: new Types.ObjectId(categoryId) },
        select: 'name description',
      })
      .sort({ sortOrder: 1 })
      .exec()
      .then((complexes) =>
        complexes.filter((complex) => complex.subcategoryId),
      );
  }

  // სუბკატეგორიის კომპლექსები (GHRS მსგავსად: Lumbar Spine კომპლექსები)
  async getComplexesBySubcategory(
    subcategoryId: string,
  ): Promise<ExerciseComplexDocument[]> {
    return this.exerciseComplexModel
      .find({
        subcategoryId: new Types.ObjectId(subcategoryId),
        isActive: true,
      })
      .populate('subcategoryId', 'name description categoryId')
      .populate({
        path: 'subcategoryId',
        populate: {
          path: 'categoryId',
          select: 'name description',
        },
      })
      .sort({ sortOrder: 1 })
      .exec();
  }

  // ფასის მიხედვით კომპლექსები
  async getComplexesByPriceRange(
    minPrice: number,
    maxPrice: number,
  ): Promise<ExerciseComplexDocument[]> {
    return this.exerciseComplexModel
      .find({
        price: { $gte: minPrice, $lte: maxPrice },
        isActive: true,
      })
      .populate('subcategoryId', 'name description')
      .sort({ price: 1 })
      .exec();
  }

  // სირთულის მიხედვით კომპლექსები
  async getComplexesByDifficulty(
    difficulty: string,
  ): Promise<ExerciseComplexDocument[]> {
    return this.exerciseComplexModel
      .find({ difficulty, isActive: true })
      .populate('subcategoryId', 'name description')
      .sort({ sortOrder: 1 })
      .exec();
  }

  // ეტაპის მიხედვით კომპლექსები
  async getComplexesByStage(stage: string): Promise<ExerciseComplexDocument[]> {
    return this.exerciseComplexModel
      .find({ stage, isActive: true })
      .populate('subcategoryId', 'name description')
      .sort({ sortOrder: 1 })
      .exec();
  }

  // ტაგების მიხედვით ძიება
  async getComplexesByTags(tags: string[]): Promise<ExerciseComplexDocument[]> {
    return this.exerciseComplexModel
      .find({
        tags: { $in: tags },
        isActive: true,
      })
      .populate('subcategoryId', 'name description')
      .sort({ sortOrder: 1 })
      .exec();
  }

  // კომპლექსის შექმნა
  async createComplex(complexData: {
    subcategoryId: string;
    name: string;
    description?: string;
    image?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    stage?: 'initial' | 'mid' | 'advanced';
    requiredEquipment?: string[];
    generalInstructions?: string;
    breathingGuidelines?: string;
    recommendedFrequency?: string;
    targetCondition?: string;
    price?: number;
    subscriptionPeriods?: {
      oneMonth?: number;
      threeMonths?: number;
      sixMonths?: number;
    };
    demoVideoUrl?: string;
    relatedComplexes?: string[];
  }): Promise<ExerciseComplexDocument> {
    const complex = new this.exerciseComplexModel({
      ...complexData,
      exerciseCount: 0,
      totalDuration: 0,
      subcategoryId: new Types.ObjectId(complexData.subcategoryId),
      relatedComplexes: complexData.relatedComplexes?.map(
        (id) => new Types.ObjectId(id),
      ),
    });

    return complex.save();
  }

  // კომპლექსის განახლება
  async updateComplex(
    complexId: string,
    updateData: {
      subcategoryId?: string;
      name?: string;
      description?: string;
      image?: string;
      difficulty?: 'easy' | 'medium' | 'hard';
      stage?: 'initial' | 'mid' | 'advanced';
      requiredEquipment?: string[];
      generalInstructions?: string;
      breathingGuidelines?: string;
      recommendedFrequency?: string;
      targetCondition?: string;
      price?: number;
      subscriptionPeriods?: {
        oneMonth?: number;
        threeMonths?: number;
        sixMonths?: number;
      };
      demoVideoUrl?: string;
      relatedComplexes?: string[];
    },
  ): Promise<ExerciseComplexDocument> {
    const processedUpdateData: any = { ...updateData };

    if (updateData.subcategoryId) {
      processedUpdateData.subcategoryId = new Types.ObjectId(
        updateData.subcategoryId,
      );
    }

    if (updateData.relatedComplexes) {
      processedUpdateData.relatedComplexes = updateData.relatedComplexes.map(
        (id) => new Types.ObjectId(id),
      );
    }

    const complex = await this.exerciseComplexModel
      .findByIdAndUpdate(complexId, processedUpdateData, { new: true })
      .populate('subcategoryId', 'name description')
      .exec();

    if (!complex) {
      throw new NotFoundException('კომპლექსი ვერ მოიძებნა');
    }

    return complex;
  }

  // კომპლექსის წაშლა (soft delete)
  async deleteComplex(complexId: string): Promise<void> {
    const complex = await this.exerciseComplexModel.findById(complexId).exec();

    if (!complex) {
      throw new NotFoundException('კომპლექსი ვერ მოიძებნა');
    }

    complex.isActive = false;
    await complex.save();
  }

  // Featured კომპლექსები (GHRS მსგავსად)
  async getFeaturedComplexes(): Promise<ExerciseComplexDocument[]> {
    return this.exerciseComplexModel
      .find({ isActive: true })
      .populate('subcategoryId', 'name description')
      .sort({ sortOrder: 1 })
      .limit(6) // GHRS-ზე 6 featured კომპლექსია
      .exec();
  }

  // კატეგორიები თავიანთი კომპლექსებით
  async getCategoriesWithComplexes(): Promise<any[]> {
    const complexes = await this.exerciseComplexModel
      .find({ isActive: true })
      .populate('subcategoryId', 'name description categoryId')
      .populate({
        path: 'subcategoryId',
        populate: {
          path: 'categoryId',
          select: 'name description image',
        },
      })
      .sort({ sortOrder: 1 })
      .exec();

    // Group by category
    const categoriesMap = new Map();

    complexes.forEach((complex) => {
      if (complex.subcategoryId && (complex.subcategoryId as any).categoryId) {
        const category = (complex.subcategoryId as any).categoryId;
        const categoryId = category._id.toString();

        if (!categoriesMap.has(categoryId)) {
          categoriesMap.set(categoryId, {
            _id: category._id,
            name: category.name,
            description: category.description,
            image: category.image,
            complexes: [],
          });
        }

        categoriesMap.get(categoryId).complexes.push(complex);
      }
    });

    return Array.from(categoriesMap.values());
  }

  // კომპლექსში სავარჯიშოს დამატება
  async addExerciseToComplex(
    complexId: string,
    exerciseId: string,
  ): Promise<ExerciseComplexDocument> {
    const complex = await this.exerciseComplexModel.findById(complexId).exec();

    if (!complex) {
      throw new NotFoundException('კომპლექსი ვერ მოიძებნა');
    }

    if (!complex.exerciseIds) {
      complex.exerciseIds = [];
    }

    const exerciseObjectId = new Types.ObjectId(exerciseId);
    if (!complex.exerciseIds.includes(exerciseObjectId)) {
      complex.exerciseIds.push(exerciseObjectId);
      complex.exerciseCount = complex.exerciseIds.length;
    }

    return complex.save();
  }

  // კომპლექსის სავარჯიშოების მიღება
  async getComplexExercises(complexId: string): Promise<ExerciseDocument[]> {
    const complex = await this.exerciseComplexModel.findById(complexId).exec();

    if (!complex) {
      throw new NotFoundException('კომპლექსი ვერ მოიძებნა');
    }

    // კომპლექსის სავარჯიშოების მიღება
    const exercises = await this.exerciseModel
      .find({ _id: { $in: complex.exerciseIds } })
      .populate('categoryId', 'name description')
      .populate('subcategoryId', 'name description')
      .exec();

    return exercises;
  }

  // კომპლექსიდან სავარჯიშოს წაშლა
  async removeExerciseFromComplex(
    complexId: string,
    exerciseId: string,
  ): Promise<ExerciseComplexDocument> {
    const complex = await this.exerciseComplexModel.findById(complexId).exec();

    if (!complex) {
      throw new NotFoundException('კომპლექსი ვერ მოიძებნა');
    }

    const exerciseObjectId = new Types.ObjectId(exerciseId);
    complex.exerciseIds =
      complex.exerciseIds?.filter((id) => !id.equals(exerciseObjectId)) || [];
    complex.exerciseCount = complex.exerciseIds.length;

    return complex.save();
  }

  // კომპლექსში ახალი სავარჯიშოს შექმნა და დამატება
  async createAndAddExerciseToComplex(
    complexId: string,
    exerciseData: {
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
    },
  ): Promise<{ exercise: ExerciseDocument; complex: ExerciseComplexDocument }> {
    console.log('🔄 Creating new exercise and adding to complex:', complexId);
    
    // ჯერ ვქმნით ახალ სავარჯიშოს
    const exercise = new this.exerciseModel({
      ...exerciseData,
      categoryId: new Types.ObjectId(exerciseData.categoryId),
      subcategoryId: exerciseData.subcategoryId
        ? new Types.ObjectId(exerciseData.subcategoryId)
        : null,
    });
    const savedExercise = await exercise.save();
    console.log('✅ Exercise created:', savedExercise._id);

    // ახლა ვამატებთ კომპლექსში
    const complex = await this.exerciseComplexModel.findById(complexId).exec();
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
}
