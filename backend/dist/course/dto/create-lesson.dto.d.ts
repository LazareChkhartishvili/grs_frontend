export declare class CreateLessonDto {
    title: string;
    description: string;
    videoUrl: string;
    duration: number;
    order: number;
    exercises?: string[];
    materials?: string[];
    transcript?: string;
    isActive?: boolean;
}
