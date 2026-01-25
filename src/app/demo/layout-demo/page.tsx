"use client";

import { useState } from "react";
import { FileText, Users, TrendingUp, AlertCircle, Plus } from "lucide-react";
import {
  AppShell,
  PageTransition,
  PageHeader,
  PageSection,
  EmptyState,
} from "@/components/layout";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Badge,
  InvoiceStatusBadge,
  ToastProvider,
  useToast,
} from "@/components/ui";

// KPI Card Component
function KPICard({
  label,
  value,
  icon,
  trend,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: { value: string; positive: boolean };
}) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-[var(--color-text-secondary)]">{label}</p>
            <p
              className="text-2xl font-bold mt-1"
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
}

// Recent Invoice Row
function RecentInvoiceRow({
  id,
  client,
  amount,
  status,
}: {
  id: string;
  client: string;
  amount: string;
  status: "draft" | "sent" | "paid" | "overdue";
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[var(--color-border-light)] last:border-0">
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{id}</p>
        <p className="text-sm text-[var(--color-text-secondary)] truncate">
          {client}
        </p>
      </div>
      <div className="text-right ml-4">
        <p className="font-mono font-medium">{amount}</p>
        <InvoiceStatusBadge status={status} />
      </div>
    </div>
  );
}

// Demo Dashboard Content
function DashboardContent() {
  const toast = useToast();
  const [showEmptyState, setShowEmptyState] = useState(false);

  const handleQuickAction = () => {
    toast.success("Create invoice clicked!");
  };

  return (
    <PageTransition>
      <PageHeader
        title="Dashboard"
        description="Overview of your invoicing activity"
        actions={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowEmptyState(!showEmptyState)}
          >
            Toggle empty state
          </Button>
        }
      />

      {showEmptyState ? (
        <EmptyState
          icon={<FileText className="w-full h-full" />}
          title="No invoices yet"
          description="Create your first invoice and get paid faster. You can set up automatic payment reminders too."
          action={
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Create invoice
            </Button>
          }
        />
      ) : (
        <>
          {/* KPI Grid */}
          <PageSection>
            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-4">
              <KPICard
                label="Outstanding"
                value="NT$127,500"
                icon={<FileText size={20} />}
                trend={{ value: "12%", positive: true }}
              />
              <KPICard
                label="Paid this month"
                value="NT$345,000"
                icon={<TrendingUp size={20} />}
                trend={{ value: "8%", positive: true }}
              />
              <KPICard
                label="Overdue"
                value="NT$45,000"
                icon={<AlertCircle size={20} />}
              />
              <KPICard
                label="Total clients"
                value="24"
                icon={<Users size={20} />}
                trend={{ value: "2", positive: true }}
              />
            </div>
          </PageSection>

          {/* Recent Invoices */}
          <PageSection
            title="Recent invoices"
            description="Your latest invoicing activity"
            actions={
              <Button variant="ghost" size="sm">
                View all
              </Button>
            }
          >
            <Card>
              <CardContent>
                <RecentInvoiceRow
                  id="INV-2026-042"
                  client="Chen Design Co."
                  amount="NT$45,000"
                  status="paid"
                />
                <RecentInvoiceRow
                  id="INV-2026-041"
                  client="Tech Solutions Ltd"
                  amount="NT$32,500"
                  status="sent"
                />
                <RecentInvoiceRow
                  id="INV-2026-040"
                  client="Creative Agency"
                  amount="NT$78,000"
                  status="overdue"
                />
                <RecentInvoiceRow
                  id="INV-2026-039"
                  client="Startup Inc"
                  amount="NT$15,000"
                  status="draft"
                />
              </CardContent>
            </Card>
          </PageSection>

          {/* Quick Actions */}
          <PageSection title="Quick actions">
            <div className="flex flex-wrap gap-3">
              <Button
                leftIcon={<Plus className="h-4 w-4" />}
                onClick={handleQuickAction}
              >
                New invoice
              </Button>
              <Button
                variant="secondary"
                leftIcon={<Users className="h-4 w-4" />}
              >
                Add client
              </Button>
            </div>
          </PageSection>
        </>
      )}
    </PageTransition>
  );
}

// Main Layout Demo Page
export default function LayoutDemoPage() {
  const handleLogout = () => {
    alert("Logout clicked");
  };

  const handleQuickAction = () => {
    alert("Quick action (create invoice) clicked");
  };

  return (
    <ToastProvider position="bottom-right">
      <AppShell
        userName="John Doe"
        userEmail="john@example.com"
        onLogout={handleLogout}
        showMobileQuickAction={true}
        onMobileQuickAction={handleQuickAction}
        mobileQuickActionLabel="Create new invoice"
      >
        <DashboardContent />
      </AppShell>
    </ToastProvider>
  );
}
