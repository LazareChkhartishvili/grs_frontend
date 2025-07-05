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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const subcategory_schema_1 = require("../schemas/subcategory.schema");
let SubCategoryService = class SubCategoryService {
    subcategoryModel;
    constructor(subcategoryModel) {
        this.subcategoryModel = subcategoryModel;
    }
    async getAllSubCategories() {
        return this.subcategoryModel
            .find({ isActive: true })
            .populate('categoryId', 'name description')
            .sort({ sortOrder: 1 })
            .exec();
    }
    async getSubCategoriesByCategory(categoryId) {
        return this.subcategoryModel
            .find({ categoryId, isActive: true })
            .sort({ sortOrder: 1 })
            .exec();
    }
    async getSubCategoryById(subcategoryId) {
        const subcategory = await this.subcategoryModel
            .findById(subcategoryId)
            .populate('categoryId', 'name description')
            .exec();
        if (!subcategory) {
            throw new common_1.NotFoundException('სუბკატეგორია ვერ მოიძებნა');
        }
        return subcategory;
    }
    async createSubCategory(subcategoryData) {
        const subcategory = new this.subcategoryModel(subcategoryData);
        return subcategory.save();
    }
    async updateSubCategory(subcategoryId, updateData) {
        const subcategory = await this.subcategoryModel
            .findByIdAndUpdate(subcategoryId, updateData, { new: true })
            .exec();
        if (!subcategory) {
            throw new common_1.NotFoundException('სუბკატეგორია ვერ მოიძებნა');
        }
        return subcategory;
    }
    async deleteSubCategory(subcategoryId) {
        const subcategory = await this.subcategoryModel
            .findById(subcategoryId)
            .exec();
        if (!subcategory) {
            throw new common_1.NotFoundException('სუბკატეგორია ვერ მოიძებნა');
        }
        subcategory.isActive = false;
        await subcategory.save();
    }
    async addExerciseToSubCategory(subcategoryId, exercise) {
        const subcategory = await this.subcategoryModel
            .findById(subcategoryId)
            .exec();
        if (!subcategory) {
            throw new common_1.NotFoundException('სუბკატეგორია ვერ მოიძებნა');
        }
        if (!subcategory.exercises) {
            subcategory.exercises = [];
        }
        subcategory.exercises.push(exercise);
        return subcategory.save();
    }
    async getCategoriesWithSubCategories() {
        const subcategories = await this.subcategoryModel
            .find({ isActive: true })
            .populate('categoryId', 'name description image')
            .sort({ sortOrder: 1 })
            .exec();
        const grouped = subcategories.reduce((acc, sub) => {
            const categoryId = sub.categoryId._id.toString();
            if (!acc[categoryId]) {
                acc[categoryId] = {
                    category: sub.categoryId,
                    subcategories: [],
                };
            }
            acc[categoryId].subcategories.push(sub);
            return acc;
        }, {});
        return Object.values(grouped);
    }
};
exports.SubCategoryService = SubCategoryService;
exports.SubCategoryService = SubCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subcategory_schema_1.SubCategory.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], SubCategoryService);
//# sourceMappingURL=subcategory.service.js.map