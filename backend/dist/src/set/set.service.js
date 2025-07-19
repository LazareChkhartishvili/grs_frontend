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
exports.SetService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const set_schema_1 = require("../schemas/set.schema");
let SetService = class SetService {
    constructor(setModel) {
        this.setModel = setModel;
    }
    async create(createSetDto) {
        const setData = {
            ...createSetDto,
            levels: {
                beginner: { exerciseCount: 0, isLocked: false, ...createSetDto.levels?.beginner },
                intermediate: { exerciseCount: 0, isLocked: true, ...createSetDto.levels?.intermediate },
                advanced: { exerciseCount: 0, isLocked: true, ...createSetDto.levels?.advanced }
            },
            isActive: createSetDto.isActive ?? true,
            isPublished: createSetDto.isPublished ?? false,
            sortOrder: createSetDto.sortOrder ?? 0,
            categoryId: new mongoose_2.Types.ObjectId(createSetDto.categoryId),
            subCategoryId: createSetDto.subCategoryId ? new mongoose_2.Types.ObjectId(createSetDto.subCategoryId) : undefined
        };
        const set = new this.setModel(setData);
        return set.save();
    }
    async update(id, updateSetDto) {
        const updateData = { ...updateSetDto };
        if (updateData.categoryId) {
            updateData.categoryId = new mongoose_2.Types.ObjectId(updateData.categoryId);
        }
        if (updateData.subCategoryId) {
            updateData.subCategoryId = new mongoose_2.Types.ObjectId(updateData.subCategoryId);
        }
        const updatedSet = await this.setModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .populate('category')
            .populate('subcategory')
            .exec();
        if (!updatedSet) {
            throw new common_1.NotFoundException(`Set with ID "${id}" not found`);
        }
        return updatedSet;
    }
    async findAll(query) {
        const filter = { isActive: true };
        if (query.categoryId) {
            filter.categoryId = new mongoose_2.Types.ObjectId(query.categoryId);
        }
        if (query.subCategoryId) {
            filter.subCategoryId = new mongoose_2.Types.ObjectId(query.subCategoryId);
        }
        return this.setModel
            .find(filter)
            .populate('category')
            .populate('subcategory')
            .sort({ sortOrder: 1 })
            .exec();
    }
    async findOne(id) {
        return this.setModel
            .findById(id)
            .populate('category')
            .populate('subcategory')
            .exec();
    }
};
exports.SetService = SetService;
exports.SetService = SetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(set_schema_1.Set.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SetService);
//# sourceMappingURL=set.service.js.map