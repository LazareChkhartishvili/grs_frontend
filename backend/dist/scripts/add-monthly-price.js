"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const set_schema_1 = require("../src/schemas/set.schema");
const MONGODB_URI = 'mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db';
async function addMonthlyPriceToSets() {
    try {
        const connection = await (0, mongoose_1.connect)(MONGODB_URI);
        console.log('✅ MongoDB-სთან დაკავშირება წარმატებით დასრულდა');
        const SetModel = connection.model('Set', set_schema_1.SetSchema);
        const sets = await SetModel.find({ monthlyPrice: { $exists: false } });
        console.log(`🔍 ნაპოვნია ${sets.length} სეტი monthlyPrice-ის გარეშე`);
        for (const set of sets) {
            await SetModel.findByIdAndUpdate(set._id, { $set: { monthlyPrice: 920 } }, { new: true, runValidators: false });
            console.log(`✅ სეტი განახლდა: ${set._id}`);
        }
        console.log('✨ მიგრაცია წარმატებით დასრულდა');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ შეცდომა მიგრაციისას:', error);
        process.exit(1);
    }
}
addMonthlyPriceToSets();
//# sourceMappingURL=add-monthly-price.js.map