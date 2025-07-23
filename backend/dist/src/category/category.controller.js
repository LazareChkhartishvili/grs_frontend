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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const category_service_1 = require("./category.service");
const cloudinary_config_1 = require("../cloudinary.config");
const streamifier = require("streamifier");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
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
    async create(file, createCategoryDto) {
        console.log('🏗️ Category creation started');
        console.log('📁 File received:', {
            originalname: file?.originalname,
            mimetype: file?.mimetype,
            size: file?.size,
            hasBuffer: !!file?.buffer
        });
        console.log('📄 Body received:', createCategoryDto);
        try {
            const parsedData = {
                ...createCategoryDto,
                name: JSON.parse(createCategoryDto.name),
                description: createCategoryDto.description ? JSON.parse(createCategoryDto.description) : undefined,
            };
            console.log('📝 Parsed data:', parsedData);
            if (!parsedData.name.ka) {
                throw new common_1.BadRequestException('ქართული ენის ველები სავალდებულოა');
            }
            let imageUrl = '';
            if (file && file.buffer) {
                console.log('⬆️ Uploading file to Cloudinary...');
                imageUrl = await this.uploadToCloudinary(file, 'image');
                console.log('✅ Cloudinary upload successful:', imageUrl);
            }
            else if (createCategoryDto.image) {
                console.log('🔗 Using provided image URL:', createCategoryDto.image);
                imageUrl = createCategoryDto.image;
            }
            if (!imageUrl) {
                throw new common_1.BadRequestException('სურათის ატვირთვა სავალდებულოა');
            }
            console.log('💾 Creating category with image URL:', imageUrl);
            const result = await this.categoryService.create({
                ...parsedData,
                image: imageUrl,
            });
            console.log('✅ Category created successfully:', result.name?.ka || 'Category');
            return result;
        }
        catch (error) {
            console.error('❌ Category creation error:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(error.message);
        }
    }
    findAll() {
        return this.categoryService.findAll();
    }
    findOne(id) {
        return this.categoryService.findOne(id);
    }
    getCategorySets(id) {
        return this.categoryService.getCategorySets(id);
    }
    getCategoryComplete(id) {
        return this.categoryService.getCategoryComplete(id);
    }
    async update(id, updateCategoryDto, file) {
        try {
            const parsedData = { ...updateCategoryDto };
            if (updateCategoryDto.name)
                parsedData.name = JSON.parse(updateCategoryDto.name);
            if (updateCategoryDto.description)
                parsedData.description = JSON.parse(updateCategoryDto.description);
            let imageUrl = updateCategoryDto.image;
            if (file) {
                imageUrl = await this.uploadToCloudinary(file, 'image');
            }
            const result = await this.categoryService.update(id, {
                ...parsedData,
                image: imageUrl,
            });
            return result;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(error.message);
        }
    }
    remove(id) {
        return this.categoryService.remove(id);
    }
    addSubcategory(id, subcategoryId) {
        return this.categoryService.addSubcategory(id, subcategoryId);
    }
    removeSubcategory(id, subcategoryId) {
        return this.categoryService.removeSubcategory(id, subcategoryId);
    }
    getSubcategories(id) {
        return this.categoryService.getSubcategories(id);
    }
    getSubCategoryById(categoryId, subCategoryId) {
        return this.categoryService.getSubCategoryById(categoryId, subCategoryId);
    }
    async updateSubCategory(categoryId, subCategoryId, updateCategoryDto, file) {
        console.log('🔄 Subcategory update started');
        console.log('📁 File received:', {
            originalname: file?.originalname,
            mimetype: file?.mimetype,
            size: file?.size,
            hasBuffer: !!file?.buffer
        });
        console.log('📄 Body received:', updateCategoryDto);
        try {
            const parsedData = { ...updateCategoryDto };
            if (updateCategoryDto.name)
                parsedData.name = JSON.parse(updateCategoryDto.name);
            if (updateCategoryDto.description)
                parsedData.description = JSON.parse(updateCategoryDto.description);
            console.log('📝 Parsed data:', parsedData);
            let imageUrl = updateCategoryDto.image;
            if (file && file.buffer) {
                console.log('⬆️ Uploading file to Cloudinary...');
                imageUrl = await this.uploadToCloudinary(file, 'image');
                console.log('✅ Cloudinary upload successful:', imageUrl);
            }
            console.log('💾 Updating subcategory with image URL:', imageUrl);
            const result = await this.categoryService.updateSubCategory(categoryId, subCategoryId, {
                ...parsedData,
                image: imageUrl,
            });
            console.log('✅ Subcategory updated successfully:', result.name?.ka || 'Subcategory');
            return result;
        }
        catch (error) {
            console.error('❌ Subcategory update error:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(error.message);
        }
    }
    getSubCategorySets(categoryId, subCategoryId) {
        return this.categoryService.getSubCategorySets(categoryId, subCategoryId);
    }
    async createSubcategory(parentId, file, createCategoryDto) {
        console.log('🏗️ Subcategory creation started');
        console.log('📁 File received:', {
            originalname: file?.originalname,
            mimetype: file?.mimetype,
            size: file?.size,
            hasBuffer: !!file?.buffer
        });
        console.log('📄 Body received:', createCategoryDto);
        try {
            const parsedData = {
                ...createCategoryDto,
                name: JSON.parse(createCategoryDto.name),
                description: createCategoryDto.description ? JSON.parse(createCategoryDto.description) : undefined,
            };
            console.log('📝 Parsed data:', parsedData);
            if (!parsedData.name.ka) {
                throw new common_1.BadRequestException('ქართული ენის ველები სავალდებულოა');
            }
            let imageUrl = '';
            if (file && file.buffer) {
                console.log('⬆️ Uploading file to Cloudinary...');
                imageUrl = await this.uploadToCloudinary(file, 'image');
                console.log('✅ Cloudinary upload successful:', imageUrl);
            }
            else if (createCategoryDto.image) {
                console.log('🔗 Using provided image URL:', createCategoryDto.image);
                imageUrl = createCategoryDto.image;
            }
            if (!imageUrl) {
                throw new common_1.BadRequestException('სურათის ატვირთვა სავალდებულოა');
            }
            console.log('💾 Creating subcategory with image URL:', imageUrl);
            const result = await this.categoryService.createSubcategory(parentId, {
                ...parsedData,
                image: imageUrl,
            });
            console.log('✅ Subcategory created successfully:', result.name?.ka || 'Subcategory');
            return result;
        }
        catch (error) {
            console.error('❌ Subcategory creation error:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(error.message);
        }
    }
    addSet(id, setId) {
        return this.categoryService.addSet(id, setId);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/sets'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getCategorySets", null);
__decorate([
    (0, common_1.Get)(':id/complete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getCategoryComplete", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/subcategories/:subcategoryId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('subcategoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "addSubcategory", null);
__decorate([
    (0, common_1.Delete)(':id/subcategories/:subcategoryId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('subcategoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "removeSubcategory", null);
__decorate([
    (0, common_1.Get)(':id/subcategories'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getSubcategories", null);
__decorate([
    (0, common_1.Get)(':id/subcategories/:subcategoryId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('subcategoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getSubCategoryById", null);
__decorate([
    (0, common_1.Patch)(':categoryId/subcategories/:subCategoryId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('categoryId')),
    __param(1, (0, common_1.Param)('subCategoryId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateSubCategory", null);
__decorate([
    (0, common_1.Get)(':id/subcategories/:subcategoryId/sets'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('subcategoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getSubCategorySets", null);
__decorate([
    (0, common_1.Post)(':id/subcategories'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createSubcategory", null);
__decorate([
    (0, common_1.Post)(':id/sets/:setId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('setId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "addSet", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map