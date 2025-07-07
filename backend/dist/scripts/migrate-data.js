"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/grs';
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
async function migrateData() {
    const client = await mongodb_1.MongoClient.connect(MONGODB_URI);
    const db = client.db();
    try {
        console.log('🗑️  Deleting all existing categories...');
        await db.collection('categories').deleteMany({});
        await db.collection('sets').deleteMany({});
        await db.collection('exercises').deleteMany({});
        console.log('📝 Creating main categories...');
        await db.collection('categories').insertMany(MAIN_CATEGORIES.map((cat) => ({
            ...cat,
            level: 0,
            parentId: null,
            isActive: true,
            exercises: [],
            sortOrder: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        })));
        console.log('🎥 Getting all videos...');
        const videos = await db.collection('videos').find({}).toArray();
        const videosByCategory = videos.reduce((acc, video) => {
            const categoryCode = video.categoryCode;
            if (!acc[categoryCode]) {
                acc[categoryCode] = [];
            }
            acc[categoryCode].push(video);
            return acc;
        }, {});
        const setsByCategory = {};
        for (const categoryCode in videosByCategory) {
            const categoryVideos = videosByCategory[categoryCode];
            setsByCategory[categoryCode] = categoryVideos.reduce((acc, video) => {
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
            if (!category)
                continue;
            const categoryInDb = await db
                .collection('categories')
                .findOne({ code: categoryCode });
            if (!categoryInDb)
                continue;
            const sets = setsByCategory[categoryCode];
            for (const setId in sets) {
                const setVideos = sets[setId];
                const set = {
                    name: `Set ${setId} for ${category.name}`,
                    description: `Exercise set ${setId} for ${category.name}`,
                    categoryId: new mongodb_1.ObjectId(categoryInDb._id),
                    exercises: [],
                    totalDuration: 0,
                    difficulty: 'medium',
                    level: 'beginner',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                const setResult = await db.collection('sets').insertOne(set);
                for (const video of setVideos) {
                    const exercise = {
                        name: `Exercise ${video.sequence}`,
                        description: `Exercise from video ${video.sequence}`,
                        categoryId: new mongodb_1.ObjectId(categoryInDb._id),
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
                    await db.collection('sets').updateOne({ _id: setResult.insertedId }, {
                        $addToSet: { exercises: exerciseResult.insertedId },
                        $inc: { totalDuration: video.duration || 0 },
                    });
                }
            }
        }
        console.log('✅ Migration completed successfully!');
    }
    catch (error) {
        console.error('❌ Error during migration:', error);
    }
    finally {
        await client.close();
    }
}
migrateData().catch(console.error);
//# sourceMappingURL=migrate-data.js.map