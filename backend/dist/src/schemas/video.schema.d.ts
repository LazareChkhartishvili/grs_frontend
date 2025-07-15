import { Document } from 'mongoose';
export type VideoDocument = Video & Document;
export declare class Video {
    videoId: string;
    title: {
        ka: string;
        en: string;
        ru: string;
    };
    description?: {
        ka?: string;
        en?: string;
        ru?: string;
    };
    urls: {
        hd: string;
        sd: string;
    };
    categoryCode: string;
    sequence: string;
    isActive: boolean;
    sortOrder: number;
    viewCount: number;
    isPublic: boolean;
    duration: number;
}
export declare const VideoSchema: import("mongoose").Schema<Video, import("mongoose").Model<Video, any, any, any, Document<unknown, any, Video> & Video & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Video, Document<unknown, {}, import("mongoose").FlatRecord<Video>> & import("mongoose").FlatRecord<Video> & {
    _id: import("mongoose").Types.ObjectId;
}>;
