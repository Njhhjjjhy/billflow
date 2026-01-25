"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save, User, Loader2 } from "lucide-react";
import { PageTransition, PageHeader, PageSection } from "@/components/layout";
import { Button, Card, CardContent, Select, Input } from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { clientSchema, type ClientFormData } from "@/lib/validations";
import { getInitials } from "@/lib/format";
import type { Client } from "@/types";

const currencyOptions = [
  { value: "", label: "No preference" },
  { value: "TWD", label: "TWD - New Taiwan Dollar" },
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
];

const languageOptions = [
  { value: "", label: "No preference" },
  { value: "en", label: "English" },
  { value: "zh", label: "Chinese (Traditional)" },
];

const paymentTermsOptions = [
  { value: "", label: "Use default" },
  { value: "7", label: "Net 7 (7 days)" },
  { value: "14", label: "Net 14 (14 days)" },
  { value: "30", label: "Net 30 (30 days)" },
  { value: "45", label: "Net 45 (45 days)" },
  { value: "60", label: "Net 60 (60 days)" },
];

export default function EditClientPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<ClientFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(clientSchema) as any,
    defaultValues: {
      display_name: "",
      company_name: "",
      tax_id: "",
      contact_name: "",
      email: "",
      phone: "",
      line_id: "",
      address: "",
      city: "",
      postal_code: "",
      country: "Taiwan",
      default_payment_terms: undefined,
      preferred_currency: undefined,
      preferred_language: undefined,
      tags: [],
      notes: "",
    },
    mode: "onBlur",
  });

  const displayName = watch("display_name");

  // Fetch client data on mount
  useEffect(() => {
    async function fetchClient() {
      try {
        const response = await fetch(`/api/clients/${params.id}`);

        if (!response.ok) {
          if (response.status === 404) {
            setFetchError("Client not found");
          } else {
            setFetchError("Failed to load client");
          }
          return;
        }

        const { data } = await response.json();
        setClient(data);

        // Reset form with fetched data
        reset({
          display_name: data.display_name,
          company_name: data.company_name || "",
          tax_id: data.tax_id || "",
          contact_name: data.contact_name || "",
          email: data.email,
          phone: data.phone || "",
          line_id: data.line_id || "",
          address: data.address || "",
          city: data.city || "",
          postal_code: data.postal_code || "",
          country: data.country || "Taiwan",
          default_payment_terms: data.default_payment_terms || undefined,
          preferred_currency: data.preferred_currency || undefined,
          preferred_language: data.preferred_language || undefined,
          tags: data.tags || [],
          notes: data.notes || "",
        });
      } catch (error) {
        console.error("Failed to fetch client:", error);
        setFetchError("Failed to load client");
      } finally {
        setIsLoading(false);
      }
    }

    fetchClient();
  }, [params.id, reset]);

  const onSubmit: SubmitHandler<ClientFormData> = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/clients/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update client");
      }

      toast.success("Client updated", {
        description: `${data.display_name} has been updated.`,
      });

      router.push(`/app/clients/${params.id}`);
    } catch (error) {
      toast.error("Error", {
        description: error instanceof Error ? error.message : "Failed to update client. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <PageTransition>
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary-600)]" />
          <p className="text-[var(--color-text-secondary)]">Loading client...</p>
        </div>
      </PageTransition>
    );
  }

  // Error state
  if (fetchError) {
    return (
      <PageTransition>
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <p className="text-[var(--color-error-text)]">{fetchError}</p>
          <Link href="/app/clients">
            <Button variant="secondary" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Back to Clients
            </Button>
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PageHeader
        title="Edit Client"
        description={client?.display_name || "Update client information"}
        actions={
          <Link href={`/app/clients/${params.id}`}>
            <Button variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Cancel
            </Button>
          </Link>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-3xl space-y-6">
          {/* Basic Information */}
          <PageSection title="Basic Information">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-full bg-[var(--color-primary-100)] border-2 border-black flex items-center justify-center text-xl font-bold text-[var(--color-primary-600)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {displayName ? getInitials(displayName) : <User className="w-8 h-8 text-[var(--color-text-secondary)]" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--color-text-primary)]">
                      Client Avatar
                    </h3>
                    <p className="text-sm text-[var(--color-text-tertiary)]">
                      Avatar is generated from initials
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                  <Controller
                    name="display_name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Display Name"
                        placeholder="e.g., Acme Corp"
                        error={errors.display_name?.message}
                        required
                      />
                    )}
                  />
                  <Controller
                    name="company_name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={field.value || ""}
                        label="Company Name"
                        placeholder="e.g., Acme Corporation Ltd."
                        helperText="Full legal company name (optional)"
                      />
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                  <Controller
                    name="contact_name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={field.value || ""}
                        label="Contact Person"
                        placeholder="e.g., John Smith"
                      />
                    )}
                  />
                  <Controller
                    name="tax_id"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={field.value || ""}
                        label="Tax ID (統一編號)"
                        placeholder="12345678"
                        error={errors.tax_id?.message}
                        helperText="8-digit business registration number"
                      />
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </PageSection>

          {/* Contact Information */}
          <PageSection title="Contact Information">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="email"
                        label="Email"
                        placeholder="client@example.com"
                        error={errors.email?.message}
                        required
                      />
                    )}
                  />
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={field.value || ""}
                        type="tel"
                        label="Phone"
                        placeholder="02-1234-5678"
                        error={errors.phone?.message}
                      />
                    )}
                  />
                </div>

                <Controller
                  name="line_id"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field.value || ""}
                      label="LINE ID"
                      placeholder="line_id"
                      helperText="For quick messaging (common in Taiwan)"
                    />
                  )}
                />
              </CardContent>
            </Card>
          </PageSection>

          {/* Address */}
          <PageSection title="Address">
            <Card>
              <CardContent className="p-4 space-y-4">
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field.value || ""}
                      label="Street Address"
                      placeholder="No. 123, Example Road, Section 1"
                    />
                  )}
                />

                <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4">
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={field.value || ""}
                        label="City"
                        placeholder="Taipei"
                      />
                    )}
                  />
                  <Controller
                    name="postal_code"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={field.value || ""}
                        label="Postal Code"
                        placeholder="110"
                      />
                    )}
                  />
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Country"
                        placeholder="Taiwan"
                      />
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </PageSection>

          {/* Preferences */}
          <PageSection title="Preferences">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4">
                  <Controller
                    name="default_payment_terms"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Payment Terms"
                        options={paymentTermsOptions}
                        value={field.value?.toString() || ""}
                        onChange={(value) =>
                          field.onChange(value ? parseInt(value, 10) : undefined)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="preferred_currency"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Preferred Currency"
                        options={currencyOptions}
                        value={field.value || ""}
                        onChange={(value) =>
                          field.onChange(value || undefined)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="preferred_language"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Invoice Language"
                        options={languageOptions}
                        value={field.value || ""}
                        onChange={(value) =>
                          field.onChange(value || undefined)
                        }
                      />
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </PageSection>

          {/* Notes */}
          <PageSection title="Notes">
            <Card>
              <CardContent className="p-4">
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                        Internal Notes
                      </label>
                      <textarea
                        {...field}
                        value={field.value || ""}
                        rows={3}
                        placeholder="Any notes about this client..."
                        className="w-full px-3 py-2 bg-[var(--color-bg-secondary)] border-2 border-transparent rounded-lg text-[15px] outline-none focus:border-[var(--color-primary-600)] transition-colors resize-none"
                      />
                      <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                        Only visible to you, not the client
                      </p>
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </PageSection>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4">
            <Link href={`/app/clients/${params.id}`}>
              <Button variant="secondary" disabled={isSubmitting}>
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              leftIcon={<Save className="h-4 w-4" />}
              isLoading={isSubmitting}
              disabled={isSubmitting || !isDirty}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </PageTransition>
  );
}
