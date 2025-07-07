import { Model } from 'mongoose';
import { Set as SetModel, SetDocument } from '../schemas/set.schema';
import { VideoDocument } from '../schemas/video.schema';
export declare class SetService {
    private setModel;
    private videoModel;
    constructor(setModel: Model<SetDocument>, videoModel: Model<VideoDocument>);
    createSet(setData: {
        name: string;
        description?: string;
        monthlyPrice: number;
        categoryId: string;
        subcategoryId?: string;
        setNumber: string;
        videos?: string[];
        subscriptionPlans: {
            period: number;
            price: number;
        }[];
    }): Promise<SetDocument>;
    updateSet(setId: string, updateData: Partial<SetModel>): Promise<SetDocument>;
    deleteSet(setId: string): Promise<void>;
    getSetById(setId: string): Promise<SetDocument>;
    getAllSets(): Promise<SetDocument[]>;
    getSetsByCategory(categoryId: string): Promise<SetDocument[]>;
    getSetsBySubcategory(subcategoryId: string): Promise<SetDocument[]>;
    addVideosToSet(setId: string, videoIds: string[]): Promise<SetDocument>;
    removeVideosFromSet(setId: string, videoIds: string[]): Promise<SetDocument>;
    reorderSetVideos(setId: string, videoIds: string[]): Promise<SetDocument>;
    linkVideosToSet(setId: string): Promise<SetDocument>;
}
