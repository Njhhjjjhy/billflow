"use client";

import { Mail, FileText, Users, CreditCard, Settings } from "lucide-react";
import { PageTransition, PageHeader } from "@/components/layout";
import { Card, CardContent } from "@/components/ui";

interface HelpTopic {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: string[];
}

const helpTopics: HelpTopic[] = [
  {
    title: "Creating invoices",
    description: "How to create and send invoices to your clients",
    icon: <FileText size={24} />,
    items: [
      "Click 'New invoice' from the dashboard or invoices page",
      "Select a client or create a new one",
      "Add line items with descriptions and amounts",
      "Set payment terms and due date",
      "Preview and send to your client",
    ],
  },
  {
    title: "Managing clients",
    description: "Keep track of your client information",
    icon: <Users size={24} />,
    items: [
      "Add client details including company name and contact info",
      "Store Taiwan tax ID (統一編號) for business clients",
      "Set default currency and payment terms per client",
      "View all invoices for a specific client",
    ],
  },
  {
    title: "Tracking payments",
    description: "Mark invoices as paid and track your revenue",
    icon: <CreditCard size={24} />,
    items: [
      "Mark invoices as paid when you receive payment",
      "Track outstanding and overdue invoices from the dashboard",
      "View payment history for each invoice",
      "Monitor monthly revenue trends",
    ],
  },
  {
    title: "Settings",
    description: "Customize Billflow for your business",
    icon: <Settings size={24} />,
    items: [
      "Set your business name and tax ID",
      "Configure default currency (TWD, USD, EUR)",
      "Choose default payment terms",
      "Customize invoice numbering",
    ],
  },
];

export default function HelpPage() {
  return (
    <PageTransition>
      <PageHeader
        title="Help"
        description="Learn how to use Billflow"
      />

      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
        {helpTopics.map((topic) => (
          <Card key={topic.title}>
            <CardContent>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-[var(--color-primary-50)] rounded-lg flex items-center justify-center text-[var(--color-primary-600)] flex-shrink-0">
                  {topic.icon}
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold text-[var(--color-text-primary)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {topic.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    {topic.description}
                  </p>
                </div>
              </div>
              <ul className="space-y-2 ml-14">
                {topic.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                  >
                    <span className="text-[var(--color-primary-600)] mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Support */}
      <Card className="mt-6">
        <CardContent>
          <div className="flex flex-col tablet:flex-row items-center gap-4 text-center tablet:text-left">
            <div className="w-12 h-12 bg-[var(--color-bg-tertiary)] rounded-full flex items-center justify-center">
              <Mail size={24} className="text-[var(--color-text-secondary)]" />
            </div>
            <div className="flex-1">
              <h3
                className="font-medium"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Need more help?
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Contact us at support@billflow.app and we&apos;ll get back to you within 24 hours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageTransition>
  );
}
