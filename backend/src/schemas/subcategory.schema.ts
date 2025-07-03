import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubCategoryDocument = SubCategory & Document;

// სავარჯიშოს ქვე-სქემა
@Schema()
export class Exercise {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  duration?: number; // წუთებში

  @Prop()
  difficulty?: string; // easy, medium, hard

  @Prop()
  instructions?: string;

  @Prop([String])
  images?: string[];

  @Prop([String])
  videos?: string[];
}

// სუბკატეგორიის სქემა
@Schema({ timestamps: true })
export class SubCategory {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  image?: string;

  // categoryId - რომელ ძირითად კატეგორიას ეკუთვნის
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;

  // categoryCode - კატეგორიის კოდი (დამატებითი რეფერენსი)
  @Prop()
  categoryCode?: string;

  // isActive - რომ შევძლოთ სუბკატეგორიის დროებით გამორთვა
  @Prop({ default: true })
  isActive: boolean;

  // exercises - სავარჯიშოები ამ სუბკატეგორიისთვის
  @Prop({ type: [Exercise], default: [] })
  exercises?: Exercise[];

  // sortOrder - სუბკატეგორიების დახარისხებისთვის
  @Prop({ default: 0 })
  sortOrder: number;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);

// ინდექსები უკეთესი performanceისთვის
SubCategorySchema.index({ categoryId: 1 });
SubCategorySchema.index({ isActive: 1 });
SubCategorySchema.index({ sortOrder: 1 });
