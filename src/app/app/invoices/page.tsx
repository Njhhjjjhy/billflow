"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, FileText, Filter } from "lucide-react";
import { PageTransition, PageHeader, PageSection, EmptyState } from "@/components/layout";
import {
  Button,
  Input,
  Select,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
  InvoiceStatusBadge,
} from "@/components/ui";

type InvoiceStatus = "draft" | "sent" | "viewed" | "paid" | "overdue";

interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
}

// Mock data - will be replaced with real data from Supabase
const mockInvoices: Invoice[] = [
  { id: "1", number: "INV-2026-042", client: "Chen Design Co.", amount: "NT$45,000", status: "paid", issueDate: "Jan 15, 2026", dueDate: "Jan 29, 2026" },
  { id: "2", number: "INV-2026-041", client: "Tech Solutions Ltd", amount: "NT$32,500", status: "sent", issueDate: "Jan 18, 2026", dueDate: "Feb 1, 2026" },
  { id: "3", number: "INV-2026-040", client: "Creative Agency", amount: "NT$78,000", status: "overdue", issueDate: "Jan 10, 2026", dueDate: "Jan 24, 2026" },
  { id: "4", number: "INV-2026-039", client: "Startup Inc", amount: "NT$15,000", status: "draft", issueDate: "Jan 20, 2026", dueDate: "Feb 3, 2026" },
  { id: "5", number: "INV-2026-038", client: "Global Corp", amount: "NT$120,000", status: "viewed", issueDate: "Jan 12, 2026", dueDate: "Jan 26, 2026" },
  { id: "6", number: "INV-2026-037", client: "Local Business", amount: "NT$25,500", status: "paid", issueDate: "Jan 8, 2026", dueDate: "Jan 22, 2026" },
];

const statusOptions = [
  { value: "", label: "All statuses" },
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "viewed", label: "Viewed" },
  { value: "paid", label: "Paid" },
  { value: "overdue", label: "Overdue" },
];

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filter invoices
  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const hasInvoices = mockInvoices.length > 0;

  return (
    <PageTransition>
      <PageHeader
        title="Invoices"
        description="Manage and track all your invoices"
        actions={
          <Link href="/app/invoices/new">
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              New invoice
            </Button>
          </Link>
        }
      />

      {hasInvoices ? (
        <>
          {/* Filters */}
          <PageSection>
            <div className="flex flex-col tablet:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search invoices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftElement={<Search className="h-4 w-4" />}
                />
              </div>
              <div className="w-full tablet:w-48">
                <Select
                  options={statusOptions}
                  value={statusFilter}
                  onChange={setStatusFilter}
                  placeholder="Filter by status"
                />
              </div>
            </div>
          </PageSection>

          {/* Invoice Table */}
          <PageSection>
            <Table caption="Invoice list" sortable>
              <TableHeader>
                <TableRow>
                  <TableHead sortKey="number">Invoice #</TableHead>
                  <TableHead sortKey="client">Client</TableHead>
                  <TableHead sortKey="amount">Amount</TableHead>
                  <TableHead sortKey="status">Status</TableHead>
                  <TableHead sortKey="issueDate" className="hidden tablet:table-cell">
                    Issue date
                  </TableHead>
                  <TableHead sortKey="dueDate" className="hidden tablet:table-cell">
                    Due date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <TableRow
                      key={invoice.id}
                      onClick={() => {
                        window.location.href = `/app/invoices/${invoice.id}`;
                      }}
                    >
                      <TableCell isRowHeader>
                        <span className="font-medium">{invoice.number}</span>
                      </TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell numeric>{invoice.amount}</TableCell>
                      <TableCell>
                        <InvoiceStatusBadge status={invoice.status} />
                      </TableCell>
                      <TableCell className="hidden tablet:table-cell">
                        {invoice.issueDate}
                      </TableCell>
                      <TableCell className="hidden tablet:table-cell">
                        {invoice.dueDate}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableEmpty
                    colSpan={6}
                    icon={<Filter className="h-8 w-8" />}
                    message={`No invoices match "${searchQuery || statusFilter}"`}
                    action={
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearchQuery("");
                          setStatusFilter("");
                        }}
                      >
                        Clear filters
                      </Button>
                    }
                  />
                )}
              </TableBody>
            </Table>
          </PageSection>
        </>
      ) : (
        <EmptyState
          icon={<FileText className="w-full h-full" />}
          title="No invoices yet"
          description="Create your first invoice and get paid faster. You can set up automatic payment reminders too."
          action={
            <Link href="/app/invoices/new">
              <Button leftIcon={<Plus className="h-4 w-4" />}>
                Create invoice
              </Button>
            </Link>
          }
        />
      )}
    </PageTransition>
  );
}
