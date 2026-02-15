// Type definitions for Billflow
// These represent database records with IDs and timestamps

// ============================================
// Enums / Literal Types
// ============================================

export type Currency = 'TWD' | 'USD' | 'EUR';
export type Language = 'zh' | 'en';
export type InvoiceStatus = 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled';
export type DiscountType = 'percentage' | 'fixed';

// ============================================
// User & Business
// ============================================

export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Business {
  id: string;
  user_id: string;
  name_zh: string;
  name_en: string | null;
  tax_id: string | null;
  address: string | null;
  phone: string | null;
  email: string;
  logo_url: string | null;
  default_payment_terms: number;
  default_currency: Currency;
  default_tax_rate: number;
  invoice_prefix: string;
  invoice_next_number: number;
  created_at: string;
  updated_at: string;
}

// ============================================
// Client
// ============================================

export interface Client {
  id: string;
  business_id: string;
  display_name: string;
  company_name: string | null;
  tax_id: string | null;
  contact_name: string | null;
  email: string;
  phone: string | null;
  line_id: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  country: string;
  default_payment_terms: number | null;
  preferred_currency: Currency | null;
  preferred_language: Language | null;
  tags: string[];
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Client with computed stats
export interface ClientWithStats extends Client {
  invoice_count: number;
  total_invoiced: number;
  outstanding_amount: number;
}

// ============================================
// Invoice Line Item
// ============================================

export interface InvoiceLineItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
  sort_order: number;
}

// For form usage (id optional for new items)
export interface LineItemInput {
  id?: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
  sort_order: number;
}

// ============================================
// Invoice
// ============================================

export interface Invoice {
  id: string;
  business_id: string;
  client_id: string;
  invoice_number: string;
  status: InvoiceStatus;
  currency: Currency;
  exchange_rate_to_twd: number;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  discount_type: DiscountType | null;
  discount_value: number;
  discount_amount: number;
  total: number;
  issue_date: string;
  due_date: string;
  paid_date: string | null;
  paid_amount: number;
  language: Language;
  notes_external: string | null;
  notes_internal: string | null;
  pdf_url: string | null;
  sent_at: string | null;
  created_at: string;
  updated_at: string;
}

// Invoice with related data
export interface InvoiceWithClient extends Invoice {
  client: Client;
}

export interface InvoiceWithItems extends Invoice {
  items: InvoiceLineItem[];
}

export interface InvoiceFull extends Invoice {
  client: Client;
  items: InvoiceLineItem[];
  payments: PaymentRecord[];
}

// ============================================
// Payment Record
// ============================================

export interface PaymentRecord {
  id: string;
  invoice_id: string;
  amount: number;
  payment_date: string;
  payment_method: string | null;
  notes: string | null;
  created_at: string;
}

// ============================================
// Dashboard Stats
// ============================================

export interface DashboardStats {
  total_outstanding: number;
  total_overdue: number;
  invoices_this_month: number;
  revenue_this_month: number;
  invoices_by_status: Record<InvoiceStatus, number>;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  data: T;
  error?: never;
}

export interface ApiError {
  data?: never;
  error: string;
  details?: Record<string, string>;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

// ============================================
// Table/List Types
// ============================================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  status?: InvoiceStatus[];
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  clientId?: string;
}
