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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseSchema = exports.Exercise = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Exercise = class Exercise {
};
exports.Exercise = Exercise;
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            ka: { type: String, required: true },
            en: { type: String, default: '' },
            ru: { type: String, default: '' }
        },
        required: true
    }),
    __metadata("design:type", Object)
], Exercise.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            ka: { type: String, required: true },
            en: { type: String, default: '' },
            ru: { type: String, default: '' }
        },
        required: true
    }),
    __metadata("design:type", Object)
], Exercise.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            ka: { type: String, required: true },
            en: { type: String, default: '' },
            ru: { type: String, default: '' }
        },
        required: true
    }),
    __metadata("design:type", Object)
], Exercise.prototype, "recommendations", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Exercise.prototype, "videoUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Exercise.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Exercise.prototype, "videoDuration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Exercise.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    }),
    __metadata("design:type", String)
], Exercise.prototype, "difficulty", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Exercise.prototype, "repetitions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Exercise.prototype, "sets", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Exercise.prototype, "restTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Exercise.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Exercise.prototype, "isPublished", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Exercise.prototype, "sortOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Set', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Exercise.prototype, "setId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Category', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Exercise.prototype, "categoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Category' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Exercise.prototype, "subCategoryId", void 0);
exports.Exercise = Exercise = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })
], Exercise);
exports.ExerciseSchema = mongoose_1.SchemaFactory.createForClass(Exercise);
exports.ExerciseSchema.virtual('set', {
    ref: 'Set',
    localField: 'setId',
    foreignField: '_id',
    justOne: true
});
exports.ExerciseSchema.virtual('category', {
    ref: 'Category',
    localField: 'categoryId',
    foreignField: '_id',
    justOne: true
});
exports.ExerciseSchema.virtual('subcategory', {
    ref: 'Category',
    localField: 'subCategoryId',
    foreignField: '_id',
    justOne: true
});
exports.ExerciseSchema.index({ setId: 1 });
exports.ExerciseSchema.index({ categoryId: 1 });
exports.ExerciseSchema.index({ subCategoryId: 1 });
exports.ExerciseSchema.index({ isActive: 1 });
exports.ExerciseSchema.index({ isPublished: 1 });
exports.ExerciseSchema.index({ sortOrder: 1 });
exports.ExerciseSchema.index({ difficulty: 1 });
//# sourceMappingURL=exercise.schema.js.map