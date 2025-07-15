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
exports.SubCategoryController = void 0;
const common_1 = require("@nestjs/common");
const subcategory_service_1 = require("./subcategory.service");
let SubCategoryController = class SubCategoryController {
    constructor(subcategoryService) {
        this.subcategoryService = subcategoryService;
    }
    async getAllSubCategories() {
        return this.subcategoryService.getAllSubCategories();
    }
    async getSubCategoryById(subcategoryId) {
        return this.subcategoryService.getSubCategoryById(subcategoryId);
    }
    async getSubCategoriesByCategory(categoryId) {
        return this.subcategoryService.getSubCategoriesByCategory(categoryId);
    }
    async getSubCategoriesDropdown(categoryId) {
        const subcategories = await this.subcategoryService.getSubCategoriesByCategory(categoryId);
        return subcategories.map((sub) => ({
            id: String(sub._id),
            name: sub.name,
            categoryId: String(sub.categoryId),
        }));
    }
    async getCategoriesWithSubCategories() {
        return this.subcategoryService.getCategoriesWithSubCategories();
    }
    async createSubCategory(subcategoryData) {
        return this.subcategoryService.createSubCategory(subcategoryData);
    }
    async updateSubCategory(subcategoryId, updateData) {
        return this.subcategoryService.updateSubCategory(subcategoryId, updateData);
    }
    async deleteSubCategory(subcategoryId) {
        await this.subcategoryService.deleteSubCategory(subcategoryId);
        return { message: 'სუბკატეგორია წარმატებით წაიშალა' };
    }
    async addExerciseToSubCategory(subcategoryId, exercise) {
        return this.subcategoryService.addExerciseToSubCategory(subcategoryId, exercise);
    }
};
exports.SubCategoryController = SubCategoryController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "getAllSubCategories", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "getSubCategoryById", null);
__decorate([
    (0, common_1.Get)('category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "getSubCategoriesByCategory", null);
__decorate([
    (0, common_1.Get)('category/:categoryId/dropdown'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "getSubCategoriesDropdown", null);
__decorate([
    (0, common_1.Get)('with-categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "getCategoriesWithSubCategories", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "createSubCategory", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "updateSubCategory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "deleteSubCategory", null);
__decorate([
    (0, common_1.Post)(':id/exercises'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "addExerciseToSubCategory", null);
exports.SubCategoryController = SubCategoryController = __decorate([
    (0, common_1.Controller)('subcategories'),
    __metadata("design:paramtypes", [subcategory_service_1.SubCategoryService])
], SubCategoryController);
//# sourceMappingURL=subcategory.controller.js.map