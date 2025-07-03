import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ArticleDocument = Article & Document;

// სარჩევი ელემენტი
@Schema()
export class TableOfContentItem {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  anchor: string;
}

// მთავარი სტატია
@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  title: string; // "Курсы и мастер-классы для опытных терапевтов..."

  @Prop({ required: true, type: String })
  content: string; // Rich text HTML content

  @Prop({ required: true })
  excerpt: string; // Short description for previews

  @Prop({ required: true, unique: true })
  slug: string; // URL-friendly version of title

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId; // Reference to categories collection

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  authorId?: Types.ObjectId; // Reference to users/authors collection

  @Prop()
  mainImage?: string; // Main article image URL

  @Prop([String])
  images?: string[]; // Additional images in content

  @Prop({ default: 0 })
  readTimeMinutes: number; // Estimated reading time

  @Prop({ default: 0 })
  commentsCount: number; // Auto-calculated field

  @Prop({ default: 0 })
  viewsCount: number;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop()
  publishedAt?: Date;

  @Prop([TableOfContentItem])
  tableOfContents?: TableOfContentItem[];

  @Prop([String])
  tags?: string[];

  @Prop([{ type: Types.ObjectId, ref: 'Article' }])
  relatedArticleIds?: Types.ObjectId[];

  // SEO ველები
  @Prop()
  metaTitle?: string;

  @Prop()
  metaDescription?: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

// ინდექსები უკეთესი performanceისთვის
ArticleSchema.index({ slug: 1 });
ArticleSchema.index({ categoryId: 1 });
ArticleSchema.index({ authorId: 1 });
ArticleSchema.index({ isPublished: 1 });
ArticleSchema.index({ isFeatured: 1 });
ArticleSchema.index({ publishedAt: -1 });
ArticleSchema.index({ title: 'text', content: 'text', excerpt: 'text' });
