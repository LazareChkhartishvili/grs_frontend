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
exports.ExerciseController = void 0;
const common_1 = require("@nestjs/common");
const exercise_service_1 = require("./exercise.service");
let ExerciseController = class ExerciseController {
    exerciseService;
    constructor(exerciseService) {
        this.exerciseService = exerciseService;
    }
    async getAllExercises() {
        return this.exerciseService.getAllExercises();
    }
    async getExerciseById(id) {
        return this.exerciseService.getExerciseById(id);
    }
    async getExercisesByCategory(categoryId) {
        return this.exerciseService.getExercisesByCategory(categoryId);
    }
    async getExercisesBySubcategory(subcategoryId) {
        return this.exerciseService.getExercisesBySubcategory(subcategoryId);
    }
    async getExercisesByDifficulty(difficulty) {
        return this.exerciseService.getExercisesByDifficulty(difficulty);
    }
    async searchExercises(searchTerm) {
        return this.exerciseService.searchExercises(searchTerm);
    }
    async getCategoriesWithExercises() {
        return this.exerciseService.getCategoriesWithExercises();
    }
    async createExercise(exerciseData) {
        return this.exerciseService.createExercise(exerciseData);
    }
    async updateExercise(id, updateData) {
        return this.exerciseService.updateExercise(id, updateData);
    }
    async deleteExercise(id) {
        await this.exerciseService.deleteExercise(id);
        return { message: 'სავარჯიშო წარმატებით წაიშალა' };
    }
};
exports.ExerciseController = ExerciseController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExerciseController.prototype, "getAllExercises", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseController.prototype, "getExerciseById", null);
__decorate([
    (0, common_1.Get)('category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseController.prototype, "getExercisesByCategory", null);
__decorate([
    (0, common_1.Get)('subcategory/:subcategoryId'),
    __param(0, (0, common_1.Param)('subcategoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseController.prototype, "getExercisesBySubcategory", null);
__decorate([
    (0, common_1.Get)('difficulty/:difficulty'),
    __param(0, (0, common_1.Param)('difficulty')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseController.prototype, "getExercisesByDifficulty", null);
__decorate([
    (0, common_1.Get)('search/:searchTerm'),
    __param(0, (0, common_1.Param)('searchTerm')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseController.prototype, "searchExercises", null);
__decorate([
    (0, common_1.Get)('by-categories/grouped'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExerciseController.prototype, "getCategoriesWithExercises", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExerciseController.prototype, "createExercise", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExerciseController.prototype, "updateExercise", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseController.prototype, "deleteExercise", null);
exports.ExerciseController = ExerciseController = __decorate([
    (0, common_1.Controller)('exercises'),
    __metadata("design:paramtypes", [exercise_service_1.ExerciseService])
], ExerciseController);
//# sourceMappingURL=exercise.controller.js.map