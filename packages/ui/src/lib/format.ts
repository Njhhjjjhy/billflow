// Formatting utilities for Billflow
// Handles currency, dates, and other display formatting

import type { Currency, Language } from '@/types';

// ============================================
// Currency Formatting
// ============================================

const currencyConfig: Record<Currency, { symbol: string; decimals: number; locale: string }> = {
  TWD: { symbol: 'NT$', decimals: 0, locale: 'zh-TW' },
  USD: { symbol: '$', decimals: 2, locale: 'en-US' },
  EUR: { symbol: '€', decimals: 2, locale: 'de-DE' },
};

/**
 * Format a number as currency
 * @example formatCurrency(1000, 'TWD') // "NT$1,000"
 * @example formatCurrency(1000, 'USD') // "$1,000.00"
 */
export function formatCurrency(amount: number, currency: Currency): string {
  const config = currencyConfig[currency];

  const formatted = new Intl.NumberFormat(config.locale, {
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  }).format(amount);

  return `${config.symbol}${formatted}`;
}

/**
 * Format currency with explicit sign for positive/negative
 * @example formatCurrencyWithSign(100, 'USD') // "+$100.00"
 * @example formatCurrencyWithSign(-100, 'USD') // "-$100.00"
 */
export function formatCurrencyWithSign(amount: number, currency: Currency): string {
  const sign = amount >= 0 ? '+' : '';
  return `${sign}${formatCurrency(amount, currency)}`;
}

/**
 * Parse a currency string back to number
 * @example parseCurrency("NT$1,000") // 1000
 */
export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^\d.-]/g, '');
  return parseFloat(cleaned) || 0;
}

// ============================================
// Date Formatting
// ============================================

/**
 * Format date based on language preference
 * @example formatDate(new Date(), 'zh') // "2026/01/25"
 * @example formatDate(new Date(), 'en') // "Jan 25, 2026"
 */
export function formatDate(date: Date | string, language: Language = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (language === 'zh') {
    // Taiwan format: YYYY/MM/DD
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  // English: "Jan 25, 2026"
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format date for input fields (YYYY-MM-DD)
 */
export function formatDateForInput(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

/**
 * Format date as relative time
 * @example formatRelativeDate(yesterday) // "Yesterday"
 * @example formatRelativeDate(twoDaysAgo) // "2 days ago"
 */
export function formatRelativeDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffTime = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

/**
 * Get days until due date (negative if overdue)
 */
export function getDaysUntilDue(dueDate: Date | string): number {
  const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  const diffTime = due.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Format due date with urgency indicator
 * @example formatDueDate(tomorrow) // "Due tomorrow"
 * @example formatDueDate(yesterday) // "1 day overdue"
 */
export function formatDueDate(dueDate: Date | string): string {
  const days = getDaysUntilDue(dueDate);

  if (days < 0) {
    const overdueDays = Math.abs(days);
    return overdueDays === 1 ? '1 day overdue' : `${overdueDays} days overdue`;
  }
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  if (days <= 7) return `Due in ${days} days`;
  return `Due ${formatDate(dueDate, 'en')}`;
}

// ============================================
// Number Formatting
// ============================================

/**
 * Format a number with thousands separator
 */
export function formatNumber(num: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

/**
 * Format a percentage
 * @example formatPercentage(0.05) // "5%"
 */
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(0)}%`;
}

// ============================================
// Invoice Number Generation
// ============================================

/**
 * Generate invoice number from prefix and sequence
 * @example generateInvoiceNumber('INV', 42) // "INV-2026-0042"
 */
export function generateInvoiceNumber(prefix: string, sequenceNumber: number): string {
  const year = new Date().getFullYear();
  const paddedNumber = String(sequenceNumber).padStart(4, '0');
  return `${prefix}-${year}-${paddedNumber}`;
}

// ============================================
// Taiwan Tax ID Formatting
// ============================================

/**
 * Format Taiwan Tax ID (統一編號) for display
 * @example formatTaxId("12345678") // "12345678" (no change, just validates)
 */
export function formatTaxId(taxId: string): string {
  // Remove any non-digit characters
  const cleaned = taxId.replace(/\D/g, '');
  return cleaned.slice(0, 8);
}

/**
 * Validate Taiwan Tax ID checksum
 * Uses the official MOF algorithm
 */
export function validateTaxIdChecksum(taxId: string): boolean {
  if (!/^\d{8}$/.test(taxId)) return false;

  const weights = [1, 2, 1, 2, 1, 2, 4, 1];
  let sum = 0;

  for (let i = 0; i < 8; i++) {
    const digit = parseInt(taxId[i], 10);
    const product = digit * weights[i];
    // Sum the digits of the product (e.g., 18 becomes 1+8=9)
    sum += Math.floor(product / 10) + (product % 10);
  }

  // Special case for 7th digit being 7
  if (taxId[6] === '7') {
    return sum % 10 === 0 || (sum + 1) % 10 === 0;
  }

  return sum % 10 === 0;
}

// ============================================
// Text Formatting
// ============================================

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

/**
 * Get initials from a name
 * @example getInitials("John Doe") // "JD"
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
