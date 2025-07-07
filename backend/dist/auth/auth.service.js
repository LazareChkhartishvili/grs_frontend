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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const user_schema_1 = require("../schemas/user.schema");
let AuthService = class AuthService {
    userModel;
    jwtService;
    verificationCodes = new Map();
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    async verifyCode(email, code, deleteIfValid = false) {
        const verificationData = this.verificationCodes.get(email);
        if (!verificationData) {
            return false;
        }
        if (verificationData.expiresAt < new Date()) {
            this.verificationCodes.delete(email);
            return false;
        }
        if (verificationData.code !== code) {
            return false;
        }
        if (deleteIfValid) {
            this.verificationCodes.delete(email);
        }
        return true;
    }
    async sendVerificationCode(email) {
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new common_1.UnauthorizedException('მომხმარებელი ამ ელ-ფოსტით უკვე არსებობს');
        }
        const code = this.generateVerificationCode();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        this.verificationCodes.set(email, {
            email,
            code,
            expiresAt,
        });
        console.log(`Verification code for ${email}: ${code}`);
        return {
            success: true,
            message: 'ვერიფიკაციის კოდი გაიგზავნა ელ-ფოსტაზე',
        };
    }
    async resendVerificationCode(email) {
        return this.sendVerificationCode(email);
    }
    async verifyEmailCode(email, code) {
        const isValid = await this.verifyCode(email, code);
        if (!isValid) {
            throw new common_1.UnauthorizedException('არასწორი ან ვადაგასული კოდი');
        }
        return {
            success: true,
            message: 'კოდი წარმატებით დადასტურდა',
        };
    }
    async validateUser(email, password) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('არასწორი ელ-ფოსტა ან პაროლი');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('არასწორი ელ-ფოსტა ან პაროლი');
        }
        const { password: _, ...result } = user.toObject();
        return {
            id: result._id?.toString() || '',
            name: result.name,
            email: result.email,
            phone: result.phone,
            location: result.location,
            image: result.image,
        };
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id };
        const token = await this.jwtService.sign(payload);
        return {
            token,
            user,
        };
    }
    async register(registrationData) {
        const existingUser = await this.userModel.findOne({
            email: registrationData.email,
        });
        if (existingUser) {
            throw new common_1.UnauthorizedException('მომხმარებელი ამ ელ-ფოსტით უკვე არსებობს');
        }
        if (!registrationData.verificationCode ||
            !(await this.verifyCode(registrationData.email, registrationData.verificationCode, true))) {
            throw new common_1.UnauthorizedException('არასწორი ვერიფიკაციის კოდი');
        }
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        const newUser = new this.userModel({
            email: registrationData.email,
            password: hashedPassword,
            name: registrationData.name,
            phone: registrationData.phone,
            location: registrationData.location,
            diseases: registrationData.diseases,
            additionalInfo: registrationData.additionalInfo,
        });
        const savedUser = await newUser.save();
        const { password, ...result } = savedUser.toObject();
        return {
            token: this.jwtService.sign({
                email: result.email,
                sub: result._id?.toString() || '',
            }),
            user: {
                id: result._id?.toString() || '',
                name: result.name,
                email: result.email,
                phone: result.phone,
                location: result.location,
                image: result.image,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map