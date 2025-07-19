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
exports.SetSchema = exports.Set = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Set = class Set {
};
exports.Set = Set;
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            ka: { type: String, required: true },
            en: { type: String, required: true },
            ru: { type: String, required: true }
        },
        required: true
    }),
    __metadata("design:type", Object)
], Set.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            ka: { type: String, required: true },
            en: { type: String, required: true },
            ru: { type: String, required: true }
        },
        required: true
    }),
    __metadata("design:type", Object)
], Set.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Set.prototype, "thumbnailImage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Set.prototype, "totalExercises", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "00:00" }),
    __metadata("design:type", String)
], Set.prototype, "totalDuration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 3 }),
    __metadata("design:type", Number)
], Set.prototype, "difficultyLevels", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            beginner: {
                exerciseCount: { type: Number, default: 0 },
                isLocked: { type: Boolean, default: false }
            },
            intermediate: {
                exerciseCount: { type: Number, default: 0 },
                isLocked: { type: Boolean, default: true }
            },
            advanced: {
                exerciseCount: { type: Number, default: 0 },
                isLocked: { type: Boolean, default: true }
            }
        },
        required: true,
        _id: false
    }),
    __metadata("design:type", Object)
], Set.prototype, "levels", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            monthly: { type: Number, required: true },
            threeMonths: { type: Number, required: true },
            sixMonths: { type: Number, required: true },
            yearly: { type: Number, required: true }
        },
        required: true,
        _id: false
    }),
    __metadata("design:type", Object)
], Set.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Set.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Set.prototype, "isPublished", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Set.prototype, "sortOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Category', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Set.prototype, "categoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Category' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Set.prototype, "subCategoryId", void 0);
exports.Set = Set = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })
], Set);
exports.SetSchema = mongoose_1.SchemaFactory.createForClass(Set);
exports.SetSchema.virtual('category', {
    ref: 'Category',
    localField: 'categoryId',
    foreignField: '_id',
    justOne: true
});
exports.SetSchema.virtual('subcategory', {
    ref: 'Category',
    localField: 'subCategoryId',
    foreignField: '_id',
    justOne: true
});
exports.SetSchema.index({ categoryId: 1 });
exports.SetSchema.index({ subCategoryId: 1 });
exports.SetSchema.index({ isActive: 1 });
exports.SetSchema.index({ isPublished: 1 });
exports.SetSchema.index({ sortOrder: 1 });
exports.SetSchema.index({ 'price.monthly': 1 });
exports.SetSchema.index({ 'levels.beginner.isLocked': 1 });
//# sourceMappingURL=set.schema.js.map