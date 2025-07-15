"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fs_1 = require("fs");
const path_1 = require("path");
const MONGODB_URI = 'mongodb://localhost:27017/grs';
const CategorySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    code: { type: String, unique: true },
    sequence: { type: String, unique: true },
    level: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
});
const VideoSchema = new mongoose_1.default.Schema({
    videoId: { type: String, required: true },
    title: {
        ka: String,
        en: String,
        ru: String
    },
    description: {
        ka: String,
        en: String,
        ru: String
    },
    urls: {
        hd: String,
        sd: String
    },
    categoryId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Category' },
    setId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Set' },
    sequence: String,
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 }
});
const SetSchema = new mongoose_1.default.Schema({
    setId: { type: String, required: true },
    title: {
        ka: { type: String, required: true },
        en: { type: String, required: true },
        ru: { type: String, required: true }
    },
    description: {
        ka: String,
        en: String,
        ru: String
    },
    videos: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Video' }],
    categoryId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Category' },
    sequence: String,
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    isPublic: { type: Boolean, default: false },
    viewCount: { type: Number, default: 0 },
    monthlyPrice: { type: Number, required: true, default: 920 }
});
async function updateCategoryRelations() {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('MongoDB-სთან დაკავშირება წარმატებით დასრულდა');
        const Category = mongoose_1.default.model('Category', CategorySchema);
        const Set = mongoose_1.default.model('Set', SetSchema);
        const Video = mongoose_1.default.model('Video', VideoSchema);
        const jsonPath = (0, path_1.join)(__dirname, '..', '..', 'video links - orthopedics-com (1).json');
        const jsonData = JSON.parse((0, fs_1.readFileSync)(jsonPath, 'utf-8'));
        for (const [categoryKey, exercises] of Object.entries(jsonData)) {
            const categoryCode = categoryKey.split(' ')[0];
            const category = await Category.findOne({ code: categoryCode });
            if (!category) {
                console.error(`კატეგორია ვერ მოიძებნა კოდით: ${categoryCode}`);
                continue;
            }
            let currentSet = null;
            let currentSetVideos = [];
            for (const item of exercises) {
                if (!item)
                    continue;
                if (item.Column12 && item.Column12.includes('set of exercises №')) {
                    if (currentSet) {
                        currentSet.videos = currentSetVideos;
                        await currentSet.save();
                        console.log(`შენახულია სეტი: ${currentSet.setId} ${currentSetVideos.length} ვიდეოთი`);
                    }
                    const setNumber = item.Column12.match(/№(\d+)/)?.[1];
                    const setSequence = `${categoryCode}.${setNumber}`;
                    currentSet = new Set({
                        setId: setSequence,
                        title: {
                            en: item.Column12,
                            ka: item.Column12,
                            ru: item.Column12
                        },
                        description: {
                            en: item.Column14,
                            ka: item.Column14,
                            ru: item.Column14
                        },
                        categoryId: category._id,
                        sequence: setSequence,
                        videos: []
                    });
                    currentSetVideos = [];
                    await currentSet.save();
                    console.log(`შექმნილია ახალი სეტი: ${setSequence}`);
                }
                if (item.Column2 && item.Column2.includes('/1080/') && currentSet) {
                    const videoUrl = item.Column2;
                    const videoId = videoUrl.split('/').pop()?.replace('.m4v', '');
                    if (videoId) {
                        const sdUrl = videoUrl.replace('/1080/', '/720/');
                        const video = new Video({
                            videoId,
                            urls: {
                                hd: videoUrl,
                                sd: sdUrl
                            },
                            categoryId: category._id,
                            setId: currentSet._id,
                            sequence: videoId,
                            sortOrder: item.Video || 0
                        });
                        await video.save();
                        currentSetVideos.push(video._id);
                        console.log(`დამატებულია ვიდეო: ${videoId}`);
                    }
                }
            }
            if (currentSet) {
                currentSet.videos = currentSetVideos;
                await currentSet.save();
                console.log(`შენახულია ბოლო სეტი: ${currentSet.setId} ${currentSetVideos.length} ვიდეოთი`);
            }
        }
        console.log('მიგრაცია წარმატებით დასრულდა');
    }
    catch (error) {
        console.error('შეცდომა მიგრაციისას:', error);
    }
    finally {
        await mongoose_1.default.disconnect();
        console.log('MongoDB-სთან კავშირი დასრულდა');
    }
}
updateCategoryRelations();
//# sourceMappingURL=update-category-relations.js.map