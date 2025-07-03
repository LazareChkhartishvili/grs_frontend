import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ExerciseDocument = Exercise & Document;

// სავარჯიშოს ძირითადი სქემა
@Schema({ timestamps: true })
export class Exercise {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  duration?: number; // წუთებში

  @Prop({ enum: ['easy', 'medium', 'hard'], default: 'medium' })
  difficulty: string;

  @Prop()
  instructions?: string;

  @Prop([String])
  images?: string[];

  @Prop([String])
  videos?: string[];

  // რომელ კატეგორიას ეკუთვნის (სავალდებულო)
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;

  // რომელ სუბკატეგორიას ეკუთვნის (არასავალდებულო)
  @Prop({ type: Types.ObjectId, ref: 'SubCategory', default: null })
  subcategoryId?: Types.ObjectId;

  // ფოტოს blob მონაცემები (თუ ლოკალურად ინახება)
  @Prop()
  imageData?: string; // Base64 encoded image data

  @Prop()
  imageMimeType?: string; // image/jpeg, image/png, etc.

  @Prop()
  imageSize?: number; // ფაილის ზომა bytes-ში

  // isActive - რომ შევძლოთ სავარჯიშოს დროებით გამორთვა
  @Prop({ default: true })
  isActive: boolean;

  // sortOrder - სავარჯიშოების დახარისხებისთვის
  @Prop({ default: 0 })
  sortOrder: number;

  // repetitions - განმეორებების რაოდენობა
  @Prop()
  repetitions?: number;

  // sets - სეტების რაოდენობა
  @Prop()
  sets?: number;

  // rest - დასვენების დრო წამებში
  @Prop()
  restTime?: number;

  // calories - კალორიები რომელიც იწვის
  @Prop()
  calories?: number;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);

// ინდექსები უკეთესი performanceისთვის
ExerciseSchema.index({ categoryId: 1 });
ExerciseSchema.index({ subcategoryId: 1 });
ExerciseSchema.index({ isActive: 1 });
ExerciseSchema.index({ difficulty: 1 });
ExerciseSchema.index({ sortOrder: 1 }); 