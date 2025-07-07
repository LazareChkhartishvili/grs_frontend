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
exports.InstructorController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
let InstructorController = class InstructorController {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getInstructorsForDropdown() {
        const instructors = await this.userModel
            .find({
            role: 'instructor',
            isActive: true,
        })
            .select('name email')
            .sort({ name: 1 });
        return instructors.map((instructor) => ({
            id: String(instructor._id),
            name: instructor.name,
            email: instructor.email,
        }));
    }
    async getAllInstructors() {
        return this.userModel
            .find({
            role: 'instructor',
            isActive: true,
        })
            .select('name email bio avatar expertise experience education certifications')
            .sort({ name: 1 });
    }
    async createInstructor(instructorData) {
        const instructor = new this.userModel({
            ...instructorData,
            role: 'instructor',
            isActive: true,
        });
        return instructor.save();
    }
};
exports.InstructorController = InstructorController;
__decorate([
    (0, common_1.Get)('dropdown'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "getInstructorsForDropdown", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "getAllInstructors", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "createInstructor", null);
exports.InstructorController = InstructorController = __decorate([
    (0, common_1.Controller)('instructors'),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], InstructorController);
//# sourceMappingURL=user.controller.js.map