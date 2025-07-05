import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
export declare class InstructorController {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getInstructorsForDropdown(): Promise<{
        id: string;
        name: string;
        email: string;
    }[]>;
    getAllInstructors(): unknown;
    createInstructor(instructorData: {
        name: string;
        email: string;
        bio?: string;
        expertise?: string[];
        experience?: number;
        education?: string;
        certifications?: string[];
    }): unknown;
}
