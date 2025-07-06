import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI =
  'mongodb+srv://beruashvilig60:Giorgi1234@cluster0.dtwfws3.mongodb.net/grs-db';
const DB_NAME = 'grs-db';

interface Video {
  _id: ObjectId;
  title: string;
  description?: string;
  url: string;
  resolution: string;
  sequence: string;
  categoryCode: string;
  setId: string;
}

interface Set {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  categoryId: ObjectId;
  subcategoryId?: ObjectId;
  setNumber: string;
  videos: ObjectId[];
  subscriptionPlans: { period: number; price: number }[];
  isActive: boolean;
  sortOrder: number;
}

async function migrateVideosToSets() {
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(DB_NAME);

  try {
    // 1. Get all unique setIds from videos
    const setIds = await db
      .collection('videos')
      .distinct('setId', { setId: { $exists: true, $ne: null } });

    console.log(`Found ${setIds.length} unique sets`);

    // 2. For each setId, create a new set
    for (const setId of setIds) {
      // Get all videos for this set
      const videos = (await db
        .collection('videos')
        .find({ setId })
        .toArray()) as Video[];

      if (!videos.length) continue;

      // Get category from first video
      const firstVideo = videos[0];
      const categoryId = await getCategoryId(db, firstVideo.categoryCode);

      if (!categoryId) {
        console.log(
          `Skipping set ${setId} - category not found for code ${firstVideo.categoryCode}`,
        );
        continue;
      }

      // Create set document
      const set: Set = {
        _id: new ObjectId(),
        name: `Set ${setId}`, // Temporary name
        description: `Video set ${setId}`, // Temporary description
        price: 25, // Default price
        categoryId,
        setNumber: setId,
        videos: videos.map((v) => v._id),
        subscriptionPlans: [
          { period: 1, price: 25 },
          { period: 3, price: 60 },
          { period: 6, price: 100 },
        ],
        isActive: true,
        sortOrder: parseInt(setId),
      };

      // Insert set
      await db.collection('sets').insertOne(set);
      console.log(`Created set ${setId} with ${videos.length} videos`);
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await client.close();
  }
}

async function getCategoryId(
  db: any,
  categoryCode: string,
): Promise<ObjectId | null> {
  const category = await db
    .collection('categories')
    .findOne({ code: categoryCode });

  return category ? category._id : null;
}

// Run migration
migrateVideosToSets();
