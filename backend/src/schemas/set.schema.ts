import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SetDocument = Set & Document;

interface Exercise {
  _id: Types.ObjectId;
  videoId: Types.ObjectId;
  repetitions: number;
  sets: number;
  restTime: number;
  duration: number;
  order: number;
}

@Schema({ timestamps: true })
export class Set {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  setId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Object })
  title: {
    ka: string;
    en: string;
    ru: string;
  };

  @Prop({ type: Object })
  description?: {
    ka?: string;
    en?: string;
    ru?: string;
  };

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Video' }], required: true })
  videos: Types.ObjectId[];

  @Prop({
    type: [{
      _id: { type: Types.ObjectId, auto: true },
      videoId: { type: Types.ObjectId, ref: 'Video' },
      repetitions: { type: Number, default: 1 },
      sets: { type: Number, default: 1 },
      restTime: { type: Number, default: 0 },
      duration: { type: Number, default: 0 },
      order: { type: Number }
    }],
    required: true,
    default: []
  })
  exercises: Exercise[];

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'SubCategory' })
  subcategoryId?: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  sortOrder: number;

  @Prop({ default: false })
  isPublic: boolean;

  @Prop({ default: 0 })
  viewCount: number;

  @Prop({ required: true, default: 920 })
  monthlyPrice: number;
}

export const SetSchema = SchemaFactory.createForClass(Set);

// ინდექსები
SetSchema.index({ setId: 1 });
SetSchema.index({ isActive: 1 });
SetSchema.index({ sortOrder: 1 });
SetSchema.index({ isPublic: 1 });
SetSchema.index({ categoryId: 1 });
SetSchema.index({ subcategoryId: 1 });

// ტექსტური ძებნის ინდექსი
SetSchema.index({
  'title.ka': 'text',
  'title.en': 'text',
  'title.ru': 'text',
  'description.ka': 'text',
  'description.en': 'text',
  'description.ru': 'text'
});
