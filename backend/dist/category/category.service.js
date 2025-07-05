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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_schema_1 = require("../schemas/category.schema");
const subcategory_schema_1 = require("../schemas/subcategory.schema");
const exercise_complex_schema_1 = require("../schemas/exercise-complex.schema");
const exercise_schema_1 = require("../schemas/exercise.schema");
let CategoryService = class CategoryService {
    categoryModel;
    subcategoryModel;
    exerciseComplexModel;
    exerciseModel;
    constructor(categoryModel, subcategoryModel, exerciseComplexModel, exerciseModel) {
        this.categoryModel = categoryModel;
        this.subcategoryModel = subcategoryModel;
        this.exerciseComplexModel = exerciseComplexModel;
        this.exerciseModel = exerciseModel;
    }
    async getMainCategories() {
        return this.categoryModel
            .find({ parentId: null, isActive: true })
            .sort({ sortOrder: 1 })
            .exec();
    }
    async getCategoryById(categoryId) {
        const category = await this.categoryModel.findById(categoryId).exec();
        if (!category) {
            throw new common_1.NotFoundException('კატეგორია ვერ მოიძებნა');
        }
        return category;
    }
    async getCategoriesWithSubcategories() {
        console.log('🔍 Getting categories with subcategories...');
        const mainCategories = await this.getMainCategories();
        console.log('📋 Main categories found:', mainCategories.length);
        const allSubcategories = await this.subcategoryModel
            .find({ isActive: true })
            .exec();
        console.log('📋 All subcategories found:', allSubcategories.length);
        console.log('📋 Subcategory categoryIds:', allSubcategories.map((sub) => sub.categoryId));
        const result = [];
        for (const category of mainCategories) {
            if (!category) {
                console.log('⚠️ Category is null or undefined');
                continue;
            }
            const categoryId = category._id?.toString();
            if (!categoryId) {
                console.log('⚠️ Category has no _id field, skipping');
                continue;
            }
            console.log('🔍 Looking for subcategories for category:', categoryId, category.name, 'Type:', typeof category._id);
            const subcategories = await this.subcategoryModel
                .find({
                categoryId: categoryId,
                isActive: true,
            })
                .sort({ sortOrder: 1 })
                .exec();
            console.log('📋 Subcategories found for', category.name, ':', subcategories.length);
            result.push({
                ...category.toObject(),
                subcategories: subcategories.map((sub) => sub.toObject()),
            });
        }
        console.log('✅ Final result length:', result.length);
        return result;
    }
    async getAllSubcategories() {
        return this.categoryModel
            .find({ parentId: { $ne: null }, isActive: true })
            .sort({ sortOrder: 1 })
            .exec();
    }
    async getSubCategories(parentId) {
        return this.categoryModel
            .find({ parentId, isActive: true })
            .sort({ sortOrder: 1 })
            .exec();
    }
    async getCategoryWithChildren(categoryId) {
        const category = await this.categoryModel.findById(categoryId).exec();
        if (!category) {
            throw new common_1.NotFoundException('კატეგორია ვერ მოიძებნა');
        }
        const children = await this.categoryModel
            .find({ parentId: categoryId, isActive: true })
            .sort({ sortOrder: 1 })
            .exec();
        return {
            ...category.toObject(),
            children,
        };
    }
    async createCategory(categoryData) {
        let level = 0;
        if (categoryData.parentId) {
            const parent = await this.categoryModel
                .findById(categoryData.parentId)
                .exec();
            if (!parent) {
                throw new common_1.NotFoundException('მშობელი კატეგორია ვერ მოიძებნა');
            }
            level = parent.level + 1;
        }
        const cleanedData = { ...categoryData };
        if (!cleanedData.image ||
            typeof cleanedData.image !== 'string' ||
            cleanedData.image.trim() === '' ||
            cleanedData.image === '{}') {
            delete cleanedData.image;
        }
        const category = new this.categoryModel({
            ...cleanedData,
            level,
        });
        return category.save();
    }
    async updateCategory(categoryId, updateData) {
        const cleanedData = { ...updateData };
        if (cleanedData.image !== undefined &&
            (!cleanedData.image ||
                typeof cleanedData.image !== 'string' ||
                cleanedData.image.trim() === '' ||
                cleanedData.image === '{}')) {
            delete cleanedData.image;
        }
        const category = await this.categoryModel
            .findByIdAndUpdate(categoryId, cleanedData, { new: true })
            .exec();
        if (!category) {
            throw new common_1.NotFoundException('კატეგორია ვერ მოიძებნა');
        }
        return category;
    }
    async deleteCategory(categoryId) {
        const category = await this.categoryModel.findById(categoryId).exec();
        if (!category) {
            throw new common_1.NotFoundException('კატეგორია ვერ მოიძებნა');
        }
        await this.categoryModel
            .updateMany({ parentId: categoryId }, { isActive: false })
            .exec();
        category.isActive = false;
        await category.save();
    }
    async addExerciseToCategory(categoryId, exercise) {
        const category = await this.categoryModel.findById(categoryId).exec();
        if (!category) {
            throw new common_1.NotFoundException('კატეგორია ვერ მოიძებნა');
        }
        if (!category.exercises) {
            category.exercises = [];
        }
        category.exercises.push(exercise);
        return category.save();
    }
    async getFullHierarchy() {
        const mainCategories = await this.getMainCategories();
        const result = [];
        for (const category of mainCategories) {
            const categoryWithChildren = await this.getCategoryWithChildren(category._id.toString());
            result.push(categoryWithChildren);
        }
        return result;
    }
    async deleteAllCategoriesAndSubcategories() {
        const deletedCategories = await this.categoryModel.deleteMany({}).exec();
        const deletedSubcategories = await this.subcategoryModel
            .deleteMany({})
            .exec();
        return {
            deletedCategories: deletedCategories.deletedCount || 0,
            deletedSubcategories: deletedSubcategories.deletedCount || 0,
        };
    }
    async getCategoryExercisesAndComplexes(categoryId) {
        const objectId = new mongoose_2.Types.ObjectId(categoryId);
        const [exercises, complexes] = await Promise.all([
            this.exerciseModel
                .find({ categoryId: objectId, isActive: true })
                .select('-imageData -imageMimeType -imageSize')
                .sort({ sortOrder: 1 })
                .exec(),
            this.exerciseComplexModel
                .find({ categoryId: objectId, isActive: true })
                .select('-instructorNotes')
                .sort({ sortOrder: 1 })
                .exec(),
        ]);
        return {
            exercises,
            complexes,
            totalExercises: exercises.length,
            totalComplexes: complexes.length,
        };
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __param(1, (0, mongoose_1.InjectModel)(subcategory_schema_1.SubCategory.name)),
    __param(2, (0, mongoose_1.InjectModel)(exercise_complex_schema_1.ExerciseComplex.name)),
    __param(3, (0, mongoose_1.InjectModel)(exercise_schema_1.Exercise.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _c : Object, typeof (_d = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _d : Object])
], CategoryService);
//# sourceMappingURL=category.service.js.map