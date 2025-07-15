"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const video_schema_1 = require("../schemas/video.schema");
const set_schema_1 = require("../schemas/set.schema");
const fs_1 = require("fs");
const path_1 = require("path");
let MigrationService = class MigrationService {
    constructor(videoModel, setModel) {
        this.videoModel = videoModel;
        this.setModel = setModel;
    }
    async migrateData() {
        try {
            const rawData = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../../scripts/structured-video-data.json'), 'utf-8');
            const data = JSON.parse(rawData);
            const sets = data.sets;
            console.log(`🎯 დასამიგრირებელი სეტების რაოდენობა: ${sets.length}`);
            for (const setData of sets) {
                console.log(`\n🔄 მიმდინარეობს სეტის მიგრაცია: ${setData.setCode}`);
                const videoDocuments = [];
                for (let i = 1; i <= setData.videoCount; i++) {
                    const sequence = `${setData.categoryCode}.${setData.setCode}.${i}`;
                    try {
                        const videoDoc = {
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
                        };
                        const video = new this.videoModel(videoDoc);
                        const savedVideo = await video.save();
                        videoDocuments.push(savedVideo);
                        console.log(`✅ ვიდეო შენახულია: ${sequence}`);
                    }
                    catch (error) {
                        console.error(`❌ შეცდომა ვიდეოს შენახვისას ${sequence}:`, error);
                    }
                }
                try {
                    const setDoc = {
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
                        isActive: true,
                        sortOrder: parseInt(setData.setCode.match(/\d+/)?.[0] || '0'),
                        isPublic: false,
                        viewCount: 0,
                        monthlyPrice: 920
                    };
                    const set = new this.setModel(setDoc);
                    await set.save();
                    console.log(`✅ სეტი შენახულია: ${setData.setCode}`);
                }
                catch (error) {
                    console.error(`❌ შეცდომა სეტის შენახვისას ${setData.setCode}:`, error);
                }
            }
            console.log('\n✨ მიგრაცია დასრულებულია');
        }
        catch (error) {
            console.error('❌ კრიტიკული შეცდომა:', error);
            throw error;
        }
    }
};
exports.MigrationService = MigrationService;
exports.MigrationService = MigrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(video_schema_1.Video.name)),
    __param(1, (0, mongoose_1.InjectModel)(set_schema_1.Set.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MigrationService);
//# sourceMappingURL=migration.service.js.map