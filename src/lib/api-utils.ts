/**
 * ============================================================================
 * API UTILITIES
 * ============================================================================
 * 
 * Centralized utilities for API error handling, response formatting,
 * and common patterns used across the application.
 * ============================================================================
 */

/**
 * Standard API Response structure
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Create a successful API response
 */
export function successResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

/**
 * Create an error API response
 */
export function errorResponse(error: string): ApiResponse<never> {
  return {
    success: false,
    error,
  };
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

/**
 * Error messages in both languages
 */
export const ERROR_MESSAGES = {
  FETCH_FAILED: {
    en: 'Failed to load data. Please try again later.',
    ar: 'فشل في تحميل البيانات. الرجاء المحاولة لاحقاً.',
  },
  NOT_FOUND: {
    en: 'The requested resource was not found.',
    ar: 'المورد المطلوب غير موجود.',
  },
  SUBMISSION_FAILED: {
    en: 'Failed to submit. Please try again.',
    ar: 'فشل في الإرسال. الرجاء المحاولة مرة أخرى.',
  },
  INVALID_DATA: {
    en: 'Please fill in all required fields correctly.',
    ar: 'الرجاء ملء جميع الحقول المطلوبة بشكل صحيح.',
  },
  NETWORK_ERROR: {
    en: 'Network error. Please check your connection.',
    ar: 'خطأ في الشبكة. الرجاء التحقق من اتصالك.',
  },
  SERVER_ERROR: {
    en: 'Server error. Please try again later.',
    ar: 'خطأ في الخادم. الرجاء المحاولة لاحقاً.',
  },
  PAYMENT_FAILED: {
    en: 'Payment failed. Please try again.',
    ar: 'فشل الدفع. الرجاء المحاولة مرة أخرى.',
  },
  UNAUTHORIZED: {
    en: 'You are not authorized to perform this action.',
    ar: 'غير مصرح لك بتنفيذ هذا الإجراء.',
  },
} as const;

export type ErrorKey = keyof typeof ERROR_MESSAGES;

/**
 * Get error message in the specified language
 */
export function getErrorMessage(key: ErrorKey, language: 'en' | 'ar' = 'en'): string {
  return ERROR_MESSAGES[key][language];
}

/**
 * Format currency with locale support
 */
export function formatCurrency(
  amount: number, 
  currency: string = 'QAR', 
  language: 'en' | 'ar' = 'en'
): string {
  return new Intl.NumberFormat(language === 'ar' ? 'ar-QA' : 'en-QA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date with locale support
 */
export function formatDate(
  dateString: string | null, 
  language: 'en' | 'ar' = 'en',
  options?: Intl.DateTimeFormatOptions
): string | null {
  if (!dateString) return null;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  
  return new Intl.DateTimeFormat(
    language === 'ar' ? 'ar-QA' : 'en-QA', 
    defaultOptions
  ).format(new Date(dateString));
}

/**
 * Format number with locale support
 */
export function formatNumber(
  num: number, 
  language: 'en' | 'ar' = 'en'
): string {
  return new Intl.NumberFormat(
    language === 'ar' ? 'ar-QA' : 'en-QA'
  ).format(num);
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(raised: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.min(Math.round((raised / goal) * 100), 100);
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string | null, maxLength: number = 150): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Get bilingual text based on language
 */
export function getBilingualText<T extends Record<string, any>>(
  item: T,
  fieldEn: keyof T,
  fieldAr: keyof T,
  language: 'en' | 'ar'
): string {
  const text = language === 'ar' ? item[fieldAr] : item[fieldEn];
  return (text as string) || '';
}

/**
 * Safely get nested property from object
 */
export function safeGet<T, K extends keyof T>(
  obj: T | null | undefined, 
  key: K, 
  defaultValue: T[K]
): T[K] {
  if (obj === null || obj === undefined) return defaultValue;
  return obj[key] ?? defaultValue;
}
