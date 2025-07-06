"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const MONGODB_URI = process.env.MONGODB_URI;
const CATEGORY_NAMES = {
    '01': 'Orthopedics',
    '02': 'Neurology',
    '03': 'Aphasia and Dysarthria',
    '04': 'Obesity',
    '05': 'Post-traumatic Rehabilitation of Gait Disorders',
    '06': "Senior's Zone",
    '07': 'Rehabilitation after COVID-19',
};
const VideoSchema = new mongoose_1.Schema({
    _id: Number,
    name: String,
    categoryCode: String,
    categoryId: { type: mongoose_1.Types.ObjectId, ref: 'Category' },
    setId: String,
    url: String,
    sequence: String,
    resolution: String,
    format: String,
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const CategorySchema = new mongoose_1.Schema({
    name: String,
    description: String,
    image: String,
    sequence: { type: String, unique: true },
    parentId: { type: mongoose_1.Types.ObjectId, ref: 'Category', default: null },
    level: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
}, { timestamps: true });
async function buildHierarchy() {
    try {
        const connection = await (0, mongoose_1.connect)(MONGODB_URI);
        console.log('Connected to MongoDB');
        const Video = connection.model('Video', VideoSchema, 'videos');
        const Category = connection.model('Category', CategorySchema, 'categories');
        const videos = await Video.find({ isActive: true }).lean();
        console.log(`Found ${videos.length} videos`);
        const hierarchy = {};
        for (const video of videos) {
            const sequence = video.sequence;
            const parts = sequence.split('.');
            if (parts.length !== 4) {
                console.warn(`Invalid sequence format: ${sequence}`);
                continue;
            }
            const cat = video.categoryCode;
            const [_, subcat, section] = parts;
            if (!hierarchy[cat]) {
                hierarchy[cat] = {
                    id: cat,
                    name: CATEGORY_NAMES[cat] || `Category ${cat}`,
                    children: {},
                    videos: [],
                    level: 0,
                    sequence: cat,
                };
            }
            if (!hierarchy[cat].children[subcat]) {
                hierarchy[cat].children[subcat] = {
                    id: `${cat}.${subcat}`,
                    name: `${CATEGORY_NAMES[cat]} - Section ${subcat}`,
                    children: {},
                    videos: [],
                    level: 1,
                    sequence: `${cat}.${subcat}`,
                };
            }
            if (!hierarchy[cat].children[subcat].children[section]) {
                hierarchy[cat].children[subcat].children[section] = {
                    id: `${cat}.${subcat}.${section}`,
                    name: `${CATEGORY_NAMES[cat]} - Section ${subcat}.${section}`,
                    children: {},
                    videos: [],
                    level: 2,
                    sequence: `${cat}.${subcat}.${section}`,
                };
            }
            hierarchy[cat].children[subcat].children[section].videos.push({
                _id: video._id,
                name: video.name,
                sequence: sequence,
                url: video.url,
                resolution: video.resolution,
                categoryCode: video.categoryCode,
            });
        }
        for (const catKey of Object.keys(hierarchy)) {
            const cat = hierarchy[catKey];
            const mainCategory = await Category.findOneAndUpdate({ sequence: cat.sequence }, {
                name: cat.name,
                level: cat.level,
                sequence: cat.sequence,
                isActive: true,
            }, { upsert: true, new: true });
            for (const subcatKey of Object.keys(cat.children)) {
                const subcat = cat.children[subcatKey];
                const subcategory = await Category.findOneAndUpdate({ sequence: subcat.sequence }, {
                    name: subcat.name,
                    parentId: mainCategory._id,
                    level: subcat.level,
                    sequence: subcat.sequence,
                    isActive: true,
                }, { upsert: true, new: true });
                for (const sectionKey of Object.keys(subcat.children)) {
                    const section = subcat.children[sectionKey];
                    const sectionDoc = await Category.findOneAndUpdate({ sequence: section.sequence }, {
                        name: section.name,
                        parentId: subcategory._id,
                        level: section.level,
                        sequence: section.sequence,
                        isActive: true,
                    }, { upsert: true, new: true });
                    await Video.updateMany({ sequence: { $regex: `^${section.sequence}` } }, {
                        $set: {
                            categoryId: sectionDoc._id,
                            isActive: true,
                        },
                    });
                }
            }
        }
        console.log('Hierarchy created successfully');
        await connection.disconnect();
        console.log('Disconnected from MongoDB');
    }
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}
buildHierarchy();
//# sourceMappingURL=organize-videos.js.map