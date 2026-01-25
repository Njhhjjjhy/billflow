"use client";

import { useId, useState, useRef, useEffect } from "react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
  type Control,
} from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Check } from "lucide-react";
import { dropdownVariants, spring } from "@/lib/motion";
import { FormField } from "./FormField";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormSelectProps<T extends FieldValues> {
  /** Field name (must match schema) */
  name: Path<T>;
  /** Field label */
  label?: string;
  /** Select options */
  options: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Helper text */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Control from useForm (optional if using FormProvider) */
  control?: Control<T>;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Form Select component integrated with react-hook-form
 * Custom dropdown with keyboard navigation
 */
export function FormSelect<T extends FieldValues>({
  name,
  label,
  options,
  placeholder = "Select an option",
  helperText,
  required,
  disabled,
  control: controlProp,
  className = "",
}: FormSelectProps<T>) {
  const id = useId();
  const formContext = useFormContext<T>();
  const control = controlProp ?? formContext?.control;

  if (!control) {
    throw new Error(
      "FormSelect must be used within a FormProvider or have a control prop"
    );
  }

  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll focused option into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const focusedOption = listRef.current.children[focusedIndex] as HTMLElement;
      focusedOption?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex, isOpen]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const selectedOption = options.find((opt) => opt.value === field.value);
        const hasError = !!error;

        const handleKeyDown = (e: React.KeyboardEvent) => {
          if (disabled) return;

          switch (e.key) {
            case "Enter":
            case " ":
              e.preventDefault();
              if (isOpen && focusedIndex >= 0) {
                const option = options[focusedIndex];
                if (!option?.disabled) {
                  field.onChange(option.value);
                  setIsOpen(false);
                }
              } else {
                setIsOpen(true);
                setFocusedIndex(
                  options.findIndex((opt) => opt.value === field.value)
                );
              }
              break;
            case "ArrowDown":
              e.preventDefault();
              if (!isOpen) {
                setIsOpen(true);
                setFocusedIndex(0);
              } else {
                setFocusedIndex((prev) =>
                  prev < options.length - 1 ? prev + 1 : prev
                );
              }
              break;
            case "ArrowUp":
              e.preventDefault();
              if (isOpen) {
                setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
              }
              break;
            case "Escape":
              setIsOpen(false);
              break;
            case "Tab":
              setIsOpen(false);
              break;
          }
        };

        return (
          <FormField
            label={label}
            error={error?.message}
            helperText={helperText}
            required={required}
            className={className}
          >
            <div ref={containerRef} className="relative">
              <button
                type="button"
                id={id}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-invalid={hasError ? "true" : undefined}
                className={`
                  w-full h-11 px-3 pr-10
                  bg-white
                  border-2 rounded-[12px]
                  text-[15px] text-left
                  disabled:opacity-50 disabled:cursor-not-allowed
                  focus:outline-none
                  transition-all
                  ${
                    hasError
                      ? "border-[var(--color-error-border)] shadow-[4px_4px_0_0_var(--color-error-border)]"
                      : isOpen
                        ? "border-[var(--color-primary-600)] shadow-[4px_4px_0_0_var(--color-primary-600)]"
                        : "border-black"
                  }
                  ${selectedOption ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-tertiary)]"}
                `
                  .trim()
                  .replace(/\s+/g, " ")}
              >
                {selectedOption?.label || placeholder}
                <ChevronDown
                  className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.ul
                    ref={listRef}
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    role="listbox"
                    aria-labelledby={id}
                    className="absolute z-20 w-full mt-1 py-1 bg-white border-2 border-black rounded-[12px] shadow-[4px_4px_0_0_#000000] max-h-60 overflow-auto"
                  >
                    {options.map((option, index) => (
                      <li
                        key={option.value}
                        role="option"
                        aria-selected={option.value === field.value}
                        aria-disabled={option.disabled}
                        onClick={() => {
                          if (!option.disabled) {
                            field.onChange(option.value);
                            setIsOpen(false);
                          }
                        }}
                        onMouseEnter={() => setFocusedIndex(index)}
                        className={`
                          px-3 py-2 cursor-pointer flex items-center justify-between
                          ${
                            option.disabled
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }
                          ${
                            focusedIndex === index
                              ? "bg-[var(--color-bg-tertiary)]"
                              : ""
                          }
                          ${
                            option.value === field.value
                              ? "text-[var(--color-primary-600)] font-medium"
                              : ""
                          }
                        `
                          .trim()
                          .replace(/\s+/g, " ")}
                      >
                        {option.label}
                        {option.value === field.value && (
                          <Check
                            className="h-4 w-4 text-[var(--color-primary-600)]"
                            aria-hidden="true"
                          />
                        )}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </FormField>
        );
      }}
    />
  );
}

FormSelect.displayName = "FormSelect";
