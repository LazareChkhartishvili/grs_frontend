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
exports.SetService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const set_schema_1 = require("../schemas/set.schema");
let SetService = class SetService {
    setModel;
    constructor(setModel) {
        this.setModel = setModel;
    }
    async findAll(page = 1, limit = 10, filters = {}) {
        const skip = (page - 1) * limit;
        const query = { isActive: true, ...filters };
        const [sets, total] = await Promise.all([
            this.setModel
                .find(query)
                .populate('categoryId', 'name')
                .populate('subcategoryId', 'name')
                .populate('exercises.exerciseId', 'name duration difficulty')
                .populate('createdBy', 'name email')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.setModel.countDocuments(query),
        ]);
        return {
            sets,
            total,
            pages: Math.ceil(total / limit),
        };
    }
    async findById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('არასწორი სეტის ID');
        }
        const set = await this.setModel
            .findById(id)
            .populate('categoryId', 'name')
            .populate('subcategoryId', 'name')
            .populate('exercises.exerciseId', 'name description duration difficulty images videos')
            .populate('createdBy', 'name email')
            .populate('relatedSets', 'name difficulty level')
            .populate('prerequisites', 'name difficulty level')
            .exec();
        if (!set) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
        await this.setModel.findByIdAndUpdate(id, {
            $inc: { usageCount: 1 },
        });
        return set;
    }
    async search(query, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const searchQuery = {
            isActive: true,
            $text: { $search: query },
        };
        const [sets, total] = await Promise.all([
            this.setModel
                .find(searchQuery, { score: { $meta: 'textScore' } })
                .populate('categoryId', 'name')
                .populate('subcategoryId', 'name')
                .sort({ score: { $meta: 'textScore' } })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.setModel.countDocuments(searchQuery),
        ]);
        return {
            sets,
            total,
            pages: Math.ceil(total / limit),
        };
    }
    async getFeaturedSets() {
        return this.setModel
            .find({ isFeatured: true, isActive: true })
            .populate('categoryId', 'name')
            .populate('subcategoryId', 'name')
            .sort({ rating: -1, usageCount: -1 })
            .limit(10)
            .exec();
    }
    async findByCategory(categoryId) {
        if (!categoryId || !mongoose_2.Types.ObjectId.isValid(categoryId)) {
            throw new common_1.BadRequestException('არასწორი კატეგორიის ID');
        }
        return this.setModel
            .find({ categoryId: new mongoose_2.Types.ObjectId(categoryId), isActive: true })
            .populate('subcategoryId', 'name')
            .sort({ sortOrder: 1, rating: -1 })
            .exec();
    }
    async findBySubcategory(subcategoryId) {
        if (!subcategoryId || !mongoose_2.Types.ObjectId.isValid(subcategoryId)) {
            throw new common_1.BadRequestException('არასწორი სუბკატეგორიის ID');
        }
        return this.setModel
            .find({
            subcategoryId: new mongoose_2.Types.ObjectId(subcategoryId),
            isActive: true,
        })
            .sort({ sortOrder: 1, rating: -1 })
            .exec();
    }
    async findByDifficulty(difficulty) {
        return this.setModel
            .find({ difficulty, isActive: true })
            .populate('categoryId', 'name')
            .populate('subcategoryId', 'name')
            .sort({ rating: -1 })
            .exec();
    }
    async findByGoals(goals) {
        return this.setModel
            .find({ goals: { $in: goals }, isActive: true })
            .populate('categoryId', 'name')
            .populate('subcategoryId', 'name')
            .sort({ rating: -1 })
            .exec();
    }
    async create(setData) {
        let totalDuration = 0;
        const totalCalories = 0;
        const exercises = setData.exercises?.map((ex, index) => ({
            exerciseId: new mongoose_2.Types.ObjectId(ex.exerciseId),
            repetitions: ex.repetitions || 1,
            sets: ex.sets || 1,
            restTime: ex.restTime || 0,
            duration: ex.duration || 0,
            notes: ex.notes,
            order: ex.order || index,
        })) || [];
        exercises.forEach((ex) => {
            totalDuration += ex.duration + ex.restTime;
        });
        const set = new this.setModel({
            ...setData,
            categoryId: new mongoose_2.Types.ObjectId(setData.categoryId),
            subcategoryId: setData.subcategoryId
                ? new mongoose_2.Types.ObjectId(setData.subcategoryId)
                : undefined,
            exercises,
            totalDuration,
            totalCalories,
            createdBy: setData.createdBy
                ? new mongoose_2.Types.ObjectId(setData.createdBy)
                : undefined,
        });
        return set.save();
    }
    async update(id, updateData) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('არასწორი სეტის ID');
        }
        if (updateData.exercises) {
            let totalDuration = 0;
            updateData.exercises.forEach((ex) => {
                totalDuration += (ex.duration || 0) + (ex.restTime || 0);
            });
            updateData.totalDuration = totalDuration;
        }
        const set = await this.setModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .exec();
        if (!set) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
        return set;
    }
    async delete(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('არასწორი სეტის ID');
        }
        const result = await this.setModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!result) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
    }
    async addExercise(setId, exerciseData) {
        const set = await this.setModel.findById(setId);
        if (!set) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
        const newExercise = {
            exerciseId: new mongoose_2.Types.ObjectId(exerciseData.exerciseId),
            repetitions: exerciseData.repetitions || 1,
            sets: exerciseData.sets || 1,
            restTime: exerciseData.restTime || 0,
            duration: exerciseData.duration || 0,
            notes: exerciseData.notes,
            order: set.exercises.length,
        };
        set.exercises.push(newExercise);
        set.totalDuration += newExercise.duration + newExercise.restTime;
        return set.save();
    }
    async removeExercise(setId, exerciseId) {
        const set = await this.setModel.findById(setId);
        if (!set) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
        const exerciseIndex = set.exercises.findIndex((ex) => ex.exerciseId.toString() === exerciseId);
        if (exerciseIndex === -1) {
            throw new common_1.NotFoundException('სავარჯიშო სეტში ვერ მოიძებნა');
        }
        const removedExercise = set.exercises[exerciseIndex];
        set.totalDuration -= removedExercise.duration + removedExercise.restTime;
        set.exercises.splice(exerciseIndex, 1);
        return set.save();
    }
    async updateRating(setId, rating) {
        const set = await this.setModel.findById(setId);
        if (!set) {
            throw new common_1.NotFoundException('სეტი ვერ მოიძებნა');
        }
        const totalRating = set.rating * set.reviewsCount + rating;
        const newReviewsCount = set.reviewsCount + 1;
        const newAverageRating = totalRating / newReviewsCount;
        const updatedSet = await this.setModel
            .findByIdAndUpdate(setId, {
            rating: Math.round(newAverageRating * 10) / 10,
            reviewsCount: newReviewsCount,
        }, { new: true })
            .exec();
        if (!updatedSet) {
            throw new common_1.NotFoundException('სეტის განახლება ვერ მოხერხდა');
        }
        return updatedSet;
    }
};
exports.SetService = SetService;
exports.SetService = SetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(set_schema_1.Set.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], SetService);
//# sourceMappingURL=set.service.js.map