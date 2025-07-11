// Common types shared between frontend and backend

export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginationParams {
    page: number;
    limit: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Auth Types
export interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  hasToken: boolean;
  hasUser: boolean;
  user?: User;
}

export interface LoginRequest {
  contact: string;
}

export interface LoginValidate {
  contact: string;
  loginCode: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
}

export interface ActivateRequest {
  activationCode: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  userId?: string;
  token?: string;
  userData?: User;
  loginCode?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  userId?: string;
  activationCode?: string;
}

export interface ActivateResponse {
  success: boolean;
  message: string;
  token?: string;
  userData?: User;
}

// Upload Types
export interface UploadResponse {
  success: boolean;
  message: string;
  imageUrl?: string;
  error?: string;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  validation?: any;
}

// Navigation Types
export interface NavigationItem {
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
}

// Theme Types
export interface Theme {
  mode: 'light' | 'dark';
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

// Validation Types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

// Error Types
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// Loading States
export interface LoadingState {
  loading: boolean;
  error?: string;
  success?: boolean;
} 