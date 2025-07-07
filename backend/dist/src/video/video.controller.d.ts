import { VideoService } from './video.service';
import { VideoDocument } from '../schemas/video.schema';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    getAllVideos(page?: string, limit?: string, categoryCode?: string, setId?: string, resolution?: string, format?: string): Promise<{
        videos: VideoDocument[];
        total: number;
        pages: number;
    }>;
    searchVideos(query: string, page?: string, limit?: string): Promise<{
        videos: VideoDocument[];
        total: number;
        pages: number;
    }>;
    getFeaturedVideos(limit?: string): Promise<VideoDocument[]>;
    getVideoStats(): Promise<{
        totalVideos: number;
        totalCategories: number;
        totalSets: number;
        resolutions: Record<string, number>;
        formats: Record<string, number>;
    }>;
    getAllCategoryCodes(): Promise<string[]>;
    getAllSetIds(): Promise<string[]>;
    getAllResolutions(): Promise<string[]>;
    getVideosByCategoryCode(categoryCode: string): Promise<VideoDocument[]>;
    getVideosBySetId(setId: string): Promise<VideoDocument[]>;
    getVideosByResolution(resolution: string): Promise<VideoDocument[]>;
    getVideoById(id: string): Promise<VideoDocument>;
}
