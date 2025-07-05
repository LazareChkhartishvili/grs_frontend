import { Document, Types } from 'mongoose';
export type ReviewDocument = Review & Document;
export declare class Review {
    course: Types.ObjectId;
    user: Types.ObjectId;
    rating: number;
    comment: string;
    isActive: boolean;
}
export declare const ReviewSchema: any;
