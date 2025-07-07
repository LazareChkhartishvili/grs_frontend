import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { Video } from '../src/schemas/video.schema';
import { Category } from '../src/schemas/category.schema';

config();

const MONGODB_URI = process.env.MONGODB_URI;

async function createSubcategories() {
  const client = await MongoClient.connect(MONGODB_URI || '');
  const db = client.db();

  try {
    // წავშალოთ არსებული სუბკატეგორიები
    console.log('🗑️  Deleting existing subcategories...');
    await db.collection('categories').deleteMany({ parentId: { $ne: null } });

    console.log('🔍 Getting all videos...');
    const videos = await db.collection<Video>('videos').find({}).toArray();
    const categories = await db
      .collection<Category>('categories')
      .find({})
      .toArray();

    // დაჯგუფება კატეგორიების მიხედვით
    const videosByCategory = videos.reduce<Record<string, Video[]>>(
      (acc, video) => {
        const categoryCode = video.categoryCode;
        if (!acc[categoryCode]) {
          acc[categoryCode] = [];
        }
        acc[categoryCode].push(video);
        return acc;
      },
      {},
    );

    console.log('📝 Creating subcategories...');
    for (const categoryCode in videosByCategory) {
      const categoryVideos = videosByCategory[categoryCode];
      const category = categories.find((c) => c.code === categoryCode);

      if (!category) {
        console.log(`⚠️  Category not found for code: ${categoryCode}`);
        continue;
      }

      // სუბკატეგორიების დაჯგუფება
      const subcategoryGroups = categoryVideos.reduce<Record<string, Video[]>>(
        (acc, video) => {
          const subcategoryPrefix = video.sequence
            .split('.')
            .slice(0, 2)
            .join('.');
          if (!acc[subcategoryPrefix]) {
            acc[subcategoryPrefix] = [];
          }
          acc[subcategoryPrefix].push(video);
          return acc;
        },
        {},
      );

      // სუბკატეგორიების შექმნა
      for (const prefix in subcategoryGroups) {
        console.log(`  - Creating Subcategory ${prefix} for ${category.name}`);

        // შევქმნათ უნიკალური sequence სუბკატეგორიისთვის
        const uniqueSequence = `${categoryCode}.${prefix}`;

        const subcategory = {
          name: `${category.name} - Group ${prefix}`,
          description: `Subcategory ${prefix} of ${category.name}`,
          parentId: category._id,
          level: 1,
          code: categoryCode,
          sequence: uniqueSequence,
          sortOrder: parseInt(prefix.split('.')[1] || '0'),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await db.collection('categories').insertOne(subcategory);
      }
    }

    console.log('✅ Subcategories created successfully!');
  } catch (error) {
    console.log('❌ Error creating subcategories:', error);
  } finally {
    await client.close();
  }
}

createSubcategories();
