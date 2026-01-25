"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Mail,
  FileText,
  LayoutDashboard,
  Users,
  Settings,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

// UI Components
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Checkbox,
  Radio,
  RadioGroup,
  Select,
  Badge,
  InvoiceStatusBadge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ConfirmModal,
  ToastProvider,
  useToast,
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonKPI,
} from "@/components/ui";

// Demo section wrapper
function DemoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2
        className="text-2xl font-bold mb-6 pb-2 border-b-2 border-black"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

// Toast Demo Component (needs to be inside ToastProvider)
function ToastDemo() {
  const toast = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="primary"
        size="sm"
        onClick={() => toast.success("Invoice sent successfully")}
      >
        Success toast
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => toast.error("Failed to send invoice")}
      >
        Error toast
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => toast.warning("Invoice is overdue")}
      >
        Warning toast
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => toast.info("New payment received", { description: "NT$45,000 from Chen Design Co." })}
      >
        Info toast
      </Button>
    </div>
  );
}

// Main Demo Page
function DemoPageContent() {
  // State for interactive components
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectOptions = [
    { value: "twd", label: "TWD - New Taiwan Dollar" },
    { value: "usd", label: "USD - US Dollar" },
    { value: "eur", label: "EUR - Euro" },
  ];

  const tableData = [
    { id: "INV-2026-001", client: "Chen Design Co.", amount: "NT$45,000", status: "paid" as const, date: "Jan 15, 2026" },
    { id: "INV-2026-002", client: "Tech Solutions Ltd", amount: "NT$32,500", status: "sent" as const, date: "Jan 18, 2026" },
    { id: "INV-2026-003", client: "Creative Agency", amount: "NT$78,000", status: "overdue" as const, date: "Jan 10, 2026" },
    { id: "INV-2026-004", client: "Startup Inc", amount: "NT$15,000", status: "draft" as const, date: "Jan 20, 2026" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)] p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Billflow Component Library
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            Neo-Brutalist UI components for Taiwan freelancer invoicing
          </p>
        </header>

        {/* Layout Components */}
        <DemoSection title="Layout components">
          <div className="space-y-6">
            <p className="text-[var(--color-text-secondary)]">
              The layout system includes a responsive sidebar, mobile bottom navigation,
              page transitions, and an app shell wrapper.{" "}
              <Link href="/demo/layout-demo" className="text-[var(--color-primary-600)] underline hover:no-underline">
                View full layout demo →
              </Link>
            </p>

            {/* Sidebar Preview */}
            <div>
              <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                Sidebar (desktop/tablet)
              </h3>
              <div className="flex gap-6">
                {/* Expanded sidebar preview */}
                <div className="relative">
                  <div className="w-60 bg-white border-2 border-black rounded-lg overflow-hidden">
                    {/* Logo */}
                    <div className="h-14 flex items-center px-4 border-b-2 border-black">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[var(--color-primary-600)] rounded-lg flex items-center justify-center border-2 border-black shadow-[2px_2px_0_0_#000000]">
                          <FileText size={14} className="text-white" />
                        </div>
                        <span className="font-bold" style={{ fontFamily: "var(--font-display)" }}>
                          Billflow
                        </span>
                      </div>
                    </div>
                    {/* Nav items */}
                    <nav className="p-2 space-y-1">
                      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[var(--color-primary-50)] border-2 border-[var(--color-primary-600)] text-[var(--color-primary-700)]">
                        <LayoutDashboard size={18} />
                        <span className="font-medium text-sm">Dashboard</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--color-text-secondary)] border-2 border-transparent">
                        <FileText size={18} />
                        <span className="font-medium text-sm">Invoices</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--color-text-secondary)] border-2 border-transparent">
                        <Users size={18} />
                        <span className="font-medium text-sm">Clients</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--color-text-secondary)] border-2 border-transparent">
                        <Settings size={18} />
                        <span className="font-medium text-sm">Settings</span>
                      </div>
                    </nav>
                    {/* User section */}
                    <div className="border-t-2 border-black p-3 mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[var(--color-bg-tertiary)] rounded-full flex items-center justify-center border-2 border-black text-xs font-bold">
                          J
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">John Doe</p>
                          <p className="text-xs text-[var(--color-text-tertiary)] truncate">john@example.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-2 top-16 w-5 h-5 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0_0_#000000]">
                    <ChevronLeft size={12} />
                  </div>
                  <p className="text-xs text-[var(--color-text-tertiary)] text-center mt-2">Expanded (240px)</p>
                </div>

                {/* Collapsed sidebar preview */}
                <div className="relative">
                  <div className="w-[72px] bg-white border-2 border-black rounded-lg overflow-hidden">
                    {/* Logo */}
                    <div className="h-14 flex items-center justify-center border-b-2 border-black">
                      <div className="w-8 h-8 bg-[var(--color-primary-600)] rounded-lg flex items-center justify-center border-2 border-black shadow-[2px_2px_0_0_#000000]">
                        <FileText size={14} className="text-white" />
                      </div>
                    </div>
                    {/* Nav items */}
                    <nav className="p-2 space-y-1">
                      <div className="flex items-center justify-center p-2.5 rounded-lg bg-[var(--color-primary-50)] border-2 border-[var(--color-primary-600)] text-[var(--color-primary-700)]">
                        <LayoutDashboard size={18} />
                      </div>
                      <div className="flex items-center justify-center p-2.5 rounded-lg text-[var(--color-text-secondary)] border-2 border-transparent">
                        <FileText size={18} />
                      </div>
                      <div className="flex items-center justify-center p-2.5 rounded-lg text-[var(--color-text-secondary)] border-2 border-transparent">
                        <Users size={18} />
                      </div>
                      <div className="flex items-center justify-center p-2.5 rounded-lg text-[var(--color-text-secondary)] border-2 border-transparent">
                        <Settings size={18} />
                      </div>
                    </nav>
                    {/* User section */}
                    <div className="border-t-2 border-black p-3">
                      <div className="flex items-center justify-center">
                        <div className="w-8 h-8 bg-[var(--color-bg-tertiary)] rounded-full flex items-center justify-center border-2 border-black text-xs font-bold">
                          J
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-2 top-16 w-5 h-5 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0_0_#000000]">
                    <ChevronRight size={12} />
                  </div>
                  <p className="text-xs text-[var(--color-text-tertiary)] text-center mt-2">Collapsed (72px)</p>
                </div>
              </div>
            </div>

            {/* Mobile Nav Preview */}
            <div>
              <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                Mobile bottom navigation
              </h3>
              <div className="max-w-sm mx-auto">
                <div className="bg-white border-2 border-black rounded-lg overflow-hidden">
                  {/* Mobile header */}
                  <div className="h-12 flex items-center justify-between px-4 border-b-2 border-black">
                    <span className="font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>
                      Billflow
                    </span>
                    <div className="w-7 h-7 bg-[var(--color-bg-tertiary)] rounded-full flex items-center justify-center border-2 border-black text-xs font-bold">
                      J
                    </div>
                  </div>
                  {/* Content placeholder */}
                  <div className="h-32 bg-[var(--color-bg-secondary)] p-4">
                    <div className="h-full border-2 border-dashed border-[var(--color-border-light)] rounded-lg flex items-center justify-center text-sm text-[var(--color-text-tertiary)]">
                      Page content
                    </div>
                  </div>
                  {/* Bottom nav */}
                  <div className="h-14 flex items-center justify-around px-2 border-t-2 border-black relative">
                    <div className="flex flex-col items-center gap-1 text-[var(--color-primary-600)]">
                      <LayoutDashboard size={20} />
                      <span className="text-[10px] font-medium">Dashboard</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-[var(--color-text-secondary)]">
                      <FileText size={20} />
                      <span className="text-[10px] font-medium">Invoices</span>
                    </div>
                    {/* FAB */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-5">
                      <div className="w-11 h-11 bg-[var(--color-primary-600)] rounded-full flex items-center justify-center border-2 border-black shadow-[3px_3px_0_0_#000000] text-white">
                        <Plus size={20} />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-[var(--color-text-secondary)]">
                      <Users size={20} />
                      <span className="text-[10px] font-medium">Clients</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-[var(--color-text-secondary)]">
                      <Settings size={20} />
                      <span className="text-[10px] font-medium">Settings</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[var(--color-text-tertiary)] text-center mt-2">Mobile layout (390-767px)</p>
              </div>
            </div>

            {/* Page components */}
            <div>
              <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                Page components
              </h3>
              <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                <Card>
                  <CardContent>
                    <code className="text-sm text-[var(--color-primary-600)]">PageTransition</code>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                      Wraps page content with fade + slide animation on route change. Respects reduced motion preference.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <code className="text-sm text-[var(--color-primary-600)]">PageHeader</code>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                      Consistent page title with optional description and action buttons.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <code className="text-sm text-[var(--color-primary-600)]">PageSection</code>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                      Groups content with optional title, description, and actions.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <code className="text-sm text-[var(--color-primary-600)]">EmptyState</code>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                      Displays helpful message and action when no content exists.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Buttons */}
        <DemoSection title="Buttons">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                Variants
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                Sizes
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                With icons
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button leftIcon={<Plus className="h-4 w-4" />}>
                  Create invoice
                </Button>
                <Button variant="secondary" rightIcon={<Mail className="h-4 w-4" />}>
                  Send email
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                States
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button
                  isLoading={isLoading}
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => setIsLoading(false), 2000);
                  }}
                >
                  Click for loading
                </Button>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Cards */}
        <DemoSection title="Cards">
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
            <Card>
              <CardHeader
                title="Static card"
                description="A standard card with content"
              />
              <CardContent>
                <p className="text-[var(--color-text-secondary)]">
                  This is a static card that doesn&apos;t respond to interactions.
                </p>
              </CardContent>
            </Card>

            <Card interactive onClick={() => alert("Card clicked!")}>
              <CardHeader
                title="Interactive card"
                description="Hover and click me"
              />
              <CardContent>
                <p className="text-[var(--color-text-secondary)]">
                  This card lifts on hover and responds to clicks.
                </p>
              </CardContent>
            </Card>

            <Card className="tablet:col-span-2">
              <CardHeader
                title="Card with footer"
                action={<Badge variant="success">Active</Badge>}
              />
              <CardContent>
                <p className="text-[var(--color-text-secondary)]">
                  This card includes a footer with action buttons.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save</Button>
              </CardFooter>
            </Card>
          </div>
        </DemoSection>

        {/* Form Inputs */}
        <DemoSection title="Form inputs">
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
            <Input
              label="Client name"
              placeholder="e.g., Chen Design Co."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              helperText="Enter the client's company or personal name"
            />

            <Input
              label="Email"
              type="email"
              placeholder="client@example.com"
              leftElement={<Mail className="h-4 w-4" />}
              required
            />

            <Input
              label="With error"
              placeholder="Invalid input"
              error="This field is required"
              defaultValue="bad value"
            />

            <Input
              label="With success"
              placeholder="Valid input"
              success
              defaultValue="correct value"
            />

            <Input
              label="Search"
              placeholder="Search invoices..."
              leftElement={<Search className="h-4 w-4" />}
            />

            <Select
              label="Currency"
              placeholder="Select currency"
              options={selectOptions}
              value={selectValue}
              onChange={setSelectValue}
              helperText="Choose the invoice currency"
            />

            <div className="tablet:col-span-2">
              <Textarea
                label="Notes"
                placeholder="Add any additional notes for the invoice..."
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                showCount
                maxLength={500}
                minRows={4}
              />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">
              Checkboxes and radios
            </h3>
            <div className="flex flex-wrap gap-6">
              <Checkbox
                label="Include tax"
                helperText="Add 5% business tax"
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
              />
              <Checkbox label="Send reminder" checked disabled />
            </div>

            <RadioGroup
              name="payment-terms"
              value={radioValue}
              onChange={setRadioValue}
              direction="horizontal"
            >
              <Radio
                name="payment-terms"
                value="option1"
                label="Net 14"
                checked={radioValue === "option1"}
                onChange={() => setRadioValue("option1")}
              />
              <Radio
                name="payment-terms"
                value="option2"
                label="Net 30"
                checked={radioValue === "option2"}
                onChange={() => setRadioValue("option2")}
              />
              <Radio
                name="payment-terms"
                value="option3"
                label="Net 60"
                checked={radioValue === "option3"}
                onChange={() => setRadioValue("option3")}
              />
            </RadioGroup>
          </div>
        </DemoSection>

        {/* Badges */}
        <DemoSection title="Badges">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                Invoice status badges
              </h3>
              <div className="flex flex-wrap gap-3">
                <InvoiceStatusBadge status="draft" />
                <InvoiceStatusBadge status="sent" />
                <InvoiceStatusBadge status="viewed" />
                <InvoiceStatusBadge status="paid" />
                <InvoiceStatusBadge status="overdue" />
                <InvoiceStatusBadge status="pending" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                Generic badges
              </h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="neutral">Neutral</Badge>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Table */}
        <DemoSection title="Table">
          <Table caption="Invoice list" sortable>
            <TableHeader>
              <TableRow>
                <TableHead sortKey="id">Invoice #</TableHead>
                <TableHead sortKey="client">Client</TableHead>
                <TableHead sortKey="amount">Amount</TableHead>
                <TableHead sortKey="status">Status</TableHead>
                <TableHead sortKey="date">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((invoice) => (
                <TableRow
                  key={invoice.id}
                  onClick={() => alert(`View ${invoice.id}`)}
                >
                  <TableCell isRowHeader>{invoice.id}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell numeric>{invoice.amount}</TableCell>
                  <TableCell>
                    <InvoiceStatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell>{invoice.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
              Empty table state
            </h3>
            <Table caption="Empty invoice list">
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableEmpty
                  colSpan={3}
                  icon={<FileText className="h-8 w-8" />}
                  message="No invoices yet. Create your first invoice to get started."
                  action={
                    <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                      Create invoice
                    </Button>
                  }
                />
              </TableBody>
            </Table>
          </div>
        </DemoSection>

        {/* Modals */}
        <DemoSection title="Modals">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setIsModalOpen(true)}>Open modal</Button>
            <Button variant="danger" onClick={() => setIsConfirmModalOpen(true)}>
              Delete confirmation
            </Button>
          </div>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalHeader
              title="Edit client"
              description="Update client information"
            />
            <ModalBody>
              <div className="space-y-4">
                <Input label="Company name" placeholder="Chen Design Co." />
                <Input label="Email" type="email" placeholder="chen@design.co" />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Save changes</Button>
            </ModalFooter>
          </Modal>

          <ConfirmModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={() => {
              setIsConfirmModalOpen(false);
              alert("Deleted!");
            }}
            title="Delete client?"
            description="This will remove Chen Design Co. and all 12 of their invoices. This action cannot be undone."
            confirmText="Delete client"
            cancelText="Cancel"
            variant="danger"
          />
        </DemoSection>

        {/* Toasts */}
        <DemoSection title="Toasts">
          <ToastDemo />
        </DemoSection>

        {/* Skeletons */}
        <DemoSection title="Skeleton loaders">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                Basic skeletons
              </h3>
              <div className="space-y-3 max-w-md">
                <Skeleton variant="text" height="1em" />
                <Skeleton variant="text" height="1em" width="75%" />
                <div className="flex items-center gap-3">
                  <Skeleton variant="circular" width={40} height={40} />
                  <div className="flex-1">
                    <Skeleton variant="text" height="1em" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                Text skeleton
              </h3>
              <SkeletonText lines={4} className="max-w-md" />
            </div>

            <div>
              <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                Component skeletons
              </h3>
              <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4">
                <SkeletonCard showHeader lines={2} />
                <SkeletonKPI />
                <SkeletonKPI />
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[var(--color-border-light)] text-center text-sm text-[var(--color-text-tertiary)]">
          <p>Billflow Design System v1.0</p>
          <p className="mt-1">Neo-Brutalist components with Motion.dev animations</p>
        </footer>
      </div>
    </div>
  );
}

// Wrap with ToastProvider
export default function DemoPage() {
  return (
    <ToastProvider position="bottom-right">
      <DemoPageContent />
    </ToastProvider>
  );
}
