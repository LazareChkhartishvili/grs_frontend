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
let ExerciseController = class ExerciseController {
    constructor(exerciseService) {
        this.exerciseService = exerciseService;
    }
    async create(files, data) {
        try {
            console.log('Received data:', data);
            console.log('Video URL from request:', data.videoUrl);
            console.log('Video URL type:', typeof data.videoUrl);
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
            console.log('Processing video URL...');
            if (data.videoUrl) {
                if (Array.isArray(data.videoUrl)) {
                    videoUrl = data.videoUrl[0]?.trim() || '';
                    console.log('Video URL array found, using first URL:', videoUrl);
                }
                else if (typeof data.videoUrl === 'string' && data.videoUrl.trim()) {
                    videoUrl = data.videoUrl.trim();
                    console.log('Video URL string found:', videoUrl);
                }
                else {
                    console.log('Video URL validation failed:', 'exists:', !!data.videoUrl, 'is array:', Array.isArray(data.videoUrl), 'is string:', typeof data.videoUrl === 'string', 'has content:', data.videoUrl?.trim?.());
                }
            }
            if (data.thumbnailUrl) {
                if (Array.isArray(data.thumbnailUrl)) {
                    thumbnailUrl = data.thumbnailUrl[0]?.trim() || '';
                    console.log('Thumbnail URL array found, using first URL:', thumbnailUrl);
                }
                else if (typeof data.thumbnailUrl === 'string' && data.thumbnailUrl.trim()) {
                    thumbnailUrl = data.thumbnailUrl.trim();
                    console.log('Thumbnail URL string found:', thumbnailUrl);
                }
                else {
                    console.log('Thumbnail URL validation failed:', 'exists:', !!data.thumbnailUrl, 'is array:', Array.isArray(data.thumbnailUrl), 'is string:', typeof data.thumbnailUrl === 'string', 'has content:', data.thumbnailUrl?.trim?.());
                }
            }
            if (files && files.length > 0) {
                console.log('Processing files:', files.length, 'files found');
                const videoFile = files.find(f => f.mimetype.startsWith('video/'));
                const imageFile = files.find(f => f.mimetype.startsWith('image/'));
                if (videoFile) {
                    videoUrl = videoFile.path;
                    console.log('Video file found, using path:', videoUrl);
                }
                if (imageFile) {
                    thumbnailUrl = imageFile.path;
                }
            }
            if (!videoUrl) {
                console.log('Final video URL check failed - videoUrl is empty');
                throw new common_1.BadRequestException('ვიდეოს URL ან ფაილი სავალდებულოა');
            }
            if (!thumbnailUrl) {
                throw new common_1.BadRequestException('სურათის URL ან ფაილი სავალდებულოა');
            }
            return await this.exerciseService.create({
                ...parsedData,
                videoUrl,
                thumbnailUrl,
            });
        }
        catch (error) {
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
    findByDifficulty(difficulty) {
        return this.exerciseService.findByDifficulty(difficulty);
    }
    findOne(id) {
        return this.exerciseService.findOne(id);
    }
    async update(id, data, files) {
        try {
            const updateData = { ...data };
            if (data.name)
                updateData.name = JSON.parse(data.name);
            if (data.description)
                updateData.description = JSON.parse(data.description);
            if (data.recommendations)
                updateData.recommendations = JSON.parse(data.recommendations);
            if (files && files.length > 0) {
                const videoFile = files.find(f => f.mimetype.startsWith('video/'));
                const imageFile = files.find(f => f.mimetype.startsWith('image/'));
                if (videoFile) {
                    updateData.videoUrl = videoFile.path;
                }
                if (imageFile) {
                    updateData.thumbnailUrl = imageFile.path;
                }
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
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
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
    (0, common_1.Get)('difficulty/:difficulty'),
    __param(0, (0, common_1.Param)('difficulty')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExerciseController.prototype, "findByDifficulty", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExerciseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
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