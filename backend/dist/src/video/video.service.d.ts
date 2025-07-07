import { Model } from 'mongoose';
import { VideoDocument } from '../schemas/video.schema';
export declare class VideoService {
    private videoModel;
    constructor(videoModel: Model<VideoDocument>);
    findAll(page?: number, limit?: number, filters?: Record<string, any>): Promise<{
        videos: any[];
        total: number;
        pages: number;
    }>;
    findById(id: string): Promise<VideoDocument>;
    findByCategoryCode(categoryCode: string): Promise<VideoDocument[]>;
    findBySetId(setId: string): Promise<VideoDocument[]>;
    findByResolution(resolution: string): Promise<VideoDocument[]>;
    search(query: string, page?: number, limit?: number): Promise<{
        videos: VideoDocument[];
        total: number;
        pages: number;
    }>;
    getFeaturedVideos(limit?: number): Promise<VideoDocument[]>;
    getAllCategoryCodes(): Promise<string[]>;
    getAllSetIds(): Promise<string[]>;
    getAllResolutions(): Promise<string[]>;
    getVideoStats(): Promise<{
        totalVideos: number;
        totalCategories: number;
        totalSets: number;
        resolutions: Record<string, number>;
        formats: Record<string, number>;
    }>;
}
