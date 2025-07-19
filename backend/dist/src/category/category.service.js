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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_schema_1 = require("../schemas/category.schema");
let CategoryService = class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async create(createCategoryDto) {
        const category = new this.categoryModel(createCategoryDto);
        return category.save();
    }
    async findAll() {
        return this.categoryModel.find()
            .populate('subcategories')
            .populate('sets')
            .exec();
    }
    async findOne(id) {
        const category = await this.categoryModel.findById(id)
            .populate('subcategories')
            .populate('sets')
            .exec();
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async getCategorySets(id) {
        const category = await this.categoryModel.findById(id)
            .populate({
            path: 'sets',
            populate: {
                path: 'exercises'
            }
        })
            .exec();
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category.sets;
    }
    async update(id, updateCategoryDto) {
        const category = await this.categoryModel
            .findByIdAndUpdate(id, updateCategoryDto, { new: true })
            .exec();
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async remove(id) {
        const category = await this.categoryModel.findByIdAndDelete(id).exec();
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async addSubcategory(categoryId, subcategoryId) {
        const category = await this.categoryModel.findById(categoryId);
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        if (!category.subcategories) {
            category.subcategories = [];
        }
        if (!category.subcategories.includes(new mongoose_2.Types.ObjectId(subcategoryId))) {
            category.subcategories.push(new mongoose_2.Types.ObjectId(subcategoryId));
            await category.save();
        }
        return category;
    }
    async addSet(categoryId, setId) {
        const category = await this.categoryModel.findById(categoryId);
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        if (!category.sets) {
            category.sets = [];
        }
        if (!category.sets.includes(new mongoose_2.Types.ObjectId(setId))) {
            category.sets.push(new mongoose_2.Types.ObjectId(setId));
            await category.save();
        }
        return category;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryService);
//# sourceMappingURL=category.service.js.map