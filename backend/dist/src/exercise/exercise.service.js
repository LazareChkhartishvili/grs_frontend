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
const exercise_complex_schema_1 = require("../schemas/exercise-complex.schema");
let ExerciseService = class ExerciseService {
    constructor(exerciseModel, exerciseComplexModel) {
        this.exerciseModel = exerciseModel;
        this.exerciseComplexModel = exerciseComplexModel;
    }
    async getAllExercises() {
        return this.exerciseModel
            .find({ isActive: true })
            .populate('categoryId', 'name description')
            .populate('subcategoryId', 'name description')
            .sort({ sortOrder: 1 })
            .exec();
    }
    async getExercisesByCategory(categoryId) {
        return this.exerciseModel
            .find({ categoryId, isActive: true })
            .populate('subcategoryId', 'name description')
            .sort({ sortOrder: 1 })
            .exec();
    }
    async getExercisesBySubcategory(subcategoryId) {
        return this.exerciseModel
            .find({ subcategoryId, isActive: true })
            .populate('categoryId', 'name description')
            .sort({ sortOrder: 1 })
            .exec();
    }
    async getExerciseById(exerciseId) {
        const exercise = await this.exerciseModel
            .findById(exerciseId)
            .populate('categoryId', 'name description')
            .populate('subcategoryId', 'name description')
            .exec();
        if (!exercise) {
            throw new common_1.NotFoundException('სავარჯიშო ვერ მოიძებნა');
        }
        return exercise;
    }
    async createExercise(exerciseData) {
        const { complexId, ...exerciseCreateData } = exerciseData;
        const exercise = new this.exerciseModel(exerciseCreateData);
        const savedExercise = await exercise.save();
        if (complexId) {
            const complex = await this.exerciseComplexModel
                .findById(complexId)
                .exec();
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
        return { exercise: savedExercise };
    }
    async updateExercise(exerciseId, updateData) {
        const exercise = await this.exerciseModel
            .findByIdAndUpdate(exerciseId, updateData, { new: true })
            .populate('categoryId', 'name description')
            .populate('subcategoryId', 'name description')
            .exec();
        if (!exercise) {
            throw new common_1.NotFoundException('სავარჯიშო ვერ მოიძებნა');
        }
        return exercise;
    }
    async deleteExercise(exerciseId) {
        const exercise = await this.exerciseModel.findById(exerciseId).exec();
        if (!exercise) {
            throw new common_1.NotFoundException('სავარჯიშო ვერ მოიძებნა');
        }
        exercise.isActive = false;
        await exercise.save();
    }
    async getExercisesByDifficulty(difficulty) {
        return this.exerciseModel
            .find({ difficulty, isActive: true })
            .populate('categoryId', 'name description')
            .populate('subcategoryId', 'name description')
            .sort({ sortOrder: 1 })
            .exec();
    }
    async searchExercises(searchTerm) {
        return this.exerciseModel
            .find({
            $and: [
                { isActive: true },
                {
                    $or: [
                        { name: { $regex: searchTerm, $options: 'i' } },
                        { description: { $regex: searchTerm, $options: 'i' } },
                        { instructions: { $regex: searchTerm, $options: 'i' } },
                    ],
                },
            ],
        })
            .populate('categoryId', 'name description')
            .populate('subcategoryId', 'name description')
            .sort({ sortOrder: 1 })
            .exec();
    }
    async getCategoriesWithExercises() {
        const exercises = await this.exerciseModel
            .find({ isActive: true })
            .populate('categoryId', 'name description image')
            .populate('subcategoryId', 'name description')
            .sort({ sortOrder: 1 })
            .exec();
        const grouped = exercises.reduce((acc, exercise) => {
            const categoryId = exercise.categoryId._id.toString();
            if (!acc[categoryId]) {
                acc[categoryId] = {
                    category: exercise.categoryId,
                    exercises: [],
                };
            }
            acc[categoryId].exercises.push(exercise);
            return acc;
        }, {});
        return Object.values(grouped);
    }
};
exports.ExerciseService = ExerciseService;
exports.ExerciseService = ExerciseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(exercise_schema_1.Exercise.name)),
    __param(1, (0, mongoose_1.InjectModel)(exercise_complex_schema_1.ExerciseComplex.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ExerciseService);
//# sourceMappingURL=exercise.service.js.map