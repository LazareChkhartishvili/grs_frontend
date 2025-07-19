import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(@UploadedFiles() files: Express.Multer.File[], @Body() data: any) {
    try {
      console.log('Received data:', data);
      console.log('Video URL from request:', data.videoUrl);
      console.log('Video URL type:', typeof data.videoUrl);

      // Parse localized fields from strings to objects
      const parsedData = {
        ...data,
        name: JSON.parse(data.name),
        description: JSON.parse(data.description),
        recommendations: JSON.parse(data.recommendations),
      };

      // Validate required fields
      if (!parsedData.name.ka || !parsedData.description.ka || !parsedData.recommendations.ka) {
        throw new BadRequestException('ქართული ენის ველები სავალდებულოა');
      }

      // Handle video and thumbnail URLs/files
      let videoUrl = '';
      let thumbnailUrl = '';
      
      console.log('Processing video URL...');
      // Check for video URL in the request data
      if (data.videoUrl) {
        if (Array.isArray(data.videoUrl)) {
          videoUrl = data.videoUrl[0]?.trim() || '';
          console.log('Video URL array found, using first URL:', videoUrl);
        } else if (typeof data.videoUrl === 'string' && data.videoUrl.trim()) {
          videoUrl = data.videoUrl.trim();
          console.log('Video URL string found:', videoUrl);
        } else {
          console.log('Video URL validation failed:',
            'exists:', !!data.videoUrl,
            'is array:', Array.isArray(data.videoUrl),
            'is string:', typeof data.videoUrl === 'string',
            'has content:', data.videoUrl?.trim?.());
        }
      }
      
      // Check for thumbnail URL in the request data
      if (data.thumbnailUrl) {
        if (Array.isArray(data.thumbnailUrl)) {
          thumbnailUrl = data.thumbnailUrl[0]?.trim() || '';
          console.log('Thumbnail URL array found, using first URL:', thumbnailUrl);
        } else if (typeof data.thumbnailUrl === 'string' && data.thumbnailUrl.trim()) {
          thumbnailUrl = data.thumbnailUrl.trim();
          console.log('Thumbnail URL string found:', thumbnailUrl);
        } else {
          console.log('Thumbnail URL validation failed:',
            'exists:', !!data.thumbnailUrl,
            'is array:', Array.isArray(data.thumbnailUrl),
            'is string:', typeof data.thumbnailUrl === 'string',
            'has content:', data.thumbnailUrl?.trim?.());
        }
      }
      
      // Check for uploaded files
      if (files && files.length > 0) {
        console.log('Processing files:', files.length, 'files found');
        const videoFile = files.find(f => f.mimetype.startsWith('video/'));
        const imageFile = files.find(f => f.mimetype.startsWith('image/'));
        
        if (videoFile) {
          videoUrl = videoFile.path;
          console.log('Video file found, using path:', videoUrl);
        }
        if (imageFile) {
          thumbnailUrl = imageFile.path;
        }
      }

      // Validate that either URL or file is provided for both video and thumbnail
      if (!videoUrl) { 
        console.log('Final video URL check failed - videoUrl is empty');
        throw new BadRequestException('ვიდეოს URL ან ფაილი სავალდებულოა');
      }

      if (!thumbnailUrl) {
        throw new BadRequestException('სურათის URL ან ფაილი სავალდებულოა');
      }

      // Create exercise with parsed data
      return await this.exerciseService.create({
        ...parsedData,
        videoUrl,
        thumbnailUrl,
      });
    } catch (error) {
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

  @Get('difficulty/:difficulty')
  findByDifficulty(@Param('difficulty') difficulty: 'easy' | 'medium' | 'hard') {
    return this.exerciseService.findByDifficulty(difficulty);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))
  async update(
    @Param('id') id: string, 
    @Body() data: any,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    try {
      const updateData: any = { ...data };

      // Parse localized fields if they exist
      if (data.name) updateData.name = JSON.parse(data.name);
      if (data.description) updateData.description = JSON.parse(data.description);
      if (data.recommendations) updateData.recommendations = JSON.parse(data.recommendations);

      // Handle video and thumbnail URLs/files
      if (files && files.length > 0) {
        const videoFile = files.find(f => f.mimetype.startsWith('video/'));
        const imageFile = files.find(f => f.mimetype.startsWith('image/'));
        
        if (videoFile) {
          updateData.videoUrl = videoFile.path;
        }
        if (imageFile) {
          updateData.thumbnailUrl = imageFile.path;
        }
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