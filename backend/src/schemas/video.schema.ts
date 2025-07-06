import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema({ timestamps: true, collection: 'videos' })
export class Video {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  categoryCode: string; // "01", "02", etc.

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  categoryId?: Types.ObjectId;

  @Prop({ required: true })
  setId: string; // "001", "002", etc.

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  sequence: string; // "2.1.1.2", "2.1.1.3", etc.

  @Prop({ required: true, default: '1080p' })
  resolution: string;

  @Prop({ required: true, default: 'm4v' })
  format: string;

  @Prop({ type: Number, default: null })
  fileSize?: number;

  @Prop({ type: Number, default: null })
  duration?: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  title?: string;

  @Prop()
  description?: string;

  @Prop()
  thumbnailUrl?: string;

  @Prop([String])
  tags?: string[];

  @Prop()
  transcript?: string;

  @Prop({ default: 0 })
  viewsCount: number;

  @Prop({ default: 0 })
  likesCount: number;

  @Prop()
  mimeType?: string;

  @Prop({ default: false })
  isPublic: boolean;

  @Prop({ default: false })
  isProcessed: boolean;

  @Prop({ default: 0 })
  sortOrder: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);

// Indexes for better performance
VideoSchema.index({ categoryCode: 1 });
VideoSchema.index({ setId: 1 });
VideoSchema.index({ sequence: 1 });
VideoSchema.index({ resolution: 1 });
VideoSchema.index({ format: 1 });
VideoSchema.index({ isActive: 1 });

// Text search index
VideoSchema.index({
  name: 'text',
  sequence: 'text',
  url: 'text',
  title: 'text',
  description: 'text',
});
