import mongoose from 'mongoose';

async function checkDatabase() {
  try {
    await mongoose.connect('mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db');
    console.log('Connected to MongoDB');

    // ვპოულობთ ორთოპედიის კატეგორიას
    const orthopedicsCategory = await mongoose.connection.db.collection('categories')
      .findOne({ name: "Orthopedics" });
    
    if (!orthopedicsCategory) {
      console.log('Orthopedics category not found!');
      return;
    }

    console.log('\nOrthopedics Category:', orthopedicsCategory);

    // ვპოულობთ ყველა სეტს ამ კატეგორიაში
    const sets = await mongoose.connection.db.collection('sets')
      .find({ categoryId: orthopedicsCategory._id.toString() })
      .toArray();

    console.log('\nOrthopedics Sets:', sets.length);
    
    // დეტალურად ვბეჭდავთ თითოეულ სეტს და მის ვიდეოებს
    for (const set of sets) {
      console.log(`\nSet: ${set.name}`);
      console.log('Exercise IDs:', set.exercises);
      
      // ვპოულობთ ამ სეტის ვიდეოებს
      const videos = await mongoose.connection.db.collection('videos')
        .find({ 
          _id: { $in: set.exercises.map(id => mongoose.Types.ObjectId.createFromHexString(id)) }
        })
        .toArray();
      
      console.log('Videos found:', videos.length);
      console.log('Sample video URLs:');
      videos.slice(0, 3).forEach(video => {
        console.log(`- ${video.url}`);
      });
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

checkDatabase(); 