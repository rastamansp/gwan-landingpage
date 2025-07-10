/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitalizes the first letter of each word in a string
 */
export const capitalizeWords = (str: string): string => {
    if (!str) return str;
    return str
        .split(' ')
        .map(word => capitalize(word))
        .join(' ');
};

/**
 * Truncates a string to a specified length
 */
export const truncate = (str: string, length: number, suffix: string = '...'): string => {
    if (!str || str.length <= length) return str;
    return str.substring(0, length) + suffix;
};

/**
 * Removes extra whitespace from a string
 */
export const normalizeWhitespace = (str: string): string => {
    if (!str) return str;
    return str.replace(/\s+/g, ' ').trim();
};

/**
 * Generates a random string of specified length
 */
export const generateRandomString = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

/**
 * Converts a string to slug format
 */
export const toSlug = (str: string): string => {
    if (!str) return str;
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

/**
 * Checks if a string is empty or contains only whitespace
 */
export const isEmpty = (str: string): boolean => {
    return !str || str.trim().length === 0;
};

/**
 * Counts the number of words in a string
 */
export const countWords = (str: string): number => {
    if (!str) return 0;
    return str.trim().split(/\s+/).length;
};

/**
 * Extracts the domain from an email address
 */
export const extractDomainFromEmail = (email: string): string => {
    if (!email || !email.includes('@')) return '';
    return email.split('@')[1];
};

/**
 * Masks sensitive information like email addresses
 */
export const maskEmail = (email: string): string => {
    if (!email || !email.includes('@')) return email;

    const [localPart, domain] = email.split('@');
    const maskedLocal = localPart.length > 2
        ? localPart.charAt(0) + '*'.repeat(localPart.length - 2) + localPart.charAt(localPart.length - 1)
        : localPart;

    return `${maskedLocal}@${domain}`;
}; 