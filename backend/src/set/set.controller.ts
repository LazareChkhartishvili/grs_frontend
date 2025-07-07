import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SetService } from './set.service';
import { Set } from '../schemas/set.schema';

@Controller('sets')
export class SetController {
  constructor(private readonly setService: SetService) {}

  @Post()
  async createSet(
    @Body()
    setData: {
      name: string;
      description?: string;
      monthlyPrice: number;
      categoryId: string;
      subcategoryId?: string;
      setNumber: string;
      videos?: string[];
      subscriptionPlans: { period: number; price: number }[];
    },
  ) {
    return this.setService.createSet(setData);
  }

  @Put(':id')
  async updateSet(@Param('id') id: string, @Body() updateData: Partial<Set>) {
    return this.setService.updateSet(id, updateData);
  }

  @Delete(':id')
  async deleteSet(@Param('id') id: string) {
    return this.setService.deleteSet(id);
  }

  @Get(':id')
  async getSet(@Param('id') id: string) {
    return this.setService.getSetById(id);
  }

  @Get()
  async getAllSets() {
    return this.setService.getAllSets();
  }

  @Get('category/:categoryId')
  async getSetsByCategory(@Param('categoryId') categoryId: string) {
    return this.setService.getSetsByCategory(categoryId);
  }

  @Get('subcategory/:subcategoryId')
  async getSetsBySubcategory(@Param('subcategoryId') subcategoryId: string) {
    return this.setService.getSetsBySubcategory(subcategoryId);
  }

  @Post(':id/videos')
  async addVideosToSet(
    @Param('id') id: string,
    @Body('videoIds') videoIds: string[],
  ) {
    return this.setService.addVideosToSet(id, videoIds);
  }

  @Delete(':id/videos')
  async removeVideosFromSet(
    @Param('id') id: string,
    @Body('videoIds') videoIds: string[],
  ) {
    return this.setService.removeVideosFromSet(id, videoIds);
  }

  @Put(':id/videos/reorder')
  async reorderSetVideos(
    @Param('id') id: string,
    @Body('videoIds') videoIds: string[],
  ) {
    return this.setService.reorderSetVideos(id, videoIds);
  }

  @Post(':id/link-videos')
  async linkVideosToSet(@Param('id') id: string) {
    return this.setService.linkVideosToSet(id);
  }
}
