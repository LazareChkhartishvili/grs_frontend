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
exports.ArticleSchema = exports.Article = exports.Author = exports.TableOfContentItem = exports.LocalizedString = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let LocalizedString = class LocalizedString {
};
exports.LocalizedString = LocalizedString;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LocalizedString.prototype, "ka", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], LocalizedString.prototype, "en", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], LocalizedString.prototype, "ru", void 0);
exports.LocalizedString = LocalizedString = __decorate([
    (0, mongoose_1.Schema)()
], LocalizedString);
let TableOfContentItem = class TableOfContentItem {
};
exports.TableOfContentItem = TableOfContentItem;
__decorate([
    (0, mongoose_1.Prop)({ type: LocalizedString, required: true }),
    __metadata("design:type", LocalizedString)
], TableOfContentItem.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TableOfContentItem.prototype, "anchor", void 0);
exports.TableOfContentItem = TableOfContentItem = __decorate([
    (0, mongoose_1.Schema)()
], TableOfContentItem);
let Author = class Author {
};
exports.Author = Author;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Author.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Author.prototype, "bio", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Author.prototype, "avatar", void 0);
exports.Author = Author = __decorate([
    (0, mongoose_1.Schema)()
], Author);
let Article = class Article {
};
exports.Article = Article;
__decorate([
    (0, mongoose_1.Prop)({ type: LocalizedString, required: true }),
    __metadata("design:type", LocalizedString)
], Article.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, unique: true, sparse: true }),
    __metadata("design:type", String)
], Article.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: LocalizedString, required: true }),
    __metadata("design:type", LocalizedString)
], Article.prototype, "excerpt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: LocalizedString, required: true }),
    __metadata("design:type", LocalizedString)
], Article.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Blog', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Article.prototype, "blogId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Category', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Article.prototype, "categoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Article.prototype, "featuredImages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Author, required: true }),
    __metadata("design:type", Author)
], Article.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Article.prototype, "readTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Article.prototype, "commentsCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [TableOfContentItem], default: [] }),
    __metadata("design:type", Array)
], Article.prototype, "tableOfContents", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Article.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Article.prototype, "isPublished", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Article.prototype, "isFeatured", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Article.prototype, "publishDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Article.prototype, "viewsCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Article.prototype, "likesCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Article.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Article.prototype, "sortOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Comment' }] }),
    __metadata("design:type", Array)
], Article.prototype, "comments", void 0);
exports.Article = Article = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Article);
exports.ArticleSchema = mongoose_1.SchemaFactory.createForClass(Article);
//# sourceMappingURL=article.schema.js.map