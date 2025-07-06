import { Document, Types } from 'mongoose';
export type VideoDocument = Video & Document;
export declare class Video {
    _id?: number;
    name: string;
    categoryCode: string;
    categoryId?: Types.ObjectId;
    setId: string;
    url: string;
    sequence: string;
    resolution: string;
    format: string;
    fileSize?: number;
    duration?: number;
    isActive: boolean;
    title?: string;
    description?: string;
    thumbnailUrl?: string;
    tags?: string[];
    transcript?: string;
    viewsCount: number;
    likesCount: number;
    mimeType?: string;
    isPublic: boolean;
    isProcessed: boolean;
    sortOrder: number;
}
export declare const VideoSchema: import("mongoose").Schema<Video, import("mongoose").Model<Video, any, any, any, Document<unknown, any, Video> & Video & Required<{
    _id: number;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Video, Document<unknown, {}, import("mongoose").FlatRecord<Video>> & import("mongoose").FlatRecord<Video> & Required<{
    _id: number;
}>>;
