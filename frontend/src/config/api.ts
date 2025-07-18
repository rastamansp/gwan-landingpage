// API Configuration
export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    TIMEOUT: 10000,
    ENDPOINTS: {
        AUTH: {
            LOGIN_REQUEST: '/auth/login-request',
            LOGIN_VALIDATE: '/auth/login-validate',
            REGISTER: '/auth/register',
            ACTIVATE: '/auth/activate',
            ME: '/auth/me',
        },
        UPLOAD: {
            UPLOAD_IMAGE: '/upload',
            PROCESS_IMAGE: '/upload/process',
        },
        HEALTH: {
            CHECK: '/health',
        },
    },
};

// Debug: Log da configuração da API
console.log('🔍 DEBUG api.ts - REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
console.log('🔍 DEBUG api.ts - API_CONFIG.BASE_URL:', API_CONFIG.BASE_URL);

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string): string => {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    console.log('🔍 DEBUG api.ts - buildApiUrl:', url);
    return url;
}; 