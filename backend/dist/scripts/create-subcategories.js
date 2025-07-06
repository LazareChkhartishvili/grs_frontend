"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const MONGODB_URI = process.env.MONGODB_URI;
async function createSubcategories() {
    const client = await mongodb_1.MongoClient.connect(MONGODB_URI || '');
    const db = client.db();
    try {
        console.log('🗑️  Deleting existing subcategories...');
        await db.collection('categories').deleteMany({ parentId: { $ne: null } });
        console.log('🔍 Getting all videos...');
        const videos = await db.collection('videos').find({}).toArray();
        const categories = await db
            .collection('categories')
            .find({})
            .toArray();
        const videosByCategory = videos.reduce((acc, video) => {
            const categoryCode = video.categoryCode;
            if (!acc[categoryCode]) {
                acc[categoryCode] = [];
            }
            acc[categoryCode].push(video);
            return acc;
        }, {});
        console.log('📝 Creating subcategories...');
        for (const categoryCode in videosByCategory) {
            const categoryVideos = videosByCategory[categoryCode];
            const category = categories.find((c) => c.code === categoryCode);
            if (!category) {
                console.log(`⚠️  Category not found for code: ${categoryCode}`);
                continue;
            }
            const subcategoryGroups = categoryVideos.reduce((acc, video) => {
                const subcategoryPrefix = video.sequence
                    .split('.')
                    .slice(0, 2)
                    .join('.');
                if (!acc[subcategoryPrefix]) {
                    acc[subcategoryPrefix] = [];
                }
                acc[subcategoryPrefix].push(video);
                return acc;
            }, {});
            for (const prefix in subcategoryGroups) {
                console.log(`  - Creating Subcategory ${prefix} for ${category.name}`);
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
    }
    catch (error) {
        console.log('❌ Error creating subcategories:', error);
    }
    finally {
        await client.close();
    }
}
createSubcategories();
//# sourceMappingURL=create-subcategories.js.map