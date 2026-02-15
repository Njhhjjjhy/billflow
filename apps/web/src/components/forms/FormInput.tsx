"use client";

import { useId, forwardRef } from "react";
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

export interface FormInputProps<T extends FieldValues> {
  /** Field name (must match schema) */
  name: Path<T>;
  /** Field label */
  label?: string;
  /** Input type */
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  /** Placeholder text */
  placeholder?: string;
  /** Helper text */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Left element (icon) */
  leftElement?: React.ReactNode;
  /** Right element (icon/button) */
  rightElement?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Control from useForm (optional if using FormProvider) */
  control?: Control<T>;
  /** Additional CSS classes */
  className?: string;
  /** Auto-focus */
  autoFocus?: boolean;
  /** Auto-complete */
  autoComplete?: string;
}

/**
 * Form Input component integrated with react-hook-form
 * Automatically handles validation, error display, and accessibility
 */
export function FormInput<T extends FieldValues>({
  name,
  label,
  type = "text",
  placeholder,
  helperText,
  required,
  leftElement,
  rightElement,
  disabled,
  control: controlProp,
  className = "",
  autoFocus,
  autoComplete,
}: FormInputProps<T>) {
  const id = useId();
  const formContext = useFormContext<T>();
  const control = controlProp ?? formContext?.control;

  if (!control) {
    throw new Error(
      "FormInput must be used within a FormProvider or have a control prop"
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isTouched } }) => {
        const hasError = !!error;
        const showSuccess = isTouched && !hasError && field.value;

        return (
          <FormField
            label={label}
            error={error?.message}
            helperText={helperText}
            required={required}
            className={className}
          >
            <div className="relative">
              {leftElement && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]">
                  {leftElement}
                </div>
              )}

              <motion.input
                {...field}
                id={id}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
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
                  const value =
                    type === "number"
                      ? e.target.value === ""
                        ? ""
                        : Number(e.target.value)
                      : e.target.value;
                  field.onChange(value);
                }}
                className={`
                  w-full h-11 px-3
                  bg-white
                  border-2 border-black
                  rounded-[12px]
                  text-[15px] text-[var(--color-text-primary)]
                  placeholder:text-[var(--color-text-tertiary)]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  focus:outline-none
                  ${leftElement ? "pl-10" : ""}
                  ${rightElement ? "pr-10" : ""}
                `
                  .trim()
                  .replace(/\s+/g, " ")}
              />

              {rightElement && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]">
                  {rightElement}
                </div>
              )}
            </div>
          </FormField>
        );
      }}
    />
  );
}

FormInput.displayName = "FormInput";

// Also export a ref-forwardable version for direct use
export interface BaseInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"
  > {
  label?: string;
  error?: string;
  helperText?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    { label, error, helperText, leftElement, rightElement, className = "", ...props },
    ref
  ) => {
    const id = useId();
    const hasError = !!error;

    return (
      <FormField
        label={label}
        error={error}
        helperText={helperText}
        required={props.required}
        className={className}
      >
        <div className="relative">
          {leftElement && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]">
              {leftElement}
            </div>
          )}

          <motion.input
            ref={ref}
            id={id}
            aria-invalid={hasError ? "true" : undefined}
            variants={inputVariants}
            initial="idle"
            animate={hasError ? "error" : "idle"}
            whileFocus="focus"
            transition={spring.snappy}
            className={`
              w-full h-11 px-3
              bg-white
              border-2 border-black
              rounded-[12px]
              text-[15px] text-[var(--color-text-primary)]
              placeholder:text-[var(--color-text-tertiary)]
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none
              ${leftElement ? "pl-10" : ""}
              ${rightElement ? "pr-10" : ""}
            `
              .trim()
              .replace(/\s+/g, " ")}
            {...props}
          />

          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]">
              {rightElement}
            </div>
          )}
        </div>
      </FormField>
    );
  }
);

BaseInput.displayName = "BaseInput";
