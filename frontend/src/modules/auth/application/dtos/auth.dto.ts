// DTOs para registro
export interface RegisterUserRequest {
    name: string;
    email: string;
    phone: string;
}

export interface RegisterUserResponse {
    success: boolean;
    userId?: string;
    message?: string;
    error?: string;
}

// DTOs para ativação
export interface ActivateUserRequest {
    activationCode: string;
}

export interface ActivateUserResponse {
    success: boolean;
    message?: string;
    error?: string;
}

// DTOs para completar perfil
export interface CompleteProfileRequest {
    imageFile: File;
}

export interface CompleteProfileResponse {
    success: boolean;
    profileImageUrl?: string;
    message?: string;
    error?: string;
} 