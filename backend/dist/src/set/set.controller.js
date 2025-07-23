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
exports.SetController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const set_service_1 = require("./set.service");
const cloudinary_config_1 = require("../cloudinary.config");
const streamifier = require("streamifier");
let SetController = class SetController {
    constructor(setService) {
        this.setService = setService;
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
    async create(file, createSetDto) {
        console.log('🏗️ Set creation started');
        console.log('📁 File received:', {
            originalname: file?.originalname,
            mimetype: file?.mimetype,
            size: file?.size,
            hasBuffer: !!file?.buffer
        });
        console.log('📄 Body received:', createSetDto);
        try {
            const parsedData = {
                ...createSetDto,
                name: JSON.parse(createSetDto.name),
                description: JSON.parse(createSetDto.description),
                levels: createSetDto.levels ? JSON.parse(createSetDto.levels) : undefined,
                price: createSetDto.price ? JSON.parse(createSetDto.price) : undefined,
            };
            console.log('📝 Parsed data:', parsedData);
            if (!parsedData.name.ka || !parsedData.description.ka) {
                throw new common_1.BadRequestException('ქართული ენის ველები სავალდებულოა');
            }
            let thumbnailImage = '';
            if (file && file.buffer) {
                console.log('⬆️ Uploading file to Cloudinary...');
                thumbnailImage = await this.uploadToCloudinary(file, 'image');
                console.log('✅ Cloudinary upload successful:', thumbnailImage);
            }
            else if (createSetDto.thumbnailImage) {
                console.log('🔗 Using provided image URL:', createSetDto.thumbnailImage);
                thumbnailImage = createSetDto.thumbnailImage;
            }
            if (!thumbnailImage) {
                throw new common_1.BadRequestException('სურათის ატვირთვა სავალდებულოა');
            }
            console.log('💾 Creating set with thumbnail:', thumbnailImage);
            const result = await this.setService.create({
                ...parsedData,
                thumbnailImage,
            });
            console.log('✅ Set created successfully:', result.name?.ka || 'Set');
            return result;
        }
        catch (error) {
            console.error('❌ Set creation error:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(error.message);
        }
    }
    async update(id, updateSetDto, file) {
        console.log('🔄 Set update started');
        console.log('📁 File received:', {
            originalname: file?.originalname,
            mimetype: file?.mimetype,
            size: file?.size,
            hasBuffer: !!file?.buffer
        });
        console.log('📄 Body received:', updateSetDto);
        try {
            const parsedData = { ...updateSetDto };
            if (updateSetDto.name)
                parsedData.name = JSON.parse(updateSetDto.name);
            if (updateSetDto.description)
                parsedData.description = JSON.parse(updateSetDto.description);
            if (updateSetDto.levels)
                parsedData.levels = JSON.parse(updateSetDto.levels);
            if (updateSetDto.price)
                parsedData.price = JSON.parse(updateSetDto.price);
            console.log('📝 Parsed data:', parsedData);
            let thumbnailImage = updateSetDto.thumbnailImage;
            if (file && file.buffer) {
                console.log('⬆️ Uploading file to Cloudinary...');
                thumbnailImage = await this.uploadToCloudinary(file, 'image');
                console.log('✅ Cloudinary upload successful:', thumbnailImage);
            }
            console.log('💾 Updating set with thumbnail:', thumbnailImage);
            const result = await this.setService.update(id, {
                ...parsedData,
                thumbnailImage,
            });
            console.log('✅ Set updated successfully:', result.name?.ka || 'Set');
            return result;
        }
        catch (error) {
            console.error('❌ Set update error:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(error.message);
        }
    }
    findAll(query) {
        return this.setService.findAll(query);
    }
    findOne(id) {
        return this.setService.findOne(id);
    }
    remove(id) {
        return this.setService.remove(id);
    }
};
exports.SetController = SetController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SetController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SetController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SetController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SetController.prototype, "remove", null);
exports.SetController = SetController = __decorate([
    (0, common_1.Controller)('sets'),
    __metadata("design:paramtypes", [set_service_1.SetService])
], SetController);
//# sourceMappingURL=set.controller.js.map