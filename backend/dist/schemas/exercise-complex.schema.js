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
exports.ExerciseComplexSchema = exports.ExerciseComplex = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ExerciseComplex = class ExerciseComplex {
    name;
    description;
    image;
    categoryId;
    subcategoryId;
    exerciseIds;
    totalDuration;
    exerciseCount;
    difficulty;
    stage;
    requiredEquipment;
    generalInstructions;
    breathingGuidelines;
    recommendedFrequency;
    targetCondition;
    price;
    subscriptionPeriods;
    demoVideoUrl;
    relatedComplexes;
    discount;
    isActive;
    sortOrder;
    tags;
    instructorNotes;
    subscriptionOptions;
};
exports.ExerciseComplex = ExerciseComplex;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ExerciseComplex.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ExerciseComplex.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ExerciseComplex.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Category', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ExerciseComplex.prototype, "categoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'SubCategory', default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ExerciseComplex.prototype, "subcategoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.Types.ObjectId, ref: 'Exercise' }]),
    __metadata("design:type", Array)
], ExerciseComplex.prototype, "exerciseIds", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ExerciseComplex.prototype, "totalDuration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ExerciseComplex.prototype, "exerciseCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['easy', 'medium', 'hard'],
        default: 'medium',
    }),
    __metadata("design:type", String)
], ExerciseComplex.prototype, "difficulty", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['initial', 'mid', 'advanced'],
        default: 'initial',
    }),
    __metadata("design:type", String)
], ExerciseComplex.prototype, "stage", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], ExerciseComplex.prototype, "requiredEquipment", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ExerciseComplex.prototype, "generalInstructions", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ExerciseComplex.prototype, "breathingGuidelines", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ExerciseComplex.prototype, "recommendedFrequency", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ExerciseComplex.prototype, "targetCondition", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ExerciseComplex.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            oneMonth: { type: Number },
            threeMonths: { type: Number },
            sixMonths: { type: Number },
        },
    }),
    __metadata("design:type", Object)
], ExerciseComplex.prototype, "subscriptionPeriods", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ExerciseComplex.prototype, "demoVideoUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.Types.ObjectId, ref: 'ExerciseComplex' }]),
    __metadata("design:type", Array)
], ExerciseComplex.prototype, "relatedComplexes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ExerciseComplex.prototype, "discount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], ExerciseComplex.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ExerciseComplex.prototype, "sortOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], ExerciseComplex.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ExerciseComplex.prototype, "instructorNotes", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            duration: { type: Number, required: true },
            price: { type: Number, required: true },
            discount: { type: Number, default: 0 },
        },
    ]),
    __metadata("design:type", Array)
], ExerciseComplex.prototype, "subscriptionOptions", void 0);
exports.ExerciseComplex = ExerciseComplex = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ExerciseComplex);
exports.ExerciseComplexSchema = mongoose_1.SchemaFactory.createForClass(ExerciseComplex);
exports.ExerciseComplexSchema.index({ categoryId: 1 });
exports.ExerciseComplexSchema.index({ subcategoryId: 1 });
exports.ExerciseComplexSchema.index({ isActive: 1 });
exports.ExerciseComplexSchema.index({ price: 1 });
exports.ExerciseComplexSchema.index({ difficulty: 1 });
exports.ExerciseComplexSchema.index({ stage: 1 });
//# sourceMappingURL=exercise-complex.schema.js.map