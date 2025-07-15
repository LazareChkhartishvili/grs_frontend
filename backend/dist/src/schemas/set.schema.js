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
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, auto: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Set.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Set.prototype, "setId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Set.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Object }),
    __metadata("design:type", Object)
], Set.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Set.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Video' }], required: true }),
    __metadata("design:type", Array)
], Set.prototype, "videos", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{
                _id: { type: mongoose_2.Types.ObjectId, auto: true },
                videoId: { type: mongoose_2.Types.ObjectId, ref: 'Video' },
                repetitions: { type: Number, default: 1 },
                sets: { type: Number, default: 1 },
                restTime: { type: Number, default: 0 },
                duration: { type: Number, default: 0 },
                order: { type: Number }
            }],
        required: true,
        default: []
    }),
    __metadata("design:type", Array)
], Set.prototype, "exercises", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Category', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Set.prototype, "categoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'SubCategory' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Set.prototype, "subcategoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Set.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Set.prototype, "sortOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Set.prototype, "isPublic", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Set.prototype, "viewCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 920 }),
    __metadata("design:type", Number)
], Set.prototype, "monthlyPrice", void 0);
exports.Set = Set = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Set);
exports.SetSchema = mongoose_1.SchemaFactory.createForClass(Set);
exports.SetSchema.index({ setId: 1 });
exports.SetSchema.index({ isActive: 1 });
exports.SetSchema.index({ sortOrder: 1 });
exports.SetSchema.index({ isPublic: 1 });
exports.SetSchema.index({ categoryId: 1 });
exports.SetSchema.index({ subcategoryId: 1 });
exports.SetSchema.index({
    'title.ka': 'text',
    'title.en': 'text',
    'title.ru': 'text',
    'description.ka': 'text',
    'description.en': 'text',
    'description.ru': 'text'
});
//# sourceMappingURL=set.schema.js.map