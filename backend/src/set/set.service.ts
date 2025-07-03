import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Set, SetDocument } from '../schemas/set.schema';

@Injectable()
export class SetService {
  constructor(@InjectModel(Set.name) private setModel: Model<SetDocument>) {}

  // ყველა სეტის მიღება
  async findAll(
    page: number = 1,
    limit: number = 10,
    filters: any = {},
  ): Promise<{ sets: SetDocument[]; total: number; pages: number }> {
    const skip = (page - 1) * limit;
    const query = { isActive: true, ...filters };

    const [sets, total] = await Promise.all([
      this.setModel
        .find(query)
        .populate('categoryId', 'name')
        .populate('subcategoryId', 'name')
        .populate('exercises.exerciseId', 'name duration difficulty')
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.setModel.countDocuments(query),
    ]);

    return {
      sets,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  // კონკრეტული სეტის მიღება
  async findById(id: string): Promise<SetDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('არასწორი სეტის ID');
    }

    const set = await this.setModel
      .findById(id)
      .populate('categoryId', 'name')
      .populate('subcategoryId', 'name')
      .populate(
        'exercises.exerciseId',
        'name description duration difficulty images videos',
      )
      .populate('createdBy', 'name email')
      .populate('relatedSets', 'name difficulty level')
      .populate('prerequisites', 'name difficulty level')
      .exec();

    if (!set) {
      throw new NotFoundException('სეტი ვერ მოიძებნა');
    }

    // Usage counter-ის გაზრდა
    await this.setModel.findByIdAndUpdate(id, {
      $inc: { usageCount: 1 },
    });

    return set;
  }

  // სეტების ძიება
  async search(
    query: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ sets: SetDocument[]; total: number; pages: number }> {
    const skip = (page - 1) * limit;

    const searchQuery = {
      isActive: true,
      $text: { $search: query },
    };

    const [sets, total] = await Promise.all([
      this.setModel
        .find(searchQuery, { score: { $meta: 'textScore' } })
        .populate('categoryId', 'name')
        .populate('subcategoryId', 'name')
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.setModel.countDocuments(searchQuery),
    ]);

    return {
      sets,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  // რჩეული სეტები
  async getFeaturedSets(): Promise<SetDocument[]> {
    return this.setModel
      .find({ isFeatured: true, isActive: true })
      .populate('categoryId', 'name')
      .populate('subcategoryId', 'name')
      .sort({ rating: -1, usageCount: -1 })
      .limit(10)
      .exec();
  }

  // კატეგორიის სეტები
  async findByCategory(categoryId: string): Promise<SetDocument[]> {
    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      throw new BadRequestException('არასწორი კატეგორიის ID');
    }

    return this.setModel
      .find({ categoryId: new Types.ObjectId(categoryId), isActive: true })
      .populate('subcategoryId', 'name')
      .sort({ sortOrder: 1, rating: -1 })
      .exec();
  }

  // სუბკატეგორიის სეტები
  async findBySubcategory(subcategoryId: string): Promise<SetDocument[]> {
    if (!subcategoryId || !Types.ObjectId.isValid(subcategoryId)) {
      throw new BadRequestException('არასწორი სუბკატეგორიის ID');
    }

    return this.setModel
      .find({
        subcategoryId: new Types.ObjectId(subcategoryId),
        isActive: true,
      })
      .sort({ sortOrder: 1, rating: -1 })
      .exec();
  }

  // სირთულის მიხედვით სეტები
  async findByDifficulty(difficulty: string): Promise<SetDocument[]> {
    return this.setModel
      .find({ difficulty, isActive: true })
      .populate('categoryId', 'name')
      .populate('subcategoryId', 'name')
      .sort({ rating: -1 })
      .exec();
  }

  // მიზნების მიხედვით სეტები
  async findByGoals(goals: string[]): Promise<SetDocument[]> {
    return this.setModel
      .find({ goals: { $in: goals }, isActive: true })
      .populate('categoryId', 'name')
      .populate('subcategoryId', 'name')
      .sort({ rating: -1 })
      .exec();
  }

  // სეტის შექმნა
  async create(setData: {
    name: string;
    description?: string;
    image?: string;
    categoryId: string;
    subcategoryId?: string;
    exercises?: Array<{
      exerciseId: string;
      repetitions?: number;
      sets?: number;
      restTime?: number;
      duration?: number;
      notes?: string;
      order?: number;
    }>;
    difficulty?: string;
    level?: string;
    tags?: string[];
    targetMuscles?: string[];
    equipment?: string[];
    warmupInstructions?: string;
    cooldownInstructions?: string;
    generalNotes?: string;
    createdBy?: string;
    isPublic?: boolean;
    goals?: string[];
    ageGroup?: { minAge: number; maxAge: number };
    targetGender?: string;
    suitableConditions?: string[];
    contraindicatedConditions?: string[];
  }): Promise<SetDocument> {
    // Calculate total duration and calories
    let totalDuration = 0;
    const totalCalories = 0;

    const exercises =
      setData.exercises?.map((ex, index) => ({
        exerciseId: new Types.ObjectId(ex.exerciseId),
        repetitions: ex.repetitions || 1,
        sets: ex.sets || 1,
        restTime: ex.restTime || 0,
        duration: ex.duration || 0,
        notes: ex.notes,
        order: ex.order || index,
      })) || [];

    // Sum up durations
    exercises.forEach((ex) => {
      totalDuration += ex.duration + ex.restTime;
    });

    const set = new this.setModel({
      ...setData,
      categoryId: new Types.ObjectId(setData.categoryId),
      subcategoryId: setData.subcategoryId
        ? new Types.ObjectId(setData.subcategoryId)
        : undefined,
      exercises,
      totalDuration,
      totalCalories,
      createdBy: setData.createdBy
        ? new Types.ObjectId(setData.createdBy)
        : undefined,
    });

    return set.save();
  }

  // სეტის განახლება
  async update(id: string, updateData: any): Promise<SetDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('არასწორი სეტის ID');
    }

    // Recalculate totals if exercises are updated
    if (updateData.exercises) {
      let totalDuration = 0;
      updateData.exercises.forEach((ex: any) => {
        totalDuration += (ex.duration || 0) + (ex.restTime || 0);
      });
      updateData.totalDuration = totalDuration;
    }

    const set = await this.setModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!set) {
      throw new NotFoundException('სეტი ვერ მოიძებნა');
    }

    return set;
  }

  // სეტის წაშლა
  async delete(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('არასწორი სეტის ID');
    }

    const result = await this.setModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );

    if (!result) {
      throw new NotFoundException('სეტი ვერ მოიძებნა');
    }
  }

  // სეტში სავარჯიშოს დამატება
  async addExercise(
    setId: string,
    exerciseData: {
      exerciseId: string;
      repetitions?: number;
      sets?: number;
      restTime?: number;
      duration?: number;
      notes?: string;
    },
  ): Promise<SetDocument> {
    const set = await this.setModel.findById(setId);
    if (!set) {
      throw new NotFoundException('სეტი ვერ მოიძებნა');
    }

    const newExercise = {
      exerciseId: new Types.ObjectId(exerciseData.exerciseId),
      repetitions: exerciseData.repetitions || 1,
      sets: exerciseData.sets || 1,
      restTime: exerciseData.restTime || 0,
      duration: exerciseData.duration || 0,
      notes: exerciseData.notes,
      order: set.exercises.length,
    };

    set.exercises.push(newExercise);

    // Update total duration
    set.totalDuration += newExercise.duration + newExercise.restTime;

    return set.save();
  }

  // სეტიდან სავარჯიშოს წაშლა
  async removeExercise(
    setId: string,
    exerciseId: string,
  ): Promise<SetDocument> {
    const set = await this.setModel.findById(setId);
    if (!set) {
      throw new NotFoundException('სეტი ვერ მოიძებნა');
    }

    const exerciseIndex = set.exercises.findIndex(
      (ex) => ex.exerciseId.toString() === exerciseId,
    );

    if (exerciseIndex === -1) {
      throw new NotFoundException('სავარჯიშო სეტში ვერ მოიძებნა');
    }

    // Subtract from total duration
    const removedExercise = set.exercises[exerciseIndex];
    set.totalDuration -= removedExercise.duration + removedExercise.restTime;

    set.exercises.splice(exerciseIndex, 1);

    return set.save();
  }

  // სეტის rating-ის განახლება
  async updateRating(setId: string, rating: number): Promise<SetDocument> {
    const set = await this.setModel.findById(setId);
    if (!set) {
      throw new NotFoundException('სეტი ვერ მოიძებნა');
    }

    // Calculate new average rating
    const totalRating = set.rating * set.reviewsCount + rating;
    const newReviewsCount = set.reviewsCount + 1;
    const newAverageRating = totalRating / newReviewsCount;

    const updatedSet = await this.setModel
      .findByIdAndUpdate(
        setId,
        {
          rating: Math.round(newAverageRating * 10) / 10, // Round to 1 decimal
          reviewsCount: newReviewsCount,
        },
        { new: true },
      )
      .exec();

    if (!updatedSet) {
      throw new NotFoundException('სეტის განახლება ვერ მოხერხდა');
    }

    return updatedSet;
  }
}
