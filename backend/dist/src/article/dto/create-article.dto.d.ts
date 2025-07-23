export declare class LocalizedStringDto {
    ka: string;
    en: string;
    ru: string;
}
export declare class TableOfContentItemDto {
    title: LocalizedStringDto;
    anchor: string;
}
export declare class AuthorDto {
    name: string;
    bio?: string;
    avatar?: string;
}
export declare class CreateArticleDto {
    title: LocalizedStringDto;
    excerpt: LocalizedStringDto;
    content: LocalizedStringDto;
    blogId: string;
    categoryId: string;
    featuredImages?: string[];
    author: AuthorDto;
    readTime: string;
    commentsCount?: number;
    tableOfContents?: TableOfContentItemDto[];
    tags?: string[];
    isPublished?: boolean;
    isFeatured?: boolean;
    publishDate?: Date;
    viewsCount?: number;
    likesCount?: number;
    isActive?: boolean;
    sortOrder?: number;
}
