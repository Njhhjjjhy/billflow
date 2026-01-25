"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Plus,
  Building2,
  MessageCircle,
  Calendar,
  DollarSign,
} from "lucide-react";
import { PageTransition, PageHeader, PageSection } from "@/components/layout";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Modal,
  ModalHeader,
  ModalFooter,
  InvoiceStatusBadge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
} from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency, formatDate, getInitials } from "@/lib/format";
import type { ClientWithStats, InvoiceWithClient } from "@/types";

// Mock client data - will be replaced with real data from Supabase
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
  address: "No. 123, Xinyi Road, Section 4",
  city: "Taipei",
  postal_code: "110",
  country: "Taiwan",
  default_payment_terms: 14,
  preferred_currency: "TWD",
  preferred_language: "zh",
  tags: ["design", "regular"],
  notes: "Long-term client. Prefers communication via LINE.",
  created_at: "2024-06-15T09:00:00Z",
  updated_at: "2026-01-20T14:30:00Z",
  invoice_count: 12,
  total_invoiced: 540000,
  outstanding_amount: 45000,
};

// Mock invoices for this client
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
    language: "zh",
    notes_external: null,
    notes_internal: null,
    pdf_url: null,
    sent_at: "2026-01-15T10:30:00Z",
    created_at: "2026-01-15T09:00:00Z",
    updated_at: "2026-01-15T10:30:00Z",
    client: mockClient,
  },
  {
    id: "2",
    business_id: "b1",
    client_id: "c1",
    invoice_number: "INV-2025-038",
    status: "paid",
    currency: "TWD",
    exchange_rate_to_twd: 1,
    subtotal: 76190,
    tax_rate: 0.05,
    tax_amount: 3810,
    discount_type: null,
    discount_value: 0,
    discount_amount: 0,
    total: 80000,
    issue_date: "2025-12-01",
    due_date: "2025-12-15",
    paid_date: "2025-12-10",
    paid_amount: 80000,
    language: "zh",
    notes_external: null,
    notes_internal: null,
    pdf_url: null,
    sent_at: "2025-12-01T09:00:00Z",
    created_at: "2025-12-01T09:00:00Z",
    updated_at: "2025-12-10T14:00:00Z",
    client: mockClient,
  },
];

// Map our status type to Badge status type
type BadgeStatus = "draft" | "sent" | "viewed" | "paid" | "overdue" | "pending";

function mapStatusToBadge(status: string): BadgeStatus {
  if (status === "cancelled") return "pending";
  return status as BadgeStatus;
}

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // In real app, fetch client by ID
  const client = mockClient;
  const invoices = mockInvoices;

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      // TODO: Delete client via API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Client deleted", {
        description: `${client.display_name} has been deleted.`,
      });
      router.push("/app/clients");
    } catch {
      toast.error("Error", {
        description: "Failed to delete client. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <PageHeader
        title={client.display_name}
        description={client.company_name || "Client"}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/app/clients">
              <Button variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />}>
                Back
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 desktop:grid-cols-[1fr_320px] gap-6">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader title="Contact Information" />
            <CardContent>
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-full bg-[var(--color-primary-100)] border-2 border-black flex items-center justify-center text-xl font-bold text-[var(--color-primary-600)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {getInitials(client.display_name)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {client.display_name}
                  </h3>
                  {client.company_name && (
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {client.company_name}
                    </p>
                  )}
                  {client.contact_name && (
                    <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
                      Contact: {client.contact_name}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-[var(--color-bg-secondary)] rounded-lg">
                  <Mail className="w-5 h-5 text-[var(--color-text-tertiary)]" />
                  <div>
                    <p className="text-xs text-[var(--color-text-tertiary)]">Email</p>
                    <a
                      href={`mailto:${client.email}`}
                      className="text-sm text-[var(--color-primary-600)] hover:underline"
                    >
                      {client.email}
                    </a>
                  </div>
                </div>

                {client.phone && (
                  <div className="flex items-center gap-3 p-3 bg-[var(--color-bg-secondary)] rounded-lg">
                    <Phone className="w-5 h-5 text-[var(--color-text-tertiary)]" />
                    <div>
                      <p className="text-xs text-[var(--color-text-tertiary)]">Phone</p>
                      <a
                        href={`tel:${client.phone}`}
                        className="text-sm text-[var(--color-text-primary)]"
                      >
                        {client.phone}
                      </a>
                    </div>
                  </div>
                )}

                {client.line_id && (
                  <div className="flex items-center gap-3 p-3 bg-[var(--color-bg-secondary)] rounded-lg">
                    <MessageCircle className="w-5 h-5 text-[var(--color-text-tertiary)]" />
                    <div>
                      <p className="text-xs text-[var(--color-text-tertiary)]">LINE ID</p>
                      <p className="text-sm text-[var(--color-text-primary)]">
                        {client.line_id}
                      </p>
                    </div>
                  </div>
                )}

                {client.tax_id && (
                  <div className="flex items-center gap-3 p-3 bg-[var(--color-bg-secondary)] rounded-lg">
                    <FileText className="w-5 h-5 text-[var(--color-text-tertiary)]" />
                    <div>
                      <p className="text-xs text-[var(--color-text-tertiary)]">Tax ID</p>
                      <p className="text-sm text-[var(--color-text-primary)]">
                        {client.tax_id}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {client.address && (
                <div className="flex items-start gap-3 mt-4 p-3 bg-[var(--color-bg-secondary)] rounded-lg">
                  <MapPin className="w-5 h-5 text-[var(--color-text-tertiary)] mt-0.5" />
                  <div>
                    <p className="text-xs text-[var(--color-text-tertiary)]">Address</p>
                    <p className="text-sm text-[var(--color-text-primary)]">
                      {client.address}
                      {client.city && `, ${client.city}`}
                      {client.postal_code && ` ${client.postal_code}`}
                      {client.country && client.country !== "Taiwan" && `, ${client.country}`}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Invoices */}
          <Card>
            <CardHeader
              title="Invoices"
              action={
                <Link href={`/app/invoices/new?client=${client.id}`}>
                  <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                    New Invoice
                  </Button>
                </Link>
              }
            />
            <CardContent className="p-0">
              <Table caption="Client invoices">
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden tablet:table-cell">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.length > 0 ? (
                    invoices.map((invoice) => (
                      <TableRow
                        key={invoice.id}
                        onClick={() => router.push(`/app/invoices/${invoice.id}`)}
                      >
                        <TableCell isRowHeader>
                          <span className="font-medium">{invoice.invoice_number}</span>
                        </TableCell>
                        <TableCell numeric>
                          {formatCurrency(invoice.total, invoice.currency)}
                        </TableCell>
                        <TableCell>
                          <InvoiceStatusBadge status={mapStatusToBadge(invoice.status)} />
                        </TableCell>
                        <TableCell className="hidden tablet:table-cell">
                          {formatDate(invoice.issue_date, "en")}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableEmpty
                      colSpan={4}
                      icon={<FileText className="h-8 w-8" />}
                      message="No invoices yet"
                      action={
                        <Link href={`/app/invoices/new?client=${client.id}`}>
                          <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                            Create Invoice
                          </Button>
                        </Link>
                      }
                    />
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Notes */}
          {client.notes && (
            <Card>
              <CardHeader title="Notes" />
              <CardContent>
                <p className="text-[var(--color-text-secondary)] whitespace-pre-wrap">
                  {client.notes}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardHeader title="Actions" />
            <CardContent className="space-y-3">
              <Link href={`/app/invoices/new?client=${client.id}`} className="block">
                <Button className="w-full" leftIcon={<Plus className="h-4 w-4" />}>
                  New Invoice
                </Button>
              </Link>

              <Link href={`/app/clients/${client.id}/edit`} className="block">
                <Button
                  className="w-full"
                  variant="secondary"
                  leftIcon={<Edit className="h-4 w-4" />}
                >
                  Edit Client
                </Button>
              </Link>

              <Button
                className="w-full"
                variant="ghost"
                leftIcon={<Trash2 className="h-4 w-4" />}
                onClick={() => setIsDeleteModalOpen(true)}
              >
                Delete Client
              </Button>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader title="Summary" />
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[var(--color-text-secondary)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--color-text-secondary)]">Total Invoices</p>
                  <p className="font-semibold text-[var(--color-text-primary)]">
                    {client.invoice_count}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-success-bg)] flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[var(--color-success-text)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--color-text-secondary)]">Total Invoiced</p>
                  <p className="font-semibold text-[var(--color-text-primary)]">
                    {formatCurrency(client.total_invoiced, "TWD")}
                  </p>
                </div>
              </div>

              {client.outstanding_amount > 0 && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-warning-bg)] flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-[var(--color-warning-text)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-secondary)]">Outstanding</p>
                    <p className="font-semibold text-[var(--color-warning-text)]">
                      {formatCurrency(client.outstanding_amount, "TWD")}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader title="Preferences" />
            <CardContent className="space-y-3">
              {client.preferred_currency && (
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Currency</span>
                  <span className="font-medium text-[var(--color-text-primary)]">
                    {client.preferred_currency}
                  </span>
                </div>
              )}
              {client.preferred_language && (
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Language</span>
                  <span className="font-medium text-[var(--color-text-primary)]">
                    {client.preferred_language === "zh" ? "Chinese" : "English"}
                  </span>
                </div>
              )}
              {client.default_payment_terms && (
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Payment Terms</span>
                  <span className="font-medium text-[var(--color-text-primary)]">
                    Net {client.default_payment_terms}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-tertiary)]">
                <Calendar className="w-3 h-3" />
                <span>Added {formatDate(client.created_at, "en")}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-tertiary)]">
                <Calendar className="w-3 h-3" />
                <span>Updated {formatDate(client.updated_at, "en")}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <ModalHeader
          title="Delete Client"
          description={`Are you sure you want to delete ${client.display_name}? This will also delete all associated invoices. This action cannot be undone.`}
        />
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </PageTransition>
  );
}
