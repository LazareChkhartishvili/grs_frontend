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
    async getAllSets(page = '1', limit = '10', categoryId, subcategoryId, difficulty, level, isPublic) {
        const filters = {};
        if (categoryId)
            filters.categoryId = categoryId;
        if (subcategoryId)
            filters.subcategoryId = subcategoryId;
        if (difficulty)
            filters.difficulty = difficulty;
        if (level)
            filters.level = level;
        if (isPublic)
            filters.isPublic = isPublic === 'true';
        return this.setService.findAll(parseInt(page), parseInt(limit), filters);
    }
    async searchSets(query, page = '1', limit = '10') {
        if (!query) {
            return { sets: [], total: 0, pages: 0 };
        }
        return this.setService.search(query, parseInt(page), parseInt(limit));
    }
    async getFeaturedSets() {
        return this.setService.getFeaturedSets();
    }
    async getSetsByCategory(categoryId) {
        return this.setService.findByCategory(categoryId);
    }
    async getSetsBySubcategory(subcategoryId) {
        return this.setService.findBySubcategory(subcategoryId);
    }
    async getSetsByDifficulty(difficulty) {
        return this.setService.findByDifficulty(difficulty);
    }
    async getSetsByGoals(goals) {
        const goalsArray = goals.split(',');
        return this.setService.findByGoals(goalsArray);
    }
    async getSetById(id) {
        return this.setService.findById(id);
    }
    async createSet(setData) {
        return this.setService.create(setData);
    }
    async updateSet(id, updateData) {
        return this.setService.update(id, updateData);
    }
    async deleteSet(id) {
        await this.setService.delete(id);
        return { message: 'სეტი წარმატებით წაიშალა' };
    }
    async addExerciseToSet(setId, exerciseData) {
        return this.setService.addExercise(setId, exerciseData);
    }
    async removeExerciseFromSet(setId, exerciseId) {
        await this.setService.removeExercise(setId, exerciseId);
        return { message: 'სავარჯიშო სეტიდან წაიშალა' };
    }
    async rateSet(setId, data) {
        if (data.rating < 1 || data.rating > 5) {
            throw new Error('Rating უნდა იყოს 1-დან 5-მდე');
        }
        return this.setService.updateRating(setId, data.rating);
    }
};
exports.SetController = SetController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('category')),
    __param(3, (0, common_1.Query)('subcategory')),
    __param(4, (0, common_1.Query)('difficulty')),
    __param(5, (0, common_1.Query)('level')),
    __param(6, (0, common_1.Query)('public')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "getAllSets", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "searchSets", null);
__decorate([
    (0, common_1.Get)('featured'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SetController.prototype, "getFeaturedSets", null);
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
    (0, common_1.Get)('difficulty/:difficulty'),
    __param(0, (0, common_1.Param)('difficulty')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "getSetsByDifficulty", null);
__decorate([
    (0, common_1.Get)('goals'),
    __param(0, (0, common_1.Query)('goals')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "getSetsByGoals", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "getSetById", null);
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
    (0, common_1.Post)(':id/exercises'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "addExerciseToSet", null);
__decorate([
    (0, common_1.Delete)(':setId/exercises/:exerciseId'),
    __param(0, (0, common_1.Param)('setId')),
    __param(1, (0, common_1.Param)('exerciseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "removeExerciseFromSet", null);
__decorate([
    (0, common_1.Post)(':id/rating'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "rateSet", null);
exports.SetController = SetController = __decorate([
    (0, common_1.Controller)('sets'),
    __metadata("design:paramtypes", [set_service_1.SetService])
], SetController);
//# sourceMappingURL=set.controller.js.map