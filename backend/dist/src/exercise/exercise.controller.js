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
        this.uploadToCloudinary = (file, resource_type) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary_config_1.default.uploader.upload_stream({ resource_type }, (error, result) => {
                    if (error)
                        return reject(error);
                    resolve(result.secure_url);
                });
                streamifier.createReadStream(file.buffer).pipe(uploadStream);
            });
        };
    }
    async create(files, data) {
        console.log('--- [CONTROLLER] Create Exercise ---');
        console.log('Files received:', files?.length);
        console.log('Body:', data);
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
            if (data.videoUrl) {
                videoUrl = data.videoUrl.trim();
            }
            if (data.thumbnailUrl) {
                thumbnailUrl = data.thumbnailUrl.trim();
            }
            if (files && files.length > 0) {
                for (const file of files) {
                    const isVideo = file.mimetype.startsWith('video/');
                    try {
                        const uploadedUrl = await this.uploadToCloudinary(file, isVideo ? 'video' : 'image');
                        if (isVideo) {
                            videoUrl = uploadedUrl;
                        }
                        else {
                            thumbnailUrl = uploadedUrl;
                        }
                    }
                    catch (error) {
                        console.error(`Error uploading ${isVideo ? 'video' : 'image'} to Cloudinary:`, error);
                        throw new common_1.BadRequestException(`Failed to upload ${isVideo ? 'video' : 'image'}`);
                    }
                }
            }
            if (!thumbnailUrl) {
                throw new common_1.BadRequestException('სურათის ატვირთვა ან URL მითითება სავალდებულოა');
            }
            if (!videoUrl) {
                throw new common_1.BadRequestException('ვიდეოს ატვირთვა ან URL მითითება სავალდებულოა');
            }
            console.log('Final data:', {
                ...parsedData,
                videoUrl,
                thumbnailUrl,
            });
            const result = await this.exerciseService.create({
                ...parsedData,
                videoUrl,
                thumbnailUrl,
            });
            console.log('Exercise created successfully:', result);
            return result;
        }
        catch (error) {
            console.error('❌ Error creating exercise:', error);
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
    async update(id, data, files) {
        try {
            console.log('--- [CONTROLLER] Update Exercise ---');
            console.log('Files received:', files?.length);
            console.log('Body:', data);
            const updateData = { ...data };
            if (data.name)
                updateData.name = JSON.parse(data.name);
            if (data.description)
                updateData.description = JSON.parse(data.description);
            if (data.recommendations)
                updateData.recommendations = JSON.parse(data.recommendations);
            if (data.videoUrl) {
                updateData.videoUrl = data.videoUrl.trim();
            }
            if (data.thumbnailUrl) {
                updateData.thumbnailUrl = data.thumbnailUrl.trim();
            }
            if (files && files.length > 0) {
                for (const file of files) {
                    const isVideo = file.mimetype.startsWith('video/');
                    try {
                        const uploadedUrl = await this.uploadToCloudinary(file, isVideo ? 'video' : 'image');
                        if (isVideo) {
                            updateData.videoUrl = uploadedUrl;
                        }
                        else {
                            updateData.thumbnailUrl = uploadedUrl;
                        }
                    }
                    catch (error) {
                        console.error(`Error uploading ${isVideo ? 'video' : 'image'} to Cloudinary:`, error);
                        throw new common_1.BadRequestException(`Failed to upload ${isVideo ? 'video' : 'image'}`);
                    }
                }
            }
            console.log('Final update data:', updateData);
            return this.exerciseService.update(id, updateData);
        }
        catch (error) {
            console.error('❌ Error updating exercise:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(error.message);
        }
    }
    remove(id) {
        return this.exerciseService.remove(id);
    }
};
exports.ExerciseController = ExerciseController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file', 2, { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
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
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file', 2, { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Array]),
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