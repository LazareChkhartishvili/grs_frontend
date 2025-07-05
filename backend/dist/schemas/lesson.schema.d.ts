import { Document, Types } from 'mongoose';
export type LessonDocument = Lesson & Document;
export declare class Lesson {
    title: string;
    description: string;
    videoUrl: string;
    duration: number;
    order: number;
    course: Types.ObjectId;
    exercises: Types.ObjectId[];
    isActive: boolean;
    materials: string[];
    transcript: string;
}
export declare const LessonSchema: any;
