import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { join } from 'path';

const MONGODB_URI = 'mongodb://localhost:27017/grs';

// სქემების განსაზღვრა
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, unique: true },
  sequence: { type: String, unique: true },
  level: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
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
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  isPublic: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 },
  monthlyPrice: { type: Number, required: true, default: 920 }
}, { timestamps: true });

async function updateSetsWithCategories() {
  try {
    // მონაცემთა ბაზასთან დაკავშირება
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB-სთან დაკავშირება წარმატებით დასრულდა');

    // მოდელების შექმნა
    const Category = mongoose.model('Category', CategorySchema);
    const Set = mongoose.model('Set', SetSchema);

    // JSON ფაილის წაკითხვა
    const jsonPath = join(__dirname, '..', '..', 'video links - orthopedics-com (1).json');
    const jsonData = JSON.parse(readFileSync(jsonPath, 'utf-8'));

    // კატეგორიების მეპინგი
    const categoryMapping = {
      '1-1 CERVICAL SPINE PROBLEMS': { code: '1-1', name: 'CERVICAL SPINE PROBLEMS' },
      '1-2 LUMBAR SPINE PROBLEMS': { code: '1-2', name: 'LUMBAR SPINE PROBLEMS' },
      '1-3 POSTURE PROBLEMS': { code: '1-3', name: 'POSTURE PROBLEMS' },
      '1-4 THORACIC SPINE PROBLEMS': { code: '1-4', name: 'THORACIC SPINE PROBLEMS' },
      '1-5 UPPER LIMB PROBLEMS': { code: '1-5', name: 'UPPER LIMB PROBLEMS' },
      '1-6 LOWER LIMB PROBLEMS': { code: '1-6', name: 'LOWER LIMB PROBLEMS' }
    };

    // კატეგორიების შექმნა თუ არ არსებობს
    for (const [key, value] of Object.entries(categoryMapping)) {
      const existingCategory = await Category.findOne({ code: value.code });
      if (!existingCategory) {
        await Category.create({
          name: value.name,
          code: value.code,
          sequence: value.code,
          level: 0,
          isActive: true
        });
        console.log(`შეიქმნა კატეგორია: ${value.name}`);
      }
    }

    // სეტების განახლება
    for (const categoryKey of Object.keys(jsonData)) {
      const categoryInfo = categoryMapping[categoryKey];
      if (!categoryInfo) {
        console.error(`კატეგორია ვერ მოიძებნა მეპინგში: ${categoryKey}`);
        continue;
      }

      const category = await Category.findOne({ code: categoryInfo.code });
      if (!category) {
        console.error(`კატეგორია ვერ მოიძებნა ბაზაში: ${categoryInfo.name}`);
        continue;
      }

      const setData = jsonData[categoryKey];
      let currentSetId: string | undefined = undefined;
      
      for (const item of setData) {
        if (item && item.Column12 && item.Column12.includes('set of exercises №')) {
          const setNumber = item.Column12.match(/№(\d+)/)?.[1];
          if (setNumber) {
            currentSetId = `${categoryInfo.code}.${setNumber}`;
            
            await Set.updateOne(
              { setId: currentSetId },
              { 
                $set: { 
                  categoryId: category._id,
                  subcategoryId: null 
                } 
              }
            );
            console.log(`განახლდა სეტი ID-ით: ${currentSetId}`);
          }
        }
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

updateSetsWithCategories(); 