import mongoose, { Document } from 'mongoose';
import { readFileSync } from 'fs';
import { join } from 'path';

const MONGODB_URI = 'mongodb://localhost:27017/grs';

// ინტერფეისები
interface ICategory extends Document {
  name: string;
  code: string;
  sequence: string;
  level: number;
  isActive: boolean;
}

interface IVideo extends Document {
  videoId: string;
  title?: {
    ka?: string;
    en?: string;
    ru?: string;
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
  categoryId: mongoose.Types.ObjectId;
  setId: mongoose.Types.ObjectId;
  sequence: string;
  isActive: boolean;
  sortOrder: number;
  viewCount: number;
}

interface ISet extends Document {
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
  videos: mongoose.Types.ObjectId[];
  categoryId: mongoose.Types.ObjectId;
  sequence: string;
  isActive: boolean;
  sortOrder: number;
  isPublic: boolean;
  viewCount: number;
  monthlyPrice: number;
}

// მონაცემთა ბაზის სქემები
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, unique: true },
  sequence: { type: String, unique: true },
  level: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
});

const VideoSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  title: {
    ka: String,
    en: String,
    ru: String
  },
  description: {
    ka: String,
    en: String,
    ru: String
  },
  urls: {
    hd: String,
    sd: String
  },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  setId: { type: mongoose.Schema.Types.ObjectId, ref: 'Set' },
  sequence: String,
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 }
});

const SetSchema = new mongoose.Schema({
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
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  sequence: String,
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  isPublic: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 },
  monthlyPrice: { type: Number, required: true, default: 920 }
});

async function updateCategoryRelations() {
  try {
    // მონაცემთა ბაზასთან დაკავშირება
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB-სთან დაკავშირება წარმატებით დასრულდა');

    // მოდელების შექმნა
    const Category = mongoose.model<ICategory>('Category', CategorySchema);
    const Set = mongoose.model<ISet>('Set', SetSchema);
    const Video = mongoose.model<IVideo>('Video', VideoSchema);

    // JSON ფაილის წაკითხვა
    const jsonPath = join(__dirname, '..', '..', 'video links - orthopedics-com (1).json');
    const jsonData = JSON.parse(readFileSync(jsonPath, 'utf-8'));

    // გავიაროთ თითოეულ კატეგორიაზე
    for (const [categoryKey, exercises] of Object.entries(jsonData)) {
      // მივიღოთ კატეგორიის კოდი (მაგ: "1-1" from "1-1 CERVICAL SPINE PROBLEMS")
      const categoryCode = categoryKey.split(' ')[0];
      
      // ვიპოვოთ კატეგორია მონაცემთა ბაზაში
      const category = await Category.findOne({ code: categoryCode });
      if (!category) {
        console.error(`კატეგორია ვერ მოიძებნა კოდით: ${categoryCode}`);
        continue;
      }

      let currentSet: ISet | null = null;
      let currentSetVideos: mongoose.Types.ObjectId[] = [];

      // გავიაროთ მასივზე
      for (const item of exercises as any[]) {
        if (!item) continue;

        // თუ ეს არის სეტის აღწერა
        if (item.Column12 && item.Column12.includes('set of exercises №')) {
          // თუ გვაქვს წინა სეტი, შევინახოთ
          if (currentSet) {
            currentSet.videos = currentSetVideos;
            await currentSet.save();
            console.log(`შენახულია სეტი: ${currentSet.setId} ${currentSetVideos.length} ვიდეოთი`);
          }

          // ამოვიღოთ სეტის ნომერი
          const setNumber = item.Column12.match(/№(\d+)/)?.[1];
          const setSequence = `${categoryCode}.${setNumber}`;
          
          // შევქმნათ ახალი სეტი
          currentSet = new Set({
            setId: setSequence,
            title: {
              en: item.Column12,
              ka: item.Column12, // TODO: დასამატებელია ქართული და რუსული თარგმანები
              ru: item.Column12
            },
            description: {
              en: item.Column14,
              ka: item.Column14,
              ru: item.Column14
            },
            categoryId: category._id,
            sequence: setSequence,
            videos: []
          });
          
          currentSetVideos = [];
          await currentSet.save();
          console.log(`შექმნილია ახალი სეტი: ${setSequence}`);
        }

        // თუ ეს არის HD ვიდეო
        if (item.Column2 && item.Column2.includes('/1080/') && currentSet) {
          const videoUrl = item.Column2;
          const videoId = videoUrl.split('/').pop()?.replace('.m4v', '');
          
          if (videoId) {
            // ვიპოვოთ SD ვერსია
            const sdUrl = videoUrl.replace('/1080/', '/720/');

            const video = new Video({
              videoId,
              urls: {
                hd: videoUrl,
                sd: sdUrl
              },
              categoryId: category._id,
              setId: currentSet._id,
              sequence: videoId,
              sortOrder: item.Video || 0
            });

            await video.save();
            currentSetVideos.push(video._id);
            console.log(`დამატებულია ვიდეო: ${videoId}`);
          }
        }
      }

      // შევინახოთ ბოლო სეტი
      if (currentSet) {
        currentSet.videos = currentSetVideos;
        await currentSet.save();
        console.log(`შენახულია ბოლო სეტი: ${currentSet.setId} ${currentSetVideos.length} ვიდეოთი`);
      }
    }

    console.log('მიგრაცია წარმატებით დასრულდა');
  } catch (error) {
    console.error('შეცდომა მიგრაციისას:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB-სთან კავშირი დასრულდა');
  }
}

updateCategoryRelations(); 