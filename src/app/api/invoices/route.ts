import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { invoiceSchema, calculateInvoiceTotals, formatZodErrors } from "@/lib/validations";
import { generateInvoiceNumber } from "@/lib/format";
import type { Invoice, InvoiceWithClient, PaginatedResponse } from "@/types";

// Mock data - will be replaced with Supabase
const mockInvoices: InvoiceWithClient[] = [
  {
    id: "1",
    business_id: "b1",
    client_id: "c1",
    invoice_number: "INV-2026-042",
    status: "sent",
    currency: "TWD",
    exchange_rate_to_twd: 1,
    subtotal: 42857,
    tax_rate: 0.05,
    tax_amount: 2143,
    discount_type: null,
    discount_value: 0,
    discount_amount: 0,
    total: 45000,
    issue_date: "2026-01-15",
    due_date: "2026-01-29",
    paid_date: null,
    paid_amount: 0,
    language: "en",
    notes_external: "Payment due within 14 days.",
    notes_internal: null,
    pdf_url: null,
    sent_at: "2026-01-15T10:30:00Z",
    created_at: "2026-01-15T09:00:00Z",
    updated_at: "2026-01-15T10:30:00Z",
    client: {
      id: "c1",
      business_id: "b1",
      display_name: "Chen Design Co.",
      company_name: "Chen Design Co., Ltd.",
      tax_id: "12345678",
      contact_name: "David Chen",
      email: "david@chendesign.tw",
      phone: "02-2345-6789",
      line_id: null,
      address: "No. 123, Xinyi Road",
      city: "Taipei",
      postal_code: "110",
      country: "Taiwan",
      default_payment_terms: 14,
      preferred_currency: "TWD",
      preferred_language: "zh",
      tags: [],
      notes: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
];

// Query params schema
const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  status: z.enum(["draft", "sent", "viewed", "paid", "overdue", "cancelled"]).optional(),
  client_id: z.string().uuid().optional(),
  search: z.string().optional(),
});

/**
 * GET /api/invoices
 * List all invoices with pagination and filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = querySchema.parse(Object.fromEntries(searchParams));

    // TODO: Replace with Supabase query
    let invoices = [...mockInvoices];

    // Apply filters
    if (query.status) {
      invoices = invoices.filter((inv) => inv.status === query.status);
    }
    if (query.client_id) {
      invoices = invoices.filter((inv) => inv.client_id === query.client_id);
    }
    if (query.search) {
      const search = query.search.toLowerCase();
      invoices = invoices.filter(
        (inv) =>
          inv.invoice_number.toLowerCase().includes(search) ||
          inv.client.display_name.toLowerCase().includes(search)
      );
    }

    // Calculate pagination
    const total = invoices.length;
    const totalPages = Math.ceil(total / query.limit);
    const start = (query.page - 1) * query.limit;
    const end = start + query.limit;
    const paginatedInvoices = invoices.slice(start, end);

    const response: PaginatedResponse<InvoiceWithClient> = {
      data: paginatedInvoices,
      total,
      page: query.page,
      limit: query.limit,
      totalPages,
    };

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: formatZodErrors(error) },
        { status: 400 }
      );
    }

    console.error("Failed to fetch invoices:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/invoices
 * Create a new invoice
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = invoiceSchema.parse(body);

    // Calculate totals
    const totals = calculateInvoiceTotals(
      validated.items,
      validated.tax_rate,
      validated.discount_type,
      validated.discount_value
    );

    // Generate invoice number if not provided
    const invoiceNumber = validated.invoice_number || generateInvoiceNumber("INV", 43);

    // Create invoice object
    const now = new Date().toISOString();
    const newInvoice: Invoice = {
      id: crypto.randomUUID(),
      business_id: "b1", // TODO: Get from auth context
      client_id: validated.client_id,
      invoice_number: invoiceNumber,
      status: "draft",
      currency: validated.currency,
      exchange_rate_to_twd: validated.exchange_rate_to_twd,
      subtotal: totals.subtotal,
      tax_rate: validated.tax_rate,
      tax_amount: totals.taxAmount,
      discount_type: validated.discount_type || null,
      discount_value: validated.discount_value || 0,
      discount_amount: totals.discountAmount,
      total: totals.total,
      issue_date: validated.issue_date.toISOString().split("T")[0],
      due_date: validated.due_date.toISOString().split("T")[0],
      paid_date: null,
      paid_amount: 0,
      language: validated.language,
      notes_external: validated.notes_external || null,
      notes_internal: validated.notes_internal || null,
      pdf_url: null,
      sent_at: null,
      created_at: now,
      updated_at: now,
    };

    // TODO: Save to Supabase
    // const { data, error } = await supabase
    //   .from('invoices')
    //   .insert(newInvoice)
    //   .select()
    //   .single();

    // TODO: Save line items
    // const lineItems = validated.items.map((item, index) => ({
    //   id: crypto.randomUUID(),
    //   invoice_id: newInvoice.id,
    //   description: item.description,
    //   quantity: item.quantity,
    //   unit_price: item.unit_price,
    //   amount: item.amount,
    //   sort_order: index,
    // }));

    return NextResponse.json({ data: newInvoice }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: formatZodErrors(error) },
        { status: 400 }
      );
    }

    console.error("Failed to create invoice:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
