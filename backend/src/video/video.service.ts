import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Video, VideoDocument } from '../schemas/video.schema';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  async findAll(): Promise<Video[]> {
    return this.videoModel.find().exec();
  }

  async findById(id: string): Promise<Video | null> {
    return this.videoModel.findById(new Types.ObjectId(id)).exec();
  }

  async findByIds(ids: string[]): Promise<Video[]> {
    return this.videoModel
      .find({ _id: { $in: ids.map(id => new Types.ObjectId(id)) } })
      .exec();
  }

  async findByCategory(categoryCode: string): Promise<Video[]> {
    return this.videoModel.find({ categoryCode }).exec();
  }

  async findBySet(setId: string): Promise<Video[]> {
    return this.videoModel.find({ setId }).exec();
  }

  async findByResolution(resolution: string): Promise<Video[]> {
    return this.videoModel.find({ resolution }).exec();
  }

  async findFeatured(): Promise<Video[]> {
    return this.videoModel
      .find({ isPublic: true })
      .sort({ viewsCount: -1 })
      .limit(10)
      .exec();
  }

  async search(query: string): Promise<Video[]> {
    return this.videoModel
      .find(
        { $text: { $search: query } },
        { score: { $meta: 'textScore' } },
      )
      .sort({ score: { $meta: 'textScore' } })
      .exec();
  }

  async getStats(): Promise<{
    totalVideos: number;
    totalDuration: number;
    totalViews: number;
  }> {
    const [stats] = await this.videoModel
      .aggregate([
        {
          $group: {
            _id: null,
            totalVideos: { $sum: 1 },
            totalDuration: { $sum: '$duration' },
            totalViews: { $sum: '$viewsCount' },
          },
        },
      ])
      .exec();

    return {
      totalVideos: stats?.totalVideos || 0,
      totalDuration: stats?.totalDuration || 0,
      totalViews: stats?.totalViews || 0,
    };
  }

  async getCategories(): Promise<string[]> {
    return this.videoModel.distinct('categoryCode').exec();
  }

  async getSets(): Promise<string[]> {
    return this.videoModel.distinct('setId').exec();
  }

  async getResolutions(): Promise<string[]> {
    return this.videoModel.distinct('resolution').exec();
  }
}
