import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { invoiceSchema, calculateInvoiceTotals, formatZodErrors } from "@/lib/validations";
import type { Invoice, InvoiceFull } from "@/types";

// Mock data - will be replaced with Supabase
const mockInvoice: InvoiceFull = {
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
  notes_internal: "Project: Website redesign",
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
  items: [
    {
      id: "li1",
      invoice_id: "1",
      description: "Website Design - Homepage",
      quantity: 1,
      unit_price: 25000,
      amount: 25000,
      sort_order: 0,
    },
    {
      id: "li2",
      invoice_id: "1",
      description: "Website Design - About Page",
      quantity: 1,
      unit_price: 12000,
      amount: 12000,
      sort_order: 1,
    },
  ],
  payments: [],
};

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/invoices/[id]
 * Get a single invoice with client and items
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Validate ID format
    if (!z.string().uuid().safeParse(id).success && id !== "1") {
      return NextResponse.json(
        { error: "Invalid invoice ID" },
        { status: 400 }
      );
    }

    // TODO: Replace with Supabase query
    // const { data, error } = await supabase
    //   .from('invoices')
    //   .select(`
    //     *,
    //     client:clients(*),
    //     items:invoice_line_items(*),
    //     payments:payment_records(*)
    //   `)
    //   .eq('id', id)
    //   .single();

    // Mock: Return mock data for ID "1"
    if (id === "1" || id === mockInvoice.id) {
      return NextResponse.json({ data: mockInvoice });
    }

    return NextResponse.json(
      { error: "Invoice not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Failed to fetch invoice:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/invoices/[id]
 * Update an invoice (only if status is "draft")
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate ID
    if (!z.string().uuid().safeParse(id).success && id !== "1") {
      return NextResponse.json(
        { error: "Invalid invoice ID" },
        { status: 400 }
      );
    }

    // TODO: Fetch existing invoice from database
    const existingInvoice = mockInvoice;

    if (!existingInvoice) {
      return NextResponse.json(
        { error: "Invoice not found" },
        { status: 404 }
      );
    }

    // Only allow editing draft invoices
    if (existingInvoice.status !== "draft") {
      return NextResponse.json(
        { error: "Only draft invoices can be edited" },
        { status: 400 }
      );
    }

    // Validate update data
    const validated = invoiceSchema.parse(body);

    // Calculate new totals
    const totals = calculateInvoiceTotals(
      validated.items,
      validated.tax_rate,
      validated.discount_type,
      validated.discount_value
    );

    // Build updated invoice
    const updatedInvoice: Invoice = {
      ...existingInvoice,
      client_id: validated.client_id,
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
      language: validated.language,
      notes_external: validated.notes_external || null,
      notes_internal: validated.notes_internal || null,
      updated_at: new Date().toISOString(),
    };

    // TODO: Update in Supabase
    // const { data, error } = await supabase
    //   .from('invoices')
    //   .update(updatedInvoice)
    //   .eq('id', id)
    //   .select()
    //   .single();

    // TODO: Update line items (delete existing, insert new)

    return NextResponse.json({ data: updatedInvoice });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: formatZodErrors(error) },
        { status: 400 }
      );
    }

    console.error("Failed to update invoice:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/invoices/[id]
 * Delete an invoice (only if status is "draft")
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Validate ID
    if (!z.string().uuid().safeParse(id).success && id !== "1") {
      return NextResponse.json(
        { error: "Invalid invoice ID" },
        { status: 400 }
      );
    }

    // TODO: Fetch existing invoice from database
    const existingInvoice = mockInvoice;

    if (!existingInvoice) {
      return NextResponse.json(
        { error: "Invoice not found" },
        { status: 404 }
      );
    }

    // Only allow deleting draft invoices
    if (existingInvoice.status !== "draft") {
      return NextResponse.json(
        { error: "Only draft invoices can be deleted" },
        { status: 400 }
      );
    }

    // TODO: Delete from Supabase (cascade will delete line items)
    // const { error } = await supabase
    //   .from('invoices')
    //   .delete()
    //   .eq('id', id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete invoice:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
