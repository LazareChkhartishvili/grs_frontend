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
exports.SetService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const set_schema_1 = require("../schemas/set.schema");
const video_schema_1 = require("../schemas/video.schema");
let SetService = class SetService {
    setModel;
    videoModel;
    constructor(setModel, videoModel) {
        this.setModel = setModel;
        this.videoModel = videoModel;
    }
    async createSet(setData) {
        const set = new this.setModel({
            ...setData,
            categoryId: new mongoose_2.Types.ObjectId(setData.categoryId),
            subcategoryId: setData.subcategoryId
                ? new mongoose_2.Types.ObjectId(setData.subcategoryId)
                : undefined,
            videos: setData.videos?.map((id) => new mongoose_2.Types.ObjectId(id)),
        });
        return set.save();
    }
    async updateSet(setId, updateData) {
        const updatePayload = { ...updateData };
        if (updatePayload.categoryId &&
            typeof updatePayload.categoryId === 'string') {
            updatePayload.categoryId = new mongoose_2.Types.ObjectId(updatePayload.categoryId);
        }
        if (updatePayload.subcategoryId &&
            typeof updatePayload.subcategoryId === 'string') {
            updatePayload.subcategoryId = new mongoose_2.Types.ObjectId(updatePayload.subcategoryId);
        }
        if (updatePayload.videos) {
            updatePayload.videos = updatePayload.videos.map((id) => typeof id === 'string' ? new mongoose_2.Types.ObjectId(id) : id);
        }
        const set = await this.setModel
            .findByIdAndUpdate(setId, updatePayload, { new: true })
            .exec();
        if (!set) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
        return set;
    }
    async deleteSet(setId) {
        const set = await this.setModel.findById(setId).exec();
        if (!set) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
        set.isActive = false;
        await set.save();
    }
    async getSetById(setId) {
        const set = await this.setModel.findById(setId).populate('videos').exec();
        if (!set) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
        return set;
    }
    async getAllSets() {
        return this.setModel
            .find({ isActive: true })
            .sort({ sortOrder: 1 })
            .populate('videos')
            .exec();
    }
    async getSetsByCategory(categoryId) {
        return this.setModel
            .find({ categoryId: new mongoose_2.Types.ObjectId(categoryId), isActive: true })
            .sort({ sortOrder: 1 })
            .populate('videos')
            .exec();
    }
    async getSetsBySubcategory(subcategoryId) {
        return this.setModel
            .find({
            subcategoryId: new mongoose_2.Types.ObjectId(subcategoryId),
            isActive: true,
        })
            .sort({ sortOrder: 1 })
            .populate('videos')
            .exec();
    }
    async addVideosToSet(setId, videoIds) {
        const set = await this.setModel.findById(setId).exec();
        if (!set) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
        const existingVideoIds = (set.videos || []).map((v) => v.toString());
        const uniqueVideoIds = [...new Set([...existingVideoIds, ...videoIds])];
        set.videos = uniqueVideoIds.map((id) => new mongoose_2.Types.ObjectId(id));
        return set.save();
    }
    async removeVideosFromSet(setId, videoIds) {
        const set = await this.setModel.findById(setId).exec();
        if (!set) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
        const videoObjectIds = videoIds.map((id) => new mongoose_2.Types.ObjectId(id));
        set.videos = set.videos.filter((id) => !videoObjectIds.some((videoId) => videoId.equals(id)));
        return set.save();
    }
    async reorderSetVideos(setId, videoIds) {
        const set = await this.setModel.findById(setId).exec();
        if (!set) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
        set.videos = videoIds.map((id) => new mongoose_2.Types.ObjectId(id));
        return set.save();
    }
};
exports.SetService = SetService;
exports.SetService = SetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(set_schema_1.Set.name)),
    __param(1, (0, mongoose_1.InjectModel)(video_schema_1.Video.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], SetService);
//# sourceMappingURL=set.service.js.map