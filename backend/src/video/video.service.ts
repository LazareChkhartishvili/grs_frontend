import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Video, VideoDocument } from '../schemas/video.schema';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  // ყველა ვიდეოს მიღება
  async findAll(
    page: number = 1,
    limit: number = 10,
    filters: Record<string, any> = {},
  ): Promise<{ videos: any[]; total: number; pages: number }> {
    const skip = (page - 1) * limit;
    const query = { isActive: true, ...filters };

    // არსებული collection-ის direct query
    const [videos, total] = await Promise.all([
      this.videoModel
        .find(query)
        .sort({ _id: 1 }) // ID-ის მიხედვით დალაგება
        .skip(skip)
        .limit(limit)
        .lean() // plain objects აბრუნებს, არა mongoose documents
        .exec(),
      this.videoModel.countDocuments(query),
    ]);

    return {
      videos,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  // კონკრეტული ვიდეოს მიღება ID-ით
  async findById(id: string): Promise<VideoDocument> {
    try {
      const videoId = new Types.ObjectId(id);
      const video = await this.videoModel.findById(videoId).lean().exec();

      if (!video) {
        throw new NotFoundException('ვიდეო ვერ მოიძებნა');
      }

      return video;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('არასწორი ვიდეოს ID');
    }
  }

  // კატეგორიის კოდის მიხედვით ვიდეოები
  async findByCategoryCode(categoryCode: string): Promise<VideoDocument[]> {
    return this.videoModel
      .find({ categoryCode, isActive: true })
      .sort({ sequence: 1 })
      .lean()
      .exec();
  }

  // Set ID-ის მიხედვით ვიდეოები
  async findBySetId(setId: string): Promise<VideoDocument[]> {
    return this.videoModel
      .find({ setId, isActive: true })
      .sort({ sequence: 1 })
      .lean()
      .exec();
  }

  // Resolution-ის მიხედვით ვიდეოები
  async findByResolution(resolution: string): Promise<VideoDocument[]> {
    return this.videoModel
      .find({ resolution, isActive: true })
      .sort({ sequence: 1 })
      .lean()
      .exec();
  }

  // ვიდეოების ძიება sequence ან name-ით
  async search(
    query: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ videos: VideoDocument[]; total: number; pages: number }> {
    const skip = (page - 1) * limit;

    const searchQuery = {
      isActive: true,
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { sequence: { $regex: query, $options: 'i' } },
        { url: { $regex: query, $options: 'i' } },
      ],
    };

    const [videos, total] = await Promise.all([
      this.videoModel
        .find(searchQuery)
        .sort({ sequence: 1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.videoModel.countDocuments(searchQuery),
    ]);

    return {
      videos,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  // გამორჩეული ვიდეოები (უმაღლესი ID-ებით)
  async getFeaturedVideos(limit: number = 10): Promise<VideoDocument[]> {
    return this.videoModel
      .find({ isActive: true })
      .sort({ _id: -1 }) // ბოლო დამატებული ვიდეოები
      .limit(limit)
      .lean()
      .exec();
  }

  // ყველა კატეგორიის კოდი
  async getAllCategoryCodes(): Promise<string[]> {
    const categories = await this.videoModel
      .distinct('categoryCode', { isActive: true })
      .exec();
    return categories.sort();
  }

  // ყველა Set ID
  async getAllSetIds(): Promise<string[]> {
    const setIds = await this.videoModel
      .distinct('setId', { isActive: true })
      .exec();
    return setIds.sort();
  }

  // ყველა Resolution
  async getAllResolutions(): Promise<string[]> {
    const resolutions = await this.videoModel
      .distinct('resolution', { isActive: true })
      .exec();
    return resolutions.sort();
  }

  // Statistics
  async getVideoStats(): Promise<{
    totalVideos: number;
    totalCategories: number;
    totalSets: number;
    resolutions: Record<string, number>;
    formats: Record<string, number>;
  }> {
    const [totalVideos, categoryCodes, setIds, resolutions, formats] =
      await Promise.all([
        this.videoModel.countDocuments({ isActive: true }),
        this.videoModel.distinct('categoryCode', { isActive: true }),
        this.videoModel.distinct('setId', { isActive: true }),
        this.videoModel.aggregate([
          { $match: { isActive: true } },
          { $group: { _id: '$resolution', count: { $sum: 1 } } },
        ]),
        this.videoModel.aggregate([
          { $match: { isActive: true } },
          { $group: { _id: '$format', count: { $sum: 1 } } },
        ]),
      ]);

    return {
      totalVideos,
      totalCategories: categoryCodes.length,
      totalSets: setIds.length,
      resolutions: resolutions.reduce(
        (acc: Record<string, number>, item: any) => {
          acc[item._id] = item.count;
          return acc;
        },
        {},
      ),
      formats: formats.reduce((acc: Record<string, number>, item: any) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
    };
  }
}
