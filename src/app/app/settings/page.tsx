"use client";

import { useState } from "react";
import { Building2, User, FileText, Bell } from "lucide-react";
import { PageTransition, PageHeader } from "@/components/layout";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Select,
  Checkbox,
  useToast,
} from "@/components/ui";

const currencyOptions = [
  { value: "TWD", label: "TWD - New Taiwan Dollar" },
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
];

const paymentTermsOptions = [
  { value: "7", label: "Net 7 (7 days)" },
  { value: "14", label: "Net 14 (14 days)" },
  { value: "30", label: "Net 30 (30 days)" },
  { value: "60", label: "Net 60 (60 days)" },
];

const taxRateOptions = [
  { value: "0", label: "0% (No tax)" },
  { value: "5", label: "5% (Taiwan business tax)" },
];

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const settingsSections: SettingsSection[] = [
  { id: "business", title: "Business profile", description: "Your company information", icon: <Building2 size={20} /> },
  { id: "account", title: "Account", description: "Personal details and preferences", icon: <User size={20} /> },
  { id: "invoice", title: "Invoice defaults", description: "Default settings for new invoices", icon: <FileText size={20} /> },
  { id: "notifications", title: "Notifications", description: "Email and reminder settings", icon: <Bell size={20} /> },
];

function SettingsNav({
  sections,
  activeSection,
  onSelect,
}: {
  sections: SettingsSection[];
  activeSection: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav className="space-y-1">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSelect(section.id)}
          className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
            transition-colors border-2
            ${
              activeSection === section.id
                ? "bg-[var(--color-primary-50)] border-[var(--color-primary-600)] text-[var(--color-primary-700)]"
                : "border-transparent hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]"
            }
          `}
        >
          <span className="flex-shrink-0">{section.icon}</span>
          <div>
            <p className="font-medium" style={{ fontFamily: "var(--font-display)" }}>
              {section.title}
            </p>
            <p className="text-xs text-[var(--color-text-tertiary)]">
              {section.description}
            </p>
          </div>
        </button>
      ))}
    </nav>
  );
}

export default function SettingsPage() {
  const toast = useToast();
  const [activeSection, setActiveSection] = useState("business");
  const [isSaving, setIsSaving] = useState(false);

  // Form state - will be connected to Supabase
  const [businessName, setBusinessName] = useState("My Freelance Business");
  const [taxId, setTaxId] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessEmail, setBusinessEmail] = useState("john@example.com");

  const [defaultCurrency, setDefaultCurrency] = useState("TWD");
  const [defaultPaymentTerms, setDefaultPaymentTerms] = useState("14");
  const [defaultTaxRate, setDefaultTaxRate] = useState("5");
  const [invoicePrefix, setInvoicePrefix] = useState("INV");
  const [invoiceNotes, setInvoiceNotes] = useState("");

  const [emailOnSend, setEmailOnSend] = useState(true);
  const [emailOnPaid, setEmailOnPaid] = useState(true);
  const [reminderEnabled, setReminderEnabled] = useState(true);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success("Settings saved");
  };

  return (
    <PageTransition>
      <PageHeader
        title="Settings"
        description="Manage your account and preferences"
      />

      <div className="grid grid-cols-1 desktop:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="desktop:col-span-1">
          <Card>
            <CardContent>
              <SettingsNav
                sections={settingsSections}
                activeSection={activeSection}
                onSelect={setActiveSection}
              />
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="desktop:col-span-3">
          {activeSection === "business" && (
            <Card>
              <CardHeader
                title="Business profile"
                description="This information appears on your invoices"
              />
              <CardContent>
                <div className="space-y-4">
                  <Input
                    label="Business name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Your company or freelance name"
                    required
                  />
                  <Input
                    label="Tax ID (統一編號)"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    placeholder="8-digit business registration number"
                    helperText="Leave blank if you don't have a registered business"
                  />
                  <Textarea
                    label="Business address"
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    placeholder="Your business address"
                    minRows={2}
                  />
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                    <Input
                      label="Phone"
                      value={businessPhone}
                      onChange={(e) => setBusinessPhone(e.target.value)}
                      placeholder="02-1234-5678"
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      placeholder="billing@yourcompany.com"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" onClick={() => toast.info("Changes discarded")}>
                  Cancel
                </Button>
                <Button onClick={handleSave} isLoading={isSaving}>
                  Save changes
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeSection === "account" && (
            <Card>
              <CardHeader
                title="Account"
                description="Your personal account settings"
              />
              <CardContent>
                <div className="space-y-4">
                  <Input
                    label="Full name"
                    defaultValue="John Doe"
                    placeholder="Your name"
                  />
                  <Input
                    label="Email"
                    type="email"
                    defaultValue="john@example.com"
                    placeholder="your@email.com"
                    helperText="This is the email you use to sign in"
                  />
                  <div className="pt-4 border-t border-[var(--color-border-light)]">
                    <Button variant="secondary">
                      Change password
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost">Cancel</Button>
                <Button onClick={handleSave} isLoading={isSaving}>
                  Save changes
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeSection === "invoice" && (
            <Card>
              <CardHeader
                title="Invoice defaults"
                description="These settings apply to new invoices by default"
              />
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                    <Select
                      label="Default currency"
                      options={currencyOptions}
                      value={defaultCurrency}
                      onChange={setDefaultCurrency}
                    />
                    <Select
                      label="Payment terms"
                      options={paymentTermsOptions}
                      value={defaultPaymentTerms}
                      onChange={setDefaultPaymentTerms}
                    />
                  </div>
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                    <Select
                      label="Tax rate"
                      options={taxRateOptions}
                      value={defaultTaxRate}
                      onChange={setDefaultTaxRate}
                    />
                    <Input
                      label="Invoice number prefix"
                      value={invoicePrefix}
                      onChange={(e) => setInvoicePrefix(e.target.value)}
                      placeholder="INV"
                      helperText="e.g., INV-2026-001"
                    />
                  </div>
                  <Textarea
                    label="Default invoice notes"
                    value={invoiceNotes}
                    onChange={(e) => setInvoiceNotes(e.target.value)}
                    placeholder="Thank you for your business!"
                    helperText="This text appears at the bottom of every invoice"
                    minRows={3}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost">Cancel</Button>
                <Button onClick={handleSave} isLoading={isSaving}>
                  Save changes
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeSection === "notifications" && (
            <Card>
              <CardHeader
                title="Notifications"
                description="Configure email notifications and reminders"
              />
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3
                      className="text-sm font-medium mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Email notifications
                    </h3>
                    <div className="space-y-3">
                      <Checkbox
                        label="Send confirmation when invoice is sent"
                        helperText="You'll receive an email when an invoice is successfully sent to a client"
                        checked={emailOnSend}
                        onChange={(e) => setEmailOnSend(e.target.checked)}
                      />
                      <Checkbox
                        label="Notify when invoice is paid"
                        helperText="Get notified when a client marks an invoice as paid"
                        checked={emailOnPaid}
                        onChange={(e) => setEmailOnPaid(e.target.checked)}
                      />
                    </div>
                  </div>
                  <div className="border-t border-[var(--color-border-light)] pt-6">
                    <h3
                      className="text-sm font-medium mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Payment reminders
                    </h3>
                    <div className="space-y-3">
                      <Checkbox
                        label="Send automatic payment reminders"
                        helperText="Automatically remind clients about unpaid invoices"
                        checked={reminderEnabled}
                        onChange={(e) => setReminderEnabled(e.target.checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost">Cancel</Button>
                <Button onClick={handleSave} isLoading={isSaving}>
                  Save changes
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
