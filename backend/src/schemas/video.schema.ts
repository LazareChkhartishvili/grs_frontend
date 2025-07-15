import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema({
  timestamps: true,
  collection: 'videos',
  versionKey: false,
  autoIndex: true,
  strict: true
})
export class Video {
  @Prop({ required: true, unique: true })
  videoId: string;

  @Prop({
    type: {
      ka: { type: String, required: true },
      en: { type: String, required: true },
      ru: { type: String, required: true }
    }
  })
  title: {
    ka: string;
    en: string;
    ru: string;
  };

  @Prop({
    type: {
      ka: String,
      en: String,
      ru: String
    }
  })
  description?: {
    ka?: string;
    en?: string;
    ru?: string;
  };

  @Prop({
    type: {
      hd: { type: String, required: true },
      sd: { type: String, required: true }
    }
  })
  urls: {
    hd: string;
    sd: string;
  };

  @Prop({ required: true })
  categoryCode: string;

  @Prop({ required: true })
  sequence: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  sortOrder: number;

  @Prop({ default: 0 })
  viewCount: number;

  @Prop({ default: false })
  isPublic: boolean;

  @Prop({ default: 0 })
  duration: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);

// ინდექსები
VideoSchema.index({ videoId: 1 });
VideoSchema.index({ isActive: 1 });
VideoSchema.index({ sortOrder: 1 });
VideoSchema.index({ categoryCode: 1 });
VideoSchema.index({ sequence: 1 });

// ტექსტური ძებნის ინდექსი
VideoSchema.index({
  'title.ka': 'text',
  'title.en': 'text',
  'title.ru': 'text',
  'description.ka': 'text',
  'description.en': 'text',
  'description.ru': 'text'
});
