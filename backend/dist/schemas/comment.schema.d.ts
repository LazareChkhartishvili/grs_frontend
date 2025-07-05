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
export declare const CommentSchema: import("mongoose").Schema<Comment, import("mongoose").Model<Comment, any, any, any, Document<unknown, any, Comment, any> & Comment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Comment, Document<unknown, {}, import("mongoose").FlatRecord<Comment>, {}> & import("mongoose").FlatRecord<Comment> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
