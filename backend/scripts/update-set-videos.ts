import { connect, model } from 'mongoose';
import { config } from 'dotenv';
import { SetSchema } from '../src/schemas/set.schema';
import { VideoSchema } from '../src/schemas/video.schema';

config();

const Set = model('Set', SetSchema);
const Video = model('Video', VideoSchema);

async function updateSetVideos() {
  try {
    // Connect to MongoDB
    await connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all sets
    const sets = await Set.find();
    console.log(`Found ${sets.length} sets`);

    // Process each set
    for (const set of sets) {
      // Find videos that belong to this set based on videoId pattern
      const videos = await Video.find({
        videoId: { $regex: new RegExp(`${set.setId}`) }
      }).sort({ sortOrder: 1 });

      if (videos.length > 0) {
        console.log(`Found ${videos.length} videos for set: ${set.name}`);
        
        // Update set with video references
        await Set.updateOne(
          { _id: set._id },
          { $set: { videos: videos.map(v => v._id) } }
        );
        
        console.log(`Updated set ${set.name} with ${videos.length} videos`);
      } else {
        console.log(`No videos found for set: ${set.name}`);
      }
    }

    console.log('Finished updating sets with videos');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateSetVideos(); 