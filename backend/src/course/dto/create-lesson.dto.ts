/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class CreateLessonDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  videoUrl: string;

  @IsNumber()
  duration: number; // წუთები

  @IsNumber()
  order: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  exercises?: string[]; // Exercise IDs

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  materials?: string[];

  @IsOptional()
  @IsString()
  transcript?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
