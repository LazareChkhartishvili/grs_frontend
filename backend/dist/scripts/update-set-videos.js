"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = require("dotenv");
const set_schema_1 = require("../src/schemas/set.schema");
const video_schema_1 = require("../src/schemas/video.schema");
(0, dotenv_1.config)();
const Set = (0, mongoose_1.model)('Set', set_schema_1.SetSchema);
const Video = (0, mongoose_1.model)('Video', video_schema_1.VideoSchema);
async function updateSetVideos() {
    try {
        await (0, mongoose_1.connect)(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        const sets = await Set.find();
        console.log(`Found ${sets.length} sets`);
        for (const set of sets) {
            const videos = await Video.find({
                videoId: { $regex: new RegExp(`${set.setId}`) }
            }).sort({ sortOrder: 1 });
            if (videos.length > 0) {
                console.log(`Found ${videos.length} videos for set: ${set.name}`);
                await Set.updateOne({ _id: set._id }, { $set: { videos: videos.map(v => v._id) } });
                console.log(`Updated set ${set.name} with ${videos.length} videos`);
            }
            else {
                console.log(`No videos found for set: ${set.name}`);
            }
        }
        console.log('Finished updating sets with videos');
        process.exit(0);
    }
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}
updateSetVideos();
//# sourceMappingURL=update-set-videos.js.map