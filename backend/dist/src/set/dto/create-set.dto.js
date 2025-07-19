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
exports.CreateSetDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class LocalizedStringDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocalizedStringDto.prototype, "ka", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocalizedStringDto.prototype, "en", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LocalizedStringDto.prototype, "ru", void 0);
class LevelDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LevelDto.prototype, "exerciseCount", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], LevelDto.prototype, "isLocked", void 0);
class LevelsDto {
}
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LevelDto),
    __metadata("design:type", LevelDto)
], LevelsDto.prototype, "beginner", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LevelDto),
    __metadata("design:type", LevelDto)
], LevelsDto.prototype, "intermediate", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LevelDto),
    __metadata("design:type", LevelDto)
], LevelsDto.prototype, "advanced", void 0);
class PriceDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PriceDto.prototype, "monthly", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PriceDto.prototype, "threeMonths", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PriceDto.prototype, "sixMonths", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PriceDto.prototype, "yearly", void 0);
class CreateSetDto {
}
exports.CreateSetDto = CreateSetDto;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LocalizedStringDto),
    __metadata("design:type", LocalizedStringDto)
], CreateSetDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LocalizedStringDto),
    __metadata("design:type", LocalizedStringDto)
], CreateSetDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSetDto.prototype, "thumbnailImage", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSetDto.prototype, "totalExercises", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSetDto.prototype, "totalDuration", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSetDto.prototype, "difficultyLevels", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LevelsDto),
    __metadata("design:type", LevelsDto)
], CreateSetDto.prototype, "levels", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PriceDto),
    __metadata("design:type", PriceDto)
], CreateSetDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSetDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSetDto.prototype, "isPublished", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSetDto.prototype, "sortOrder", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateSetDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateSetDto.prototype, "subCategoryId", void 0);
//# sourceMappingURL=create-set.dto.js.map