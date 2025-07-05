import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
export declare class InstructorController {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getInstructorsForDropdown(): Promise<{
        id: string;
        name: string;
        email: string;
    }[]>;
    getAllInstructors(): Promise<(import("mongoose").Document<unknown, {}, UserDocument, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createInstructor(instructorData: {
        name: string;
        email: string;
        bio?: string;
        expertise?: string[];
        experience?: number;
        education?: string;
        certifications?: string[];
    }): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
