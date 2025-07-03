import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  instructor: Types.ObjectId;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ min: 0 })
  duration: number; // საათები

  @Prop({
    required: true,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  })
  level: string; // difficulty -> level

  @Prop({
    enum: ['georgian', 'english'],
    default: 'georgian',
  })
  language: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'SubCategory' })
  subcategory: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Lesson' }], default: [] })
  lessons: Types.ObjectId[];

  @Prop({ default: 0, min: 0, max: 5 })
  rating: number;

  @Prop({ default: 0, min: 0 })
  reviewsCount: number;

  @Prop({ default: false })
  isPublished: boolean; // isActive -> isPublished

  @Prop({ default: 0, min: 0 })
  lessonsCount: number;

  @Prop({ default: 0, min: 0 })
  studentsCount: number;

  @Prop()
  tags: string[];

  @Prop()
  requirements: string[];

  @Prop()
  objectives: string[];

  // ძველი fields რომ backward compatibility იყოს
  @Prop({ default: true })
  isActive: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
