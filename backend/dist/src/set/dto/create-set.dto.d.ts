export declare class CreateSetDto {
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
