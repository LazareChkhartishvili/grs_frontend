import { SetService } from './set.service';
export declare class SetController {
    private readonly setService;
    constructor(setService: SetService);
    private uploadToCloudinary;
    create(file: Express.Multer.File, createSetDto: any): Promise<import("../schemas/set.schema").Set>;
    update(id: string, updateSetDto: any, file?: Express.Multer.File): Promise<import("../schemas/set.schema").Set>;
    findAll(query: {
        categoryId?: string;
        subCategoryId?: string;
    }): Promise<Omit<Omit<import("mongoose").Document<unknown, {}, import("../schemas/set.schema").SetDocument> & import("../schemas/set.schema").Set & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/set.schema").SetDocument> & import("../schemas/set.schema").Set & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<void>;
}
