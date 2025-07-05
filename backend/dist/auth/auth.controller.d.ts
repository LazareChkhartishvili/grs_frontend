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
    login(req: LoginRequest): unknown;
    register(registrationData: RegistrationDto): unknown;
    sendVerificationCode({ email }: {
        email: string;
    }): unknown;
    verifyCode({ email, code }: {
        email: string;
        code: string;
    }): unknown;
    resendVerificationCode({ email }: {
        email: string;
    }): unknown;
}
export {};
