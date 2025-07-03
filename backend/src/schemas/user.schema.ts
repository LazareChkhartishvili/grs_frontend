import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  bio?: string;

  @Prop()
  avatar?: string;

  @Prop({
    enum: ['admin', 'instructor', 'student'],
    default: 'student',
  })
  role: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  phone?: string;

  @Prop()
  expertise?: string[];

  @Prop()
  experience?: number; // წლები

  @Prop()
  education?: string;

  @Prop()
  certifications?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User); 