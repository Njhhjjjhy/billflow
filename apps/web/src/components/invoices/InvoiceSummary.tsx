"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { formatCurrency, formatPercentage } from "@/lib/format";
import { calculateInvoiceTotals } from "@/lib/validations";
import { spring } from "@/lib/motion";
import type { Currency, DiscountType } from "@/types";

interface LineItemData {
  quantity: number;
  unit_price: number;
  amount: number;
}

export interface InvoiceSummaryProps {
  items: LineItemData[];
  currency: Currency;
  taxRate: number;
  discountType?: DiscountType;
  discountValue?: number;
  className?: string;
}

export function InvoiceSummary({
  items,
  currency,
  taxRate,
  discountType,
  discountValue,
  className = "",
}: InvoiceSummaryProps) {
  const totals = useMemo(() => {
    // Convert to format expected by calculateInvoiceTotals
    const lineItems = items.map((item) => ({
      description: "",
      quantity: item.quantity,
      unit_price: item.unit_price,
      amount: item.amount,
      sort_order: 0,
    }));

    return calculateInvoiceTotals(lineItems, taxRate, discountType, discountValue);
  }, [items, taxRate, discountType, discountValue]);

  const hasDiscount = discountValue && discountValue > 0 && discountType;

  return (
    <div
      className={`bg-[var(--color-bg-tertiary)] border-2 border-black rounded-[12px] p-4 ${className}`}
    >
      <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-4">
        Invoice Summary
      </h3>

      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-[15px] text-[var(--color-text-secondary)]">
            Subtotal
          </span>
          <motion.span
            key={totals.subtotal}
            initial={{ opacity: 0.5, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={spring.snappy}
            className="text-[15px] font-medium text-[var(--color-text-primary)]"
          >
            {formatCurrency(totals.subtotal, currency)}
          </motion.span>
        </div>

        {/* Discount (if applicable) */}
        {hasDiscount && (
          <div className="flex justify-between items-center">
            <span className="text-[15px] text-[var(--color-text-secondary)]">
              Discount
              {discountType === "percentage" && discountValue
                ? ` (${discountValue}%)`
                : ""}
            </span>
            <motion.span
              key={totals.discountAmount}
              initial={{ opacity: 0.5, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={spring.snappy}
              className="text-[15px] font-medium text-[var(--color-success-text)]"
            >
              -{formatCurrency(totals.discountAmount, currency)}
            </motion.span>
          </div>
        )}

        {/* Tax */}
        <div className="flex justify-between items-center">
          <span className="text-[15px] text-[var(--color-text-secondary)]">
            Tax ({formatPercentage(taxRate)})
          </span>
          <motion.span
            key={totals.taxAmount}
            initial={{ opacity: 0.5, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={spring.snappy}
            className="text-[15px] font-medium text-[var(--color-text-primary)]"
          >
            {formatCurrency(totals.taxAmount, currency)}
          </motion.span>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-dashed border-[var(--color-border-light)] my-3" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-[var(--color-text-primary)]">
            Total
          </span>
          <motion.span
            key={totals.total}
            initial={{ opacity: 0.5, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={spring.snappy}
            className="text-xl font-bold text-[var(--color-primary-600)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {formatCurrency(totals.total, currency)}
          </motion.span>
        </div>
      </div>
    </div>
  );
}

// Compact version for inline use
export function InvoiceSummaryCompact({
  items,
  currency,
  taxRate,
  discountType,
  discountValue,
  className = "",
}: InvoiceSummaryProps) {
  const totals = useMemo(() => {
    const lineItems = items.map((item) => ({
      description: "",
      quantity: item.quantity,
      unit_price: item.unit_price,
      amount: item.amount,
      sort_order: 0,
    }));

    return calculateInvoiceTotals(lineItems, taxRate, discountType, discountValue);
  }, [items, taxRate, discountType, discountValue]);

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="text-sm text-[var(--color-text-secondary)]">
        <span>Subtotal: </span>
        <span className="font-medium text-[var(--color-text-primary)]">
          {formatCurrency(totals.subtotal, currency)}
        </span>
      </div>
      <div className="text-sm text-[var(--color-text-secondary)]">
        <span>Tax: </span>
        <span className="font-medium text-[var(--color-text-primary)]">
          {formatCurrency(totals.taxAmount, currency)}
        </span>
      </div>
      <div className="text-sm font-semibold text-[var(--color-text-primary)]">
        <span>Total: </span>
        <span className="text-[var(--color-primary-600)]">
          {formatCurrency(totals.total, currency)}
        </span>
      </div>
    </div>
  );
}
