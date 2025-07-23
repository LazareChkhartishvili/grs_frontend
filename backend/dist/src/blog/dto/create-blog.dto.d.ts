export declare class LocalizedStringDto {
    ka: string;
    en: string;
    ru: string;
}
export declare class CreateBlogDto {
    title: LocalizedStringDto;
    description: LocalizedStringDto;
    excerpt: LocalizedStringDto;
    imageUrl: string;
    categoryId: string;
    link: string;
    tags?: string[];
    isPublished?: boolean;
    isFeatured?: boolean;
    publishDate?: Date;
    viewsCount?: number;
    likesCount?: number;
    isActive?: boolean;
    sortOrder?: number;
}
