"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const article_controller_1 = require("./article.controller");
const article_service_1 = require("./article.service");
const article_schema_1 = require("../schemas/article.schema");
const blog_schema_1 = require("../schemas/blog.schema");
let ArticleModule = class ArticleModule {
};
exports.ArticleModule = ArticleModule;
exports.ArticleModule = ArticleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: article_schema_1.Article.name, schema: article_schema_1.ArticleSchema },
                { name: blog_schema_1.Blog.name, schema: blog_schema_1.BlogSchema },
            ]),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.memoryStorage)(),
                fileFilter: (req, file, callback) => {
                    if (file.mimetype.startsWith('image/')) {
                        callback(null, true);
                    }
                    else {
                        callback(new Error('მხოლოდ სურათის ფაილებია დაშვებული'), false);
                    }
                },
                limits: {
                    fileSize: 10 * 1024 * 1024,
                    files: 10,
                },
            }),
        ],
        controllers: [article_controller_1.ArticleController],
        providers: [article_service_1.ArticleService],
        exports: [article_service_1.ArticleService],
    })
], ArticleModule);
//# sourceMappingURL=article.module.js.map