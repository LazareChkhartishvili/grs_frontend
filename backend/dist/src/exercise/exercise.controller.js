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
exports.ExerciseController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const exercise_service_1 = require("./exercise.service");
const streamifier = require("streamifier");
const multer_1 = require("multer");
const cloudinary_config_1 = require("../cloudinary.config");
let ExerciseController = class ExerciseController {
    constructor(exerciseService) {
        this.exerciseService = exerciseService;
    }
    async create(file, data) {
        console.log('--- [CONTROLLER] ---');
        console.log('file:', file);
        console.log('file instanceof File:', file instanceof File);
        console.log('file originalname:', file?.originalname);
        console.log('file buffer:', !!file?.buffer);
        console.log('body:', data);
        try {
            const parsedData = {
                ...data,
                name: JSON.parse(data.name),
                description: JSON.parse(data.description),
                recommendations: JSON.parse(data.recommendations),
            };
            if (!parsedData.name.ka || !parsedData.description.ka || !parsedData.recommendations.ka) {
                throw new common_1.BadRequestException('ქართული ენის ველები სავალდებულოა');
            }
            let videoUrl = '';
            let thumbnailUrl = '';
            const uploadToCloudinary = (file, resource_type) => {
                return new Promise((resolve, reject) => {
                    const uploadStream = cloudinary_config_1.default.uploader.upload_stream({ resource_type }, (error, result) => {
                        if (error)
                            return reject(error);
                        resolve(result.secure_url);
                    });
                    streamifier.createReadStream(file.buffer).pipe(uploadStream);
                });
            };
            if (!file || !file.buffer) {
                throw new common_1.BadRequestException('ფაილი სავალდებულოა და უნდა იყოს სწორი ტიპის');
            }
            if (file) {
                thumbnailUrl = await uploadToCloudinary(file, 'image');
                console.log('Cloudinary thumbnailUrl:', thumbnailUrl);
            }
            if (data.videoUrl) {
                videoUrl = typeof data.videoUrl === 'string' ? data.videoUrl.trim() : '';
            }
            if (data.thumbnailUrl && !thumbnailUrl) {
                thumbnailUrl = typeof data.thumbnailUrl === 'string' ? data.thumbnailUrl.trim() : '';
            }
            if (!thumbnailUrl) {
                throw new common_1.BadRequestException('სურათის ატვირთვა სავალდებულოა');
            }
            console.log('parsedData:', parsedData);
            console.log('videoUrl:', videoUrl);
            console.log('thumbnailUrl:', thumbnailUrl);
            const result = await this.exerciseService.create({
                ...parsedData,
                videoUrl,
                thumbnailUrl,
            });
            console.log('--- [CONTROLLER] Saved result:', result);
            return result;
        }
        catch (error) {
            console.error('❌ Backend error:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(error.message);
        }
    }
    findAll(query) {
        return this.exerciseService.findAll(query);
    }
    findBySet(setId) {
        return this.exerciseService.findBySet(setId);
    }
    findByCategory(categoryId) {
        return this.exerciseService.findByCategory(categoryId);
    }
    findPopular() {
        return this.exerciseService.findPopular();
    }
    findByDifficulty(difficulty) {
        return this.exerciseService.findByDifficulty(difficulty);
    }
    bulkSetPopular(body) {
        return this.exerciseService.bulkSetPopular(body.exerciseIds, body.isPopular);
    }
    setPopular(id, body) {
        console.log('🔥 setPopular called with:', { id, body });
        return this.exerciseService.setPopular(id, body.isPopular);
    }
    findOne(id) {
        return this.exerciseService.findOne(id);
    }
    async update(id, data, file) {
        try {
            const updateData = { ...data };
            if (data.name)
                updateData.name = JSON.parse(data.name);
            if (data.description)
                updateData.description = JSON.parse(data.description);
            if (data.recommendations)
                updateData.recommendations = JSON.parse(data.recommendations);
            if (file) {
                updateData.thumbnailUrl = file.path;
            }
            return this.exerciseService.update(id, updateData);
        }
        catch (error) {
            if (error.name === 'SyntaxError') {
                throw new common_1.BadRequestException('არასწორი JSON ფორმატი ლოკალიზებულ ველებში');
            }
            throw error;
        }
    }
    remove(id) {
        return this.exerciseService.remove(id);
    }
};
exports.ExerciseController = ExerciseController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExerciseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExerciseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('set/:setId'),
    __param(0, (0, common_1.Param)('setId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExerciseController.prototype, "findBySet", null);
__decorate([
    (0, common_1.Get)('category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExerciseController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)('popular'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExerciseController.prototype, "findPopular", null);
__decorate([
    (0, common_1.Get)('difficulty/:difficulty'),
    __param(0, (0, common_1.Param)('difficulty')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExerciseController.prototype, "findByDifficulty", null);
__decorate([
    (0, common_1.Patch)('bulk/popular'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExerciseController.prototype, "bulkSetPopular", null);
__decorate([
    (0, common_1.Patch)(':id/popular'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExerciseController.prototype, "setPopular", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExerciseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ExerciseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExerciseController.prototype, "remove", null);
exports.ExerciseController = ExerciseController = __decorate([
    (0, common_1.Controller)('exercises'),
    __metadata("design:paramtypes", [exercise_service_1.ExerciseService])
], ExerciseController);
//# sourceMappingURL=exercise.controller.js.map