import { Document, Types } from 'mongoose';
export type LessonDocument = Lesson & Document;
export declare class Lesson {
    title: string;
    description: string;
    videoUrl: string;
    duration: number;
    order: number;
    course: Types.ObjectId;
    exercises: Types.ObjectId[];
    isActive: boolean;
    materials: string[];
    transcript: string;
}
export declare const LessonSchema: import("mongoose").Schema<Lesson, import("mongoose").Model<Lesson, any, any, any, Document<unknown, any, Lesson> & Lesson & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Lesson, Document<unknown, {}, import("mongoose").FlatRecord<Lesson>> & import("mongoose").FlatRecord<Lesson> & {
    _id: Types.ObjectId;
}>;
