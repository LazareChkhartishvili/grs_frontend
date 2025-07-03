import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SetDocument = Set & Document;

// Exercise reference within a set
@Schema()
export class SetExercise {
  @Prop({ type: Types.ObjectId, ref: 'Exercise', required: true })
  exerciseId: Types.ObjectId;

  @Prop({ default: 1 })
  repetitions: number; // Number of reps

  @Prop({ default: 1 })
  sets: number; // Number of sets

  @Prop({ default: 0 })
  restTime: number; // Rest time in seconds

  @Prop({ default: 0 })
  duration: number; // Duration for this exercise in seconds

  @Prop()
  notes?: string; // Special instructions for this exercise in the set

  @Prop({ default: 0 })
  order: number; // Order within the set
}

// Main Set schema
@Schema({ timestamps: true })
export class Set {
  @Prop({ required: true })
  name: string; // "Morning Routine", "Post-Workout Stretch"

  @Prop()
  description?: string;

  @Prop()
  image?: string; // Set cover image

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'SubCategory' })
  subcategoryId?: Types.ObjectId;

  @Prop({ type: [SetExercise], default: [] })
  exercises: SetExercise[];

  @Prop({ default: 0 })
  totalDuration: number; // Total duration in seconds

  @Prop({ default: 0 })
  totalCalories: number; // Estimated calories burned

  @Prop({
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
  })
  difficulty: string;

  @Prop({
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  })
  level: string;

  @Prop([String])
  tags?: string[]; // "cardio", "strength", "flexibility"

  @Prop([String])
  targetMuscles?: string[]; // "abs", "legs", "back"

  @Prop([String])
  equipment?: string[]; // Required equipment

  @Prop()
  warmupInstructions?: string;

  @Prop()
  cooldownInstructions?: string;

  @Prop()
  generalNotes?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy?: Types.ObjectId; // Creator/trainer

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isPublic: boolean; // Public or private set

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ default: 0 })
  usageCount: number; // How many times this set has been used

  @Prop({ default: 0 })
  rating: number; // Average rating (0-5)

  @Prop({ default: 0 })
  reviewsCount: number;

  @Prop({ default: 0 })
  sortOrder: number;

  // Scheduling options
  @Prop([
    {
      dayOfWeek: { type: Number, min: 0, max: 6 },
      timeOfDay: String, 
      isRecommended: { type: Boolean, default: false },
    },
  ])
  schedule?: {
    dayOfWeek: number;
    timeOfDay: string;
    isRecommended: boolean;
  }[];

  // Related sets
  @Prop([{ type: Types.ObjectId, ref: 'Set' }])
  relatedSets?: Types.ObjectId[];

  // Prerequisites (sets that should be completed first)
  @Prop([{ type: Types.ObjectId, ref: 'Set' }])
  prerequisites?: Types.ObjectId[];

  // Goals this set helps achieve
  @Prop([String])
  goals?: string[]; // "weight_loss", "muscle_gain", "flexibility", "rehabilitation"

  // Age group recommendations
  @Prop({
    type: {
      minAge: Number,
      maxAge: Number,
    },
  })
  ageGroup?: {
    minAge: number;
    maxAge: number;
  };

  // Gender recommendation
  @Prop({
    enum: ['all', 'male', 'female'],
    default: 'all',
  })
  targetGender: string;

  // Medical conditions this set is suitable for
  @Prop([String])
  suitableConditions?: string[];

  // Medical conditions this set should be avoided for
  @Prop([String])
  contraindicatedConditions?: string[];
}

export const SetSchema = SchemaFactory.createForClass(Set);

// Indexes for better performance
SetSchema.index({ categoryId: 1 });
SetSchema.index({ subcategoryId: 1 });
SetSchema.index({ difficulty: 1 });
SetSchema.index({ level: 1 });
SetSchema.index({ isActive: 1 });
SetSchema.index({ isPublic: 1 });
SetSchema.index({ isFeatured: 1 });
SetSchema.index({ usageCount: -1 });
SetSchema.index({ rating: -1 });
SetSchema.index({ createdAt: -1 });
SetSchema.index({ tags: 1 });
SetSchema.index({ targetMuscles: 1 });
SetSchema.index({ goals: 1 });
SetSchema.index({ name: 'text', description: 'text', tags: 'text' });