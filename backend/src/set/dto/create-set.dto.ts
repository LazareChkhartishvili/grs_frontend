import { IsString, IsNumber, IsBoolean, ValidateNested, IsOptional, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

class LocalizedStringDto {
  @IsString()
  ka: string;

  @IsString()
  en: string;

  @IsString()
  ru: string;
}

class LevelDto {
  @IsNumber()
  exerciseCount: number;

  @IsBoolean()
  isLocked: boolean;
}

class LevelsDto {
  @ValidateNested()
  @Type(() => LevelDto)
  beginner: LevelDto;

  @ValidateNested()
  @Type(() => LevelDto)
  intermediate: LevelDto;

  @ValidateNested()
  @Type(() => LevelDto)
  advanced: LevelDto;
}

class PriceDto {
  @IsNumber()
  monthly: number;

  @IsNumber()
  threeMonths: number;

  @IsNumber()
  sixMonths: number;

  @IsNumber()
  yearly: number;
}

export class CreateSetDto {
  name: {
    ka: string;
    en: string;
    ru: string;
  };

  description: {
    ka: string;
    en: string;
    ru: string;
  };

  thumbnailImage: string;

  totalExercises: number;

  totalDuration: string;

  difficultyLevels: number;

  levels: {
    beginner: {
      exerciseCount: number;
      isLocked: boolean;
    };
    intermediate: {
      exerciseCount: number;
      isLocked: boolean;
    };
    advanced: {
      exerciseCount: number;
      isLocked: boolean;
    };
  };

  price: {
    monthly: number;
    threeMonths: number;
    sixMonths: number;
    yearly: number;
  };

  isActive: boolean;

  isPublished: boolean;

  sortOrder: number;

  categoryId: string;

  subCategoryId?: string;
} 