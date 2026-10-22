export const isValidEmail = value => typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
export const isStrongPassword = value => typeof value === 'string' && value.length >= 10 && /[A-Za-z]/.test(value) && /\d/.test(value);
export const isPositiveArea = value => Number.isFinite(Number(value)) && Number(value) > 0;
export const isValidPh = value => Number.isFinite(Number(value)) && Number(value) >= 0 && Number(value) <= 14;
