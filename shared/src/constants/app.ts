// Application Constants

export const APP_CONFIG = {
    NAME: 'Gwan Landing Page',
    VERSION: '1.0.0',
    DESCRIPTION: 'Landing page moderna e responsiva',
    AUTHOR: 'Gwan Team',
    LICENSE: 'MIT',
} as const;

export const ENVIRONMENT = {
    DEVELOPMENT: 'development',
    STAGING: 'staging',
    PRODUCTION: 'production',
    TEST: 'test',
} as const;

export const PORTS = {
    FRONTEND: 3000,
    BACKEND: 3001,
} as const;

export const URLS = {
    FRONTEND: {
        DEVELOPMENT: 'http://localhost:3000',
        PRODUCTION: 'https://gwan.com',
    },
    BACKEND: {
        DEVELOPMENT: 'http://localhost:3001',
        PRODUCTION: 'https://api.gwan.com',
    },
} as const;

export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
} as const;

export const CACHE = {
    TTL: {
        SHORT: 300, // 5 minutes
        MEDIUM: 3600, // 1 hour
        LONG: 86400, // 24 hours
    },
    KEYS: {
        USER_PROFILE: 'user:profile:',
        CONTACT_LIST: 'contact:list:',
        PORTFOLIO_LIST: 'portfolio:list:',
    },
} as const;

export const FILE_UPLOADS = {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
} as const;

export const EMAIL = {
    FROM: 'noreply@gwan.com',
    SUBJECTS: {
        CONTACT_FORM: 'Nova mensagem de contato - Gwan',
        WELCOME: 'Bem-vindo ao Gwan',
        PASSWORD_RESET: 'Redefinição de senha - Gwan',
    },
} as const; 