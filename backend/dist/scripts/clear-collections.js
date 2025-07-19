"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const MONGODB_URI = 'mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db';
async function clearCollections() {
    try {
        const client = await mongodb_1.MongoClient.connect(MONGODB_URI);
        const db = client.db('grs-db');
        const collections = ['categories', 'sets', 'exercises'];
        for (const collectionName of collections) {
            try {
                await db.collection(collectionName).drop();
                console.log(`Collection ${collectionName} dropped successfully`);
            }
            catch (err) {
                if (err.code === 26) {
                    console.log(`Collection ${collectionName} does not exist`);
                }
                else {
                    console.error(`Error dropping collection ${collectionName}:`, err);
                }
            }
        }
        for (const collectionName of collections) {
            try {
                const collection = db.collection(collectionName);
                await collection.dropIndexes();
                console.log(`Indexes for ${collectionName} dropped successfully`);
            }
            catch (err) {
                console.error(`Error dropping indexes for ${collectionName}:`, err);
            }
        }
        await client.close();
        console.log('Database cleanup completed');
    }
    catch (err) {
        console.error('Error connecting to database:', err);
    }
}
clearCollections();
//# sourceMappingURL=clear-collections.js.map