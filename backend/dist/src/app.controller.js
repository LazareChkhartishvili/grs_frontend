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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
let AppController = class AppController {
    constructor(appService, userModel) {
        this.appService = appService;
        this.userModel = userModel;
    }
    getHello() {
        return this.appService.getHello();
    }
    getTest() {
        return {
            message: 'GRS Backend is working!',
            timestamp: new Date().toISOString(),
            endpoints: {
                courses: '/api/courses',
                categories: '/api/categories',
                courseCategories: '/api/course-categories',
                exercises: '/api/exercises',
                exerciseComplexes: '/api/exercise-complexes',
                subcategories: '/api/subcategories',
                articles: '/api/articles',
                videos: '/api/videos',
                users: '/api/users',
                sets: '/api/sets',
            },
        };
    }
    async getUsersCount() {
        try {
            const count = await this.userModel.countDocuments();
            const users = await this.userModel.find().select('name email createdAt').limit(5);
            return {
                count,
                users: users.map(user => ({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt
                }))
            };
        }
        catch (error) {
            return { error: error.message };
        }
    }
    seedData() {
        return {
            message: 'Use individual endpoints to create test data',
            examples: {
                category: 'POST /api/categories',
                course: 'POST /api/courses',
                exercise: 'POST /api/exercises',
                subcategory: 'POST /api/subcategories',
                article: 'POST /api/articles',
                video: 'POST /api/videos',
                user: 'POST /api/users',
                set: 'POST /api/sets',
            },
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getTest", null);
__decorate([
    (0, common_1.Get)('users-count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getUsersCount", null);
__decorate([
    (0, common_1.Post)('seed-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "seedData", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [app_service_1.AppService,
        mongoose_2.Model])
], AppController);
//# sourceMappingURL=app.controller.js.map