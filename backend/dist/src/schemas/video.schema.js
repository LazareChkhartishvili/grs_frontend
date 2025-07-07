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
exports.VideoSchema = exports.Video = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Video = class Video {
    _id;
    name;
    categoryCode;
    categoryId;
    setId;
    url;
    sequence;
    resolution;
    format;
    fileSize;
    duration;
    isActive;
    title;
    description;
    thumbnailUrl;
    tags;
    transcript;
    viewsCount;
    likesCount;
    mimeType;
    isPublic;
    isProcessed;
    sortOrder;
};
exports.Video = Video;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, auto: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Video.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Video.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Video.prototype, "categoryCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Category' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Video.prototype, "categoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Video.prototype, "setId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Video.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Video.prototype, "sequence", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '1080p' }),
    __metadata("design:type", String)
], Video.prototype, "resolution", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'm4v' }),
    __metadata("design:type", String)
], Video.prototype, "format", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: null }),
    __metadata("design:type", Number)
], Video.prototype, "fileSize", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: null }),
    __metadata("design:type", Number)
], Video.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Video.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Video.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Video.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Video.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Video.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Video.prototype, "transcript", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Video.prototype, "viewsCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Video.prototype, "likesCount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Video.prototype, "mimeType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Video.prototype, "isPublic", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Video.prototype, "isProcessed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Video.prototype, "sortOrder", void 0);
exports.Video = Video = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'videos' })
], Video);
exports.VideoSchema = mongoose_1.SchemaFactory.createForClass(Video);
exports.VideoSchema.index({ categoryCode: 1 });
exports.VideoSchema.index({ setId: 1 });
exports.VideoSchema.index({ sequence: 1 });
exports.VideoSchema.index({ resolution: 1 });
exports.VideoSchema.index({ format: 1 });
exports.VideoSchema.index({ isActive: 1 });
exports.VideoSchema.index({
    name: 'text',
    sequence: 'text',
    url: 'text',
    title: 'text',
    description: 'text',
});
//# sourceMappingURL=video.schema.js.map