import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserDocument, UserResponse } from '../schemas/user.schema';
interface RegistrationDto {
    email: string;
    password: string;
    name: string;
    phone: string;
    location: string;
    diseases?: string[];
    additionalInfo?: string;
    verificationCode?: string;
}
export declare class AuthService {
    private userModel;
    private jwtService;
    private verificationCodes;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    private generateVerificationCode;
    private verifyCode;
    sendVerificationCode(email: string): Promise<{
        success: boolean;
        message: string;
    }>;
    resendVerificationCode(email: string): Promise<{
        success: boolean;
        message: string;
    }>;
    verifyEmailCode(email: string, code: string): Promise<{
        success: boolean;
        message: string;
    }>;
    validateUser(email: string, password: string): Promise<UserResponse>;
    login(user: UserResponse): Promise<{
        token: string;
        user: UserResponse;
    }>;
    register(registrationData: RegistrationDto): Promise<{
        token: string;
        user: {
            id: any;
            name: string;
            email: string;
            phone: string;
            location: string;
            image: string;
        };
    }>;
}
export {};
