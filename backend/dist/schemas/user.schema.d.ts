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
export declare const UserSchema: any;
export interface UserResponse {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    image?: string;
}
