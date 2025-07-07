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
    categoryModel;
    subcategoryModel;
    setModel;
    videoModel;
    constructor(categoryModel, subcategoryModel, setModel, videoModel) {
        this.categoryModel = categoryModel;
        this.subcategoryModel = subcategoryModel;
        this.setModel = setModel;
        this.videoModel = videoModel;
    }
    async findAll() {
        return this.categoryModel.find({ isActive: true }).exec();
    }
    async findAllWithSubcategories() {
        const categories = await this.categoryModel.find({ isActive: true }).exec();
        const subcategories = await this.subcategoryModel
            .find({ isActive: true })
            .exec();
        return categories.map((category) => {
            const categorySubcategories = subcategories.filter((sub) => sub.categoryId?.toString() === category._id.toString());
            return {
                ...category.toObject(),
                subcategories: categorySubcategories,
            };
        });
    }
    async findAllWithFullStructure() {
        const categories = await this.categoryModel
            .find({ isActive: true })
            .lean()
            .exec();
        const subcategories = await this.subcategoryModel
            .find({ isActive: true })
            .lean()
            .exec();
        const sets = await this.setModel.find({ isActive: true }).lean().exec();
        const videoIds = sets
            .flatMap((set) => set.exercises?.map((ex) => ex.videoId))
            .filter(Boolean);
        const videos = await this.videoModel
            .find({ _id: { $in: videoIds } })
            .select('_id name url categoryCode setId sequence resolution format duration')
            .lean()
            .exec();
        const populatedSets = sets.map((set) => ({
            ...set,
            exercises: set.exercises?.map((exercise) => {
                if (exercise.videoId) {
                    const video = videos.find((v) => String(v._id) === String(exercise.videoId));
                    return {
                        ...exercise,
                        video: video || null,
                    };
                }
                return exercise;
            }),
        }));
        return categories.map((category) => {
            const categorySubcategories = subcategories
                .filter((sub) => String(sub.categoryId) === String(category._id))
                .map((subcategory) => ({
                ...subcategory,
                sets: populatedSets.filter((set) => String(set.categoryId) === String(category._id) &&
                    String(set.subcategoryId) === String(subcategory._id)),
            }));
            const categorySets = populatedSets.filter((set) => String(set.categoryId) === String(category._id) && !set.subcategoryId);
            return {
                ...category,
                subcategories: categorySubcategories,
                sets: categorySets,
            };
        });
    }
    async findOne(id) {
        const category = await this.categoryModel.findById(id).exec();
        if (!category) {
            throw new common_1.NotFoundException('კატეგორია ვერ მოიძებნა');
        }
        return category;
    }
    async create(categoryData) {
        const category = new this.categoryModel(categoryData);
        return category.save();
    }
    async update(id, categoryData) {
        const category = await this.categoryModel
            .findByIdAndUpdate(id, categoryData, { new: true })
            .exec();
        if (!category) {
            throw new common_1.NotFoundException('კატეგორია ვერ მოიძებნა');
        }
        return category;
    }
    async delete(id) {
        const category = await this.categoryModel.findById(id).exec();
        if (!category) {
            throw new common_1.NotFoundException('კატეგორია ვერ მოიძებნა');
        }
        category.isActive = false;
        await category.save();
    }
    async createSubcategories(parentId, subcategories) {
        const parentCategory = await this.categoryModel.findById(parentId).exec();
        if (!parentCategory) {
            throw new common_1.NotFoundException('მშობელი კატეგორია ვერ მოიძებნა');
        }
        const createdSubcategories = [];
        for (const subcategory of subcategories) {
            const newSubcategory = new this.categoryModel({
                ...subcategory,
                parentId: new mongoose_2.Types.ObjectId(parentId),
                level: parentCategory.level + 1,
                sequence: `${parentCategory.sequence || '1'}.${createdSubcategories.length + 1}`,
                isActive: true,
            });
            const savedSubcategory = await newSubcategory.save();
            createdSubcategories.push(savedSubcategory);
        }
        return createdSubcategories;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __param(1, (0, mongoose_1.InjectModel)('SubCategory')),
    __param(2, (0, mongoose_1.InjectModel)('Set')),
    __param(3, (0, mongoose_1.InjectModel)('Video')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CategoryService);
//# sourceMappingURL=category.service.js.map