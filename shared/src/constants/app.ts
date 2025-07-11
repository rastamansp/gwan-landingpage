// Application Constants

export const APP_CONSTANTS = {
  // App Info
  NAME: 'Gwan Landing Page',
  VERSION: '1.0.0',
  DESCRIPTION: 'Sistema de landing page da Gwan',

  // API
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  API_TIMEOUT: 10000,

  // Auth
  AUTH_TOKEN_KEY: 'gwan_auth_token',
  AUTH_USER_KEY: 'gwan_auth_user',
  AUTH_REFRESH_KEY: 'gwan_auth_refresh',

  // Storage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'gwan_auth_token',
    AUTH_USER: 'gwan_auth_user',
    AUTH_REFRESH: 'gwan_auth_refresh',
    THEME: 'gwan_theme',
    LANGUAGE: 'gwan_language',
  },

  // Cache Keys
  CACHE_KEYS: {
    USER_PROFILE: 'user:profile:',
    AUTH_STATUS: 'auth:status:',
  },

  // Form Labels
  FORM_LABELS: {
    EMAIL: 'Email',
    PASSWORD: 'Senha',
    CONFIRM_PASSWORD: 'Confirmar Senha',
    NAME: 'Nome',
    PHONE: 'Telefone',
    MESSAGE: 'Mensagem',
    SUBMIT: 'Enviar',
    CANCEL: 'Cancelar',
    SAVE: 'Salvar',
    DELETE: 'Excluir',
    EDIT: 'Editar',
    VIEW: 'Visualizar',
  },

  // Validation Messages
  VALIDATION_MESSAGES: {
    REQUIRED: 'Este campo é obrigatório',
    INVALID_EMAIL: 'Email inválido',
    INVALID_PHONE: 'Telefone inválido',
    PASSWORD_MISMATCH: 'As senhas não coincidem',
    MIN_LENGTH: 'Mínimo de {min} caracteres',
    MAX_LENGTH: 'Máximo de {max} caracteres',
  },

  // Error Messages
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
    SERVER_ERROR: 'Erro no servidor. Tente novamente.',
    UNAUTHORIZED: 'Não autorizado. Faça login novamente.',
    FORBIDDEN: 'Acesso negado.',
    NOT_FOUND: 'Recurso não encontrado.',
    VALIDATION_ERROR: 'Dados inválidos. Verifique os campos.',
  },

  // Success Messages
  SUCCESS_MESSAGES: {
    SAVED: 'Salvo com sucesso!',
    DELETED: 'Excluído com sucesso!',
    UPDATED: 'Atualizado com sucesso!',
    CREATED: 'Criado com sucesso!',
  },

  // Page Titles
  PAGE_TITLES: {
    HOME: 'Gwan - Landing Page',
    LOGIN: 'Login - Gwan',
    REGISTER: 'Cadastro - Gwan',
    PROFILE: 'Perfil - Gwan',
    UPLOAD: 'Upload - Gwan',
  },

  // Meta Tags
  META_TAGS: {
    TITLE: 'Gwan Landing Page',
    DESCRIPTION: 'Sistema de landing page da Gwan',
    KEYWORDS: 'gwan, landing page, sistema',
    AUTHOR: 'Gwan Team',
  },
}; 