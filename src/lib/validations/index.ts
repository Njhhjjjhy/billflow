// Zod validation schemas for Billflow
// Used with react-hook-form for form validation

import { z } from "zod";

// ============================================
// Common Schemas
// ============================================

export const currencySchema = z.enum(["TWD", "USD", "EUR"]);
export type Currency = z.infer<typeof currencySchema>;

export const languageSchema = z.enum(["zh", "en"]);
export type Language = z.infer<typeof languageSchema>;

export const invoiceStatusSchema = z.enum([
  "draft",
  "sent",
  "viewed",
  "paid",
  "overdue",
  "cancelled",
]);
export type InvoiceStatus = z.infer<typeof invoiceStatusSchema>;

// Taiwan Tax ID validation (統一編號) - 8 digits with checksum
export const taxIdSchema = z
  .string()
  .regex(/^\d{8}$/, "Tax ID must be exactly 8 digits")
  .optional()
  .or(z.literal(""));

// Email validation
export const emailSchema = z.string().email("Enter a valid email address");

// Phone validation (flexible for Taiwan formats)
export const phoneSchema = z
  .string()
  .regex(
    /^(\+?886-?|0)?[2-9]\d{0,2}-?\d{3,4}-?\d{3,4}$/,
    "Enter a valid phone number"
  )
  .optional()
  .or(z.literal(""));

// Positive number validation
export const positiveNumberSchema = z
  .number()
  .positive("Must be greater than 0");

export const nonNegativeNumberSchema = z
  .number()
  .min(0, "Cannot be negative");

// ============================================
// Business Schema
// ============================================

export const businessSchema = z.object({
  name_zh: z.string().min(1, "Business name is required"),
  name_en: z.string().optional(),
  tax_id: taxIdSchema,
  address: z.string().optional(),
  phone: phoneSchema,
  email: emailSchema,
  logo_url: z.string().url().optional().or(z.literal("")),
  default_payment_terms: z.number().int().min(1).max(365).default(14),
  default_currency: currencySchema.default("TWD"),
  default_tax_rate: z.number().min(0).max(1).default(0.05),
  invoice_prefix: z.string().max(10).default("INV"),
  invoice_next_number: z.number().int().min(1).default(1),
});

export type BusinessFormData = z.infer<typeof businessSchema>;

// ============================================
// Client Schema
// ============================================

export const clientSchema = z.object({
  display_name: z.string().min(1, "Client name is required"),
  company_name: z.string().optional(),
  tax_id: taxIdSchema,
  contact_name: z.string().optional(),
  email: emailSchema,
  phone: phoneSchema,
  line_id: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().default("Taiwan"),
  default_payment_terms: z.number().int().min(1).max(365).optional(),
  preferred_currency: currencySchema.optional(),
  preferred_language: languageSchema.optional(),
  tags: z.array(z.string()).default([]),
  notes: z.string().optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;

// ============================================
// Invoice Line Item Schema
// ============================================

export const lineItemSchema = z.object({
  id: z.string().optional(), // Optional for new items
  description: z.string().min(1, "Description is required"),
  quantity: positiveNumberSchema,
  unit_price: nonNegativeNumberSchema,
  amount: nonNegativeNumberSchema, // Computed: quantity * unit_price
  sort_order: z.number().int().default(0),
});

export type LineItemFormData = z.infer<typeof lineItemSchema>;

// ============================================
// Invoice Schema
// ============================================

export const invoiceSchema = z
  .object({
    client_id: z.string().uuid("Select a client"),
    invoice_number: z.string().optional(), // Auto-generated if not provided
    currency: currencySchema.default("TWD"),
    exchange_rate_to_twd: z.number().positive().default(1),
    items: z.array(lineItemSchema).min(1, "Add at least one line item"),
    tax_rate: z.number().min(0).max(1).default(0.05),
    discount_type: z.enum(["percentage", "fixed"]).optional(),
    discount_value: nonNegativeNumberSchema.optional(),
    issue_date: z.coerce.date(),
    due_date: z.coerce.date(),
    language: languageSchema.default("en"),
    notes_external: z.string().optional(),
    notes_internal: z.string().optional(),
  })
  .refine((data) => data.due_date >= data.issue_date, {
    message: "Due date must be after or equal to issue date",
    path: ["due_date"],
  });

export type InvoiceFormData = z.infer<typeof invoiceSchema>;

// ============================================
// Payment Record Schema
// ============================================

export const paymentSchema = z.object({
  invoice_id: z.string().uuid(),
  amount: positiveNumberSchema,
  payment_date: z.coerce.date(),
  payment_method: z.string().optional(),
  notes: z.string().optional(),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;

// ============================================
// Settings Schemas
// ============================================

export const accountSettingsSchema = z.object({
  full_name: z.string().min(1, "Name is required"),
  email: emailSchema,
});

export type AccountSettingsFormData = z.infer<typeof accountSettingsSchema>;

export const invoiceDefaultsSchema = z.object({
  default_currency: currencySchema,
  default_payment_terms: z.number().int().min(1).max(365),
  default_tax_rate: z.number().min(0).max(1),
  invoice_prefix: z.string().max(10),
  default_notes: z.string().optional(),
});

export type InvoiceDefaultsFormData = z.infer<typeof invoiceDefaultsSchema>;

export const notificationSettingsSchema = z.object({
  email_on_send: z.boolean(),
  email_on_paid: z.boolean(),
  reminder_enabled: z.boolean(),
  reminder_days_before: z.number().int().min(1).max(30).optional(),
});

export type NotificationSettingsFormData = z.infer<
  typeof notificationSettingsSchema
>;

// ============================================
// Helper: Calculate Invoice Totals
// ============================================

export function calculateInvoiceTotals(
  items: LineItemFormData[],
  taxRate: number,
  discountType?: "percentage" | "fixed",
  discountValue?: number
): {
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
} {
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);

  let discountAmount = 0;
  if (discountValue && discountValue > 0) {
    if (discountType === "percentage") {
      discountAmount = subtotal * (discountValue / 100);
    } else if (discountType === "fixed") {
      discountAmount = discountValue;
    }
  }

  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * taxRate;
  const total = taxableAmount + taxAmount;

  return {
    subtotal,
    discountAmount,
    taxAmount,
    total,
  };
}

// ============================================
// Helper: Format Validation Errors
// ============================================

export function formatZodErrors(
  errors: z.ZodError
): Record<string, string> {
  const formatted: Record<string, string> = {};
  for (const issue of errors.issues) {
    const path = issue.path.join(".");
    if (!formatted[path]) {
      formatted[path] = issue.message;
    }
  }
  return formatted;
}
