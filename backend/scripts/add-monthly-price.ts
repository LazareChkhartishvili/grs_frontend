import { connect } from 'mongoose';
import { Set, SetSchema } from '../src/schemas/set.schema';

const MONGODB_URI =
  'mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db';

async function addMonthlyPriceToSets() {
  try {
    // მონგოსთან დაკავშირება
    const connection = await connect(MONGODB_URI);
    console.log('✅ MongoDB-სთან დაკავშირება წარმატებით დასრულდა');

    // სეტების მოდელის შექმნა
    const SetModel = connection.model('Set', SetSchema);

    // ყველა სეტის მოძებნა რომელსაც არ აქვს monthlyPrice
    const sets = await SetModel.find({ monthlyPrice: { $exists: false } });
    console.log(`🔍 ნაპოვნია ${sets.length} სეტი monthlyPrice-ის გარეშე`);

    // თითოეული სეტისთვის monthlyPrice-ის დამატება
    for (const set of sets) {
      await SetModel.findByIdAndUpdate(
        set._id,
        { $set: { monthlyPrice: 920 } },
        { new: true, runValidators: false },
      );
      console.log(`✅ სეტი განახლდა: ${set._id}`);
    }

    console.log('✨ მიგრაცია წარმატებით დასრულდა');
    process.exit(0);
  } catch (error) {
    console.error('❌ შეცდომა მიგრაციისას:', error);
    process.exit(1);
  }
}

addMonthlyPriceToSets();
