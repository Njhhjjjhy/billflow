"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Users, Mail, Phone } from "lucide-react";
import { PageTransition, PageHeader, PageSection, EmptyState } from "@/components/layout";
import {
  Button,
  Input,
  Card,
  CardContent,
  Badge,
  SkeletonClientCard,
  Skeleton,
} from "@/components/ui";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  invoiceCount: number;
  totalValue: string;
  tags: string[];
}

// Mock data - will be replaced with real data from Supabase
const mockClients: Client[] = [
  { id: "1", name: "Chen Wei-Lin", email: "chen@design.co", phone: "02-2345-6789", company: "Chen Design Co.", invoiceCount: 12, totalValue: "NT$540,000", tags: ["design", "recurring"] },
  { id: "2", name: "Michael Wang", email: "michael@techsolutions.tw", phone: "02-8765-4321", company: "Tech Solutions Ltd", invoiceCount: 8, totalValue: "NT$260,000", tags: ["tech", "corporate"] },
  { id: "3", name: "Sarah Lin", email: "sarah@creative.com", phone: null, company: "Creative Agency", invoiceCount: 5, totalValue: "NT$195,000", tags: ["agency"] },
  { id: "4", name: "David Chen", email: "david@startup.io", phone: "0912-345-678", company: "Startup Inc", invoiceCount: 3, totalValue: "NT$45,000", tags: ["startup"] },
  { id: "5", name: "Amy Wu", email: "amy@globalcorp.com", phone: "02-1234-5678", company: "Global Corp", invoiceCount: 15, totalValue: "NT$1,200,000", tags: ["corporate", "international"] },
  { id: "6", name: "Jason Liu", email: "jason@localbiz.tw", phone: "0987-654-321", company: "Local Business", invoiceCount: 2, totalValue: "NT$51,000", tags: [] },
];

function ClientCard({ client }: { client: Client }) {
  return (
    <Link href={`/app/clients/${client.id}`} className="block no-underline">
      <Card interactive>
        <CardContent>
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 bg-[var(--color-bg-tertiary)] rounded-full flex items-center justify-center border-2 border-black text-lg font-bold flex-shrink-0">
              {client.name.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3
                className="font-semibold text-[var(--color-text-primary)] truncate"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {client.name}
              </h3>
              {client.company && (
                <p className="text-sm text-[var(--color-text-secondary)] truncate">
                  {client.company}
                </p>
              )}

              {/* Contact info */}
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <Mail size={14} className="flex-shrink-0" aria-hidden="true" />
                  <span className="truncate">{client.email}</span>
                </div>
                {client.phone && (
                  <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                    <Phone size={14} className="flex-shrink-0" aria-hidden="true" />
                    <span>{client.phone}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {client.tags.length > 0 && (
                <div className="mt-3 flex flex-row flex-wrap gap-2">
                  {client.tags.map((tag) => (
                    <Badge key={tag} variant="neutral">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="text-right flex-shrink-0">
              <p
                className="font-mono font-semibold text-[var(--color-text-primary)]"
              >
                {client.totalValue}
              </p>
              <p className="text-xs text-[var(--color-text-tertiary)]">
                {client.invoiceCount} invoice{client.invoiceCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);

  // Simulate loading data from API
  useEffect(() => {
    const loadClients = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setClients(mockClients);
      setIsLoading(false);
    };
    loadClients();
  }, []);

  // Filter clients
  const filteredClients = clients.filter((client) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      client.name.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      client.company?.toLowerCase().includes(searchLower) ||
      client.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  });

  const hasClients = clients.length > 0;

  return (
    <PageTransition>
      <PageHeader
        title="Clients"
        description="Manage your client relationships"
        actions={
          <Link href="/app/clients/new">
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Add client
            </Button>
          </Link>
        }
      />

      {isLoading ? (
        <>
          {/* Search skeleton */}
          <PageSection>
            <div className="max-w-md">
              <Skeleton variant="rounded" height={44} />
            </div>
          </PageSection>

          {/* Client Grid skeleton */}
          <PageSection>
            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonClientCard key={i} />
              ))}
            </div>
          </PageSection>
        </>
      ) : hasClients ? (
        <>
          {/* Search */}
          <PageSection>
            <div className="max-w-md">
              <Input
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftElement={<Search className="h-4 w-4" />}
              />
            </div>
          </PageSection>

          {/* Client Grid */}
          <PageSection>
            {filteredClients.length > 0 ? (
              <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4">
                {filteredClients.map((client) => (
                  <ClientCard key={client.id} client={client} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Search className="w-10 h-10" />}
                title="No matches found"
                description={`Try a different search term or clear the search to see all clients.`}
                action={
                  <Button
                    variant="secondary"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear search
                  </Button>
                }
              />
            )}
          </PageSection>
        </>
      ) : (
        <EmptyState
          icon={<Users className="w-10 h-10" />}
          title="Add your first client"
          description="Keep track of your clients and their invoicing history. Save contact details, payment preferences, and more."
          action={
            <Link href="/app/clients/new">
              <Button leftIcon={<Plus className="h-4 w-4" />}>
                Add client
              </Button>
            </Link>
          }
        />
      )}
    </PageTransition>
  );
}
