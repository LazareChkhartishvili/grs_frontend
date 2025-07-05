import { Document } from 'mongoose';
export type VideoDocument = Video & Document;
export declare class Video {
    _id?: number;
    name: string;
    categoryCode: string;
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
export declare const VideoSchema: any;
