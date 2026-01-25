"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";
import { spring } from "@/lib/motion";
import type { Currency } from "@/types";

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

export interface LineItemsTableProps {
  items: LineItem[];
  currency: Currency;
  onChange: (items: LineItem[]) => void;
  errors?: Record<string, string>;
  disabled?: boolean;
}

export function LineItemsTable({
  items,
  currency,
  onChange,
  errors = {},
  disabled = false,
}: LineItemsTableProps) {
  // Generate a unique ID for new items
  const generateId = () => crypto.randomUUID();

  // Add a new blank line item
  const handleAddItem = useCallback(() => {
    const newItem: LineItem = {
      id: generateId(),
      description: "",
      quantity: 1,
      unit_price: 0,
      amount: 0,
    };
    onChange([...items, newItem]);
  }, [items, onChange]);

  // Remove a line item by index
  const handleRemoveItem = useCallback(
    (index: number) => {
      const newItems = items.filter((_, i) => i !== index);
      onChange(newItems);
    },
    [items, onChange]
  );

  // Update a field on a line item
  const handleFieldChange = useCallback(
    (index: number, field: keyof LineItem, value: string | number) => {
      const newItems = [...items];
      const item = { ...newItems[index] };

      if (field === "description") {
        item.description = value as string;
      } else if (field === "quantity") {
        const qty = parseFloat(value as string) || 0;
        item.quantity = qty;
        item.amount = qty * item.unit_price;
      } else if (field === "unit_price") {
        const price = parseFloat(value as string) || 0;
        item.unit_price = price;
        item.amount = item.quantity * price;
      }

      newItems[index] = item;
      onChange(newItems);
    },
    [items, onChange]
  );

  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="hidden md:grid md:grid-cols-[1fr_100px_120px_120px_40px] gap-3 mb-2 px-2">
        <div className="text-sm font-medium text-[var(--color-text-secondary)]">
          Description
        </div>
        <div className="text-sm font-medium text-[var(--color-text-secondary)] text-right">
          Qty
        </div>
        <div className="text-sm font-medium text-[var(--color-text-secondary)] text-right">
          Unit Price
        </div>
        <div className="text-sm font-medium text-[var(--color-text-secondary)] text-right">
          Amount
        </div>
        <div />
      </div>

      {/* Line Items */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={spring.snappy}
              className="bg-white border-2 border-black rounded-[12px] p-3"
            >
              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-[1fr_100px_120px_120px_40px] gap-3 items-start">
                {/* Description */}
                <div>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      handleFieldChange(index, "description", e.target.value)
                    }
                    placeholder="Item description"
                    disabled={disabled}
                    className={`
                      w-full h-10 px-3
                      bg-[var(--color-bg-secondary)]
                      border-2 rounded-lg
                      text-[15px]
                      outline-none
                      transition-colors
                      ${
                        errors[`items.${index}.description`]
                          ? "border-[var(--color-error-border)]"
                          : "border-transparent focus:border-[var(--color-primary-600)]"
                      }
                      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                    `.trim().replace(/\s+/g, " ")}
                  />
                  {errors[`items.${index}.description`] && (
                    <p className="text-xs text-[var(--color-error-text)] mt-1">
                      {errors[`items.${index}.description`]}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <input
                    type="number"
                    value={item.quantity || ""}
                    onChange={(e) =>
                      handleFieldChange(index, "quantity", e.target.value)
                    }
                    min="0"
                    step="1"
                    disabled={disabled}
                    className={`
                      w-full h-10 px-3
                      bg-[var(--color-bg-secondary)]
                      border-2 rounded-lg
                      text-[15px] text-right
                      outline-none
                      transition-colors
                      ${
                        errors[`items.${index}.quantity`]
                          ? "border-[var(--color-error-border)]"
                          : "border-transparent focus:border-[var(--color-primary-600)]"
                      }
                      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                    `.trim().replace(/\s+/g, " ")}
                  />
                </div>

                {/* Unit Price */}
                <div>
                  <input
                    type="number"
                    value={item.unit_price || ""}
                    onChange={(e) =>
                      handleFieldChange(index, "unit_price", e.target.value)
                    }
                    min="0"
                    step="0.01"
                    disabled={disabled}
                    className={`
                      w-full h-10 px-3
                      bg-[var(--color-bg-secondary)]
                      border-2 rounded-lg
                      text-[15px] text-right
                      outline-none
                      transition-colors
                      ${
                        errors[`items.${index}.unit_price`]
                          ? "border-[var(--color-error-border)]"
                          : "border-transparent focus:border-[var(--color-primary-600)]"
                      }
                      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                    `.trim().replace(/\s+/g, " ")}
                  />
                </div>

                {/* Amount (read-only) */}
                <div className="h-10 flex items-center justify-end px-3 text-[15px] font-medium text-[var(--color-text-primary)]">
                  {formatCurrency(item.amount, currency)}
                </div>

                {/* Remove button */}
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    disabled={disabled || items.length === 1}
                    className={`
                      w-10 h-10 flex items-center justify-center
                      rounded-lg
                      text-[var(--color-text-tertiary)]
                      transition-colors
                      ${
                        disabled || items.length === 1
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:bg-[var(--color-error-bg)] hover:text-[var(--color-error-text)]"
                      }
                    `.trim().replace(/\s+/g, " ")}
                    aria-label="Remove line item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden space-y-3">
                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      handleFieldChange(index, "description", e.target.value)
                    }
                    placeholder="Item description"
                    disabled={disabled}
                    className={`
                      w-full h-10 px-3
                      bg-[var(--color-bg-secondary)]
                      border-2 rounded-lg
                      text-[15px]
                      outline-none
                      transition-colors
                      ${
                        errors[`items.${index}.description`]
                          ? "border-[var(--color-error-border)]"
                          : "border-transparent focus:border-[var(--color-primary-600)]"
                      }
                    `.trim().replace(/\s+/g, " ")}
                  />
                </div>

                {/* Quantity and Unit Price */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={item.quantity || ""}
                      onChange={(e) =>
                        handleFieldChange(index, "quantity", e.target.value)
                      }
                      min="0"
                      step="1"
                      disabled={disabled}
                      className="w-full h-10 px-3 bg-[var(--color-bg-secondary)] border-2 border-transparent rounded-lg text-[15px] outline-none focus:border-[var(--color-primary-600)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
                      Unit Price
                    </label>
                    <input
                      type="number"
                      value={item.unit_price || ""}
                      onChange={(e) =>
                        handleFieldChange(index, "unit_price", e.target.value)
                      }
                      min="0"
                      step="0.01"
                      disabled={disabled}
                      className="w-full h-10 px-3 bg-[var(--color-bg-secondary)] border-2 border-transparent rounded-lg text-[15px] outline-none focus:border-[var(--color-primary-600)] transition-colors"
                    />
                  </div>
                </div>

                {/* Amount and Remove */}
                <div className="flex items-center justify-between">
                  <div className="text-[15px]">
                    <span className="text-[var(--color-text-secondary)]">Amount: </span>
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      {formatCurrency(item.amount, currency)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    disabled={disabled || items.length === 1}
                    className={`
                      w-10 h-10 flex items-center justify-center
                      rounded-lg
                      text-[var(--color-text-tertiary)]
                      ${
                        disabled || items.length === 1
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:bg-[var(--color-error-bg)] hover:text-[var(--color-error-text)]"
                      }
                    `.trim().replace(/\s+/g, " ")}
                    aria-label="Remove line item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Item Button */}
      <div className="mt-4">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={handleAddItem}
          disabled={disabled}
        >
          Add line item
        </Button>
      </div>

      {/* Subtotal (quick reference) */}
      <div className="mt-4 pt-4 border-t-2 border-dashed border-[var(--color-border-light)] flex justify-end">
        <div className="text-[15px]">
          <span className="text-[var(--color-text-secondary)]">Subtotal: </span>
          <span className="font-semibold text-[var(--color-text-primary)]">
            {formatCurrency(subtotal, currency)}
          </span>
        </div>
      </div>

      {/* Global items error */}
      {errors["items"] && (
        <p className="text-sm text-[var(--color-error-text)] mt-2">
          {errors["items"]}
        </p>
      )}
    </div>
  );
}
