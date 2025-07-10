import { isEmail } from 'class-validator';

/**
 * Validates if a string is a valid email address
 */
export const validateEmail = (email: string): boolean => {
    return isEmail(email);
};

/**
 * Validates if a string is not empty and has minimum length
 */
export const validateRequiredString = (
    value: string,
    minLength: number = 1,
    maxLength?: number
): boolean => {
    if (!value || typeof value !== 'string') {
        return false;
    }

    const trimmedValue = value.trim();

    if (trimmedValue.length < minLength) {
        return false;
    }

    if (maxLength && trimmedValue.length > maxLength) {
        return false;
    }

    return true;
};

/**
 * Validates if a string contains only alphanumeric characters
 */
export const validateAlphanumeric = (value: string): boolean => {
    return /^[a-zA-Z0-9]+$/.test(value);
};

/**
 * Validates if a string contains only letters and spaces
 */
export const validateName = (value: string): boolean => {
    return /^[a-zA-ZÀ-ÿ\s]+$/.test(value);
};

/**
 * Validates if a string is a valid phone number
 */
export const validatePhone = (value: string): boolean => {
    // Basic phone validation - can be enhanced based on requirements
    return /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-()]/g, ''));
}; 