// Validation Constants

export const VALIDATION_RULES = {
    // Name validation
    NAME: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 100,
        PATTERN: /^[a-zA-ZÀ-ÿ\s]+$/,
    },

    // Email validation
    EMAIL: {
        MAX_LENGTH: 255,
        PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    // Password validation
    PASSWORD: {
        MIN_LENGTH: 8,
        MAX_LENGTH: 128,
        PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    },

    // Message validation
    MESSAGE: {
        MIN_LENGTH: 10,
        MAX_LENGTH: 1000,
    },

    // Phone validation
    PHONE: {
        MIN_LENGTH: 10,
        MAX_LENGTH: 15,
        PATTERN: /^[\+]?[1-9][\d]{0,15}$/,
    },

    // URL validation
    URL: {
        PATTERN: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
    },
} as const;

export const VALIDATION_MESSAGES = {
    REQUIRED: 'Este campo é obrigatório',
    INVALID_EMAIL: 'Email inválido',
    INVALID_PASSWORD: 'Senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial',
    INVALID_NAME: 'Nome deve conter apenas letras e espaços',
    INVALID_PHONE: 'Telefone inválido',
    INVALID_URL: 'URL inválida',
    TOO_SHORT: (field: string, min: number) => `${field} deve ter pelo menos ${min} caracteres`,
    TOO_LONG: (field: string, max: number) => `${field} deve ter no máximo ${max} caracteres`,
    INVALID_FORMAT: (field: string) => `Formato de ${field} inválido`,
} as const;

export const ERROR_CODES = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
    AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
    NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
    CONFLICT_ERROR: 'CONFLICT_ERROR',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const; 