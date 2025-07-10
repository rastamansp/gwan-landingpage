import { AuthApiService } from '../../infrastructure/services/auth-api.service';
import {
    RegisterUserRequest,
    RegisterUserResponse
} from '../dtos/auth.dto';

export class RegisterUserUseCase {
    constructor(private readonly authApiService: AuthApiService) { }

    async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
        try {
            // Validações básicas
            this.validateRequest(request);

            // Chamada para a API
            const response = await this.authApiService.registerUser(request);

            return response;
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to register user'
            };
        }
    }

    private validateRequest(request: RegisterUserRequest): void {
        if (!request.name || request.name.trim().length < 2) {
            throw new Error('Name must be at least 2 characters long');
        }

        if (!request.email || !this.isValidEmail(request.email)) {
            throw new Error('Invalid email format');
        }

        if (!request.phone || !this.isValidPhone(request.phone)) {
            throw new Error('Invalid phone format');
        }
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private isValidPhone(phone: string): boolean {
        const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
        return phoneRegex.test(phone);
    }
} 