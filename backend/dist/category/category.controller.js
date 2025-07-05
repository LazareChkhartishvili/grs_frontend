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
exports.CourseCategoryController = exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
let CategoryController = class CategoryController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async getMainCategories() {
        return this.categoryService.getCategoriesWithSubcategories();
    }
    async getMainCategoriesOnly() {
        return this.categoryService.getMainCategories();
    }
    async getCategoriesWithSubcategories() {
        return this.categoryService.getCategoriesWithSubcategories();
    }
    async getFullHierarchy() {
        return this.categoryService.getFullHierarchy();
    }
    async getAllSubcategories() {
        return this.categoryService.getAllSubcategories();
    }
    async getCategoryById(categoryId) {
        return this.categoryService.getCategoryById(categoryId);
    }
    async getSubCategories(parentId) {
        return this.categoryService.getSubCategories(parentId);
    }
    async getCategoryWithChildren(categoryId) {
        return this.categoryService.getCategoryWithChildren(categoryId);
    }
    async createCategory(categoryData) {
        return this.categoryService.createCategory(categoryData);
    }
    async createSubcategory(parentId, subcategoryData) {
        return this.categoryService.createCategory({
            ...subcategoryData,
            parentId,
        });
    }
    async updateCategory(categoryId, updateData) {
        return this.categoryService.updateCategory(categoryId, updateData);
    }
    async deleteCategory(categoryId) {
        await this.categoryService.deleteCategory(categoryId);
        return { message: 'კატეგორია წარმატებით წაიშალა' };
    }
    async addExerciseToCategory(categoryId, exercise) {
        return this.categoryService.addExerciseToCategory(categoryId, exercise);
    }
    async deleteAllCategoriesAndSubcategories() {
        return this.categoryService.deleteAllCategoriesAndSubcategories();
    }
    async getCategoryExercisesAndComplexes(id) {
        return this.categoryService.getCategoryExercisesAndComplexes(id);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getMainCategories", null);
__decorate([
    (0, common_1.Get)('main-only'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getMainCategoriesOnly", null);
__decorate([
    (0, common_1.Get)('with-subcategories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoriesWithSubcategories", null);
__decorate([
    (0, common_1.Get)('hierarchy'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getFullHierarchy", null);
__decorate([
    (0, common_1.Get)('subcategories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAllSubcategories", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryById", null);
__decorate([
    (0, common_1.Get)(':id/subcategories'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getSubCategories", null);
__decorate([
    (0, common_1.Get)(':id/with-children'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryWithChildren", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Post)(':id/subcategories'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createSubcategory", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Post)(':id/exercises'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "addExerciseToCategory", null);
__decorate([
    (0, common_1.Delete)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteAllCategoriesAndSubcategories", null);
__decorate([
    (0, common_1.Get)(':id/exercises-and-complexes'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryExercisesAndComplexes", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
let CourseCategoryController = class CourseCategoryController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async getCourseCategories() {
        return this.categoryService.getMainCategories();
    }
    async getCategoriesForDropdown() {
        const categories = await this.categoryService.getMainCategories();
        return categories.map((cat) => ({
            id: String(cat._id),
            name: cat.name,
        }));
    }
    async getCourseSubcategories(categoryId) {
        return this.categoryService.getSubCategories(categoryId);
    }
    async getSubcategoriesForDropdown(categoryId) {
        const subcategories = await this.categoryService.getSubCategories(categoryId);
        return subcategories.map((subcat) => ({
            id: String(subcat._id),
            name: subcat.name,
            categoryId: String(subcat.parentId),
        }));
    }
    async getCategoriesWithSubcategoriesForDropdown() {
        const categoriesWithSubs = await this.categoryService.getCategoriesWithSubcategories();
        return categoriesWithSubs.map((cat) => ({
            id: String(cat._id),
            name: String(cat.name),
            subcategories: cat.subcategories?.map((sub) => ({
                id: String(sub._id),
                name: String(sub.name),
            })) || [],
        }));
    }
};
exports.CourseCategoryController = CourseCategoryController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseCategoryController.prototype, "getCourseCategories", null);
__decorate([
    (0, common_1.Get)('dropdown'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseCategoryController.prototype, "getCategoriesForDropdown", null);
__decorate([
    (0, common_1.Get)(':id/subcategories'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseCategoryController.prototype, "getCourseSubcategories", null);
__decorate([
    (0, common_1.Get)(':id/subcategories/dropdown'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseCategoryController.prototype, "getSubcategoriesForDropdown", null);
__decorate([
    (0, common_1.Get)('with-subcategories-dropdown'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseCategoryController.prototype, "getCategoriesWithSubcategoriesForDropdown", null);
exports.CourseCategoryController = CourseCategoryController = __decorate([
    (0, common_1.Controller)('course-categories'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CourseCategoryController);
//# sourceMappingURL=category.controller.js.map