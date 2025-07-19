declare class LocalizedStringDto {
    ka: string;
    en: string;
    ru: string;
}
export declare class CreateCategoryDto {
    name: LocalizedStringDto;
    description?: LocalizedStringDto;
    image?: string;
    sortOrder?: number;
    isActive?: boolean;
    isPublished?: boolean;
}
export {};
