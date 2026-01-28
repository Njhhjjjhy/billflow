"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Send, Save, Info } from "lucide-react";
import { PageTransition, PageHeader, PageSection } from "@/components/layout";
import { Button, Card, CardContent, Select, Input } from "@/components/ui";
import { ClientSelector, LineItemsTable, InvoiceSummary } from "@/components/invoices";
import { useToast } from "@/components/ui/Toast";
import { invoiceSchema } from "@/lib/validations";

// Infer the form type from the schema
type InvoiceFormData = z.infer<typeof invoiceSchema>;
import { formatDateForInput, generateInvoiceNumber } from "@/lib/format";
import { addDays } from "@/lib/utils";
import type { Client, Currency, Language, DiscountType } from "@/types";

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
  {
    id: "c3",
    business_id: "b1",
    display_name: "Creative Agency",
    company_name: null,
    tax_id: null,
    contact_name: "Mike Liu",
    email: "mike@creative.agency",
    phone: null,
    line_id: "mikeliu",
    address: "No. 789, Zhongshan North Road",
    city: "Taipei",
    postal_code: "104",
    country: "Taiwan",
    default_payment_terms: null,
    preferred_currency: null,
    preferred_language: null,
    tags: [],
    notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

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

// Generate default values
function getDefaultValues(): Partial<InvoiceFormData> {
  const today = new Date();
  const dueDate = addDays(today, 14);

  return {
    client_id: "",
    currency: "TWD" as Currency,
    exchange_rate_to_twd: 1,
    items: [
      {
        id: crypto.randomUUID(),
        description: "",
        quantity: 1,
        unit_price: 0,
        amount: 0,
        sort_order: 0,
      },
    ],
    tax_rate: 0.05,
    discount_type: undefined,
    discount_value: undefined,
    issue_date: today,
    due_date: dueDate,
    language: "en" as Language,
    notes_external: "",
    notes_internal: "",
  };
}

export default function NewInvoicePage() {
  const router = useRouter();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(invoiceSchema) as any,
    defaultValues: getDefaultValues() as InvoiceFormData,
    mode: "onBlur",
  });

  // Watch form values for live updates
  const watchedItems = watch("items") || [];
  const watchedCurrency = watch("currency") as Currency;
  const watchedTaxRate = watch("tax_rate") || 0.05;
  const watchedDiscountType = watch("discount_type") as DiscountType | undefined;
  const watchedDiscountValue = watch("discount_value");
  const watchedClientId = watch("client_id");

  // Get selected client
  const selectedClient = useMemo(
    () => mockClients.find((c) => c.id === watchedClientId),
    [watchedClientId]
  );

  // Handle client selection and apply client preferences
  const handleClientChange = useCallback(
    (clientId: string) => {
      setValue("client_id", clientId);

      const client = mockClients.find((c) => c.id === clientId);
      if (client) {
        // Apply client preferences
        if (client.preferred_currency) {
          setValue("currency", client.preferred_currency);
        }
        if (client.preferred_language) {
          setValue("language", client.preferred_language);
        }
        if (client.default_payment_terms) {
          const today = new Date();
          setValue("due_date", addDays(today, client.default_payment_terms));
        }
      }
    },
    [setValue]
  );

  // Handle line items change
  const handleItemsChange = useCallback(
    (items: InvoiceFormData["items"]) => {
      setValue("items", items, { shouldValidate: true });
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
  const submitInvoice = async (data: InvoiceFormData, action: "draft" | "send") => {
    setIsSubmitting(true);

    try {
      // Generate invoice number
      const invoiceNumber = generateInvoiceNumber("INV", 43);

      // Prepare data for API
      const invoiceData = {
        ...data,
        invoice_number: invoiceNumber,
        status: action === "send" ? "sent" : "draft",
      };

      console.log("Submitting invoice:", invoiceData);

      // TODO: Submit to API
      // const response = await fetch('/api/invoices', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(invoiceData),
      // });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(
        action === "send" ? "Invoice sent!" : "Invoice saved",
        {
          description:
            action === "send"
              ? `Invoice ${invoiceNumber} has been sent to ${selectedClient?.email}`
              : `Invoice ${invoiceNumber} saved as draft`,
        }
      );

      router.push("/app/invoices");
    } catch {
      toast.error("Error", {
        description: "Failed to create invoice. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Type-safe submit handlers
  const onSubmitSend: SubmitHandler<InvoiceFormData> = (data) => submitInvoice(data, "send");
  const onSubmitDraft: SubmitHandler<InvoiceFormData> = (data) => submitInvoice(data, "draft");

  return (
    <PageTransition>
      <PageHeader
        title="New Invoice"
        description="Create a new invoice for your client"
        actions={
          <Link href="/app/invoices">
            <Button variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Back
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
                        onChange={handleClientChange}
                        placeholder="Select a client"
                        error={errors.client_id?.message}
                        required
                        onAddNew={() => router.push("/app/clients/new")}
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
                        items={field.value.map((item) => ({
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
                          value={formatDateForInput(field.value)}
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
                          value={formatDateForInput(field.value)}
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
                          value={(field.value * 100).toString()}
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
                  leftIcon={<Send className="h-4 w-4" />}
                  onClick={() => void handleSubmit(onSubmitSend)()}
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Save & Send
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  leftIcon={<Save className="h-4 w-4" />}
                  onClick={() => void handleSubmit(onSubmitDraft)()}
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Save as Draft
                </Button>
              </div>

              {/* Help text */}
              <div className="mt-6 p-4 bg-[var(--color-bg-tertiary)] rounded-[12px] border-2 border-[var(--color-border-light)]">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-[var(--color-primary-600)] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    <p className="font-medium text-[var(--color-text-primary)] mb-1">
                      Taiwan Tax Invoice
                    </p>
                    <p>
                      This invoice will include standard 5% 營業稅 (business tax).
                      Make sure your business tax ID is set up in settings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </PageTransition>
  );
}
