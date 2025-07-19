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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    create(createCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }
    findAll() {
        return this.categoryService.findAll();
    }
    findOne(id) {
        return this.categoryService.findOne(id);
    }
    getCategorySets(id) {
        return this.categoryService.getCategorySets(id);
    }
    getCategoryComplete(id) {
        return this.categoryService.getCategoryComplete(id);
    }
    update(id, updateCategoryDto) {
        return this.categoryService.update(id, updateCategoryDto);
    }
    remove(id) {
        return this.categoryService.remove(id);
    }
    addSubcategory(id, subcategoryId) {
        return this.categoryService.addSubcategory(id, subcategoryId);
    }
    removeSubcategory(id, subcategoryId) {
        return this.categoryService.removeSubcategory(id, subcategoryId);
    }
    getSubcategories(id) {
        return this.categoryService.getSubcategories(id);
    }
    getSubCategoryById(categoryId, subCategoryId) {
        return this.categoryService.getSubCategoryById(categoryId, subCategoryId);
    }
    updateSubCategory(categoryId, subCategoryId, updateCategoryDto) {
        return this.categoryService.updateSubCategory(categoryId, subCategoryId, updateCategoryDto);
    }
    getSubCategorySets(categoryId, subCategoryId) {
        return this.categoryService.getSubCategorySets(categoryId, subCategoryId);
    }
    createSubcategory(parentId, createCategoryDto) {
        return this.categoryService.createSubcategory(parentId, createCategoryDto);
    }
    addSet(id, setId) {
        return this.categoryService.addSet(id, setId);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/sets'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getCategorySets", null);
__decorate([
    (0, common_1.Get)(':id/complete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getCategoryComplete", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/subcategories/:subcategoryId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('subcategoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "addSubcategory", null);
__decorate([
    (0, common_1.Delete)(':id/subcategories/:subcategoryId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('subcategoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "removeSubcategory", null);
__decorate([
    (0, common_1.Get)(':id/subcategories'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getSubcategories", null);
__decorate([
    (0, common_1.Get)(':id/subcategories/:subcategoryId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('subcategoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getSubCategoryById", null);
__decorate([
    (0, common_1.Patch)(':id/subcategories/:subcategoryId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('subcategoryId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "updateSubCategory", null);
__decorate([
    (0, common_1.Get)(':id/subcategories/:subcategoryId/sets'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('subcategoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getSubCategorySets", null);
__decorate([
    (0, common_1.Post)(':id/subcategories'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "createSubcategory", null);
__decorate([
    (0, common_1.Post)(':id/sets/:setId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('setId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "addSet", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map