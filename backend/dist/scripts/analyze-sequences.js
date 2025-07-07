"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/grs';
async function analyzeSequences() {
    const client = await mongodb_1.MongoClient.connect(MONGODB_URI);
    const db = client.db();
    try {
        console.log('🔍 Analyzing video sequences...');
        const videos = await db.collection('videos').find({}).toArray();
        const videosByCategory = videos.reduce((acc, video) => {
            const categoryCode = video.categoryCode;
            if (!acc[categoryCode]) {
                acc[categoryCode] = [];
            }
            acc[categoryCode].push(video);
            return acc;
        }, {});
        for (const categoryCode in videosByCategory) {
            const categoryVideos = videosByCategory[categoryCode];
            console.log(`\n📊 Category ${categoryCode}:`);
            const subcategoryGroups = categoryVideos.reduce((acc, video) => {
                const subcategoryPrefix = video.sequence
                    .split('.')
                    .slice(0, 2)
                    .join('.');
                if (!acc[subcategoryPrefix]) {
                    acc[subcategoryPrefix] = [];
                }
                acc[subcategoryPrefix].push(video);
                return acc;
            }, {});
            for (const prefix in subcategoryGroups) {
                const videos = subcategoryGroups[prefix];
                console.log(`  - Subcategory ${prefix}: ${videos.length} videos`);
                const uniquePatterns = new Set(videos.map((v) => {
                    const parts = v.sequence.split('.');
                    return `${parts.length} parts: ${v.sequence}`;
                }));
                console.log('    Sequence patterns:');
                uniquePatterns.forEach((pattern) => console.log(`    * ${pattern}`));
            }
        }
    }
    catch (error) {
        console.error('❌ Error during analysis:', error);
    }
    finally {
        await client.close();
    }
}
analyzeSequences().catch(console.error);
//# sourceMappingURL=analyze-sequences.js.map