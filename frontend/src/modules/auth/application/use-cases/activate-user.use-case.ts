import { AuthApiService } from '../../infrastructure/services/auth-api.service';
import {
    ActivateUserRequest,
    ActivateUserResponse
} from '../dtos/auth.dto';

export class ActivateUserUseCase {
    constructor(private readonly authApiService: AuthApiService) { }

    async execute(userId: string, request: ActivateUserRequest): Promise<ActivateUserResponse> {
        try {
            // Validações básicas
            this.validateRequest(request);

            // Chamada para a API
            const response = await this.authApiService.activateUser(userId, request);

            return response;
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to activate user'
            };
        }
    }

    private validateRequest(request: ActivateUserRequest): void {
        if (!request.activationCode || request.activationCode.length !== 6) {
            throw new Error('Activation code must be 6 digits');
        }

        if (!/^\d{6}$/.test(request.activationCode)) {
            throw new Error('Activation code must contain only digits');
        }
    }
} 