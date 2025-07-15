"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
async function checkDatabase() {
    try {
        await mongoose_1.default.connect('mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db');
        console.log('Connected to MongoDB');
        const orthopedicsCategory = await mongoose_1.default.connection.db.collection('categories')
            .findOne({ name: "Orthopedics" });
        if (!orthopedicsCategory) {
            console.log('Orthopedics category not found!');
            return;
        }
        console.log('\nOrthopedics Category:', orthopedicsCategory);
        const sets = await mongoose_1.default.connection.db.collection('sets')
            .find({ categoryId: orthopedicsCategory._id.toString() })
            .toArray();
        console.log('\nOrthopedics Sets:', sets.length);
        for (const set of sets) {
            console.log(`\nSet: ${set.name}`);
            console.log('Exercise IDs:', set.exercises);
            const videos = await mongoose_1.default.connection.db.collection('videos')
                .find({
                _id: { $in: set.exercises.map(id => mongoose_1.default.Types.ObjectId.createFromHexString(id)) }
            })
                .toArray();
            console.log('Videos found:', videos.length);
            console.log('Sample video URLs:');
            videos.slice(0, 3).forEach(video => {
                console.log(`- ${video.url}`);
            });
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        await mongoose_1.default.disconnect();
    }
}
checkDatabase();
//# sourceMappingURL=check-db.js.map