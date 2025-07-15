import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Set as SetModel, SetDocument } from '../schemas/set.schema';
import { Video, VideoDocument } from '../schemas/video.schema';

interface ExerciseWithVideo {
  videoId: Types.ObjectId;
  [key: string]: any;
}

const hasVideoId = (exercise: unknown): exercise is ExerciseWithVideo => {
  return Boolean(
    exercise &&
      typeof exercise === 'object' &&
      'videoId' in exercise &&
      exercise.videoId instanceof Types.ObjectId,
  );
};

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
    monthlyPrice: number;
    categoryId: string;
    subcategoryId?: string;
    setNumber: string;
    videos?: string[];
    subscriptionPlans: { period: number; price: number }[];
  }): Promise<SetDocument> {
    // ვიდეოებისთვის სავარჯიშოების შექმნა
    const exercises =
      setData.videos?.map((videoId, index) => ({
        _id: new Types.ObjectId(),
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

    await set.save();

    // ვიდეოების ინფორმაციის დამატება
    const videoIds = set.exercises.map((ex) => ex.videoId).filter(Boolean);
    const videos = await this.videoModel
      .find({ _id: { $in: videoIds } })
      .select(
        '_id name url categoryCode setId sequence resolution format duration',
      )
      .lean()
      .exec();

    const populatedSet = set.toObject();
    populatedSet.exercises = populatedSet.exercises.map((exercise) => {
      if (exercise.videoId) {
        const video = videos.find(
          (v) => String(v._id) === String(exercise.videoId),
        );
        return {
          ...exercise,
          video: video || null,
        };
      }
      return exercise;
    });

    return populatedSet;
  }

  // სეტის განახლება
  async updateSet(
    setId: string,
    updateData: Partial<SetModel>,
  ): Promise<SetDocument> {
    const updatePayload = { ...updateData } as unknown as {
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
      updatePayload['exercises'] = updatePayload.videos.map(
        (videoId, index) => ({
          _id: new Types.ObjectId(),
          repetitions: 1,
          sets: 1,
          restTime: 0,
          duration: 0,
          order: index,
          videoId: new Types.ObjectId(videoId),
        }),
      );
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
      .select(
        '_id name url categoryCode setId sequence resolution format duration',
      )
      .lean()
      .exec();

    const populatedSet = set.toObject();
    populatedSet.exercises = populatedSet.exercises.map((exercise) => {
      if (exercise.videoId) {
        const video = videos.find(
          (v) => String(v._id) === String(exercise.videoId),
        );
        return {
          ...exercise,
          video: video || null,
        };
      }
      return exercise;
    });

    return populatedSet;
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
      .select(
        '_id name url categoryCode setId sequence resolution format duration',
      )
      .lean()
      .exec();

    const populatedSet = set.toObject();
    populatedSet.exercises = populatedSet.exercises.map((exercise) => {
      if (exercise.videoId) {
        const video = videos.find(
          (v) => String(v._id) === String(exercise.videoId),
        );
        return {
          ...exercise,
          video: video || null,
        };
      }
      return exercise;
    });

    return populatedSet;
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
      .select(
        '_id name url categoryCode setId sequence resolution format duration',
      )
      .lean()
      .exec();

    return sets.map((set) => {
      const populatedSet = set.toObject();
      populatedSet.exercises = populatedSet.exercises.map((exercise) => {
        if (exercise.videoId) {
          const video = videos.find(
            (v) => String(v._id) === String(exercise.videoId),
          );
          return {
            ...exercise,
            video: video || null,
          };
        }
        return exercise;
      });
      return populatedSet;
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
      .select(
        '_id name url categoryCode setId sequence resolution format duration',
      )
      .lean()
      .exec();

    return sets.map((set) => {
      const populatedSet = set.toObject();
      populatedSet.exercises = populatedSet.exercises.map((exercise) => {
        if (exercise.videoId) {
          const video = videos.find(
            (v) => String(v._id) === String(exercise.videoId),
          );
          return {
            ...exercise,
            video: video || null,
          };
        }
        return exercise;
      });
      return populatedSet;
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
      .select(
        '_id name url categoryCode setId sequence resolution format duration',
      )
      .lean()
      .exec();

    return sets.map((set) => {
      const populatedSet = set.toObject();
      populatedSet.exercises = populatedSet.exercises.map((exercise) => {
        if (exercise.videoId) {
          const video = videos.find(
            (v) => String(v._id) === String(exercise.videoId),
          );
          return {
            ...exercise,
            video: video || null,
          };
        }
        return exercise;
      });
      return populatedSet;
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

    // ახალი სავარჯიშოების შექმნა ახალი ვიდეოებისთვის
    const newExercises = videoIds
      .filter((id) => !existingVideoIds.includes(id))
      .map((videoId, index) => ({
        _id: new Types.ObjectId(),
        repetitions: 1,
        sets: 1,
        restTime: 0,
        duration: 0,
        order: set.exercises.length + index,
        videoId: new Types.ObjectId(videoId),
      }));

    set.exercises = [...set.exercises, ...newExercises];

    await set.save();

    // ვიდეოების ინფორმაციის დამატება
    const allVideoIds = set.exercises.map((ex) => ex.videoId).filter(Boolean);
    const videos = await this.videoModel
      .find({ _id: { $in: allVideoIds } })
      .select(
        '_id name url categoryCode setId sequence resolution format duration',
      )
      .lean()
      .exec();

    const populatedSet = set.toObject();
    populatedSet.exercises = populatedSet.exercises.map((exercise) => {
      if (exercise.videoId) {
        const video = videos.find(
          (v) => String(v._id) === String(exercise.videoId),
        );
        return {
          ...exercise,
          video: video || null,
        };
      }
      return exercise;
    });

    return populatedSet;
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
        !exercise.videoId || !videoIds.includes(exercise.videoId.toString()),
    );

    // სავარჯიშოების order-ის განახლება
    set.exercises = set.exercises.map((exercise, index) => ({
      ...exercise,
      order: index,
    }));

    await set.save();

    // ვიდეოების ინფორმაციის დამატება
    const allVideoIds = set.exercises.map((ex) => ex.videoId).filter(Boolean);
    const videos = await this.videoModel
      .find({ _id: { $in: allVideoIds } })
      .select(
        '_id name url categoryCode setId sequence resolution format duration',
      )
      .lean()
      .exec();

    const populatedSet = set.toObject();
    populatedSet.exercises = populatedSet.exercises.map((exercise) => {
      if (exercise.videoId) {
        const video = videos.find(
          (v) => String(v._id) === String(exercise.videoId),
        );
        return {
          ...exercise,
          video: video || null,
        };
      }
      return exercise;
    });

    return populatedSet;
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
      (ex) => !ex.videoId || !videoIds.includes(ex.videoId.toString()),
    );

    set.exercises = [
      ...reorderedExercises,
      ...exercisesWithoutVideo.map((exercise, index) => ({
        ...exercise,
        order: reorderedExercises.length + index,
      })),
    ];

    await set.save();

    // ვიდეოების ინფორმაციის დამატება
    const allVideoIds = set.exercises.map((ex) => ex.videoId).filter(Boolean);
    const videos = await this.videoModel
      .find({ _id: { $in: allVideoIds } })
      .select(
        '_id name url categoryCode setId sequence resolution format duration',
      )
      .lean()
      .exec();

    const populatedSet = set.toObject();
    populatedSet.exercises = populatedSet.exercises.map((exercise) => {
      if (hasVideoId(exercise)) {
        const video = videos.find(
          (v) => String(v._id) === String(exercise.videoId),
        );
        return {
          ...exercise,
          video: video || null,
        };
      }
      return exercise;
    });

    return populatedSet;
  }

  // ვიდეოების დაკავშირება სეტთან sequence-ის მიხედვით
  async linkVideosToSet(setId: string): Promise<SetDocument> {
    const set = await this.setModel.findById(setId).exec();
    if (!set) {
      throw new NotFoundException('სეტი ვერ მოიძებნა');
    }

    // სეტის ნომრის ამოღება სახელიდან (მაგ: "Set 001 for Orthopedics" -> "001")
    const setNumber = set.name.match(/Set (\d+)/)?.[1];
    if (!setNumber) {
      throw new Error('სეტის ნომერი ვერ მოიძებნა სახელში');
    }

    // ვიპოვოთ ყველა ვიდეო ამ სეტისთვის
    const videos = await this.videoModel
      .find({ setId: setNumber, isActive: true })
      .sort({ sequence: 1 })
      .lean()
      .exec();

    if (!videos.length) {
      throw new Error(`ვიდეოები ვერ მოიძებნა სეტისთვის ${setNumber}`);
    }

    // შევქმნათ ახალი სავარჯიშოები ყველა ვიდეოსთვის
    const exercises = videos.map((video, index) => ({
      _id: new Types.ObjectId(),
      repetitions: 1,
      sets: 1,
      restTime: 0,
      duration: video.duration || 0,
      order: index,
      videoId: video._id,
      video: video as VideoDocument,
    }));

    // განვაახლოთ სეტის სავარჯიშოები
    set.exercises = exercises;
    await set.save();

    return set.toObject();
  }
}
