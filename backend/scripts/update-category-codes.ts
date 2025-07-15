import { connect, model, Schema, Types } from 'mongoose';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

config();

// სქემების შექმნა
const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  code: String,
  sequence: { type: String, unique: true },
  parentId: { type: Types.ObjectId, ref: 'Category', default: null },
  level: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  exercises: { type: Array, default: [] },
  sortOrder: { type: Number, default: 0 }
});

const SetSchema = new Schema({
  setId: { type: String, required: true },
  name: { type: String, required: true },
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
  videos: [{ type: Types.ObjectId, ref: 'Video' }],
  exercises: [{
    _id: { type: Types.ObjectId, auto: true },
    videoId: { type: Types.ObjectId, ref: 'Video' },
    repetitions: { type: Number, default: 1 },
    sets: { type: Number, default: 1 },
    restTime: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    order: { type: Number }
  }],
  categoryId: { type: Types.ObjectId, ref: 'Category', required: true },
  subcategoryId: { type: Types.ObjectId, ref: 'SubCategory' },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  isPublic: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 },
  monthlyPrice: { type: Number, required: true, default: 920 }
});

// მოდელების შექმნა
const CategoryModel = model('Category', CategorySchema);
const SetModel = model('Set', SetSchema);

// ფუნქცია კატეგორიის კოდის გარდაქმნისთვის (მაგ: "1-1" -> "01")
function transformCategoryCode(code: string): string {
  const match = code.match(/^(\d+)-(\d+)/);
  if (!match) return code;
  
  const [_, mainNum] = match;
  return `${mainNum.padStart(2, '0')}`;
}

async function updateCategoryCodes() {
  try {
    // მონაცემთა ბაზასთან დაკავშირება
    await connect(process.env.MONGODB_URI || '');
    console.log('Connected to MongoDB');

    // structured-video-data.json-ის წაკითხვა
    const jsonPath = path.join(__dirname, 'structured-video-data.json');
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    // კატეგორიების კოდების განახლება
    for (const set of data.sets) {
      const oldCategoryCode = set.categoryCode;
      const newCategoryCode = transformCategoryCode(oldCategoryCode);
      
      console.log(`Processing set: ${set.setCode}`);
      console.log(`Transforming category code: ${oldCategoryCode} -> ${newCategoryCode}`);

      // კატეგორიის მოძებნა ახალი კოდით
      const category = await CategoryModel.findOne({ code: newCategoryCode });
      
      if (!category) {
        console.log(`Category not found for code: ${newCategoryCode}`);
        continue;
      }

      // სეტის განახლება ახალი კატეგორიის ID-ით
      const setData = {
        setId: set.setCode,
        name: set.shortTitle,
        title: {
          ka: set.title,
          en: set.title,
          ru: set.title
        },
        description: {
          ka: set.description,
          en: set.description,
          ru: set.description
        },
        categoryId: category._id,
        monthlyPrice: 920,
        isActive: true,
        isPublic: true,
        videos: [],
        exercises: []
      };

      try {
        await SetModel.updateOne(
          { setId: set.setCode },
          { $set: setData },
          { upsert: true }
        );
        console.log(`Updated set: ${set.setCode} with category: ${category.code}`);
      } catch (error) {
        console.error(`Error updating set ${set.setCode}:`, error.message);
      }
    }

    console.log('Category codes update completed');
  } catch (error) {
    console.error('Error updating category codes:', error);
  } finally {
    process.exit(0);
  }
}

updateCategoryCodes(); 