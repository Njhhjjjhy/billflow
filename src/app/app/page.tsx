"use client";

import Link from "next/link";
import { FileText, Users, TrendingUp, AlertCircle, Plus, ArrowRight } from "lucide-react";
import { PageTransition, PageHeader, PageSection } from "@/components/layout";
import {
  Button,
  Card,
  CardContent,
  InvoiceStatusBadge,
} from "@/components/ui";
import { RevenueChart, StatusChart } from "@/components/charts";

// KPI Card Component
function KPICard({
  label,
  value,
  icon,
  trend,
  href,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: { value: string; positive: boolean };
  href?: string;
}) {
  const content = (
    <Card interactive={!!href}>
      <CardContent>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-[var(--color-text-secondary)]">{label}</p>
            <p
              className="text-2xl tablet:text-3xl font-bold mt-1"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {value}
            </p>
            {trend && (
              <p
                className={`text-xs mt-1 ${trend.positive ? "text-[var(--color-success-text)]" : "text-[var(--color-error-text)]"}`}
              >
                {trend.positive ? "↑" : "↓"} {trend.value} from last month
              </p>
            )}
          </div>
          <div className="w-10 h-10 bg-[var(--color-primary-50)] rounded-lg flex items-center justify-center text-[var(--color-primary-600)]">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return <Link href={href} className="block no-underline">{content}</Link>;
  }

  return content;
}

// Recent Invoice Row
function RecentInvoiceRow({
  id,
  client,
  amount,
  status,
  date,
}: {
  id: string;
  client: string;
  amount: string;
  status: "draft" | "sent" | "paid" | "overdue";
  date: string;
}) {
  return (
    <Link
      href={`/app/invoices/${id}`}
      className="flex items-center justify-between py-3 border-b border-[var(--color-border-light)] last:border-0 hover:bg-[var(--color-bg-secondary)] -mx-4 px-4 transition-colors no-underline"
    >
      <div className="flex-1 min-w-0">
        <p className="font-medium text-[var(--color-text-primary)]">{id}</p>
        <p className="text-sm text-[var(--color-text-secondary)] truncate">
          {client}
        </p>
      </div>
      <div className="text-right ml-4 flex flex-col items-end gap-1">
        <p className="font-mono font-medium text-[var(--color-text-primary)]">{amount}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-text-tertiary)] hidden tablet:inline">{date}</span>
          <InvoiceStatusBadge status={status} />
        </div>
      </div>
    </Link>
  );
}

// Recent Client Row
function RecentClientRow({
  name,
  email,
  invoiceCount,
  totalValue,
}: {
  name: string;
  email: string;
  invoiceCount: number;
  totalValue: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[var(--color-border-light)] last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[var(--color-bg-tertiary)] rounded-full flex items-center justify-center border-2 border-black text-sm font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="font-medium truncate">{name}</p>
          <p className="text-sm text-[var(--color-text-secondary)] truncate">{email}</p>
        </div>
      </div>
      <div className="text-right ml-4">
        <p className="font-mono font-medium">{totalValue}</p>
        <p className="text-xs text-[var(--color-text-tertiary)]">
          {invoiceCount} invoice{invoiceCount !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  // Mock data - will be replaced with real data from Supabase
  const recentInvoices = [
    { id: "INV-2026-042", client: "Chen Design Co.", amount: "NT$45,000", status: "paid" as const, date: "Jan 22" },
    { id: "INV-2026-041", client: "Tech Solutions Ltd", amount: "NT$32,500", status: "sent" as const, date: "Jan 20" },
    { id: "INV-2026-040", client: "Creative Agency", amount: "NT$78,000", status: "overdue" as const, date: "Jan 10" },
    { id: "INV-2026-039", client: "Startup Inc", amount: "NT$15,000", status: "draft" as const, date: "Jan 25" },
  ];

  const recentClients = [
    { name: "Chen Design Co.", email: "chen@design.co", invoiceCount: 12, totalValue: "NT$540,000" },
    { name: "Tech Solutions Ltd", email: "billing@techsolutions.tw", invoiceCount: 8, totalValue: "NT$260,000" },
    { name: "Creative Agency", email: "accounts@creative.com", invoiceCount: 5, totalValue: "NT$195,000" },
  ];

  // Revenue chart data (last 6 months)
  const revenueData = [
    { month: "Aug", revenue: 280000, paid: 265000 },
    { month: "Sep", revenue: 420000, paid: 380000 },
    { month: "Oct", revenue: 350000, paid: 340000 },
    { month: "Nov", revenue: 480000, paid: 420000 },
    { month: "Dec", revenue: 520000, paid: 485000 },
    { month: "Jan", revenue: 390000, paid: 345000 },
  ];

  // Invoice status distribution
  const statusData = [
    { label: "Paid", value: 42, color: "var(--color-success-text)" },
    { label: "Sent", value: 8, color: "var(--color-primary-600)" },
    { label: "Overdue", value: 3, color: "var(--color-error-text)" },
    { label: "Draft", value: 5, color: "var(--color-text-tertiary)" },
  ];

  return (
    <PageTransition>
      <PageHeader
        title="Dashboard"
        description="Overview of your invoicing activity"
        actions={
          <Link href="/app/invoices/new">
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              New invoice
            </Button>
          </Link>
        }
      />

      {/* KPI Grid */}
      <PageSection>
        <div className="grid grid-cols-2 desktop:grid-cols-4 gap-4">
          <KPICard
            label="Outstanding"
            value="NT$127,500"
            icon={<FileText size={20} />}
            trend={{ value: "12%", positive: true }}
            href="/app/invoices?status=sent"
          />
          <KPICard
            label="Paid this month"
            value="NT$345,000"
            icon={<TrendingUp size={20} />}
            trend={{ value: "8%", positive: true }}
            href="/app/invoices?status=paid"
          />
          <KPICard
            label="Overdue"
            value="NT$45,000"
            icon={<AlertCircle size={20} />}
            href="/app/invoices?status=overdue"
          />
          <KPICard
            label="Total clients"
            value="24"
            icon={<Users size={20} />}
            trend={{ value: "2", positive: true }}
            href="/app/clients"
          />
        </div>
      </PageSection>

      {/* Charts Row */}
      <div className="grid grid-cols-1 desktop:grid-cols-[2fr_1fr] gap-6">
        {/* Revenue Chart */}
        <PageSection title="Revenue Overview">
          <Card>
            <CardContent className="pt-4">
              <RevenueChart data={revenueData} />
            </CardContent>
          </Card>
        </PageSection>

        {/* Invoice Status */}
        <PageSection title="Invoice Status">
          <Card>
            <CardContent className="flex items-center justify-center py-6">
              <StatusChart
                data={statusData}
                centerValue="58"
                centerLabel="total"
              />
            </CardContent>
          </Card>
        </PageSection>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <PageSection
          title="Recent invoices"
          actions={
            <Link href="/app/invoices" className="no-underline">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View all
              </Button>
            </Link>
          }
        >
          <Card>
            <CardContent>
              {recentInvoices.map((invoice) => (
                <RecentInvoiceRow key={invoice.id} {...invoice} />
              ))}
            </CardContent>
          </Card>
        </PageSection>

        {/* Top Clients */}
        <PageSection
          title="Top clients"
          actions={
            <Link href="/app/clients" className="no-underline">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View all
              </Button>
            </Link>
          }
        >
          <Card>
            <CardContent>
              {recentClients.map((client) => (
                <RecentClientRow key={client.email} {...client} />
              ))}
            </CardContent>
          </Card>
        </PageSection>
      </div>
    </PageTransition>
  );
}
