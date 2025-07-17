import {
    RegisterUserRequest,
    RegisterUserResponse,
    ActivateUserRequest,
    ActivateUserResponse,
    CompleteProfileRequest,
    CompleteProfileResponse
} from '../../application/dtos/auth.dto';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export class AuthApiService {
    private async makeRequest<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;

        const defaultOptions: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, defaultOptions);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    async registerUser(data: RegisterUserRequest): Promise<RegisterUserResponse> {
        return this.makeRequest<RegisterUserResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async activateUser(userId: string, data: ActivateUserRequest): Promise<ActivateUserResponse> {
        return this.makeRequest<ActivateUserResponse>(`/auth/activate/${userId}`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async completeProfile(userId: string, data: CompleteProfileRequest): Promise<CompleteProfileResponse> {
        const formData = new FormData();
        formData.append('image', data.imageFile);

        return this.makeRequest<CompleteProfileResponse>(`/auth/complete-profile/${userId}`, {
            method: 'POST',
            headers: {}, // Remove Content-Type para FormData
            body: formData,
        });
    }

    async getUserImage(token: string): Promise<{
        success: boolean;
        imageUrl?: string;
        message?: string;
        error?: string;
    }> {
        return this.makeRequest<any>('/upload', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async processCharacterImage(token: string): Promise<{
        success: boolean;
        processedData?: {
            analysis: any;
            processedAt: string;
            imageUrl: string;
        };
        error?: string;
    }> {
        return this.makeRequest<any>(`/upload/process`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
} 