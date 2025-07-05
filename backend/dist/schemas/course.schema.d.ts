import { Document, Types } from 'mongoose';
export type CourseDocument = Course & Document;
export declare class Course {
    title: string;
    description: string;
    instructor: Types.ObjectId;
    image: string;
    price: number;
    duration: number;
    level: string;
    language: string;
    category: Types.ObjectId;
    subcategory: Types.ObjectId;
    lessons: Types.ObjectId[];
    rating: number;
    reviewsCount: number;
    isPublished: boolean;
    lessonsCount: number;
    studentsCount: number;
    tags: string[];
    requirements: string[];
    objectives: string[];
    isActive: boolean;
}
export declare const CourseSchema: any;
