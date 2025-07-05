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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const video_schema_1 = require("../schemas/video.schema");
let VideoService = class VideoService {
    videoModel;
    constructor(videoModel) {
        this.videoModel = videoModel;
    }
    async findAll(page = 1, limit = 10, filters = {}) {
        const skip = (page - 1) * limit;
        const query = { isActive: true, ...filters };
        const [videos, total] = await Promise.all([
            this.videoModel
                .find(query)
                .sort({ _id: 1 })
                .skip(skip)
                .limit(limit)
                .lean()
                .exec(),
            this.videoModel.countDocuments(query),
        ]);
        return {
            videos,
            total,
            pages: Math.ceil(total / limit),
        };
    }
    async findById(id) {
        const videoId = typeof id === 'string' ? parseInt(id) : id;
        if (isNaN(videoId)) {
            throw new common_1.NotFoundException('არასწორი ვიდეოს ID');
        }
        const video = await this.videoModel.findOne({ _id: videoId }).lean().exec();
        if (!video) {
            throw new common_1.NotFoundException('ვიდეო ვერ მოიძებნა');
        }
        return video;
    }
    async findByCategoryCode(categoryCode) {
        return this.videoModel
            .find({ categoryCode, isActive: true })
            .sort({ sequence: 1 })
            .lean()
            .exec();
    }
    async findBySetId(setId) {
        return this.videoModel
            .find({ setId, isActive: true })
            .sort({ sequence: 1 })
            .lean()
            .exec();
    }
    async findByResolution(resolution) {
        return this.videoModel
            .find({ resolution, isActive: true })
            .sort({ sequence: 1 })
            .lean()
            .exec();
    }
    async search(query, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const searchQuery = {
            isActive: true,
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { sequence: { $regex: query, $options: 'i' } },
                { url: { $regex: query, $options: 'i' } },
            ],
        };
        const [videos, total] = await Promise.all([
            this.videoModel
                .find(searchQuery)
                .sort({ sequence: 1 })
                .skip(skip)
                .limit(limit)
                .lean()
                .exec(),
            this.videoModel.countDocuments(searchQuery),
        ]);
        return {
            videos,
            total,
            pages: Math.ceil(total / limit),
        };
    }
    async getFeaturedVideos(limit = 10) {
        return this.videoModel
            .find({ isActive: true })
            .sort({ _id: -1 })
            .limit(limit)
            .lean()
            .exec();
    }
    async getAllCategoryCodes() {
        const categories = await this.videoModel
            .distinct('categoryCode', { isActive: true })
            .exec();
        return categories.sort();
    }
    async getAllSetIds() {
        const setIds = await this.videoModel
            .distinct('setId', { isActive: true })
            .exec();
        return setIds.sort();
    }
    async getAllResolutions() {
        const resolutions = await this.videoModel
            .distinct('resolution', { isActive: true })
            .exec();
        return resolutions.sort();
    }
    async getVideoStats() {
        const [totalVideos, categoryCodes, setIds, resolutions, formats] = await Promise.all([
            this.videoModel.countDocuments({ isActive: true }),
            this.videoModel.distinct('categoryCode', { isActive: true }),
            this.videoModel.distinct('setId', { isActive: true }),
            this.videoModel.aggregate([
                { $match: { isActive: true } },
                { $group: { _id: '$resolution', count: { $sum: 1 } } },
            ]),
            this.videoModel.aggregate([
                { $match: { isActive: true } },
                { $group: { _id: '$format', count: { $sum: 1 } } },
            ]),
        ]);
        return {
            totalVideos,
            totalCategories: categoryCodes.length,
            totalSets: setIds.length,
            resolutions: resolutions.reduce((acc, item) => {
                acc[item._id] = item.count;
                return acc;
            }, {}),
            formats: formats.reduce((acc, item) => {
                acc[item._id] = item.count;
                return acc;
            }, {}),
        };
    }
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(video_schema_1.Video.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], VideoService);
//# sourceMappingURL=video.service.js.map