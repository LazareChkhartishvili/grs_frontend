import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ExerciseComplexDocument = ExerciseComplex & Document;

// სავარჯიშო კომპლექსის სქემა (GHRS მსგავსად: "SET OF EXERCISES №1")
@Schema({ timestamps: true })
export class ExerciseComplex {
  @Prop({ required: true })
  name: string; // "SET OF EXERCISES №1 FOR THE THORACIC SPINE"

  @Prop()
  description?: string; // "8 exercises, 47:38 minutes total"

  @Prop()
  image?: string; // კომპლექსის სურათი

  // რომელ კატეგორიას ეკუთვნის (სავალდებულო)
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;

  // რომელ სუბკატეგორიას ეკუთვნის (არასავალდებულო)
  @Prop({ type: Types.ObjectId, ref: 'SubCategory', default: null })
  subcategoryId?: Types.ObjectId;

  // კომპლექსში რომელი სავარჯიშოები შედის
  @Prop([{ type: Types.ObjectId, ref: 'Exercise' }])
  exerciseIds: Types.ObjectId[];

  // ჯამური ხანგრძლივობა წუთებში (GHRS მსგავსად: 47:38)
  @Prop()
  totalDuration?: number;

  // რამდენი სავარჯიშოა კომპლექსში
  @Prop({ default: 0 })
  exerciseCount: number;

  // სირთულის დონე
  @Prop({
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
  })
  difficulty: string;

  // ეტაპი (რეაბილიტაციის სტადია)
  @Prop({
    enum: ['initial', 'mid', 'advanced'],
    default: 'initial',
  })
  stage: string;

  // საჭირო რეკვიზიტები
  @Prop([String])
  requiredEquipment?: string[]; // ["MAT", "CHAIR"]

  // ზოგადი ინსტრუქციები
  @Prop()
  generalInstructions?: string;

  // სუნთქვის მითითებები
  @Prop()
  breathingGuidelines?: string;

  // რეკომენდებული სიხშირე
  @Prop()
  recommendedFrequency?: string; // "2 times a day, 4-6 weeks"

  // სამიზნე მდგომარეობა
  @Prop()
  targetCondition?: string; // "cervical spine problems"

  // ფასი USD-ში
  @Prop()
  price?: number;

  // სუბსკრიპციის პერიოდები ფასებით
  @Prop({
    type: {
      oneMonth: { type: Number },
      threeMonths: { type: Number },
      sixMonths: { type: Number },
    },
  })
  subscriptionPeriods?: {
    oneMonth?: number;
    threeMonths?: number;
    sixMonths?: number;
  };

  // დემო ვიდეო URL
  @Prop()
  demoVideoUrl?: string;

  // დაკავშირებული კომპლექსები
  @Prop([{ type: Types.ObjectId, ref: 'ExerciseComplex' }])
  relatedComplexes?: Types.ObjectId[];

  // ფასდაკლება (თუ არის)
  @Prop()
  discount?: number; // პროცენტებში

  // isActive - რომ შევძლოთ კომპლექსის დროებით გამორთვა
  @Prop({ default: true })
  isActive: boolean;

  // sortOrder - კომპლექსების დახარისხებისთვის
  @Prop({ default: 0 })
  sortOrder: number;

  // ტაგები (მაგ: "rehabilitation", "stretching", "post-stroke")
  @Prop([String])
  tags?: string[];

  // ინსტრუქციები ტრენერისთვის
  @Prop()
  instructorNotes?: string;

  // სუბსკრიპციის ვადები (1, 3, 6 თვე) - ძველი ვერსია
  @Prop([
    {
      duration: { type: Number, required: true }, // თვეების რაოდენობა
      price: { type: Number, required: true },
      discount: { type: Number, default: 0 }, // ფასდაკლება პროცენტებში
    },
  ])
  subscriptionOptions?: {
    duration: number;
    price: number;
    discount: number;
  }[];
}

export const ExerciseComplexSchema =
  SchemaFactory.createForClass(ExerciseComplex);

// ინდექსები უკეთესი performanceისთვის
ExerciseComplexSchema.index({ categoryId: 1 });
ExerciseComplexSchema.index({ subcategoryId: 1 });
ExerciseComplexSchema.index({ isActive: 1 });
ExerciseComplexSchema.index({ price: 1 });
ExerciseComplexSchema.index({ difficulty: 1 });
ExerciseComplexSchema.index({ stage: 1 });
