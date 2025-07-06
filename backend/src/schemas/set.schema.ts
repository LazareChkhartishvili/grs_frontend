import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SetDocument = Set & Document;

interface Exercise {
  repetitions: number;
  sets: number;
  restTime: number;
  duration: number;
  order: number;
  videoId?: Types.ObjectId; // ვიდეოს ID
}

@Schema({ timestamps: true })
export class Set {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  categoryId: Types.ObjectId;

  @Prop()
  subcategoryId: Types.ObjectId;

  @Prop({ required: true })
  setNumber: string; // e.g. "001", "002" etc.

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  sortOrder: number;

  @Prop([
    {
      repetitions: { type: Number, default: 1 },
      sets: { type: Number, default: 1 },
      restTime: { type: Number, default: 0 },
      duration: { type: Number, default: 0 },
      order: { type: Number, default: 0 },
      videoId: { type: Types.ObjectId }, // ვიდეოს ID
    },
  ])
  exercises: Exercise[];

  @Prop([
    {
      period: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ])
  subscriptionPlans: { period: number; price: number }[];

  @Prop({ default: 0 })
  totalCalories: number;

  @Prop([String])
  tags: string[];

  @Prop([String])
  targetMuscles: string[];

  @Prop([String])
  equipment: string[];

  @Prop({ default: false })
  isPublic: boolean;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ default: 0 })
  usageCount: number;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  reviewsCount: number;

  @Prop([{ type: Types.ObjectId, ref: 'Set' }])
  relatedSets: Types.ObjectId[];

  @Prop([{ type: Types.ObjectId, ref: 'Set' }])
  prerequisites: Types.ObjectId[];

  @Prop([String])
  goals: string[];

  @Prop({ default: 'all' })
  targetGender: string;

  @Prop([String])
  suitableConditions: string[];

  @Prop([String])
  contraindicatedConditions: string[];

  @Prop({ default: 0 })
  totalDuration: number;

  @Prop({ default: 'medium' })
  difficulty: string;

  @Prop({ default: 'beginner' })
  level: string;

  @Prop([
    {
      day: { type: Number },
      time: { type: String },
    },
  ])
  schedule: { day: number; time: string }[];
}

export const SetSchema = SchemaFactory.createForClass(Set);

// ინდექსები უკეთესი წარმადობისთვის
SetSchema.index({ categoryId: 1 });
SetSchema.index({ subcategoryId: 1 });
SetSchema.index({ isActive: 1 });
SetSchema.index({ sortOrder: 1 });
SetSchema.index({ isPublic: 1 });
SetSchema.index({ isFeatured: 1 });
SetSchema.index({ difficulty: 1 });
SetSchema.index({ level: 1 });

// ტექსტური ძებნის ინდექსი
SetSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text',
  targetMuscles: 'text',
  equipment: 'text',
  goals: 'text',
});
