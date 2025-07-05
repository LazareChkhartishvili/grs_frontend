import { AuthService } from './auth.service';
import { UserResponse } from '../schemas/user.schema';
interface LoginRequest {
    user: UserResponse;
}
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
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: LoginRequest): Promise<{
        token: string;
        user: UserResponse;
    }>;
    register(registrationData: RegistrationDto): Promise<{
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
            phone: string;
            location: string;
            image: string | undefined;
        };
    }>;
    sendVerificationCode({ email }: {
        email: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    verifyCode({ email, code }: {
        email: string;
        code: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    resendVerificationCode({ email }: {
        email: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
export {};
