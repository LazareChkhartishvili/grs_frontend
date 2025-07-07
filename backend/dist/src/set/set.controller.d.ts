import { SetService } from './set.service';
import { Set } from '../schemas/set.schema';
export declare class SetController {
    private readonly setService;
    constructor(setService: SetService);
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
    }): Promise<import("../schemas/set.schema").SetDocument>;
    updateSet(id: string, updateData: Partial<Set>): Promise<import("../schemas/set.schema").SetDocument>;
    deleteSet(id: string): Promise<void>;
    getSet(id: string): Promise<import("../schemas/set.schema").SetDocument>;
    getAllSets(): Promise<import("../schemas/set.schema").SetDocument[]>;
    getSetsByCategory(categoryId: string): Promise<import("../schemas/set.schema").SetDocument[]>;
    getSetsBySubcategory(subcategoryId: string): Promise<import("../schemas/set.schema").SetDocument[]>;
    addVideosToSet(id: string, videoIds: string[]): Promise<import("../schemas/set.schema").SetDocument>;
    removeVideosFromSet(id: string, videoIds: string[]): Promise<import("../schemas/set.schema").SetDocument>;
    reorderSetVideos(id: string, videoIds: string[]): Promise<import("../schemas/set.schema").SetDocument>;
    linkVideosToSet(id: string): Promise<import("../schemas/set.schema").SetDocument>;
}
