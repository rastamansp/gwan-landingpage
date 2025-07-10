import { AuthApiService } from '../../infrastructure/services/auth-api.service';
import {
    CompleteProfileRequest,
    CompleteProfileResponse
} from '../dtos/auth.dto';

export class CompleteProfileUseCase {
    constructor(private readonly authApiService: AuthApiService) { }

    async execute(userId: string, request: CompleteProfileRequest): Promise<CompleteProfileResponse> {
        try {
            // Validações básicas
            this.validateRequest(request);

            // Chamada para a API
            const response = await this.authApiService.completeProfile(userId, request);

            return response;
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to complete profile'
            };
        }
    }

    private validateRequest(request: CompleteProfileRequest): void {
        if (!request.imageFile) {
            throw new Error('Image file is required');
        }

        // Validar tipo de arquivo
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(request.imageFile.type)) {
            throw new Error('Invalid file type. Only JPEG, PNG and GIF are allowed');
        }

        // Validar tamanho do arquivo (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (request.imageFile.size > maxSize) {
            throw new Error('File size too large. Maximum size is 5MB');
        }
    }
} 