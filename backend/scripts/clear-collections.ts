import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db';

async function clearCollections() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('📦 მონაცემთა ბაზასთან კავშირი დამყარებულია');

    // ვშლით ვიდეოებს
    await mongoose.connection.db.collection('videos').deleteMany({});
    console.log('✅ ვიდეოების კოლექცია გასუფთავდა');

    // ვშლით სეტებს
    await mongoose.connection.db.collection('sets').deleteMany({});
    console.log('✅ სეტების კოლექცია გასუფთავდა');

    console.log('\n✨ კოლექციები წარმატებით გასუფთავდა');
    process.exit(0);
  } catch (error) {
    console.error('❌ კრიტიკული შეცდომა:', error);
    process.exit(1);
  }
}

clearCollections(); 