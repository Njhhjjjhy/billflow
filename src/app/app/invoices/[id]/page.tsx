"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  Download,
  Edit,
  Copy,
  Trash2,
  CheckCircle,
  Mail,
  Calendar,
  Building2,
  FileText,
} from "lucide-react";
import { PageTransition, PageHeader } from "@/components/layout";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  InvoiceStatusBadge,
  Modal,
  ModalHeader,
  ModalFooter,
} from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency, formatDate, formatDueDate, getDaysUntilDue } from "@/lib/format";
import type { InvoiceFull } from "@/types";

// Mock invoice data - will be replaced with real data from Supabase
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

// Map our status type to Badge status type
type BadgeStatus = "draft" | "sent" | "viewed" | "paid" | "overdue" | "pending";

function mapStatusToBadge(status: string): BadgeStatus {
  if (status === "cancelled") return "pending";
  return status as BadgeStatus;
}

export default function InvoiceDetailPage() {
  const _params = useParams(); // Will be used when fetching from Supabase
  const router = useRouter();
  const toast = useToast();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMarkPaidModalOpen, setIsMarkPaidModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Replace with real data fetch using _params.id
  const invoice = mockInvoice;

  const daysUntilDue = useMemo(
    () => getDaysUntilDue(invoice.due_date),
    [invoice.due_date]
  );

  const isDraft = invoice.status === "draft";
  const isPaid = invoice.status === "paid";
  const isOverdue = invoice.status === "overdue" || daysUntilDue < 0;

  // Actions
  const handleSend = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Invoice sent!", {
        description: `Invoice ${invoice.invoice_number} has been sent to ${invoice.client.email}`,
      });
    } catch {
      toast.error("Error", {
        description: "Failed to send invoice. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/invoices/${invoice.id}/pdf`);

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      // Get the PDF blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${invoice.invoice_number}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("PDF downloaded", {
        description: `${invoice.invoice_number}.pdf`,
      });
    } catch {
      toast.error("Error", {
        description: "Failed to generate PDF. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDuplicate = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Invoice duplicated", {
        description: "A new draft invoice has been created.",
      });
      router.push("/app/invoices/new");
    } catch {
      toast.error("Error", {
        description: "Failed to duplicate invoice. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkPaid = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Invoice marked as paid", {
        description: `Invoice ${invoice.invoice_number} has been marked as paid.`,
      });
      setIsMarkPaidModalOpen(false);
    } catch {
      toast.error("Error", {
        description: "Failed to update invoice. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Invoice deleted", {
        description: `Invoice ${invoice.invoice_number} has been deleted.`,
      });
      router.push("/app/invoices");
    } catch {
      toast.error("Error", {
        description: "Failed to delete invoice. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <PageHeader
        title={invoice.invoice_number}
        description={`Issued ${formatDate(invoice.issue_date, "en")}`}
        actions={
          <div className="flex items-center gap-3">
            <InvoiceStatusBadge status={mapStatusToBadge(invoice.status)} />
            <Link href="/app/invoices">
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
          {/* Client Info */}
          <Card>
            <CardHeader title="Bill To" />
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-bg-tertiary)] border-2 border-black flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[var(--color-text-secondary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">
                    {invoice.client.display_name}
                  </h3>
                  {invoice.client.company_name && (
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {invoice.client.company_name}
                    </p>
                  )}
                  <div className="mt-2 space-y-1 text-sm text-[var(--color-text-secondary)]">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <a
                        href={`mailto:${invoice.client.email}`}
                        className="hover:text-[var(--color-primary-600)]"
                      >
                        {invoice.client.email}
                      </a>
                    </div>
                    {invoice.client.tax_id && (
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>Tax ID: {invoice.client.tax_id}</span>
                      </div>
                    )}
                    {invoice.client.address && (
                      <p className="text-[var(--color-text-tertiary)]">
                        {invoice.client.address}
                        {invoice.client.city && `, ${invoice.client.city}`}
                        {invoice.client.postal_code && ` ${invoice.client.postal_code}`}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Line Items */}
          <Card>
            <CardHeader title="Line Items" />
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-[var(--color-border-light)]">
                      <th className="text-left p-4 text-sm font-medium text-[var(--color-text-secondary)]">
                        Description
                      </th>
                      <th className="text-right p-4 text-sm font-medium text-[var(--color-text-secondary)]">
                        Qty
                      </th>
                      <th className="text-right p-4 text-sm font-medium text-[var(--color-text-secondary)]">
                        Unit Price
                      </th>
                      <th className="text-right p-4 text-sm font-medium text-[var(--color-text-secondary)]">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-[var(--color-border-light)] last:border-0"
                      >
                        <td className="p-4 text-[var(--color-text-primary)]">
                          {item.description}
                        </td>
                        <td className="p-4 text-right text-[var(--color-text-primary)]">
                          {item.quantity}
                        </td>
                        <td className="p-4 text-right text-[var(--color-text-primary)]">
                          {formatCurrency(item.unit_price, invoice.currency)}
                        </td>
                        <td className="p-4 text-right font-medium text-[var(--color-text-primary)]">
                          {formatCurrency(item.amount, invoice.currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="border-t-2 border-[var(--color-border-light)] p-4">
                <div className="max-w-xs ml-auto space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                    <span className="text-[var(--color-text-primary)]">
                      {formatCurrency(invoice.subtotal, invoice.currency)}
                    </span>
                  </div>
                  {invoice.discount_amount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-text-secondary)]">Discount</span>
                      <span className="text-[var(--color-success-text)]">
                        -{formatCurrency(invoice.discount_amount, invoice.currency)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)]">
                      Tax ({(invoice.tax_rate * 100).toFixed(0)}%)
                    </span>
                    <span className="text-[var(--color-text-primary)]">
                      {formatCurrency(invoice.tax_amount, invoice.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-dashed border-[var(--color-border-light)]">
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      Total
                    </span>
                    <span
                      className="text-xl font-bold text-[var(--color-primary-600)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {formatCurrency(invoice.total, invoice.currency)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {(invoice.notes_external || invoice.notes_internal) && (
            <Card>
              <CardHeader title="Notes" />
              <CardContent className="space-y-4">
                {invoice.notes_external && (
                  <div>
                    <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                      Notes for Client
                    </h3>
                    <p className="text-[var(--color-text-primary)]">
                      {invoice.notes_external}
                    </p>
                  </div>
                )}
                {invoice.notes_internal && (
                  <div>
                    <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                      Internal Notes
                    </h3>
                    <p className="text-[var(--color-text-tertiary)]">
                      {invoice.notes_internal}
                    </p>
                  </div>
                )}
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
              {!isPaid && (
                <Button
                  className="w-full"
                  leftIcon={<CheckCircle className="h-4 w-4" />}
                  onClick={() => setIsMarkPaidModalOpen(true)}
                  disabled={isLoading}
                >
                  Mark as Paid
                </Button>
              )}

              {isDraft ? (
                <Button
                  className="w-full"
                  variant="secondary"
                  leftIcon={<Send className="h-4 w-4" />}
                  onClick={handleSend}
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Send Invoice
                </Button>
              ) : (
                <Button
                  className="w-full"
                  variant="secondary"
                  leftIcon={<Send className="h-4 w-4" />}
                  onClick={handleSend}
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Resend Invoice
                </Button>
              )}

              <Button
                className="w-full"
                variant="secondary"
                leftIcon={<Download className="h-4 w-4" />}
                onClick={handleDownloadPDF}
                isLoading={isLoading}
                disabled={isLoading}
              >
                Download PDF
              </Button>

              <div className="pt-2 border-t border-[var(--color-border-light)] space-y-3">
                {isDraft && (
                  <Link href={`/app/invoices/${invoice.id}/edit`} className="block">
                    <Button
                      className="w-full"
                      variant="ghost"
                      leftIcon={<Edit className="h-4 w-4" />}
                    >
                      Edit Invoice
                    </Button>
                  </Link>
                )}

                <Button
                  className="w-full"
                  variant="ghost"
                  leftIcon={<Copy className="h-4 w-4" />}
                  onClick={handleDuplicate}
                  disabled={isLoading}
                >
                  Duplicate
                </Button>

                {isDraft && (
                  <Button
                    className="w-full"
                    variant="ghost"
                    leftIcon={<Trash2 className="h-4 w-4" />}
                    onClick={() => setIsDeleteModalOpen(true)}
                    disabled={isLoading}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Due Date */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isPaid
                      ? "bg-[var(--color-success-bg)]"
                      : isOverdue
                      ? "bg-[var(--color-error-bg)]"
                      : "bg-[var(--color-bg-tertiary)]"
                  }`}
                >
                  <Calendar
                    className={`w-5 h-5 ${
                      isPaid
                        ? "text-[var(--color-success-text)]"
                        : isOverdue
                        ? "text-[var(--color-error-text)]"
                        : "text-[var(--color-text-secondary)]"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-sm text-[var(--color-text-secondary)]">Due Date</p>
                  <p
                    className={`font-semibold ${
                      isPaid
                        ? "text-[var(--color-success-text)]"
                        : isOverdue
                        ? "text-[var(--color-error-text)]"
                        : "text-[var(--color-text-primary)]"
                    }`}
                  >
                    {formatDate(invoice.due_date, "en")}
                  </p>
                  <p
                    className={`text-xs ${
                      isPaid
                        ? "text-[var(--color-success-text)]"
                        : isOverdue
                        ? "text-[var(--color-error-text)]"
                        : "text-[var(--color-text-tertiary)]"
                    }`}
                  >
                    {isPaid ? "Paid" : formatDueDate(invoice.due_date)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity */}
          <Card>
            <CardHeader title="Activity" />
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-[var(--color-success-text)]" />
                <div>
                  <p className="text-sm text-[var(--color-text-primary)]">
                    Invoice sent to {invoice.client.email}
                  </p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    {formatDate(invoice.sent_at || invoice.created_at, "en")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-[var(--color-text-tertiary)]" />
                <div>
                  <p className="text-sm text-[var(--color-text-primary)]">
                    Invoice created
                  </p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    {formatDate(invoice.created_at, "en")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <ModalHeader
          title="Delete Invoice"
          description={`Are you sure you want to delete invoice ${invoice.invoice_number}? This action cannot be undone.`}
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

      {/* Mark Paid Modal */}
      <Modal isOpen={isMarkPaidModalOpen} onClose={() => setIsMarkPaidModalOpen(false)}>
        <ModalHeader
          title="Mark as Paid"
          description={`Mark invoice ${invoice.invoice_number} as paid? This will update the invoice status to paid.`}
        />
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsMarkPaidModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleMarkPaid} isLoading={isLoading} disabled={isLoading}>
            Mark as Paid
          </Button>
        </ModalFooter>
      </Modal>
    </PageTransition>
  );
}
