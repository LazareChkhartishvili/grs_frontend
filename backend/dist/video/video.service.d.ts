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
    findById(id: string | number): Promise<any>;
    findByCategoryCode(categoryCode: string): Promise<any[]>;
    findBySetId(setId: string): Promise<any[]>;
    findByResolution(resolution: string): Promise<any[]>;
    search(query: string, page?: number, limit?: number): Promise<{
        videos: any[];
        total: number;
        pages: number;
    }>;
    getFeaturedVideos(limit?: number): Promise<any[]>;
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
