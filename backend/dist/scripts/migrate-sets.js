"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fs_1 = require("fs");
const path_1 = require("path");
const mongoose_2 = require("mongoose");
const MONGODB_URI = 'mongodb+srv://beruashvilig60:Berobero1234!@cluster0.dtwfws3.mongodb.net/grs-db';
const videoSchema = new mongoose_1.Schema({
    videoId: { type: String, required: true },
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
    urls: {
        hd: { type: String, required: true },
        sd: { type: String, required: true }
    },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    isPublic: { type: Boolean, default: false }
}, { timestamps: true });
const setSchema = new mongoose_1.Schema({
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
    videos: [{ type: mongoose_1.Types.ObjectId, ref: 'Video' }],
    categoryId: { type: mongoose_1.Types.ObjectId, ref: 'Category', required: true },
    subcategoryId: { type: mongoose_1.Types.ObjectId, ref: 'SubCategory' },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    isPublic: { type: Boolean, default: false },
    viewCount: { type: Number, default: 0 },
    monthlyPrice: { type: Number, required: true, default: 920 }
}, { timestamps: true });
const categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    code: { type: String },
    sequence: { type: String, unique: true },
    level: { type: Number, default: 0 },
    parentId: { type: mongoose_1.Types.ObjectId, ref: 'Category', default: null },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
}, { timestamps: true });
const subcategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    nameGe: { type: String, required: true },
    nameRu: { type: String, required: true },
    image: { type: String },
    categoryId: { type: mongoose_1.Types.ObjectId, ref: 'Category', required: true },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
}, { timestamps: true });
const Video = (0, mongoose_1.model)('Video', videoSchema);
const Set = (0, mongoose_1.model)('Set', setSchema);
const Category = (0, mongoose_1.model)('Category', categorySchema);
const SubCategory = (0, mongoose_1.model)('SubCategory', subcategorySchema);
async function migrateData() {
    try {
        await (0, mongoose_1.connect)(MONGODB_URI);
        console.log('📦 მონაცემთა ბაზასთან კავშირი დამყარებულია');
        await mongoose_2.default.connection.db.collection('videos').dropIndexes();
        console.log('✅ ვიდეოების ინდექსები წაიშალა');
        const rawData = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'structured-video-data.json'), 'utf-8');
        const data = JSON.parse(rawData);
        const sets = data.sets;
        console.log(`🎯 დასამიგრირებელი სეტების რაოდენობა: ${sets.length}`);
        const categories = await Category.find({ isActive: true }).exec();
        const subcategories = await SubCategory.find({ isActive: true }).exec();
        for (const setData of sets) {
            console.log(`\n🔄 მიმდინარეობს სეტის მიგრაცია: ${setData.title}`);
            const category = categories.find(c => c.code === setData.categoryCode);
            if (!category) {
                console.error(`❌ კატეგორია ვერ მოიძებნა კოდით: ${setData.categoryCode}`);
                continue;
            }
            const subcategory = subcategories.find(sub => setData.title.toLowerCase().includes(sub.name.toLowerCase()) &&
                sub.categoryId.toString() === category._id.toString());
            const videoDocuments = [];
            for (let i = 1; i <= setData.videoCount; i++) {
                const sequence = `${setData.categoryCode}.${setData.setCode}.${i}`;
                try {
                    const video = new Video({
                        videoId: sequence,
                        title: {
                            ka: `${setData.title} - ვიდეო ${i}`,
                            en: `${setData.title} - Video ${i}`,
                            ru: `${setData.title} - Видео ${i}`
                        },
                        description: {
                            ka: setData.description,
                            en: setData.description,
                            ru: setData.description
                        },
                        urls: {
                            hd: `https://ghrs-group.com/vid/1/1080/${sequence}.m4v`,
                            sd: `https://ghrs-group.com/vid/1/720/${sequence}.m4v`
                        },
                        isActive: true,
                        sortOrder: i,
                        viewCount: 0,
                        isPublic: false
                    });
                    const savedVideo = await video.save();
                    videoDocuments.push(savedVideo);
                    console.log(`✅ ვიდეო შენახულია: ${sequence}`);
                }
                catch (error) {
                    console.error(`❌ შეცდომა ვიდეოს შენახვისას ${sequence}:`, error);
                }
            }
            try {
                const set = new Set({
                    setId: setData.setCode,
                    title: {
                        ka: setData.title,
                        en: setData.title,
                        ru: setData.title
                    },
                    description: {
                        ka: setData.description,
                        en: setData.description,
                        ru: setData.description
                    },
                    videos: videoDocuments.map(v => v._id),
                    categoryId: category._id,
                    subcategoryId: subcategory?._id,
                    isActive: true,
                    sortOrder: parseInt(setData.setCode.match(/\d+/)?.[0] || '0'),
                    isPublic: false,
                    viewCount: 0,
                    monthlyPrice: 920
                });
                await set.save();
                console.log(`✅ სეტი შენახულია: ${setData.title}`);
            }
            catch (error) {
                console.error(`❌ შეცდომა სეტის შენახვისას ${setData.title}:`, error);
            }
        }
        console.log('\n✨ მიგრაცია დასრულებულია');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ კრიტიკული შეცდომა:', error);
        process.exit(1);
    }
}
migrateData();
//# sourceMappingURL=migrate-sets.js.map