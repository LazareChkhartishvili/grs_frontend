import { Controller, Get, Param, Query } from '@nestjs/common';
import { VideoService } from './video.service';

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
  ) {
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
  ) {
    if (!query) {
      return { videos: [], total: 0, pages: 0 };
    }
    return this.videoService.search(query, parseInt(page), parseInt(limit));
  }

  // გამორჩეული ვიდეოები
  @Get('featured')
  async getFeaturedVideos(@Query('limit') limit: string = '10') {
    return this.videoService.getFeaturedVideos(parseInt(limit));
  }

  // ვიდეოების სტატისტიკა
  @Get('stats')
  async getVideoStats() {
    return this.videoService.getVideoStats();
  }

  // ყველა კატეგორიის კოდი
  @Get('categories')
  async getAllCategoryCodes() {
    return this.videoService.getAllCategoryCodes();
  }

  // ყველა Set ID
  @Get('sets')
  async getAllSetIds() {
    return this.videoService.getAllSetIds();
  }

  // ყველა Resolution
  @Get('resolutions')
  async getAllResolutions() {
    return this.videoService.getAllResolutions();
  }

  // კატეგორიის კოდის მიხედვით ვიდეოები
  @Get('category/:categoryCode')
  async getVideosByCategoryCode(@Param('categoryCode') categoryCode: string) {
    return this.videoService.findByCategoryCode(categoryCode);
  }

  // Set ID-ის მიხედვით ვიდეოები
  @Get('set/:setId')
  async getVideosBySetId(@Param('setId') setId: string) {
    return this.videoService.findBySetId(setId);
  }

  // Resolution-ის მიხედვით ვიდეოები
  @Get('resolution/:resolution')
  async getVideosByResolution(@Param('resolution') resolution: string) {
    return this.videoService.findByResolution(resolution);
  }

  // კონკრეტული ვიდეოს მიღება ID-ით
  // @Get(':id')
  // async getVideoById(@Param('id') id: string) {
  //   return this.videoService.findById(id);
  // }

  // // ვიდეოებიდან კატეგორიებისა და სეტების სტრუქტურა
  // @Get('structure')
  // async getStructure() {
  //   return this.videoService.getStructureMetadata();
  // }

  // // სრული სტრუქტურა ვიდეოებით
  // @Get('structure/full')
  // async getFullStructure() {
  //   return this.videoService.createStructureFromVideos();
  // }
}
