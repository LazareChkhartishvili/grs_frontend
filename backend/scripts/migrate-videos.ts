import { connect } from 'mongoose';
import { Set } from '../src/schemas/set.schema';
import { Video } from '../src/schemas/video.schema';

async function migrateVideos() {
  try {
    // მონაცემთა ბაზასთან დაკავშირება
    await connect('mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db');
    console.log('Connected to MongoDB');

    // ყველა სეტის მიღება
    const sets = await Set.find();
    console.log(`Found ${sets.length} sets`);

    // ყველა ვიდეოს მიღება
    const videos = await Video.find();
    console.log(`Found ${videos.length} videos`);

    // სეტების განახლება
    for (const set of sets) {
      // სეტის ნომრის მიღება
      const setNumber = set.setNumber;
      console.log(`Processing set ${setNumber}`);

      // ვიდეოების მოძებნა სეტის ნომრით
      const setVideos = videos.filter(video => video.setId === setNumber);
      console.log(`Found ${setVideos.length} videos for set ${setNumber}`);

      // სავარჯიშოების განახლება ვიდეოების ID-ებით
      const updatedExercises = setVideos.map((video, index) => ({
        repetitions: 1,
        sets: 1,
        restTime: 0,
        duration: 0,
        order: index,
        videoId: video._id,
      }));

      // სეტის განახლება
      set.exercises = updatedExercises;
      await set.save();
      console.log(`Updated set ${setNumber} with ${updatedExercises.length} exercises`);
    }

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateVideos(); 