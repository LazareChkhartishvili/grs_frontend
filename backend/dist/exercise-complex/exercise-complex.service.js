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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseComplexService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const exercise_complex_schema_1 = require("../schemas/exercise-complex.schema");
const exercise_schema_1 = require("../schemas/exercise.schema");
let ExerciseComplexService = class ExerciseComplexService {
    exerciseComplexModel;
    exerciseModel;
    constructor(exerciseComplexModel, exerciseModel) {
        this.exerciseComplexModel = exerciseComplexModel;
        this.exerciseModel = exerciseModel;
    }
    async getAllComplexes() {
        const complexes = await this.exerciseComplexModel
            .find({ isActive: true })
            .populate('categoryId', 'name description')
            .populate('subcategoryId', 'name description categoryId')
            .populate({
            path: 'subcategoryId',
            populate: {
                path: 'categoryId',
                select: 'name description',
            },
        })
            .sort({ sortOrder: 1 })
            .exec();
        const complexesWithExercises = await Promise.all(complexes.map(async (complex) => {
            const exercises = await this.exerciseModel
                .find({ _id: { $in: complex.exerciseIds } })
                .populate('categoryId', 'name description')
                .populate('subcategoryId', 'name description')
                .exec();
            return {
                ...complex.toObject(),
                exercises: exercises,
            };
        }));
        return complexesWithExercises;
    }
    async getComplexById(complexId) {
        const complex = await this.exerciseComplexModel
            .findById(complexId)
            .populate('subcategoryId', 'name description categoryId')
            .populate({
            path: 'subcategoryId',
            populate: {
                path: 'categoryId',
                select: 'name description image',
            },
        })
            .populate('relatedComplexes', 'name description price')
            .exec();
        if (!complex) {
            throw new common_1.NotFoundException('კომპლექსი ვერ მოიძებნა');
        }
        const exercises = await this.exerciseModel
            .find({ _id: { $in: complex.exerciseIds } })
            .populate('categoryId', 'name description')
            .populate('subcategoryId', 'name description')
            .exec();
        return {
            ...complex.toObject(),
            exercises: exercises,
        };
    }
    async getComplexByIdWithExercises(complexId) {
        console.log('🔍 Getting complex with exercises:', complexId);
        const complex = await this.exerciseComplexModel
            .findById(complexId)
            .populate('subcategoryId', 'name description categoryId')
            .populate({
            path: 'subcategoryId',
            populate: {
                path: 'categoryId',
                select: 'name description image',
            },
        })
            .exec();
        if (!complex) {
            throw new common_1.NotFoundException('კომპლექსი ვერ მოიძებნა');
        }
        console.log('📋 Complex exercise IDs:', complex.exerciseIds);
        const exercises = await this.exerciseModel
            .find({ _id: { $in: complex.exerciseIds } })
            .populate('categoryId', 'name description')
            .populate('subcategoryId', 'name description')
            .exec();
        console.log('🏃‍♂️ Found exercises:', exercises.length);
        return {
            ...complex.toObject(),
            exercises: exercises,
        };
    }
    async getComplexesByCategory(categoryId) {
        return this.exerciseComplexModel
            .find({ isActive: true })
            .populate({
            path: 'subcategoryId',
            match: { categoryId: new mongoose_2.Types.ObjectId(categoryId) },
            select: 'name description',
        })
            .sort({ sortOrder: 1 })
            .exec()
            .then((complexes) => complexes.filter((complex) => complex.subcategoryId));
    }
    async getComplexesBySubcategory(subcategoryId) {
        return this.exerciseComplexModel
            .find({
            subcategoryId: new mongoose_2.Types.ObjectId(subcategoryId),
            isActive: true,
        })
            .populate('subcategoryId', 'name description categoryId')
            .populate({
            path: 'subcategoryId',
            populate: {
                path: 'categoryId',
                select: 'name description',
            },
        })
            .sort({ sortOrder: 1 })
            .exec();
    }
    async getComplexesByPriceRange(minPrice, maxPrice) {
        return this.exerciseComplexModel
            .find({
            price: { $gte: minPrice, $lte: maxPrice },
            isActive: true,
        })
            .populate('subcategoryId', 'name description')
            .sort({ price: 1 })
            .exec();
    }
    async getComplexesByDifficulty(difficulty) {
        return this.exerciseComplexModel
            .find({ difficulty, isActive: true })
            .populate('subcategoryId', 'name description')
            .sort({ sortOrder: 1 })
            .exec();
    }
    async getComplexesByStage(stage) {
        return this.exerciseComplexModel
            .find({ stage, isActive: true })
            .populate('subcategoryId', 'name description')
            .sort({ sortOrder: 1 })
            .exec();
    }
    async getComplexesByTags(tags) {
        return this.exerciseComplexModel
            .find({
            tags: { $in: tags },
            isActive: true,
        })
            .populate('subcategoryId', 'name description')
            .sort({ sortOrder: 1 })
            .exec();
    }
    async createComplex(complexData) {
        const complex = new this.exerciseComplexModel({
            ...complexData,
            exerciseCount: 0,
            totalDuration: 0,
            subcategoryId: new mongoose_2.Types.ObjectId(complexData.subcategoryId),
            relatedComplexes: complexData.relatedComplexes?.map((id) => new mongoose_2.Types.ObjectId(id)),
        });
        return complex.save();
    }
    async updateComplex(complexId, updateData) {
        const processedUpdateData = { ...updateData };
        if (updateData.subcategoryId) {
            processedUpdateData.subcategoryId = new mongoose_2.Types.ObjectId(updateData.subcategoryId);
        }
        if (updateData.relatedComplexes) {
            processedUpdateData.relatedComplexes = updateData.relatedComplexes.map((id) => new mongoose_2.Types.ObjectId(id));
        }
        const complex = await this.exerciseComplexModel
            .findByIdAndUpdate(complexId, processedUpdateData, { new: true })
            .populate('subcategoryId', 'name description')
            .exec();
        if (!complex) {
            throw new common_1.NotFoundException('კომპლექსი ვერ მოიძებნა');
        }
        return complex;
    }
    async deleteComplex(complexId) {
        const complex = await this.exerciseComplexModel.findById(complexId).exec();
        if (!complex) {
            throw new common_1.NotFoundException('კომპლექსი ვერ მოიძებნა');
        }
        complex.isActive = false;
        await complex.save();
    }
    async getFeaturedComplexes() {
        return this.exerciseComplexModel
            .find({ isActive: true })
            .populate('subcategoryId', 'name description')
            .sort({ sortOrder: 1 })
            .limit(6)
            .exec();
    }
    async getCategoriesWithComplexes() {
        const complexes = await this.exerciseComplexModel
            .find({ isActive: true })
            .populate('subcategoryId', 'name description categoryId')
            .populate({
            path: 'subcategoryId',
            populate: {
                path: 'categoryId',
                select: 'name description image',
            },
        })
            .sort({ sortOrder: 1 })
            .exec();
        const categoriesMap = new Map();
        complexes.forEach((complex) => {
            if (complex.subcategoryId && complex.subcategoryId.categoryId) {
                const category = complex.subcategoryId.categoryId;
                const categoryId = category._id.toString();
                if (!categoriesMap.has(categoryId)) {
                    categoriesMap.set(categoryId, {
                        _id: category._id,
                        name: category.name,
                        description: category.description,
                        image: category.image,
                        complexes: [],
                    });
                }
                categoriesMap.get(categoryId).complexes.push(complex);
            }
        });
        return Array.from(categoriesMap.values());
    }
    async addExerciseToComplex(complexId, exerciseId) {
        const complex = await this.exerciseComplexModel.findById(complexId).exec();
        if (!complex) {
            throw new common_1.NotFoundException('კომპლექსი ვერ მოიძებნა');
        }
        if (!complex.exerciseIds) {
            complex.exerciseIds = [];
        }
        const exerciseObjectId = new mongoose_2.Types.ObjectId(exerciseId);
        if (!complex.exerciseIds.includes(exerciseObjectId)) {
            complex.exerciseIds.push(exerciseObjectId);
            complex.exerciseCount = complex.exerciseIds.length;
        }
        return complex.save();
    }
    async getComplexExercises(complexId) {
        const complex = await this.exerciseComplexModel.findById(complexId).exec();
        if (!complex) {
            throw new common_1.NotFoundException('კომპლექსი ვერ მოიძებნა');
        }
        const exercises = await this.exerciseModel
            .find({ _id: { $in: complex.exerciseIds } })
            .populate('categoryId', 'name description')
            .populate('subcategoryId', 'name description')
            .exec();
        return exercises;
    }
    async removeExerciseFromComplex(complexId, exerciseId) {
        const complex = await this.exerciseComplexModel.findById(complexId).exec();
        if (!complex) {
            throw new common_1.NotFoundException('კომპლექსი ვერ მოიძებნა');
        }
        const exerciseObjectId = new mongoose_2.Types.ObjectId(exerciseId);
        complex.exerciseIds =
            complex.exerciseIds?.filter((id) => !id.equals(exerciseObjectId)) || [];
        complex.exerciseCount = complex.exerciseIds.length;
        return complex.save();
    }
    async createAndAddExerciseToComplex(complexId, exerciseData) {
        console.log('🔄 Creating new exercise and adding to complex:', complexId);
        const exercise = new this.exerciseModel({
            ...exerciseData,
            categoryId: new mongoose_2.Types.ObjectId(exerciseData.categoryId),
            subcategoryId: exerciseData.subcategoryId
                ? new mongoose_2.Types.ObjectId(exerciseData.subcategoryId)
                : null,
        });
        const savedExercise = await exercise.save();
        console.log('✅ Exercise created:', savedExercise._id);
        const complex = await this.exerciseComplexModel.findById(complexId).exec();
        if (!complex) {
            throw new common_1.NotFoundException('კომპლექსი ვერ მოიძებნა');
        }
        if (!complex.exerciseIds) {
            complex.exerciseIds = [];
        }
        const exerciseObjectId = new mongoose_2.Types.ObjectId(savedExercise._id);
        if (!complex.exerciseIds.includes(exerciseObjectId)) {
            complex.exerciseIds.push(exerciseObjectId);
            complex.exerciseCount = complex.exerciseIds.length;
        }
        const updatedComplex = await complex.save();
        return {
            exercise: savedExercise,
            complex: updatedComplex,
        };
    }
};
exports.ExerciseComplexService = ExerciseComplexService;
exports.ExerciseComplexService = ExerciseComplexService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(exercise_complex_schema_1.ExerciseComplex.name)),
    __param(1, (0, mongoose_1.InjectModel)(exercise_schema_1.Exercise.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], ExerciseComplexService);
//# sourceMappingURL=exercise-complex.service.js.map