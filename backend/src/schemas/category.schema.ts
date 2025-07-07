import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Exercise } from './exercise.schema';

export type CategoryDocument = Category & Document;

// ინტერფეისი კატეგორიებისთვის სუბკატეგორიებით
export interface CategoryWithSubcategories extends CategoryDocument {
  subcategories: CategoryDocument[];
}

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  image?: string;

  // კატეგორიის უნიკალური კოდი
  @Prop()
  code?: string;

  // sequence - იერარქიული სტრუქტურის მაჩვენებელი (მაგ: "1.1.1")
  @Prop({ unique: true })
  sequence?: string;

  // parentId - თუ null-ია, მაშინ ეს არის ძირითადი კატეგორია
  // თუ parentId-ს აქვს მნიშვნელობა, მაშინ ეს არის სუბკატეგორია
  @Prop({ type: Types.ObjectId, ref: 'Category', default: null })
  parentId?: Types.ObjectId;

  // level - რომ გავიგოთ რამდენი დონის კატეგორიაა (0 - ძირითადი, 1 - სუბ, 2 - ქვე-სუბ...)
  @Prop({ default: 0 })
  level: number;

  // isActive - რომ შევძლოთ კატეგორიის დროებით გამორთვა
  @Prop({ default: true })
  isActive: boolean;

  // exercises - მხოლოდ იმ შემთხვევაში, თუ ამ კატეგორიას აქვს სავარჯიშოები
  @Prop({ type: [Exercise], default: [] })
  exercises?: Exercise[];

  // sortOrder - კატეგორიების დახარისხებისთვის
  @Prop({ default: 0 })
  sortOrder: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.index({ parentId: 1 });
CategorySchema.index({ level: 1 });
CategorySchema.index({ isActive: 1 });
CategorySchema.index({ sortOrder: 1 });
