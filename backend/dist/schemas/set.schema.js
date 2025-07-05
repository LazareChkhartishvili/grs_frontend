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
exports.SetSchema = exports.Set = exports.SetExercise = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SetExercise = class SetExercise {
    exerciseId;
    repetitions;
    sets;
    restTime;
    duration;
    notes;
    order;
};
exports.SetExercise = SetExercise;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Exercise', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], SetExercise.prototype, "exerciseId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 1 }),
    __metadata("design:type", Number)
], SetExercise.prototype, "repetitions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 1 }),
    __metadata("design:type", Number)
], SetExercise.prototype, "sets", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], SetExercise.prototype, "restTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], SetExercise.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SetExercise.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], SetExercise.prototype, "order", void 0);
exports.SetExercise = SetExercise = __decorate([
    (0, mongoose_1.Schema)()
], SetExercise);
let Set = class Set {
    name;
    description;
    image;
    categoryId;
    subcategoryId;
    exercises;
    totalDuration;
    totalCalories;
    difficulty;
    level;
    tags;
    targetMuscles;
    equipment;
    warmupInstructions;
    cooldownInstructions;
    generalNotes;
    createdBy;
    isActive;
    isPublic;
    isFeatured;
    usageCount;
    rating;
    reviewsCount;
    sortOrder;
    schedule;
    relatedSets;
    prerequisites;
    goals;
    ageGroup;
    targetGender;
    suitableConditions;
    contraindicatedConditions;
};
exports.Set = Set;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Set.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Set.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Set.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Category', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Set.prototype, "categoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'SubCategory' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Set.prototype, "subcategoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [SetExercise], default: [] }),
    __metadata("design:type", Array)
], Set.prototype, "exercises", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Set.prototype, "totalDuration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Set.prototype, "totalCalories", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['easy', 'medium', 'hard'],
        default: 'medium',
    }),
    __metadata("design:type", String)
], Set.prototype, "difficulty", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner',
    }),
    __metadata("design:type", String)
], Set.prototype, "level", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Set.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Set.prototype, "targetMuscles", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Set.prototype, "equipment", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Set.prototype, "warmupInstructions", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Set.prototype, "cooldownInstructions", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Set.prototype, "generalNotes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Set.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Set.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Set.prototype, "isPublic", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Set.prototype, "isFeatured", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Set.prototype, "usageCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Set.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Set.prototype, "reviewsCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Set.prototype, "sortOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            dayOfWeek: { type: Number, min: 0, max: 6 },
            timeOfDay: String,
            isRecommended: { type: Boolean, default: false },
        },
    ]),
    __metadata("design:type", Array)
], Set.prototype, "schedule", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.Types.ObjectId, ref: 'Set' }]),
    __metadata("design:type", Array)
], Set.prototype, "relatedSets", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.Types.ObjectId, ref: 'Set' }]),
    __metadata("design:type", Array)
], Set.prototype, "prerequisites", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Set.prototype, "goals", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            minAge: Number,
            maxAge: Number,
        },
    }),
    __metadata("design:type", Object)
], Set.prototype, "ageGroup", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['all', 'male', 'female'],
        default: 'all',
    }),
    __metadata("design:type", String)
], Set.prototype, "targetGender", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Set.prototype, "suitableConditions", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Set.prototype, "contraindicatedConditions", void 0);
exports.Set = Set = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Set);
exports.SetSchema = mongoose_1.SchemaFactory.createForClass(Set);
exports.SetSchema.index({ categoryId: 1 });
exports.SetSchema.index({ subcategoryId: 1 });
exports.SetSchema.index({ difficulty: 1 });
exports.SetSchema.index({ level: 1 });
exports.SetSchema.index({ isActive: 1 });
exports.SetSchema.index({ isPublic: 1 });
exports.SetSchema.index({ isFeatured: 1 });
exports.SetSchema.index({ usageCount: -1 });
exports.SetSchema.index({ rating: -1 });
exports.SetSchema.index({ createdAt: -1 });
exports.SetSchema.index({ tags: 1 });
exports.SetSchema.index({ targetMuscles: 1 });
exports.SetSchema.index({ goals: 1 });
exports.SetSchema.index({ name: 'text', description: 'text', tags: 'text' });
//# sourceMappingURL=set.schema.js.map