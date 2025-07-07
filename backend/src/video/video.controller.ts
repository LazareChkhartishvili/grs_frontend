import { Controller, Get, Param, Query } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoDocument } from '../schemas/video.schema';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  // ყველა ვიდეოს მიღება pagination-ით
  @Get()
  async getAllVideos(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('categoryCode') categoryCode?: string,
    @Query('setId') setId?: string,
    @Query('resolution') resolution?: string,
    @Query('format') format?: string,
  ): Promise<{ videos: VideoDocument[]; total: number; pages: number }> {
    const filters: Record<string, any> = {};
    if (categoryCode) filters.categoryCode = categoryCode;
    if (setId) filters.setId = setId;
    if (resolution) filters.resolution = resolution;
    if (format) filters.format = format;

    return this.videoService.findAll(parseInt(page), parseInt(limit), filters);
  }

  // ვიდეოების ძიება
  @Get('search')
  async searchVideos(
    @Query('q') query: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): Promise<{ videos: VideoDocument[]; total: number; pages: number }> {
    if (!query) {
      return { videos: [], total: 0, pages: 0 };
    }
    return this.videoService.search(query, parseInt(page), parseInt(limit));
  }

  // გამორჩეული ვიდეოები
  @Get('featured')
  async getFeaturedVideos(
    @Query('limit') limit: string = '10',
  ): Promise<VideoDocument[]> {
    return this.videoService.getFeaturedVideos(parseInt(limit));
  }

  // ვიდეოების სტატისტიკა
  @Get('stats')
  async getVideoStats(): Promise<{
    totalVideos: number;
    totalCategories: number;
    totalSets: number;
    resolutions: Record<string, number>;
    formats: Record<string, number>;
  }> {
    return this.videoService.getVideoStats();
  }

  // ყველა კატეგორიის კოდი
  @Get('categories')
  async getAllCategoryCodes(): Promise<string[]> {
    return this.videoService.getAllCategoryCodes();
  }

  // ყველა Set ID
  @Get('sets')
  async getAllSetIds(): Promise<string[]> {
    return this.videoService.getAllSetIds();
  }

  // ყველა Resolution
  @Get('resolutions')
  async getAllResolutions(): Promise<string[]> {
    return this.videoService.getAllResolutions();
  }

  // კატეგორიის კოდის მიხედვით ვიდეოები
  @Get('category/:categoryCode')
  async getVideosByCategoryCode(
    @Param('categoryCode') categoryCode: string,
  ): Promise<VideoDocument[]> {
    return this.videoService.findByCategoryCode(categoryCode);
  }

  // Set ID-ის მიხედვით ვიდეოები
  @Get('set/:setId')
  async getVideosBySetId(
    @Param('setId') setId: string,
  ): Promise<VideoDocument[]> {
    return this.videoService.findBySetId(setId);
  }

  // Resolution-ის მიხედვით ვიდეოები
  @Get('resolution/:resolution')
  async getVideosByResolution(
    @Param('resolution') resolution: string,
  ): Promise<VideoDocument[]> {
    return this.videoService.findByResolution(resolution);
  }

  // კონკრეტული ვიდეოს მიღება ID-ით
  @Get(':id')
  async getVideoById(@Param('id') id: string): Promise<VideoDocument> {
    return this.videoService.findById(id);
  }
}
