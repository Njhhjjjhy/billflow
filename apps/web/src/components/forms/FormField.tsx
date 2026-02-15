"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { useShakeAnimation } from "@/hooks/useShakeAnimation";
import { useEffect } from "react";

export interface FormFieldProps {
  /** Field label */
  label?: string;
  /** Helper text below the field */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Whether the field is required */
  required?: boolean;
  /** The form input element */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * FormField wrapper component
 * Provides consistent label, error, and helper text styling
 * Integrates with react-hook-form error states
 */
export function FormField({
  label,
  helperText,
  error,
  required,
  children,
  className = "",
}: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const { controls, shake } = useShakeAnimation();

  // Shake on error
  useEffect(() => {
    if (error) {
      shake();
    }
  }, [error, shake]);

  return (
    <motion.div animate={controls} className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-[var(--color-text-primary)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {label}
          {required && (
            <>
              <span aria-hidden="true" className="text-[var(--color-error-border)] ml-1">
                *
              </span>
              <span className="sr-only">(required)</span>
            </>
          )}
        </label>
      )}

      {children}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-sm text-[var(--color-error-text)] flex items-center gap-1"
        >
          {error}
        </p>
      )}

      {helperText && !error && (
        <p
          id={helperId}
          className="text-sm text-[var(--color-text-tertiary)]"
        >
          {helperText}
        </p>
      )}
    </motion.div>
  );
}

FormField.displayName = "FormField";
