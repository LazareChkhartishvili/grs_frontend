import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Set as SetModel, SetDocument } from '../schemas/set.schema';
import { Video, VideoDocument } from '../schemas/video.schema';

@Injectable()
export class SetService {
  constructor(
    @InjectModel(SetModel.name) private setModel: Model<SetDocument>,
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  // სეტის შექმნა
  async createSet(setData: {
    name: string;
    description?: string;
    price: number;
    categoryId: string;
    subcategoryId?: string;
    setNumber: string;
    videos?: string[];
    subscriptionPlans: { period: number; price: number }[];
  }): Promise<SetDocument> {
    // ვიდეოებისთვის სავარჯიშოების შექმნა
    const exercises =
      setData.videos?.map((videoId, index) => ({
        repetitions: 1,
        sets: 1,
        restTime: 0,
        duration: 0,
        order: index,
        videoId: new Types.ObjectId(videoId),
      })) || [];

    const set = new this.setModel({
      ...setData,
      categoryId: new Types.ObjectId(setData.categoryId),
      subcategoryId: setData.subcategoryId
        ? new Types.ObjectId(setData.subcategoryId)
        : undefined,
      exercises: exercises,
    });
    return set.save();
  }

  // სეტის განახლება
  async updateSet(
    setId: string,
    updateData: Partial<SetModel>,
  ): Promise<SetDocument> {
    const updatePayload = { ...updateData } as {
      categoryId?: string | Types.ObjectId;
      subcategoryId?: string | Types.ObjectId;
      videos?: string[];
    };

    if (
      updatePayload.categoryId &&
      typeof updatePayload.categoryId === 'string'
    ) {
      updatePayload.categoryId = new Types.ObjectId(updatePayload.categoryId);
    }

    if (
      updatePayload.subcategoryId &&
      typeof updatePayload.subcategoryId === 'string'
    ) {
      updatePayload.subcategoryId = new Types.ObjectId(
        updatePayload.subcategoryId,
      );
    }

    // ვიდეოების განახლება
    if (updatePayload.videos) {
      updatePayload['exercises'] = updatePayload.videos.map((videoId, index) => ({
        repetitions: 1,
        sets: 1,
        restTime: 0,
        duration: 0,
        order: index,
        videoId: new Types.ObjectId(videoId),
      }));
      delete updatePayload.videos;
    }

    const set = await this.setModel
      .findByIdAndUpdate(setId, updatePayload, { new: true })
      .exec();

    if (!set) {
      throw new NotFoundException('სეტი ვერ მოიძებნა');
    }

    // ვიდეოების ინფორმაციის დამატება
    const videoIds = set.exercises.map((ex) => ex.videoId).filter(Boolean);
    const videos = await this.videoModel
      .find({ _id: { $in: videoIds } })
      .exec();

    set.exercises = set.exercises.map((exercise) => {
      if (exercise.videoId) {
        const video = videos.find((v) => v._id.equals(exercise.videoId));
        return {
          ...exercise,
          video: video || null,
        };
      }
      return exercise;
    });

    return set;
  }

  // სეტის წაშლა (soft delete)
  async deleteSet(setId: string): Promise<void> {
    const set = await this.setModel.findById(setId).exec();
    if (!set) {
      throw new NotFoundException('სეტი ვერ მოიძებნა');
    }
    set.isActive = false;
    await set.save();
  }

  // კონკრეტული სეტის მიღება
  async getSetById(setId: string): Promise<SetDocument> {
    const set = await this.setModel.findById(setId).exec();

    if (!set) {
      throw new NotFoundException('სეტი ვერ მოიძებნა');
    }

    // ვიდეოების ინფორმაციის დამატება
    const videoIds = set.exercises.map((ex) => ex.videoId).filter(Boolean);
    const videos = await this.videoModel
      .find({ _id: { $in: videoIds } })
      .exec();

    set.exercises = set.exercises.map((exercise) => {
      if (exercise.videoId) {
        const video = videos.find((v) => v._id.equals(exercise.videoId));
        return {
          ...exercise,
          video: video || null,
        };
      }
      return exercise;
    });

    return set;
  }

  // ყველა აქტიური სეტის მიღება
  async getAllSets(): Promise<SetDocument[]> {
    const sets = await this.setModel
      .find({ isActive: true })
      .sort({ sortOrder: 1 })
      .exec();

    // ვიდეოების ინფორმაციის დამატება ყველა სეტისთვის
    const allVideoIds = sets
      .flatMap((set) => set.exercises.map((ex) => ex.videoId))
      .filter(Boolean);
    const videos = await this.videoModel
      .find({ _id: { $in: allVideoIds } })
      .exec();

    return sets.map((set) => {
      set.exercises = set.exercises.map((exercise) => {
        if (exercise.videoId) {
          const video = videos.find((v) => v._id === exercise.videoId);
          return {
            ...exercise,
            video: video || null,
          };
        }
        return exercise;
      });
      return set;
    });
  }

  // კატეგორიის სეტების მიღება
  async getSetsByCategory(categoryId: string): Promise<SetDocument[]> {
    const sets = await this.setModel
      .find({ categoryId: new Types.ObjectId(categoryId), isActive: true })
      .sort({ sortOrder: 1 })
      .exec();

    // ვიდეოების ინფორმაციის დამატება ყველა სეტისთვის
    const allVideoIds = sets
      .flatMap((set) => set.exercises.map((ex) => ex.videoId))
      .filter(Boolean);
    const videos = await this.videoModel
      .find({ _id: { $in: allVideoIds } })
      .exec();

    return sets.map((set) => {
      set.exercises = set.exercises.map((exercise) => {
        if (exercise.videoId) {
          const video = videos.find((v) => v._id === exercise.videoId);
          return {
            ...exercise,
            video: video || null,
          };
        }
        return exercise;
      });
      return set;
    });
  }

  // ქვეკატეგორიის სეტების მიღება
  async getSetsBySubcategory(subcategoryId: string): Promise<SetDocument[]> {
    const sets = await this.setModel
      .find({
        subcategoryId: new Types.ObjectId(subcategoryId),
        isActive: true,
      })
      .sort({ sortOrder: 1 })
      .exec();

    // ვიდეოების ინფორმაციის დამატება ყველა სეტისთვის
    const allVideoIds = sets
      .flatMap((set) => set.exercises.map((ex) => ex.videoId))
      .filter(Boolean);
    const videos = await this.videoModel
      .find({ _id: { $in: allVideoIds } })
      .exec();

    return sets.map((set) => {
      set.exercises = set.exercises.map((exercise) => {
        if (exercise.videoId) {
          const video = videos.find((v) => v._id === exercise.videoId);
          return {
            ...exercise,
            video: video || null,
          };
        }
        return exercise;
      });
      return set;
    });
  }

  // ვიდეოების დამატება სეტში
  async addVideosToSet(
    setId: string,
    videoIds: string[],
  ): Promise<SetDocument> {
    const set = await this.setModel.findById(setId).exec();
    if (!set) {
      throw new NotFoundException('სეტი ვერ მოიძებნა');
    }

    // არსებული ვიდეოების ID-ების მიღება
    const existingVideoIds = set.exercises
      .map((ex) => ex.videoId?.toString())
      .filter(Boolean) as string[];

    // უნიკალური ვიდეოების ID-ების მიღება
    const uniqueVideoIds = [...new Set([...existingVideoIds, ...videoIds])];

    // ახალი სავარჯიშოების შექმნა ახალი ვიდეოებისთვის
    const newExercises = videoIds
      .filter((id) => !existingVideoIds.includes(id))
      .map((videoId, index) => ({
        repetitions: 1,
        sets: 1,
        restTime: 0,
        duration: 0,
        order: set.exercises.length + index,
        videoId: new Types.ObjectId(videoId),
      }));

    set.exercises = [...set.exercises, ...newExercises];

    return set.save();
  }

  // ვიდეოების წაშლა სეტიდან
  async removeVideosFromSet(
    setId: string,
    videoIds: string[],
  ): Promise<SetDocument> {
    const set = await this.setModel.findById(setId).exec();
    if (!set) {
      throw new NotFoundException('სეტი ვერ მოიძებნა');
    }

    // სავარჯიშოების წაშლა შესაბამისი ვიდეოებისთვის
    set.exercises = set.exercises.filter(
      (exercise) =>
        !exercise.videoId ||
        !videoIds.includes(exercise.videoId.toString()),
    );

    // სავარჯიშოების order-ის განახლება
    set.exercises = set.exercises.map((exercise, index) => ({
      ...exercise,
      order: index,
    }));

    return set.save();
  }

  // სეტის ვიდეოების სორტირება
  async reorderSetVideos(
    setId: string,
    videoIds: string[],
  ): Promise<SetDocument> {
    const set = await this.setModel.findById(setId).exec();
    if (!set) {
      throw new NotFoundException('სეტი ვერ მოიძებნა');
    }

    // სავარჯიშოების გადაწყობა ახალი თანმიმდევრობით
    const reorderedExercises = videoIds
      .map((videoId, index) => {
        const exercise = set.exercises.find(
          (ex) => ex.videoId?.toString() === videoId,
        );
        if (exercise) {
          return {
            ...exercise,
            order: index,
          };
        }
        return null;
      })
      .filter(
        (exercise): exercise is NonNullable<typeof exercise> =>
          exercise !== null,
      );

    // დარჩენილი სავარჯიშოების დამატება (რომლებსაც არ აქვთ ვიდეო)
    const exercisesWithoutVideo = set.exercises.filter(
      (ex) =>
        !ex.videoId || !videoIds.includes(ex.videoId.toString()),
    );

    set.exercises = [
      ...reorderedExercises,
      ...exercisesWithoutVideo.map((exercise, index) => ({
        ...exercise,
        order: reorderedExercises.length + index,
      })),
    ];

    return set.save();
  }
}
