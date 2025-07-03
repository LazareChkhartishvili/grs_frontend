import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommentDocument = Comment & Document;

// ავტორის ინფორმაცია
@Schema()
export class CommentAuthor {
  @Prop({ required: true })
  name: string; // "АЛЕКСЕЙ АНАТОЛЬЕВ"

  @Prop({ required: true })
  email: string;

  @Prop()
  avatar?: string; // URL to avatar image
}

// კომენტარი
@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'Article', required: true })
  articleId: Types.ObjectId;

  @Prop({ type: CommentAuthor, required: true })
  author: CommentAuthor;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  isApproved: boolean; // For moderation

  @Prop({ type: Types.ObjectId, ref: 'Comment', default: null })
  parentCommentId?: Types.ObjectId; // For replies (optional)

  @Prop()
  publishedAt?: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

// ინდექსები
CommentSchema.index({ articleId: 1 });
CommentSchema.index({ isApproved: 1 });
CommentSchema.index({ parentCommentId: 1 });
CommentSchema.index({ publishedAt: -1 });
