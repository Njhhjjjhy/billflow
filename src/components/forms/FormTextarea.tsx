"use client";

import { useId, useRef, useEffect } from "react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
  type Control,
} from "react-hook-form";
import { motion } from "motion/react";
import { inputVariants, spring } from "@/lib/motion";
import { FormField } from "./FormField";

export interface FormTextareaProps<T extends FieldValues> {
  /** Field name (must match schema) */
  name: Path<T>;
  /** Field label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Minimum number of rows */
  minRows?: number;
  /** Maximum number of rows (for auto-resize) */
  maxRows?: number;
  /** Show character count */
  showCount?: boolean;
  /** Maximum character length */
  maxLength?: number;
  /** Control from useForm (optional if using FormProvider) */
  control?: Control<T>;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Form Textarea component integrated with react-hook-form
 * Supports auto-resize and character counting
 */
export function FormTextarea<T extends FieldValues>({
  name,
  label,
  placeholder,
  helperText,
  required,
  disabled,
  minRows = 3,
  maxRows = 10,
  showCount,
  maxLength,
  control: controlProp,
  className = "",
}: FormTextareaProps<T>) {
  const id = useId();
  const formContext = useFormContext<T>();
  const control = controlProp ?? formContext?.control;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (!control) {
    throw new Error(
      "FormTextarea must be used within a FormProvider or have a control prop"
    );
  }

  // Auto-resize function
  const autoResize = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 24;
    const minHeight = lineHeight * minRows;
    const maxHeight = lineHeight * maxRows;

    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${newHeight}px`;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isTouched } }) => {
        const hasError = !!error;
        const showSuccess = isTouched && !hasError && field.value;
        const charCount = (field.value as string)?.length || 0;
        const isNearLimit = maxLength && charCount > maxLength * 0.9;
        const isOverLimit = maxLength && charCount > maxLength;

        // Auto-resize on value change
        useEffect(() => {
          autoResize();
        }, [field.value]);

        return (
          <FormField
            label={label}
            error={error?.message}
            helperText={showCount ? undefined : helperText}
            required={required}
            className={className}
          >
            <motion.textarea
              {...field}
              ref={(e) => {
                field.ref(e);
                (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = e;
              }}
              id={id}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              aria-invalid={hasError ? "true" : undefined}
              aria-describedby={
                error ? `${id}-error` : helperText ? `${id}-helper` : undefined
              }
              variants={inputVariants}
              initial="idle"
              animate={hasError ? "error" : showSuccess ? "success" : "idle"}
              whileFocus="focus"
              transition={spring.snappy}
              value={field.value ?? ""}
              onChange={(e) => {
                field.onChange(e.target.value);
                autoResize();
              }}
              className={`
                w-full px-3 py-2.5
                bg-white
                border-2 border-black
                rounded-[12px]
                text-[15px] text-[var(--color-text-primary)]
                placeholder:text-[var(--color-text-tertiary)]
                disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none
                resize-none
              `
                .trim()
                .replace(/\s+/g, " ")}
              style={{
                minHeight: `${24 * minRows}px`,
              }}
            />

            {/* Helper text and character count */}
            <div className="flex justify-between items-center mt-1">
              {helperText && !error && (
                <p className="text-sm text-[var(--color-text-tertiary)]">
                  {helperText}
                </p>
              )}
              {showCount && maxLength && (
                <motion.span
                  animate={{
                    color: isOverLimit
                      ? "var(--color-error-text)"
                      : isNearLimit
                        ? "var(--color-warning-text)"
                        : "var(--color-text-tertiary)",
                  }}
                  className="text-sm ml-auto"
                  aria-live="polite"
                >
                  {charCount}/{maxLength}
                </motion.span>
              )}
            </div>
          </FormField>
        );
      }}
    />
  );
}

FormTextarea.displayName = "FormTextarea";
