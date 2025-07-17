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

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string): string => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Debug function to check configuration
export const debugApiConfig = () => {
    console.log('🔧 API Configuration Debug:');
    console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
    console.log('API_CONFIG.BASE_URL:', API_CONFIG.BASE_URL);
    console.log('Full URL example:', buildApiUrl('/auth/register'));
}; 