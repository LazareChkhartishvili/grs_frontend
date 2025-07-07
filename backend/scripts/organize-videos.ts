import { connect, model, Schema, Types } from 'mongoose';
import { config } from 'dotenv';

// Load environment variables
config();

const MONGODB_URI = process.env.MONGODB_URI;

// კატეგორიების სახელების მეფინგი
const CATEGORY_NAMES: { [key: string]: string } = {
  '01': 'Orthopedics',
  '02': 'Neurology',
  '03': 'Aphasia and Dysarthria',
  '04': 'Obesity',
  '05': 'Post-traumatic Rehabilitation of Gait Disorders',
  '06': "Senior's Zone",
  '07': 'Rehabilitation after COVID-19',
};

// Define schemas
const VideoSchema = new Schema(
  {
    _id: Number,
    name: String,
    categoryCode: String,
    categoryId: { type: Types.ObjectId, ref: 'Category' },
    setId: String,
    url: String,
    sequence: String,
    resolution: String,
    format: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const CategorySchema = new Schema(
  {
    name: String,
    description: String,
    image: String,
    sequence: { type: String, unique: true },
    parentId: { type: Types.ObjectId, ref: 'Category', default: null },
    level: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

interface VideoNode {
  _id: number;
  name: string;
  sequence: string;
  url: string;
  resolution: string;
  categoryCode: string;  // დავამატე ეს ველი
}

interface CategoryNode {
  id: string;
  name: string;
  children: { [key: string]: CategoryNode };
  videos: VideoNode[];
  level: number;
  sequence: string;
}

async function buildHierarchy() {
  try {
    // Connect to MongoDB
    const connection = await connect(MONGODB_URI as string);
    console.log('Connected to MongoDB');

    // Register models
    const Video = connection.model('Video', VideoSchema, 'videos');
    const Category = connection.model('Category', CategorySchema, 'categories');

    // Get all videos
    const videos = await Video.find({ isActive: true }).lean();
    console.log(`Found ${videos.length} videos`);

    // Create hierarchy object
    const hierarchy: { [key: string]: CategoryNode } = {};

    // Process each video
    for (const video of videos as VideoNode[]) {
      const sequence = video.sequence;
      const parts = sequence.split('.');

      if (parts.length !== 4) {
        console.warn(`Invalid sequence format: ${sequence}`);
        continue;
      }

      const cat = video.categoryCode; // ცვლილება: ვიყენებთ categoryCode-ს
      const [_, subcat, section] = parts; // ცვლილება: sequence-დან მხოლოდ subcat და section გვჭირდება

      // Create category if doesn't exist
      if (!hierarchy[cat]) {
        hierarchy[cat] = {
          id: cat,
          name: CATEGORY_NAMES[cat] || `Category ${cat}`,
          children: {},
          videos: [],
          level: 0,
          sequence: cat,
        };
      }

      // Create subcategory if doesn't exist
      if (!hierarchy[cat].children[subcat]) {
        hierarchy[cat].children[subcat] = {
          id: `${cat}.${subcat}`,
          name: `${CATEGORY_NAMES[cat]} - Section ${subcat}`,
          children: {},
          videos: [],
          level: 1,
          sequence: `${cat}.${subcat}`,
        };
      }

      // Create section if doesn't exist
      if (!hierarchy[cat].children[subcat].children[section]) {
        hierarchy[cat].children[subcat].children[section] = {
          id: `${cat}.${subcat}.${section}`,
          name: `${CATEGORY_NAMES[cat]} - Section ${subcat}.${section}`,
          children: {},
          videos: [],
          level: 2,
          sequence: `${cat}.${subcat}.${section}`,
        };
      }

      // Add video to section
      hierarchy[cat].children[subcat].children[section].videos.push({
        _id: video._id,
        name: video.name,
        sequence: sequence,
        url: video.url,
        resolution: video.resolution,
        categoryCode: video.categoryCode,
      });
    }

    // Create categories in database
    for (const catKey of Object.keys(hierarchy)) {
      const cat = hierarchy[catKey];

      // Create main category
      const mainCategory = await Category.findOneAndUpdate(
        { sequence: cat.sequence },
        {
          name: cat.name,
          level: cat.level,
          sequence: cat.sequence,
          isActive: true,
        },
        { upsert: true, new: true },
      );

      // Process subcategories
      for (const subcatKey of Object.keys(cat.children)) {
        const subcat = cat.children[subcatKey];

        // Create subcategory
        const subcategory = await Category.findOneAndUpdate(
          { sequence: subcat.sequence },
          {
            name: subcat.name,
            parentId: mainCategory._id,
            level: subcat.level,
            sequence: subcat.sequence,
            isActive: true,
          },
          { upsert: true, new: true },
        );

        // Process sections
        for (const sectionKey of Object.keys(subcat.children)) {
          const section = subcat.children[sectionKey];

          // Create section
          const sectionDoc = await Category.findOneAndUpdate(
            { sequence: section.sequence },
            {
              name: section.name,
              parentId: subcategory._id,
              level: section.level,
              sequence: section.sequence,
              isActive: true,
            },
            { upsert: true, new: true },
          );

          // Update videos with categoryId
          await Video.updateMany(
            { sequence: { $regex: `^${section.sequence}` } },
            {
              $set: {
                categoryId: sectionDoc._id,
                isActive: true,
              },
            },
          );
        }
      }
    }

    console.log('Hierarchy created successfully');
    await connection.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

buildHierarchy();
