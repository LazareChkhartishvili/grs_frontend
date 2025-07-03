/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  instructor: string; // User ID

  @IsString()
  image: string;

  @IsNumber()
  price: number;

  @IsNumber()
  duration: number;

  @IsEnum(['beginner', 'intermediate', 'advanced'])
  difficulty: string;

  @IsOptional()
  @IsEnum(['beginner', 'intermediate', 'advanced'])
  level?: string;

  @IsString()
  category: string; // Category ID

  @IsOptional()
  @IsString()
  subcategory?: string; // Subcategory ID

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  objectives?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
