// API Constants

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN_REQUEST: '/auth/login-request',
    LOGIN_VALIDATE: '/auth/login-validate',
    REGISTER: '/auth/register',
    ACTIVATE: '/auth/activate',
    ME: '/auth/me',
  },

  // Upload
  UPLOAD: {
    UPLOAD_IMAGE: '/upload',
  },

  // Health
  HEALTH: {
    CHECK: '/health',
  },
};

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