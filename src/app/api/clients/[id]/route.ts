import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { clientSchema, formatZodErrors } from "@/lib/validations";
import type { Client, ClientWithStats } from "@/types";

// Mock data - will be replaced with Supabase
const mockClient: ClientWithStats = {
  id: "c1",
  business_id: "b1",
  display_name: "Chen Design Co.",
  company_name: "Chen Design Co., Ltd.",
  tax_id: "12345678",
  contact_name: "David Chen",
  email: "david@chendesign.tw",
  phone: "02-2345-6789",
  line_id: "davidchen",
  address: "No. 123, Xinyi Road",
  city: "Taipei",
  postal_code: "110",
  country: "Taiwan",
  default_payment_terms: 14,
  preferred_currency: "TWD",
  preferred_language: "zh",
  tags: ["design", "regular"],
  notes: "Long-term client.",
  created_at: "2024-06-15T09:00:00Z",
  updated_at: "2026-01-20T14:30:00Z",
  invoice_count: 12,
  total_invoiced: 540000,
  outstanding_amount: 45000,
};

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/clients/[id]
 * Get a single client with stats
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Validate ID format
    if (!z.string().uuid().safeParse(id).success && id !== "c1") {
      return NextResponse.json(
        { error: "Invalid client ID" },
        { status: 400 }
      );
    }

    // TODO: Replace with Supabase query
    // const { data, error } = await supabase
    //   .from('clients')
    //   .select('*')
    //   .eq('id', id)
    //   .single();

    // Mock: Return mock data for ID "c1"
    if (id === "c1" || id === mockClient.id) {
      return NextResponse.json({ data: mockClient });
    }

    return NextResponse.json(
      { error: "Client not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Failed to fetch client:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/clients/[id]
 * Update a client
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate ID
    if (!z.string().uuid().safeParse(id).success && id !== "c1") {
      return NextResponse.json(
        { error: "Invalid client ID" },
        { status: 400 }
      );
    }

    // TODO: Fetch existing client from database
    const existingClient = mockClient;

    if (!existingClient) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    // Validate update data
    const validated = clientSchema.parse(body);

    // Build updated client
    const updatedClient: Client = {
      ...existingClient,
      display_name: validated.display_name,
      company_name: validated.company_name || null,
      tax_id: validated.tax_id || null,
      contact_name: validated.contact_name || null,
      email: validated.email,
      phone: validated.phone || null,
      line_id: validated.line_id || null,
      address: validated.address || null,
      city: validated.city || null,
      postal_code: validated.postal_code || null,
      country: validated.country,
      default_payment_terms: validated.default_payment_terms || null,
      preferred_currency: validated.preferred_currency || null,
      preferred_language: validated.preferred_language || null,
      tags: validated.tags,
      notes: validated.notes || null,
      updated_at: new Date().toISOString(),
    };

    // TODO: Update in Supabase
    // const { data, error } = await supabase
    //   .from('clients')
    //   .update(updatedClient)
    //   .eq('id', id)
    //   .select()
    //   .single();

    return NextResponse.json({ data: updatedClient });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: formatZodErrors(error) },
        { status: 400 }
      );
    }

    console.error("Failed to update client:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/clients/[id]
 * Delete a client
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Validate ID
    if (!z.string().uuid().safeParse(id).success && id !== "c1") {
      return NextResponse.json(
        { error: "Invalid client ID" },
        { status: 400 }
      );
    }

    // TODO: Check if client has any invoices
    // If they do, either prevent deletion or cascade delete
    // const { count } = await supabase
    //   .from('invoices')
    //   .select('id', { count: 'exact' })
    //   .eq('client_id', id);

    // TODO: Delete from Supabase
    // const { error } = await supabase
    //   .from('clients')
    //   .delete()
    //   .eq('id', id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete client:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
