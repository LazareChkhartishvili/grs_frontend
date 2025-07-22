import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import * as streamifier from 'streamifier';
import { memoryStorage } from 'multer';
import { Types } from 'mongoose';
import cloudinary from '../cloudinary.config';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  
  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() data: any) {
    console.log('--- [CONTROLLER] ---');
    console.log('file:', file);
    console.log('file instanceof File:', file instanceof File);
    console.log('file originalname:', file?.originalname);
    console.log('file buffer:', !!file?.buffer);
    console.log('body:', data);

    try {
      const parsedData = {
        ...data,
        name: JSON.parse(data.name),
        description: JSON.parse(data.description),
        recommendations: JSON.parse(data.recommendations),
      };

      if (!parsedData.name.ka || !parsedData.description.ka || !parsedData.recommendations.ka) {
        throw new BadRequestException('ქართული ენის ველები სავალდებულოა');
      }

      let videoUrl = '';
      let thumbnailUrl = '';

      // Cloudinary upload helper
      const uploadToCloudinary = (file: Express.Multer.File, resource_type: 'image' | 'video') => {
        return new Promise<string>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );
          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
      };

      if (!file || !file.buffer) {
        throw new BadRequestException('ფაილი სავალდებულოა და უნდა იყოს სწორი ტიპის');
      }

      // თუ მოდის ფაილი, ვტვირთავთ Cloudinary-ზე როგორც სურათს
      if (file) {
        thumbnailUrl = await uploadToCloudinary(file, 'image');
        console.log('Cloudinary thumbnailUrl:', thumbnailUrl);
      }

      // თუ მოდის videoUrl ან thumbnailUrl ტექსტით, ვიყენებთ მას
      if (data.videoUrl) {
        videoUrl = typeof data.videoUrl === 'string' ? data.videoUrl.trim() : '';
      }
      if (data.thumbnailUrl && !thumbnailUrl) {
        thumbnailUrl = typeof data.thumbnailUrl === 'string' ? data.thumbnailUrl.trim() : '';
      }

      if (!thumbnailUrl) {
        throw new BadRequestException('სურათის ატვირთვა სავალდებულოა');
      }

      console.log('parsedData:', parsedData);
      console.log('videoUrl:', videoUrl);
      console.log('thumbnailUrl:', thumbnailUrl);

      const result = await this.exerciseService.create({
        ...parsedData,
        videoUrl,
        thumbnailUrl,
      });
      console.log('--- [CONTROLLER] Saved result:', result);
      return result;
    } catch (error) {
      console.error('❌ Backend error:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  findAll(@Query() query: { categoryId?: string; subCategoryId?: string }) {
    return this.exerciseService.findAll(query);
  }

  @Get('set/:setId')
  findBySet(@Param('setId') setId: string) {
    return this.exerciseService.findBySet(setId);
  }

  @Get('category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.exerciseService.findByCategory(categoryId);
  }

  @Get('popular')
  findPopular() {
    return this.exerciseService.findPopular();
  }

  @Get('difficulty/:difficulty')
  findByDifficulty(@Param('difficulty') difficulty: 'easy' | 'medium' | 'hard') {
    return this.exerciseService.findByDifficulty(difficulty);
  }

  @Patch('bulk/popular')
  bulkSetPopular(@Body() body: { exerciseIds: string[]; isPopular: boolean }) {
    return this.exerciseService.bulkSetPopular(body.exerciseIds, body.isPopular);
  }

  @Patch(':id/popular')
  setPopular(@Param('id') id: string, @Body() body: { isPopular: boolean }) {
    console.log('🔥 setPopular called with:', { id, body });
    return this.exerciseService.setPopular(id, body.isPopular);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string, 
    @Body() data: any,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      const updateData: any = { ...data };

      // Parse localized fields if they exist
      if (data.name) updateData.name = JSON.parse(data.name);
      if (data.description) updateData.description = JSON.parse(data.description);
      if (data.recommendations) updateData.recommendations = JSON.parse(data.recommendations);

      // Handle video and thumbnail URLs/files
      if (file) {
        updateData.thumbnailUrl = file.path;
      }

      return this.exerciseService.update(id, updateData);
    } catch (error) {
      if (error.name === 'SyntaxError') {
        throw new BadRequestException('არასწორი JSON ფორმატი ლოკალიზებულ ველებში');
      }
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseService.remove(id);
  }
} 