import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { z } from "zod";
import { InvoicePDF } from "@/lib/pdf";
import type { InvoiceFull, Business } from "@/types";

// Mock business data - will be replaced with Supabase
const mockBusiness: Business = {
  id: "b1",
  user_id: "u1",
  name_zh: "智慧設計工作室",
  name_en: "Smart Design Studio",
  tax_id: "87654321",
  address: "台北市信義區信義路五段7號",
  phone: "02-8888-8888",
  email: "hello@smartdesign.tw",
  logo_url: null,
  default_payment_terms: 14,
  default_currency: "TWD",
  default_tax_rate: 0.05,
  invoice_prefix: "INV",
  invoice_next_number: 43,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

// Mock invoice data - same as [id]/route.ts
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
  notes_external: "Payment due within 14 days. Thank you for your business!",
  notes_internal: "Project: Website redesign phase 1",
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
    address: "No. 123, Xinyi Road, Section 4",
    city: "Taipei",
    postal_code: "110",
    country: "Taiwan",
    default_payment_terms: 14,
    preferred_currency: "TWD",
    preferred_language: "zh",
    tags: ["design", "regular"],
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
    {
      id: "li3",
      invoice_id: "1",
      description: "Responsive Development",
      quantity: 2,
      unit_price: 2928.5,
      amount: 5857,
      sort_order: 2,
    },
  ],
  payments: [],
};

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/invoices/[id]/pdf
 * Generate and download invoice PDF
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

    // TODO: Replace with Supabase queries
    // const { data: invoice } = await supabase
    //   .from('invoices')
    //   .select(`*, client:clients(*), items:invoice_line_items(*)`)
    //   .eq('id', id)
    //   .single();
    // const { data: business } = await supabase
    //   .from('businesses')
    //   .select('*')
    //   .eq('id', invoice.business_id)
    //   .single();

    // Mock: Return PDF for ID "1"
    if (id !== "1" && id !== mockInvoice.id) {
      return NextResponse.json(
        { error: "Invoice not found" },
        { status: 404 }
      );
    }

    const invoice = mockInvoice;
    const business = mockBusiness;

    // Generate PDF buffer
    const pdfBuffer = await renderToBuffer(
      <InvoicePDF invoice={invoice} business={business} />
    );

    // Convert Buffer to Uint8Array for NextResponse compatibility
    const uint8Array = new Uint8Array(pdfBuffer);

    // Return PDF as downloadable file
    const filename = `${invoice.invoice_number}.pdf`;

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        message: errorMessage,
        stack: process.env.NODE_ENV === "development" ? errorStack : undefined
      },
      { status: 500 }
    );
  }
}
