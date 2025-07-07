"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in environment variables');
    process.exit(1);
}
async function migrateCategories() {
    try {
        const db = await (0, mongoose_1.connect)(MONGODB_URI);
        console.log('Connected to MongoDB');
        const categoriesCollection = db.connection.collection('categories');
        const oldCategories = await categoriesCollection.find({}).toArray();
        console.log(`Found ${oldCategories.length} categories to migrate`);
        for (const oldCat of oldCategories) {
            if (oldCat.parentId !== undefined) {
                console.log(`Category ${oldCat.name} already migrated, skipping...`);
                continue;
            }
            const newCategory = {
                name: oldCat.name,
                code: oldCat.code || String(oldCat._id).padStart(2, '0'),
                description: oldCat.description || null,
                image: oldCat.image || null,
                parentId: null,
                level: 0,
                isActive: oldCat.isActive !== false,
                exercises: [],
                sortOrder: parseInt(oldCat.code || String(oldCat._id), 10),
                createdAt: oldCat.createdAt || new Date(),
                updatedAt: new Date()
            };
            await categoriesCollection.updateOne({ _id: oldCat._id }, { $set: newCategory }, { upsert: true });
            console.log(`Migrated category: ${oldCat.name}`);
        }
        console.log('Migration completed successfully');
        await categoriesCollection.createIndex({ parentId: 1 });
        await categoriesCollection.createIndex({ level: 1 });
        await categoriesCollection.createIndex({ isActive: 1 });
        await categoriesCollection.createIndex({ sortOrder: 1 });
        await categoriesCollection.createIndex({ code: 1 }, { unique: true });
        console.log('Indexes created successfully');
        await db.disconnect();
        console.log('Disconnected from MongoDB');
    }
    catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}
migrateCategories();
//# sourceMappingURL=migrate-categories.js.map