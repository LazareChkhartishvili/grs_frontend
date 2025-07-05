import { VideoService } from './video.service';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    getAllVideos(page?: string, limit?: string, categoryCode?: string, setId?: string, resolution?: string, format?: string): unknown;
    searchVideos(query: string, page?: string, limit?: string): unknown;
    getFeaturedVideos(limit?: string): unknown;
    getVideoStats(): unknown;
    getAllCategoryCodes(): unknown;
    getAllSetIds(): unknown;
    getAllResolutions(): unknown;
    getVideosByCategoryCode(categoryCode: string): unknown;
    getVideosBySetId(setId: string): unknown;
    getVideosByResolution(resolution: string): unknown;
}
