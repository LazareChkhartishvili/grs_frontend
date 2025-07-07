"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const MONGODB_URI = 'mongodb+srv://beruashvilig60:Giorgi1234@cluster0.dtwfws3.mongodb.net/grs-db';
const DB_NAME = 'grs-db';
async function migrateVideosToSets() {
    const client = await mongodb_1.MongoClient.connect(MONGODB_URI);
    const db = client.db(DB_NAME);
    try {
        const setIds = await db
            .collection('videos')
            .distinct('setId', { setId: { $exists: true, $ne: null } });
        console.log(`Found ${setIds.length} unique sets`);
        for (const setId of setIds) {
            const videos = (await db
                .collection('videos')
                .find({ setId })
                .toArray());
            if (!videos.length)
                continue;
            const firstVideo = videos[0];
            const categoryId = await getCategoryId(db, firstVideo.categoryCode);
            if (!categoryId) {
                console.log(`Skipping set ${setId} - category not found for code ${firstVideo.categoryCode}`);
                continue;
            }
            const set = {
                _id: new mongodb_1.ObjectId(),
                name: `Set ${setId}`,
                description: `Video set ${setId}`,
                price: 25,
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
            await db.collection('sets').insertOne(set);
            console.log(`Created set ${setId} with ${videos.length} videos`);
        }
        console.log('Migration completed successfully');
    }
    catch (error) {
        console.error('Migration failed:', error);
    }
    finally {
        await client.close();
    }
}
async function getCategoryId(db, categoryCode) {
    const category = await db
        .collection('categories')
        .findOne({ code: categoryCode });
    return category ? category._id : null;
}
migrateVideosToSets();
//# sourceMappingURL=migrate-sets.js.map