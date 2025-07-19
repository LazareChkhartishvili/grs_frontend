import { Model, Types } from 'mongoose';
import { Set, SetDocument } from '../schemas/set.schema';
import { CreateSetDto } from './dto/create-set.dto';
export declare class SetService {
    private setModel;
    constructor(setModel: Model<SetDocument>);
    create(createSetDto: CreateSetDto): Promise<Set>;
    update(id: string, updateSetDto: Partial<CreateSetDto>): Promise<Set>;
    findAll(query: {
        categoryId?: string;
        subCategoryId?: string;
    }): Promise<Omit<Omit<import("mongoose").Document<unknown, {}, SetDocument> & Set & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>, never>[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, SetDocument> & Set & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
}
