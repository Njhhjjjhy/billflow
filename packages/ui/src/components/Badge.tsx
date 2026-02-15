"use client";

import { motion } from "motion/react";
import {
  FileText,
  Send,
  Eye,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { spring } from "@/lib/motion";

export type BadgeVariant =
  | "draft"
  | "sent"
  | "viewed"
  | "paid"
  | "overdue"
  | "pending"
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "error";

export interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  /** Show status icon */
  showIcon?: boolean;
  /** Animate on mount */
  animate?: boolean;
  className?: string;
}

const variantConfig: Record<
  BadgeVariant,
  {
    bg: string;
    text: string;
    border: string;
    icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  }
> = {
  draft: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-300",
    icon: FileText,
  },
  sent: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-300",
    icon: Send,
  },
  viewed: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    border: "border-purple-300",
    icon: Eye,
  },
  paid: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-300",
    icon: CheckCircle,
  },
  overdue: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-300",
    icon: AlertTriangle,
  },
  pending: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-300",
    icon: Clock,
  },
  // Generic variants for non-status use cases
  neutral: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-300",
  },
  info: {
    bg: "bg-[var(--color-info-bg)]",
    text: "text-[var(--color-info-text)]",
    border: "border-[var(--color-info-border)]",
  },
  success: {
    bg: "bg-[var(--color-success-bg)]",
    text: "text-[var(--color-success-text)]",
    border: "border-[var(--color-success-border)]",
  },
  warning: {
    bg: "bg-[var(--color-warning-bg)]",
    text: "text-[var(--color-warning-text)]",
    border: "border-[var(--color-warning-border)]",
  },
  error: {
    bg: "bg-[var(--color-error-bg)]",
    text: "text-[var(--color-error-text)]",
    border: "border-[var(--color-error-border)]",
  },
};

export function Badge({
  variant,
  children,
  showIcon = true,
  animate = false,
  className = "",
}: BadgeProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  const baseClasses = `
    inline-flex items-center gap-1.5
    px-2.5 py-1
    text-xs font-medium
    rounded-[8px]
    border
    ${config.bg}
    ${config.text}
    ${config.border}
    ${className}
  `.trim().replace(/\s+/g, " ");

  if (animate) {
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring.bouncy}
        className={baseClasses}
      >
        {showIcon && Icon && (
          <Icon className="h-3.5 w-3.5" aria-hidden={true} />
        )}
        {children}
      </motion.span>
    );
  }

  return (
    <span className={baseClasses}>
      {showIcon && Icon && (
        <Icon className="h-3.5 w-3.5" aria-hidden={true} />
      )}
      {children}
    </span>
  );
}

// Convenience component for invoice status
export type InvoiceStatus = "draft" | "sent" | "viewed" | "paid" | "overdue" | "pending";

const statusLabels: Record<InvoiceStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  viewed: "Viewed",
  paid: "Paid",
  overdue: "Overdue",
  pending: "Pending",
};

export interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
  animate?: boolean;
  className?: string;
}

export function InvoiceStatusBadge({
  status,
  animate = false,
  className = "",
}: InvoiceStatusBadgeProps) {
  return (
    <Badge variant={status} animate={animate} className={className}>
      {statusLabels[status]}
    </Badge>
  );
}
