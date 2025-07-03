import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LessonDocument = Lesson & Document;

@Schema({ timestamps: true })
export class Lesson {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  videoUrl: string;

  @Prop({ required: true, min: 0 })
  duration: number; // წუთები

  @Prop({ required: true, min: 1 })
  order: number;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Exercise' }], default: [] })
  exercises: Types.ObjectId[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  materials: string[]; // დამატებითი მასალების ლინკები

  @Prop()
  transcript: string; // ვიდეოს ტრანსკრიპტი
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
