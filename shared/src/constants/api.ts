// API Constants

export const API_ENDPOINTS = {
    // Auth
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        REFRESH: '/auth/refresh',
        LOGOUT: '/auth/logout',
        PROFILE: '/auth/profile',
    },

    // Contact
    CONTACT: {
        CREATE: '/contact',
        GET_ALL: '/contact',
        GET_BY_ID: '/contact/:id',
        UPDATE: '/contact/:id',
        DELETE: '/contact/:id',
    },

    // Portfolio
    PORTFOLIO: {
        GET_ALL: '/portfolio',
        GET_BY_ID: '/portfolio/:id',
        CREATE: '/portfolio',
        UPDATE: '/portfolio/:id',
        DELETE: '/portfolio/:id',
    },

    // Health
    HEALTH: {
        CHECK: '/health',
        READY: '/health/ready',
        LIVE: '/health/live',
    },
} as const;

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
} as const;

export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
} as const;

export const API_VERSION = 'v1';
export const API_PREFIX = `/api/${API_VERSION}`; 