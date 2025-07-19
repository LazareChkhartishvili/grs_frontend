declare class LocalizedStringDto {
    ka: string;
    en: string;
    ru: string;
}
declare class LevelDto {
    exerciseCount: number;
    isLocked: boolean;
}
declare class LevelsDto {
    beginner: LevelDto;
    intermediate: LevelDto;
    advanced: LevelDto;
}
declare class PriceDto {
    monthly: number;
    threeMonths: number;
    sixMonths: number;
    yearly: number;
}
export declare class CreateSetDto {
    name: LocalizedStringDto;
    description: LocalizedStringDto;
    thumbnailImage: string;
    totalExercises?: number;
    totalDuration?: string;
    difficultyLevels?: number;
    levels: LevelsDto;
    price: PriceDto;
    isActive?: boolean;
    isPublished?: boolean;
    sortOrder?: number;
    categoryId: string;
    subCategoryId?: string;
}
export {};
