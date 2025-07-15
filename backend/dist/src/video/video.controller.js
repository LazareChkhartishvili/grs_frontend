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
exports.VideoController = void 0;
const common_1 = require("@nestjs/common");
const video_service_1 = require("./video.service");
let VideoController = class VideoController {
    constructor(videoService) {
        this.videoService = videoService;
    }
    async getAllVideos(page = '1', limit = '10', categoryCode, setId, resolution, format) {
        const filters = {};
        if (categoryCode)
            filters.categoryCode = categoryCode;
        if (setId)
            filters.setId = setId;
        if (resolution)
            filters.resolution = resolution;
        if (format)
            filters.format = format;
        return this.videoService.findAll(parseInt(page), parseInt(limit), filters);
    }
    async searchVideos(query, page = '1', limit = '10') {
        if (!query) {
            return { videos: [], total: 0, pages: 0 };
        }
        return this.videoService.search(query, parseInt(page), parseInt(limit));
    }
    async getFeaturedVideos(limit = '10') {
        return this.videoService.getFeaturedVideos(parseInt(limit));
    }
    async getVideoStats() {
        return this.videoService.getVideoStats();
    }
    async getAllCategoryCodes() {
        return this.videoService.getAllCategoryCodes();
    }
    async getAllSetIds() {
        return this.videoService.getAllSetIds();
    }
    async getAllResolutions() {
        return this.videoService.getAllResolutions();
    }
    async getVideosByCategoryCode(categoryCode) {
        return this.videoService.findByCategoryCode(categoryCode);
    }
    async getVideosBySetId(setId) {
        return this.videoService.findBySetId(setId);
    }
    async getVideosByResolution(resolution) {
        return this.videoService.findByResolution(resolution);
    }
    async getVideoById(id) {
        return this.videoService.findById(id);
    }
};
exports.VideoController = VideoController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('categoryCode')),
    __param(3, (0, common_1.Query)('setId')),
    __param(4, (0, common_1.Query)('resolution')),
    __param(5, (0, common_1.Query)('format')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getAllVideos", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "searchVideos", null);
__decorate([
    (0, common_1.Get)('featured'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getFeaturedVideos", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getVideoStats", null);
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getAllCategoryCodes", null);
__decorate([
    (0, common_1.Get)('sets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getAllSetIds", null);
__decorate([
    (0, common_1.Get)('resolutions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getAllResolutions", null);
__decorate([
    (0, common_1.Get)('category/:categoryCode'),
    __param(0, (0, common_1.Param)('categoryCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getVideosByCategoryCode", null);
__decorate([
    (0, common_1.Get)('set/:setId'),
    __param(0, (0, common_1.Param)('setId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getVideosBySetId", null);
__decorate([
    (0, common_1.Get)('resolution/:resolution'),
    __param(0, (0, common_1.Param)('resolution')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getVideosByResolution", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getVideoById", null);
exports.VideoController = VideoController = __decorate([
    (0, common_1.Controller)('videos'),
    __metadata("design:paramtypes", [video_service_1.VideoService])
], VideoController);
//# sourceMappingURL=video.controller.js.map