import { MongoClient, ObjectId, Document, WithId } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/grs';

// მთავარი კატეგორიები
const MAIN_CATEGORIES = [
  { name: 'Orthopedics', code: '01', sequence: '01' },
  { name: 'Neurology', code: '02', sequence: '02' },
  { name: 'Aphasia and Dysarthria', code: '03', sequence: '03' },
  { name: 'Obesity', code: '04', sequence: '04' },
  {
    name: 'Post-traumatic Rehabilitation of Gait Disorders',
    code: '05',
    sequence: '05',
  },
  { name: "Senior's Zone", code: '06', sequence: '06' },
  { name: 'Rehabilitation after COVID-19', code: '07', sequence: '07' },
  { name: 'Category 08', code: '08', sequence: '08' },
  { name: 'Category 09', code: '09', sequence: '09' },
];

interface Video extends Document {
  categoryCode: string;
  setId: string;
  sequence: string;
  url: string;
  duration?: number;
}

interface Set extends Document {
  name: string;
  description: string;
  categoryId: ObjectId;
  exercises: ObjectId[];
  totalDuration: number;
  difficulty: string;
  level: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

async function migrateData() {
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db();

  try {
    console.log('🗑️  Deleting all existing categories...');
    await db.collection('categories').deleteMany({});
    await db.collection('sets').deleteMany({});
    await db.collection('exercises').deleteMany({});

    console.log('📝 Creating main categories...');
    await db.collection('categories').insertMany(
      MAIN_CATEGORIES.map((cat) => ({
        ...cat,
        level: 0,
        parentId: null,
        isActive: true,
        exercises: [],
        sortOrder: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );

    console.log('🎥 Getting all videos...');
    const videos = await db.collection<Video>('videos').find({}).toArray();

    // დაჯგუფება categoryCode-ის მიხედვით
    const videosByCategory = videos.reduce<Record<string, WithId<Video>[]>>(
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

    // დაჯგუფება setId-ის მიხედვით
    const setsByCategory: Record<string, Record<string, WithId<Video>[]>> = {};
    for (const categoryCode in videosByCategory) {
      const categoryVideos = videosByCategory[categoryCode];
      setsByCategory[categoryCode] = categoryVideos.reduce<
        Record<string, WithId<Video>[]>
      >((acc, video) => {
        const setId = video.setId;
        if (!acc[setId]) {
          acc[setId] = [];
        }
        acc[setId].push(video);
        return acc;
      }, {});
    }

    console.log('🏗️  Creating sets and exercises...');
    for (const categoryCode in setsByCategory) {
      const category = MAIN_CATEGORIES.find((c) => c.code === categoryCode);
      if (!category) continue;

      const categoryInDb = await db
        .collection('categories')
        .findOne({ code: categoryCode });
      if (!categoryInDb) continue;

      const sets = setsByCategory[categoryCode];
      for (const setId in sets) {
        const setVideos = sets[setId];

        // სეტის შექმნა
        const set: Set = {
          name: `Set ${setId} for ${category.name}`,
          description: `Exercise set ${setId} for ${category.name}`,
          categoryId: new ObjectId(categoryInDb._id),
          exercises: [],
          totalDuration: 0,
          difficulty: 'medium',
          level: 'beginner',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const setResult = await db.collection<Set>('sets').insertOne(set);

        // სავარჯიშოების შექმნა და სეტთან დაკავშირება
        for (const video of setVideos) {
          const exercise = {
            name: `Exercise ${video.sequence}`,
            description: `Exercise from video ${video.sequence}`,
            categoryId: new ObjectId(categoryInDb._id),
            videos: [video.url],
            difficulty: 'medium',
            isActive: true,
            sortOrder: parseInt(video.sequence.split('.')[1] || '0'),
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          const exerciseResult = await db
            .collection('exercises')
            .insertOne(exercise);

          // სეტის განახლება ახალი სავარჯიშოთი
          await db.collection<Set>('sets').updateOne(
            { _id: setResult.insertedId },
            {
              $addToSet: { exercises: exerciseResult.insertedId },
              $inc: { totalDuration: video.duration || 0 },
            },
          );
        }
      }
    }

    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Error during migration:', error);
  } finally {
    await client.close();
  }
}

migrateData().catch(console.error);
