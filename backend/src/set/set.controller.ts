import { Controller, Get, Post, Body, Param, Query, Patch } from '@nestjs/common';
import { SetService } from './set.service';
import { CreateSetDto } from './dto/create-set.dto';

@Controller('sets')
export class SetController {
  constructor(private readonly setService: SetService) {}

  @Post()
  create(@Body() createSetDto: CreateSetDto) {
    return this.setService.create(createSetDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetDto: Partial<CreateSetDto>) {
    return this.setService.update(id, updateSetDto);
  }

  @Get()
  findAll(@Query() query: { categoryId?: string; subCategoryId?: string }) {
    return this.setService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setService.findOne(id);
  }
} 