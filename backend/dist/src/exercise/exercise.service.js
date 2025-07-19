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
exports.ExerciseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const exercise_schema_1 = require("../schemas/exercise.schema");
let ExerciseService = class ExerciseService {
    constructor(exerciseModel) {
        this.exerciseModel = exerciseModel;
    }
    async create(createExerciseDto) {
        const exercise = new this.exerciseModel({
            ...createExerciseDto,
            setId: new mongoose_2.Types.ObjectId(createExerciseDto.setId),
            categoryId: new mongoose_2.Types.ObjectId(createExerciseDto.categoryId),
            subCategoryId: createExerciseDto.subCategoryId
                ? new mongoose_2.Types.ObjectId(createExerciseDto.subCategoryId)
                : undefined
        });
        return exercise.save();
    }
    async findAll(query = {}) {
        const filter = {};
        if (query.setId) {
            filter.setId = new mongoose_2.Types.ObjectId(query.setId);
        }
        if (query.categoryId) {
            filter.categoryId = new mongoose_2.Types.ObjectId(query.categoryId);
        }
        if (query.subCategoryId) {
            filter.subCategoryId = new mongoose_2.Types.ObjectId(query.subCategoryId);
        }
        return this.exerciseModel
            .find(filter)
            .populate('set', 'name description')
            .populate('category', 'name')
            .populate('subcategory', 'name')
            .sort({ sortOrder: 1, createdAt: -1 })
            .exec();
    }
    async findOne(id) {
        const exercise = await this.exerciseModel
            .findById(id)
            .populate('set', 'name description')
            .populate('category', 'name')
            .populate('subcategory', 'name')
            .exec();
        if (!exercise) {
            throw new common_1.NotFoundException(`Exercise with ID ${id} not found`);
        }
        return exercise;
    }
    async update(id, updateExerciseDto) {
        const updateData = { ...updateExerciseDto };
        if (updateExerciseDto.setId) {
            updateData.setId = new mongoose_2.Types.ObjectId(updateExerciseDto.setId);
        }
        if (updateExerciseDto.categoryId) {
            updateData.categoryId = new mongoose_2.Types.ObjectId(updateExerciseDto.categoryId);
        }
        if (updateExerciseDto.subCategoryId) {
            updateData.subCategoryId = new mongoose_2.Types.ObjectId(updateExerciseDto.subCategoryId);
        }
        const exercise = await this.exerciseModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .populate('set', 'name description')
            .populate('category', 'name')
            .populate('subcategory', 'name')
            .exec();
        if (!exercise) {
            throw new common_1.NotFoundException(`Exercise with ID ${id} not found`);
        }
        return exercise;
    }
    async remove(id) {
        const result = await this.exerciseModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Exercise with ID ${id} not found`);
        }
    }
    async findBySet(setId) {
        return this.exerciseModel
            .find({ setId: new mongoose_2.Types.ObjectId(setId) })
            .populate('set', 'name description')
            .populate('category', 'name')
            .populate('subcategory', 'name')
            .sort({ sortOrder: 1, createdAt: -1 })
            .exec();
    }
    async findByCategory(categoryId) {
        return this.exerciseModel
            .find({ categoryId: new mongoose_2.Types.ObjectId(categoryId) })
            .populate('set', 'name description')
            .populate('category', 'name')
            .populate('subcategory', 'name')
            .sort({ sortOrder: 1, createdAt: -1 })
            .exec();
    }
    async findByDifficulty(difficulty) {
        return this.exerciseModel
            .find({ difficulty, isActive: true, isPublished: true })
            .populate('set', 'name description')
            .populate('category', 'name')
            .populate('subcategory', 'name')
            .sort({ sortOrder: 1, createdAt: -1 })
            .exec();
    }
};
exports.ExerciseService = ExerciseService;
exports.ExerciseService = ExerciseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(exercise_schema_1.Exercise.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ExerciseService);
//# sourceMappingURL=exercise.service.js.map