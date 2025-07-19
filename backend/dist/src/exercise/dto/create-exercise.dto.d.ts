declare class LocalizedStringDto {
    ka: string;
    en: string;
    ru: string;
}
export declare class CreateExerciseDto {
    name: LocalizedStringDto;
    description: LocalizedStringDto;
    recommendations: LocalizedStringDto;
    videoUrl?: string;
    thumbnailUrl?: string;
    videoDuration: string;
    duration: string;
    difficulty: 'easy' | 'medium' | 'hard';
    repetitions: string;
    sets: string;
    restTime: string;
    isActive?: boolean;
    isPublished?: boolean;
    sortOrder?: number;
    setId: string;
    categoryId: string;
    subCategoryId?: string;
}
export {};
