"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save, AlertTriangle } from "lucide-react";
import { PageTransition, PageHeader, PageSection } from "@/components/layout";
import { Button, Card, CardHeader, CardContent, Select, Input } from "@/components/ui";
import { ClientSelector, LineItemsTable, InvoiceSummary } from "@/components/invoices";
import { useToast } from "@/components/ui/Toast";
import { invoiceSchema } from "@/lib/validations";
import { formatDateForInput } from "@/lib/format";
import type { Client, Currency, Language, DiscountType, InvoiceFull } from "@/types";

type InvoiceFormData = z.infer<typeof invoiceSchema>;

// Mock clients - will be replaced with real data from Supabase
const mockClients: Client[] = [
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Mock invoice - will be replaced with API fetch
const mockInvoice: InvoiceFull = {
  id: "1",
  business_id: "b1",
  client_id: "c1",
  invoice_number: "INV-2026-042",
  status: "draft",
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
  sent_at: null,
  created_at: "2026-01-15T09:00:00Z",
  updated_at: "2026-01-15T09:00:00Z",
  client: mockClients[0],
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

const currencyOptions = [
  { value: "TWD", label: "TWD - New Taiwan Dollar" },
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "zh", label: "Chinese (Traditional)" },
];

const discountTypeOptions = [
  { value: "", label: "No discount" },
  { value: "percentage", label: "Percentage (%)" },
  { value: "fixed", label: "Fixed amount" },
];

export default function EditInvoicePage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // In real app, fetch invoice by ID
  const invoice = mockInvoice;
  const isDraft = invoice.status === "draft";

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<InvoiceFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(invoiceSchema) as any,
    mode: "onBlur",
  });

  // Load invoice data into form
  useEffect(() => {
    if (invoice) {
      reset({
        client_id: invoice.client_id,
        currency: invoice.currency,
        exchange_rate_to_twd: invoice.exchange_rate_to_twd,
        items: invoice.items.map((item) => ({
          id: item.id,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
          amount: item.amount,
          sort_order: item.sort_order,
        })),
        tax_rate: invoice.tax_rate,
        discount_type: invoice.discount_type || undefined,
        discount_value: invoice.discount_value || undefined,
        issue_date: new Date(invoice.issue_date),
        due_date: new Date(invoice.due_date),
        language: invoice.language,
        notes_external: invoice.notes_external || "",
        notes_internal: invoice.notes_internal || "",
      } as InvoiceFormData);
      setIsLoading(false);
    }
  }, [invoice, reset]);

  // Watch form values for live updates
  const watchedItems = watch("items") || [];
  const watchedCurrency = watch("currency") as Currency;
  const watchedTaxRate = watch("tax_rate") || 0.05;
  const watchedDiscountType = watch("discount_type") as DiscountType | undefined;
  const watchedDiscountValue = watch("discount_value");

  // Handle line items change
  const handleItemsChange = useCallback(
    (items: InvoiceFormData["items"]) => {
      setValue("items", items, { shouldValidate: true, shouldDirty: true });
    },
    [setValue]
  );

  // Format errors for LineItemsTable
  const lineItemErrors = useMemo(() => {
    const result: Record<string, string> = {};
    if (errors.items) {
      if (Array.isArray(errors.items)) {
        errors.items.forEach((itemError, index) => {
          if (itemError?.description?.message) {
            result[`items.${index}.description`] = itemError.description.message;
          }
          if (itemError?.quantity?.message) {
            result[`items.${index}.quantity`] = itemError.quantity.message;
          }
          if (itemError?.unit_price?.message) {
            result[`items.${index}.unit_price`] = itemError.unit_price.message;
          }
        });
      } else if (errors.items.message) {
        result["items"] = errors.items.message;
      }
    }
    return result;
  }, [errors.items]);

  // Handle form submission
  const submitInvoice: SubmitHandler<InvoiceFormData> = async (data) => {
    setIsSubmitting(true);

    try {
      const invoiceData = {
        ...data,
        id: invoice.id,
        invoice_number: invoice.invoice_number,
      };

      console.log("Updating invoice:", invoiceData);

      // TODO: Submit to API
      // const response = await fetch(`/api/invoices/${invoice.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(invoiceData),
      // });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Invoice updated", {
        description: `Invoice ${invoice.invoice_number} has been updated.`,
      });

      router.push(`/app/invoices/${invoice.id}`);
    } catch {
      toast.error("Error", {
        description: "Failed to update invoice. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect if invoice is not a draft
  if (!isDraft && !isLoading) {
    return (
      <PageTransition>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 rounded-full bg-[var(--color-warning-bg)] flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-[var(--color-warning-text)]" />
          </div>
          <h1 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
            Cannot Edit Invoice
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-6 text-center max-w-md">
            Only draft invoices can be edited. This invoice has already been sent.
          </p>
          <Link href={`/app/invoices/${invoice.id}`}>
            <Button>View Invoice</Button>
          </Link>
        </div>
      </PageTransition>
    );
  }

  if (isLoading) {
    return (
      <PageTransition>
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-[var(--color-bg-tertiary)] rounded w-1/3" />
          <div className="h-64 bg-[var(--color-bg-tertiary)] rounded" />
          <div className="h-64 bg-[var(--color-bg-tertiary)] rounded" />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PageHeader
        title={`Edit ${invoice.invoice_number}`}
        description="Update invoice details"
        actions={
          <Link href={`/app/invoices/${invoice.id}`}>
            <Button variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Cancel
            </Button>
          </Link>
        }
      />

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 desktop:grid-cols-[1fr_360px] gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Client Selection */}
            <PageSection title="Client">
              <Card>
                <CardContent className="p-4">
                  <Controller
                    name="client_id"
                    control={control}
                    render={({ field }) => (
                      <ClientSelector
                        clients={mockClients}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select a client"
                        error={errors.client_id?.message}
                        required
                      />
                    )}
                  />
                </CardContent>
              </Card>
            </PageSection>

            {/* Line Items */}
            <PageSection title="Line Items">
              <Card>
                <CardContent className="p-4">
                  <Controller
                    name="items"
                    control={control}
                    render={({ field }) => (
                      <LineItemsTable
                        items={(field.value || []).map((item) => ({
                          id: item.id || crypto.randomUUID(),
                          description: item.description,
                          quantity: item.quantity,
                          unit_price: item.unit_price,
                          amount: item.amount,
                        }))}
                        currency={watchedCurrency}
                        onChange={(items) =>
                          handleItemsChange(
                            items.map((item, index) => ({
                              ...item,
                              sort_order: index,
                            }))
                          )
                        }
                        errors={lineItemErrors}
                      />
                    )}
                  />
                </CardContent>
              </Card>
            </PageSection>

            {/* Invoice Settings */}
            <PageSection title="Invoice Settings">
              <Card>
                <CardContent className="p-4 space-y-4">
                  {/* Dates */}
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                    <Controller
                      name="issue_date"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="date"
                          label="Issue Date"
                          value={field.value ? formatDateForInput(field.value) : ""}
                          onChange={(e) => field.onChange(new Date(e.target.value))}
                          error={errors.issue_date?.message}
                          required
                        />
                      )}
                    />
                    <Controller
                      name="due_date"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="date"
                          label="Due Date"
                          value={field.value ? formatDateForInput(field.value) : ""}
                          onChange={(e) => field.onChange(new Date(e.target.value))}
                          error={errors.due_date?.message}
                          required
                        />
                      )}
                    />
                  </div>

                  {/* Currency and Language */}
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                    <Controller
                      name="currency"
                      control={control}
                      render={({ field }) => (
                        <Select
                          label="Currency"
                          options={currencyOptions}
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.currency?.message}
                          required
                        />
                      )}
                    />
                    <Controller
                      name="language"
                      control={control}
                      render={({ field }) => (
                        <Select
                          label="Invoice Language"
                          options={languageOptions}
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.language?.message}
                          required
                        />
                      )}
                    />
                  </div>

                  {/* Tax Rate */}
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                    <Controller
                      name="tax_rate"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="number"
                          label="Tax Rate (%)"
                          value={((field.value || 0) * 100).toString()}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) / 100 || 0)
                          }
                          min="0"
                          max="100"
                          step="0.1"
                          error={errors.tax_rate?.message}
                          helperText="Taiwan standard: 5%"
                        />
                      )}
                    />
                  </div>

                  {/* Discount */}
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                    <Controller
                      name="discount_type"
                      control={control}
                      render={({ field }) => (
                        <Select
                          label="Discount Type"
                          options={discountTypeOptions}
                          value={field.value || ""}
                          onChange={(value) =>
                            field.onChange(value || undefined)
                          }
                        />
                      )}
                    />
                    {watchedDiscountType && (
                      <Controller
                        name="discount_value"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="number"
                            label={
                              watchedDiscountType === "percentage"
                                ? "Discount (%)"
                                : "Discount Amount"
                            }
                            value={field.value?.toString() || ""}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                            min="0"
                            step={watchedDiscountType === "percentage" ? "1" : "0.01"}
                          />
                        )}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </PageSection>

            {/* Notes */}
            <PageSection title="Notes">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <Controller
                    name="notes_external"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                          Notes for Client
                        </label>
                        <textarea
                          {...field}
                          value={field.value || ""}
                          rows={3}
                          placeholder="Payment terms, thank you message, etc."
                          className="w-full px-3 py-2 bg-[var(--color-bg-secondary)] border-2 border-transparent rounded-lg text-[15px] outline-none focus:border-[var(--color-primary-600)] transition-colors resize-none"
                        />
                        <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                          Visible to the client on the invoice
                        </p>
                      </div>
                    )}
                  />

                  <Controller
                    name="notes_internal"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                          Internal Notes
                        </label>
                        <textarea
                          {...field}
                          value={field.value || ""}
                          rows={2}
                          placeholder="Private notes for your reference"
                          className="w-full px-3 py-2 bg-[var(--color-bg-secondary)] border-2 border-transparent rounded-lg text-[15px] outline-none focus:border-[var(--color-primary-600)] transition-colors resize-none"
                        />
                        <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                          Only visible to you
                        </p>
                      </div>
                    )}
                  />
                </CardContent>
              </Card>
            </PageSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <div className="desktop:sticky desktop:top-6">
              <InvoiceSummary
                items={watchedItems.map((item) => ({
                  quantity: item.quantity,
                  unit_price: item.unit_price,
                  amount: item.amount,
                }))}
                currency={watchedCurrency}
                taxRate={watchedTaxRate}
                discountType={watchedDiscountType}
                discountValue={watchedDiscountValue}
                className="mb-6"
              />

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  type="button"
                  className="w-full"
                  leftIcon={<Save className="h-4 w-4" />}
                  onClick={() => void handleSubmit(submitInvoice)()}
                  isLoading={isSubmitting}
                  disabled={isSubmitting || !isDirty}
                >
                  Save Changes
                </Button>

                <Link href={`/app/invoices/${invoice.id}`} className="block">
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </Link>
              </div>

              {/* Unsaved changes warning */}
              {isDirty && (
                <div className="mt-4 p-3 bg-[var(--color-warning-bg)] rounded-lg border-2 border-[var(--color-warning-border)]">
                  <p className="text-sm text-[var(--color-warning-text)]">
                    You have unsaved changes
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </PageTransition>
  );
}
