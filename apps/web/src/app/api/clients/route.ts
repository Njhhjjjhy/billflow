import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { clientSchema, formatZodErrors } from "@/lib/validations";
import type { Client, ClientWithStats, PaginatedResponse } from "@/types";

// Mock data - will be replaced with Supabase
const mockClients: ClientWithStats[] = [
  {
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
    notes: null,
    created_at: "2024-06-15T09:00:00Z",
    updated_at: "2026-01-20T14:30:00Z",
    invoice_count: 12,
    total_invoiced: 540000,
    outstanding_amount: 45000,
  },
  {
    id: "c2",
    business_id: "b1",
    display_name: "Tech Solutions Ltd",
    company_name: "Tech Solutions Limited",
    tax_id: "87654321",
    contact_name: "Sarah Wang",
    email: "sarah@techsolutions.com",
    phone: "02-8765-4321",
    line_id: null,
    address: "No. 456, Nanjing East Road",
    city: "Taipei",
    postal_code: "104",
    country: "Taiwan",
    default_payment_terms: 30,
    preferred_currency: "USD",
    preferred_language: "en",
    tags: ["tech", "international"],
    notes: null,
    created_at: "2025-03-10T11:00:00Z",
    updated_at: "2025-12-05T16:00:00Z",
    invoice_count: 5,
    total_invoiced: 15000,
    outstanding_amount: 0,
  },
];

// Query params schema
const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  tag: z.string().optional(),
});

/**
 * GET /api/clients
 * List all clients with pagination and filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = querySchema.parse(Object.fromEntries(searchParams));

    // TODO: Replace with Supabase query
    let clients = [...mockClients];

    // Apply filters
    if (query.search) {
      const search = query.search.toLowerCase();
      clients = clients.filter(
        (client) =>
          client.display_name.toLowerCase().includes(search) ||
          client.company_name?.toLowerCase().includes(search) ||
          client.email.toLowerCase().includes(search)
      );
    }
    if (query.tag) {
      clients = clients.filter((client) => client.tags.includes(query.tag!));
    }

    // Calculate pagination
    const total = clients.length;
    const totalPages = Math.ceil(total / query.limit);
    const start = (query.page - 1) * query.limit;
    const end = start + query.limit;
    const paginatedClients = clients.slice(start, end);

    const response: PaginatedResponse<ClientWithStats> = {
      data: paginatedClients,
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

    console.error("Failed to fetch clients:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/clients
 * Create a new client
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = clientSchema.parse(body);

    // Create client object
    const now = new Date().toISOString();
    const newClient: Client = {
      id: crypto.randomUUID(),
      business_id: "b1", // TODO: Get from auth context
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
      created_at: now,
      updated_at: now,
    };

    // TODO: Save to Supabase
    // const { data, error } = await supabase
    //   .from('clients')
    //   .insert(newClient)
    //   .select()
    //   .single();

    return NextResponse.json({ data: newClient }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: formatZodErrors(error) },
        { status: 400 }
      );
    }

    console.error("Failed to create client:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
