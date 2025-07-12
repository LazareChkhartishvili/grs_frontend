const { MongoClient } = require('mongodb');

async function remove720pVideos() {
  const client = new MongoClient('mongodb+srv://giogomadze:n9IJAOiT2Qy35VcV@cluster0.owzbc.mongodb.net/grs-db');
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('grs-db');
    const videosCollection = db.collection('videos');
    
    const qualityStats = await videosCollection.aggregate([
      {
        $group: {
          _id: '$quality',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();
    
    console.log('\n📊 Video quality statistics:');
    qualityStats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} videos`);
    });
    
    // ვნახოთ რამდენი 720p ვიდეო არის
    const videos720p = await videosCollection.find({ quality: '720p' }).toArray();
    console.log(`\n🔍 Found ${videos720p.length} videos with 720p quality`);
    
    if (videos720p.length > 0) {
      console.log('\n📝 Sample 720p videos:');
      videos720p.slice(0, 5).forEach((video, index) => {
        console.log(`${index + 1}. ${video.filename || video.title || 'No name'} - Sequence: ${video.sequence}`);
      });
      
      // მომხმარებელს ვკითხოთ წაშლა სურს თუ არა
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      rl.question(`\n⚠️  Are you sure you want to delete all ${videos720p.length} videos with 720p quality? (yes/no): `, async (answer) => {
        if (answer.toLowerCase() === 'yes') {
          try {
            const result = await videosCollection.deleteMany({ quality: '720p' });
            console.log(`\n✅ Successfully deleted ${result.deletedCount} videos with 720p quality`);
            
            // ახალი სტატისტიკა
            const newStats = await videosCollection.aggregate([
              {
                $group: {
                  _id: '$quality',
                  count: { $sum: 1 }
                }
              },
              { $sort: { _id: 1 } }
            ]).toArray();
            
            console.log('\n📊 Updated video quality statistics:');
            newStats.forEach(stat => {
              console.log(`${stat._id}: ${stat.count} videos`);
            });
            
          } catch (error) {
            console.error('❌ Error deleting videos:', error);
          }
        } else {
          console.log('❌ Operation cancelled');
        }
        
        rl.close();
        await client.close();
      });
    } else {
      console.log('ℹ️  No 720p videos found');
      await client.close();
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    await client.close();
  }
}

remove720pVideos(); 