import { Document, Types } from 'mongoose';
export type CommentDocument = Comment & Document;
export declare class CommentAuthor {
    name: string;
    email: string;
    avatar?: string;
}
export declare class Comment {
    articleId: Types.ObjectId;
    author: CommentAuthor;
    content: string;
    isApproved: boolean;
    parentCommentId?: Types.ObjectId;
    publishedAt?: Date;
}
export declare const CommentSchema: any;
