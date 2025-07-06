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
exports.SetController = void 0;
const common_1 = require("@nestjs/common");
const set_service_1 = require("./set.service");
let SetController = class SetController {
    setService;
    constructor(setService) {
        this.setService = setService;
    }
    async createSet(setData) {
        return this.setService.createSet(setData);
    }
    async updateSet(id, updateData) {
        return this.setService.updateSet(id, updateData);
    }
    async deleteSet(id) {
        return this.setService.deleteSet(id);
    }
    async getSet(id) {
        return this.setService.getSetById(id);
    }
    async getAllSets() {
        return this.setService.getAllSets();
    }
    async getSetsByCategory(categoryId) {
        return this.setService.getSetsByCategory(categoryId);
    }
    async getSetsBySubcategory(subcategoryId) {
        return this.setService.getSetsBySubcategory(subcategoryId);
    }
    async addVideosToSet(id, videoIds) {
        return this.setService.addVideosToSet(id, videoIds);
    }
    async removeVideosFromSet(id, videoIds) {
        return this.setService.removeVideosFromSet(id, videoIds);
    }
    async reorderSetVideos(id, videoIds) {
        return this.setService.reorderSetVideos(id, videoIds);
    }
};
exports.SetController = SetController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "createSet", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "updateSet", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "deleteSet", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "getSet", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SetController.prototype, "getAllSets", null);
__decorate([
    (0, common_1.Get)('category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "getSetsByCategory", null);
__decorate([
    (0, common_1.Get)('subcategory/:subcategoryId'),
    __param(0, (0, common_1.Param)('subcategoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "getSetsBySubcategory", null);
__decorate([
    (0, common_1.Post)(':id/videos'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('videoIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "addVideosToSet", null);
__decorate([
    (0, common_1.Delete)(':id/videos'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('videoIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "removeVideosFromSet", null);
__decorate([
    (0, common_1.Put)(':id/videos/reorder'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('videoIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "reorderSetVideos", null);
exports.SetController = SetController = __decorate([
    (0, common_1.Controller)('sets'),
    __metadata("design:paramtypes", [set_service_1.SetService])
], SetController);
//# sourceMappingURL=set.controller.js.map