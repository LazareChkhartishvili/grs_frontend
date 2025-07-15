import { connect, model, Schema, Types, Document } from 'mongoose';
import { readFileSync } from 'fs';
import { join } from 'path';
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db';

interface VideoDocument extends Document {
  videoId: string;
  title: {
    ka: string;
    en: string;
    ru: string;
  };
  description?: {
    ka?: string;
    en?: string;
    ru?: string;
  };
  urls: {
    hd: string;
    sd: string;
  };
  isActive: boolean;
  sortOrder: number;
  viewCount: number;
  isPublic: boolean;
}

interface SetDocument extends Document {
  setId: string;
  title: {
    ka: string;
    en: string;
    ru: string;
  };
  description?: {
    ka?: string;
    en?: string;
    ru?: string;
  };
  videos: Types.ObjectId[];
  categoryId: Types.ObjectId;
  subcategoryId?: Types.ObjectId;
  isActive: boolean;
  sortOrder: number;
  isPublic: boolean;
  viewCount: number;
  monthlyPrice: number;
}

interface CategoryDocument extends Document {
  name: string;
  code: string;
  sequence: string;
  level: number;
  parentId: Types.ObjectId | null;
  isActive: boolean;
  sortOrder: number;
}

interface SubCategoryDocument extends Document {
  name: string;
  nameGe: string;
  nameRu: string;
  image: string;
  categoryId: Types.ObjectId;
  isActive: boolean;
  sortOrder: number;
}

// სქემების განსაზღვრა
const videoSchema = new Schema({
  videoId: { type: String, required: true },
  title: {
    ka: { type: String, required: true },
    en: { type: String, required: true },
    ru: { type: String, required: true }
  },
  description: {
    ka: String,
    en: String,
    ru: String
  },
  urls: {
    hd: { type: String, required: true },
    sd: { type: String, required: true }
  },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  isPublic: { type: Boolean, default: false }
}, { timestamps: true });

const setSchema = new Schema({
  setId: { type: String, required: true },
  title: {
    ka: { type: String, required: true },
    en: { type: String, required: true },
    ru: { type: String, required: true }
  },
  description: {
    ka: String,
    en: String,
    ru: String
  },
  videos: [{ type: Types.ObjectId, ref: 'Video' }],
  categoryId: { type: Types.ObjectId, ref: 'Category', required: true },
  subcategoryId: { type: Types.ObjectId, ref: 'SubCategory' },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  isPublic: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 },
  monthlyPrice: { type: Number, required: true, default: 920 }
}, { timestamps: true });

const categorySchema = new Schema({
  name: { type: String, required: true },
  code: { type: String },
  sequence: { type: String, unique: true },
  level: { type: Number, default: 0 },
  parentId: { type: Types.ObjectId, ref: 'Category', default: null },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

const subcategorySchema = new Schema({
  name: { type: String, required: true },
  nameGe: { type: String, required: true },
  nameRu: { type: String, required: true },
  image: { type: String },
  categoryId: { type: Types.ObjectId, ref: 'Category', required: true },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

// მოდელების შექმნა
const Video = model<VideoDocument>('Video', videoSchema);
const Set = model<SetDocument>('Set', setSchema);
const Category = model<CategoryDocument>('Category', categorySchema);
const SubCategory = model<SubCategoryDocument>('SubCategory', subcategorySchema);

interface RawSetData {
  categoryCode: string;
  setCode: string;
  title: string;
  shortTitle: string;
  description: string;
  url?: string;
  articleUrl?: string;
  requiredAccessories: string[];
  generalInstructions: string[];
  videoCount: number;
  totalDuration: string;
}

async function migrateData() {
  try {
    // კავშირის დამყარება მონაცემთა ბაზასთან
    await connect(MONGODB_URI);
    console.log('📦 მონაცემთა ბაზასთან კავშირი დამყარებულია');

    // ინდექსების წაშლა
    await mongoose.connection.db.collection('videos').dropIndexes();
    console.log('✅ ვიდეოების ინდექსები წაიშალა');

    // სტრუქტურირებული მონაცემების წაკითხვა
    const rawData = readFileSync(join(__dirname, 'structured-video-data.json'), 'utf-8');
    const data = JSON.parse(rawData);
    const sets: RawSetData[] = data.sets;

    console.log(`🎯 დასამიგრირებელი სეტების რაოდენობა: ${sets.length}`);

    // კატეგორიების და სუბკატეგორიების წამოღება
    const categories = await Category.find({ isActive: true }).exec();
    const subcategories = await SubCategory.find({ isActive: true }).exec();

    for (const setData of sets) {
      console.log(`\n🔄 მიმდინარეობს სეტის მიგრაცია: ${setData.title}`);

      // კატეგორიის პოვნა კოდით
      const category = categories.find(c => c.code === setData.categoryCode);
      if (!category) {
        console.error(`❌ კატეგორია ვერ მოიძებნა კოდით: ${setData.categoryCode}`);
        continue;
      }

      // სუბკატეგორიის პოვნა სეტის სახელის მიხედვით
      const subcategory = subcategories.find(sub => 
        setData.title.toLowerCase().includes(sub.name.toLowerCase()) &&
        sub.categoryId.toString() === category._id.toString()
      );

      // ვიდეოების შექმნა
      const videoDocuments: VideoDocument[] = [];
      for (let i = 1; i <= setData.videoCount; i++) {
        const sequence = `${setData.categoryCode}.${setData.setCode}.${i}`;
        try {
          const video = new Video({
            videoId: sequence,
            title: {
              ka: `${setData.title} - ვიდეო ${i}`,
              en: `${setData.title} - Video ${i}`,
              ru: `${setData.title} - Видео ${i}`
            },
            description: {
              ka: setData.description,
              en: setData.description,
              ru: setData.description
            },
            urls: {
              hd: `https://ghrs-group.com/vid/1/1080/${sequence}.m4v`,
              sd: `https://ghrs-group.com/vid/1/720/${sequence}.m4v`
            },
            isActive: true,
            sortOrder: i,
            viewCount: 0,
            isPublic: false
          });

          const savedVideo = await video.save();
          videoDocuments.push(savedVideo);
          console.log(`✅ ვიდეო შენახულია: ${sequence}`);
        } catch (error) {
          console.error(`❌ შეცდომა ვიდეოს შენახვისას ${sequence}:`, error);
        }
      }

      // სეტის შექმნა
      try {
        const set = new Set({
          setId: setData.setCode,
          title: {
            ka: setData.title,
            en: setData.title,
            ru: setData.title
          },
          description: {
            ka: setData.description,
            en: setData.description,
            ru: setData.description
          },
          videos: videoDocuments.map(v => v._id),
          categoryId: category._id,
          subcategoryId: subcategory?._id,
          isActive: true,
          sortOrder: parseInt(setData.setCode.match(/\d+/)?.[0] || '0'),
          isPublic: false,
          viewCount: 0,
          monthlyPrice: 920
        });

        await set.save();
        console.log(`✅ სეტი შენახულია: ${setData.title}`);
      } catch (error) {
        console.error(`❌ შეცდომა სეტის შენახვისას ${setData.title}:`, error);
      }
    }

    console.log('\n✨ მიგრაცია დასრულებულია');
    process.exit(0);
  } catch (error) {
    console.error('❌ კრიტიკული შეცდომა:', error);
    process.exit(1);
  }
}

migrateData();
