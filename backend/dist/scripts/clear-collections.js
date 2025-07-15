"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MONGODB_URI = 'mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db';
async function clearCollections() {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('📦 მონაცემთა ბაზასთან კავშირი დამყარებულია');
        await mongoose_1.default.connection.db.collection('videos').deleteMany({});
        console.log('✅ ვიდეოების კოლექცია გასუფთავდა');
        await mongoose_1.default.connection.db.collection('sets').deleteMany({});
        console.log('✅ სეტების კოლექცია გასუფთავდა');
        console.log('\n✨ კოლექციები წარმატებით გასუფთავდა');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ კრიტიკული შეცდომა:', error);
        process.exit(1);
    }
}
clearCollections();
//# sourceMappingURL=clear-collections.js.map