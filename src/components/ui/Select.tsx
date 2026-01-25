"use client";

import {
  forwardRef,
  useState,
  useRef,
  useId,
  useEffect,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Check } from "lucide-react";
import { spring, dropdownVariants } from "@/lib/motion";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** Options to display in the dropdown */
  options: SelectOption[];
  /** Current value */
  value?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Label for the select */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Custom class name */
  className?: string;
  /** ID for the select */
  id?: string;
  /** Name for form submission */
  name?: string;
}

const sizeClasses = {
  sm: "h-9 text-sm",
  md: "h-11 text-[15px]",
  lg: "h-[52px] text-base",
};

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select an option",
      label,
      error,
      helperText,
      disabled = false,
      required = false,
      size = "md",
      className = "",
      id: providedId,
      name,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const generatedId = useId();
    const id = providedId || generatedId;
    const listboxId = `${id}-listbox`;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    const triggerRef = useRef<HTMLButtonElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);

    // Find selected option
    const selectedOption = options.find((opt) => opt.value === value);

    // Close dropdown when clicking outside
    useEffect(() => {
      if (!isOpen) return;

      function handleClickOutside(event: MouseEvent) {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node) &&
          listboxRef.current &&
          !listboxRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (disabled) return;

        const enabledOptions = options.filter((opt) => !opt.disabled);

        switch (event.key) {
          case "Enter":
          case " ":
            event.preventDefault();
            if (isOpen && focusedIndex >= 0) {
              const focusedOption = enabledOptions[focusedIndex];
              if (focusedOption) {
                onChange?.(focusedOption.value);
                setIsOpen(false);
                triggerRef.current?.focus();
              }
            } else {
              setIsOpen(!isOpen);
            }
            break;

          case "ArrowDown":
            event.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
              setFocusedIndex(0);
            } else {
              setFocusedIndex((prev) =>
                prev < enabledOptions.length - 1 ? prev + 1 : 0
              );
            }
            break;

          case "ArrowUp":
            event.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
              setFocusedIndex(enabledOptions.length - 1);
            } else {
              setFocusedIndex((prev) =>
                prev > 0 ? prev - 1 : enabledOptions.length - 1
              );
            }
            break;

          case "Escape":
            event.preventDefault();
            setIsOpen(false);
            triggerRef.current?.focus();
            break;

          case "Tab":
            setIsOpen(false);
            break;

          case "Home":
            event.preventDefault();
            setFocusedIndex(0);
            break;

          case "End":
            event.preventDefault();
            setFocusedIndex(enabledOptions.length - 1);
            break;
        }
      },
      [disabled, isOpen, focusedIndex, options, onChange]
    );

    // Reset focused index when closed
    useEffect(() => {
      if (!isOpen) {
        setFocusedIndex(-1);
      }
    }, [isOpen]);

    const handleSelect = (optionValue: string) => {
      onChange?.(optionValue);
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-[var(--color-text-primary)] mb-2"
          >
            {label}
            {required && (
              <>
                <span className="text-[var(--color-error-border)] ml-1" aria-hidden="true">
                  *
                </span>
                <span className="sr-only">(required)</span>
              </>
            )}
          </label>
        )}

        <div className="relative">
          {/* Hidden native select for form submission */}
          {name && (
            <select
              name={name}
              value={value || ""}
              onChange={() => {}}
              tabIndex={-1}
              className="sr-only"
              aria-hidden="true"
            >
              <option value="">{placeholder}</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          {/* Custom trigger button */}
          <motion.button
            ref={(node) => {
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
            }}
            type="button"
            id={id}
            disabled={disabled}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            aria-required={required}
            animate={{
              boxShadow: isOpen
                ? "4px 4px 0 0 #2563EB"
                : error
                ? "4px 4px 0 0 #DC2626"
                : "0 0 0 0 transparent",
              borderColor: isOpen ? "#2563EB" : error ? "#DC2626" : "#000000",
            }}
            transition={spring.snappy}
            className={`
              w-full
              flex items-center justify-between
              bg-white
              border-2
              rounded-[12px]
              px-3
              text-left
              outline-none
              ${sizeClasses[size]}
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              focus-visible:ring-2 focus-visible:ring-[var(--color-primary-600)] focus-visible:ring-offset-2
            `.trim().replace(/\s+/g, " ")}
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span
              className={
                selectedOption
                  ? "text-[var(--color-text-primary)]"
                  : "text-[var(--color-text-tertiary)]"
              }
            >
              {selectedOption?.label || placeholder}
            </span>
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown
                className="h-5 w-5 text-[var(--color-text-secondary)]"
                aria-hidden="true"
              />
            </motion.span>
          </motion.button>

          {/* Dropdown listbox */}
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                ref={listboxRef}
                id={listboxId}
                role="listbox"
                aria-labelledby={id}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`
                  absolute z-20
                  w-full mt-2
                  bg-white
                  border-2 border-black
                  rounded-[12px]
                  shadow-[4px_4px_0_0_#000000]
                  py-1
                  max-h-60 overflow-auto
                `.trim().replace(/\s+/g, " ")}
              >
                {options.map((option, index) => {
                  const isSelected = option.value === value;
                  const isFocused = index === focusedIndex;

                  return (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={option.disabled}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                      className={`
                        flex items-center justify-between
                        px-3 py-2
                        text-[15px]
                        cursor-pointer
                        ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}
                        ${isFocused ? "bg-[var(--color-bg-tertiary)]" : ""}
                        ${isSelected ? "font-medium text-[var(--color-primary-600)]" : "text-[var(--color-text-primary)]"}
                        ${!option.disabled && !isFocused ? "hover:bg-[var(--color-bg-secondary)]" : ""}
                      `.trim().replace(/\s+/g, " ")}
                    >
                      <span>{option.label}</span>
                      {isSelected && (
                        <Check
                          className="h-4 w-4 text-[var(--color-primary-600)]"
                          aria-hidden="true"
                        />
                      )}
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-sm text-[var(--color-error-text)] mt-2"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={helperId}
            className="text-sm text-[var(--color-text-tertiary)] mt-2"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
