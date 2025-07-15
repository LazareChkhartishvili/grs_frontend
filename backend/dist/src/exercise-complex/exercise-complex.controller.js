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
exports.ExerciseComplexController = void 0;
const common_1 = require("@nestjs/common");
const exercise_complex_service_1 = require("./exercise-complex.service");
let ExerciseComplexController = class ExerciseComplexController {
    constructor(exerciseComplexService) {
        this.exerciseComplexService = exerciseComplexService;
    }
    async getAllComplexes() {
        return this.exerciseComplexService.getAllComplexes();
    }
    async getComplexById(id) {
        return this.exerciseComplexService.getComplexById(id);
    }
    async getComplexByIdWithExercises(id) {
        return this.exerciseComplexService.getComplexByIdWithExercises(id);
    }
    async getComplexesBySubcategory(subcategoryId) {
        return this.exerciseComplexService.getComplexesBySubcategory(subcategoryId);
    }
    async createComplex(complexData) {
        return this.exerciseComplexService.createComplex(complexData);
    }
    async updateComplex(complexId, updateData) {
        return this.exerciseComplexService.updateComplex(complexId, updateData);
    }
    async deleteComplex(complexId) {
        await this.exerciseComplexService.deleteComplex(complexId);
        return { message: 'კომპლექსი წარმატებით წაიშალა' };
    }
    async getFeaturedComplexes() {
        return this.exerciseComplexService.getFeaturedComplexes();
    }
    async getComplexesByCategory(categoryId) {
        return this.exerciseComplexService.getComplexesByCategory(categoryId);
    }
    async getComplexesByPriceRange(minPrice, maxPrice) {
        return this.exerciseComplexService.getComplexesByPriceRange(minPrice, maxPrice);
    }
    async getComplexesByDifficulty(difficulty) {
        return this.exerciseComplexService.getComplexesByDifficulty(difficulty);
    }
    async getComplexesByStage(stage) {
        return this.exerciseComplexService.getComplexesByStage(stage);
    }
    async getComplexesByTags(tagsParam) {
        const tags = tagsParam.split(',');
        return this.exerciseComplexService.getComplexesByTags(tags);
    }
    async getCategoriesWithComplexes() {
        return this.exerciseComplexService.getCategoriesWithComplexes();
    }
    async addExerciseToComplex(complexId, exerciseId) {
        return this.exerciseComplexService.addExerciseToComplex(complexId, exerciseId);
    }
    async getComplexExercises(complexId) {
        return this.exerciseComplexService.getComplexExercises(complexId);
    }
    async removeExerciseFromComplex(complexId, exerciseId) {
        return this.exerciseComplexService.removeExerciseFromComplex(complexId, exerciseId);
    }
    async createAndAddExerciseToComplex(complexId, exerciseData) {
        return this.exerciseComplexService.createAndAddExerciseToComplex(complexId, exerciseData);
    }
};
exports.ExerciseComplexController = ExerciseComplexController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExerciseComplexController.prototype, "getAllComplexes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseComplexController.prototype, "getComplexById", null);
__decorate([
    (0, common_1.Get)(':id/with-exercises'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseComplexController.prototype, "getComplexByIdWithExercises", null);
__decorate([
    (0, common_1.Get)('subcategory/:subcategoryId'),
    __param(0, (0, common_1.Param)('subcategoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseComplexController.prototype, "getComplexesBySubcategory", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExerciseComplexController.prototype, "createComplex", null);
__decorate([
    (0, common_1.Put)(':complexId'),
    __param(0, (0, common_1.Param)('complexId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExerciseComplexController.prototype, "updateComplex", null);
__decorate([
    (0, common_1.Delete)(':complexId'),
    __param(0, (0, common_1.Param)('complexId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseComplexController.prototype, "deleteComplex", null);
__decorate([
    (0, common_1.Get)('featured/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExerciseComplexController.prototype, "getFeaturedComplexes", null);
__decorate([
    (0, common_1.Get)('category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseComplexController.prototype, "getComplexesByCategory", null);
__decorate([
    (0, common_1.Get)('price-range/:minPrice/:maxPrice'),
    __param(0, (0, common_1.Param)('minPrice')),
    __param(1, (0, common_1.Param)('maxPrice')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ExerciseComplexController.prototype, "getComplexesByPriceRange", null);
__decorate([
    (0, common_1.Get)('difficulty/:difficulty'),
    __param(0, (0, common_1.Param)('difficulty')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseComplexController.prototype, "getComplexesByDifficulty", null);
__decorate([
    (0, common_1.Get)('stage/:stage'),
    __param(0, (0, common_1.Param)('stage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseComplexController.prototype, "getComplexesByStage", null);
__decorate([
    (0, common_1.Get)('tags/:tags'),
    __param(0, (0, common_1.Param)('tags')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseComplexController.prototype, "getComplexesByTags", null);
__decorate([
    (0, common_1.Get)('by-categories/grouped'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExerciseComplexController.prototype, "getCategoriesWithComplexes", null);
__decorate([
    (0, common_1.Post)(':id/exercises/:exerciseId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('exerciseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExerciseComplexController.prototype, "addExerciseToComplex", null);
__decorate([
    (0, common_1.Get)(':id/exercises'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseComplexController.prototype, "getComplexExercises", null);
__decorate([
    (0, common_1.Delete)(':id/exercises/:exerciseId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('exerciseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExerciseComplexController.prototype, "removeExerciseFromComplex", null);
__decorate([
    (0, common_1.Post)(':id/exercises'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExerciseComplexController.prototype, "createAndAddExerciseToComplex", null);
exports.ExerciseComplexController = ExerciseComplexController = __decorate([
    (0, common_1.Controller)('complexes'),
    __metadata("design:paramtypes", [exercise_complex_service_1.ExerciseComplexService])
], ExerciseComplexController);
//# sourceMappingURL=exercise-complex.controller.js.map