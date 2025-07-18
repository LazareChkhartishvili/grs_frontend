import { Document } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    name: string;
    email: string;
    password: string;
    phone: string;
    location: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export interface UserResponse {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    image?: string;
}
