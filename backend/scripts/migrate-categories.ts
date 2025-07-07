import { connect } from 'mongoose';
import { config } from 'dotenv';

// Load environment variables
config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

interface OldCategory {
  _id: number;
  name: string;
  code: string;
  image?: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface NewCategory {
  _id: any; // MongoDB ObjectId
  name: string;
  code: string;
  image?: string;
  description?: string;
  parentId?: any;
  level: number;
  isActive: boolean;
  exercises: any[];
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

async function migrateCategories() {
  try {
    // Connect to MongoDB
    const db = await connect(MONGODB_URI as string);
    console.log('Connected to MongoDB');

    const categoriesCollection = db.connection.collection('categories');

    // 1. Get all existing categories
    const oldCategories = await categoriesCollection.find({}).toArray();
    console.log(`Found ${oldCategories.length} categories to migrate`);

    // 2. Process each category
    for (const oldCat of oldCategories) {
      // Skip if already migrated (has parentId field)
      if (oldCat.parentId !== undefined) {
        console.log(`Category ${oldCat.name} already migrated, skipping...`);
        continue;
      }

      const newCategory: Partial<NewCategory> = {
        name: oldCat.name,
        code: oldCat.code || String(oldCat._id).padStart(2, '0'), // Use existing code or generate from _id
        description: oldCat.description || null,
        image: oldCat.image || null,
        parentId: null, // Main categories have no parent
        level: 0, // Main categories are level 0
        isActive: oldCat.isActive !== false, // Default to true if not set
        exercises: [], // Start with empty exercises array
        sortOrder: parseInt(oldCat.code || String(oldCat._id), 10), // Use code/id for initial sort order
        createdAt: oldCat.createdAt || new Date(),
        updatedAt: new Date()
      };

      // 3. Update the category
      await categoriesCollection.updateOne(
        { _id: oldCat._id },
        { $set: newCategory },
        { upsert: true }
      );

      console.log(`Migrated category: ${oldCat.name}`);
    }

    console.log('Migration completed successfully');
    
    // 4. Create indexes
    await categoriesCollection.createIndex({ parentId: 1 });
    await categoriesCollection.createIndex({ level: 1 });
    await categoriesCollection.createIndex({ isActive: 1 });
    await categoriesCollection.createIndex({ sortOrder: 1 });
    await categoriesCollection.createIndex({ code: 1 }, { unique: true });

    console.log('Indexes created successfully');

    await db.disconnect();
    console.log('Disconnected from MongoDB');

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateCategories(); 