export declare class CreateCourseDto {
    title: string;
    description: string;
    instructor: string;
    image: string;
    price: number;
    duration: number;
    difficulty: string;
    level?: string;
    category: string;
    subcategory?: string;
    tags?: string[];
    requirements?: string[];
    objectives?: string[];
    isActive?: boolean;
}
