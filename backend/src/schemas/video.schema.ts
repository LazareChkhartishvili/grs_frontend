import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema({ timestamps: true, collection: 'videos' })
export class Video {
  @Prop({ type: Number })
  _id?: number; // Custom numeric ID instead of ObjectId

  @Prop({ required: true })
  name: string; // URL of the video

  @Prop({ required: true })
  categoryCode: string; // "01", "02", etc.

  @Prop({ required: true })
  setId: string; // "001", "002", etc.

  @Prop({ required: true })
  url: string; // Video URL

  @Prop({ required: true })
  sequence: string; // "2.1.1.2", "2.1.1.3", etc.

  @Prop({ required: true, default: '1080p' })
  resolution: string; // "1080p", "720p", "480p", etc.

  @Prop({ required: true, default: 'm4v' })
  format: string; // "m4v", "mp4", etc.

  @Prop({ type: Number, default: null })
  fileSize?: number; // File size in bytes

  @Prop({ type: Number, default: null })
  duration?: number; // Duration in seconds

  @Prop({ default: true })
  isActive: boolean;

  // Additional optional fields that might be useful
  @Prop()
  title?: string; // Human-readable title

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

  // Metadata
  @Prop()
  mimeType?: string; // video/mp4, video/m4v, etc.

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
