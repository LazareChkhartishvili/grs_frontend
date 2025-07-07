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
exports.CommentSchema = exports.Comment = exports.CommentAuthor = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CommentAuthor = class CommentAuthor {
    name;
    email;
    avatar;
};
exports.CommentAuthor = CommentAuthor;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CommentAuthor.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CommentAuthor.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CommentAuthor.prototype, "avatar", void 0);
exports.CommentAuthor = CommentAuthor = __decorate([
    (0, mongoose_1.Schema)()
], CommentAuthor);
let Comment = class Comment {
    articleId;
    author;
    content;
    isApproved;
    parentCommentId;
    publishedAt;
};
exports.Comment = Comment;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Article', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Comment.prototype, "articleId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: CommentAuthor, required: true }),
    __metadata("design:type", CommentAuthor)
], Comment.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Comment.prototype, "isApproved", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Comment', default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Comment.prototype, "parentCommentId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Comment.prototype, "publishedAt", void 0);
exports.Comment = Comment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Comment);
exports.CommentSchema = mongoose_1.SchemaFactory.createForClass(Comment);
exports.CommentSchema.index({ articleId: 1 });
exports.CommentSchema.index({ isApproved: 1 });
exports.CommentSchema.index({ parentCommentId: 1 });
exports.CommentSchema.index({ publishedAt: -1 });
//# sourceMappingURL=comment.schema.js.map