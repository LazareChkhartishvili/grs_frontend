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
exports.CategorySchema = exports.Category = exports.Exercise = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Exercise = class Exercise {
    name;
    description;
    duration;
    difficulty;
    instructions;
    images;
    videos;
};
exports.Exercise = Exercise;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Exercise.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Exercise.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Exercise.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Exercise.prototype, "difficulty", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Exercise.prototype, "instructions", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Exercise.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Exercise.prototype, "videos", void 0);
exports.Exercise = Exercise = __decorate([
    (0, mongoose_1.Schema)()
], Exercise);
let Category = class Category {
    name;
    description;
    image;
    code;
    parentId;
    level;
    isActive;
    exercises;
    sortOrder;
};
exports.Category = Category;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Category.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Category.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true }),
    __metadata("design:type", String)
], Category.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Category', default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Category.prototype, "parentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Category.prototype, "level", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Category.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Exercise], default: [] }),
    __metadata("design:type", Array)
], Category.prototype, "exercises", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Category.prototype, "sortOrder", void 0);
exports.Category = Category = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Category);
exports.CategorySchema = mongoose_1.SchemaFactory.createForClass(Category);
exports.CategorySchema.index({ parentId: 1 });
exports.CategorySchema.index({ level: 1 });
exports.CategorySchema.index({ isActive: 1 });
exports.CategorySchema.index({ sortOrder: 1 });
//# sourceMappingURL=category.schema.js.map