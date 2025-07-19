"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
async function checkCollections() {
    try {
        await mongoose_1.default.connect('mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db');
        console.log('MongoDB-სთან კავშირი დამყარებულია\n');
        const collections = await mongoose_1.default.connection.db.collections();
        for (const collection of collections) {
            const count = await collection.countDocuments();
            console.log(`\n🗂️  კოლექცია: ${collection.collectionName}`);
            console.log(`📊 დოკუმენტების რაოდენობა: ${count}`);
            if (count > 0) {
                const sample = await collection.findOne();
                console.log('\n📄 მაგალითი დოკუმენტი:');
                console.log(JSON.stringify(sample, null, 2));
            }
            console.log('\n' + '-'.repeat(50));
        }
    }
    catch (error) {
        console.error('შეცდომა:', error);
    }
    finally {
        await mongoose_1.default.disconnect();
        console.log('\nMongoDB-სთან კავშირი დასრულებულია');
    }
}
checkCollections();
//# sourceMappingURL=check-collections.js.map