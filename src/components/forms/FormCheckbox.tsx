"use client";

import { useId } from "react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
  type Control,
} from "react-hook-form";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { spring } from "@/lib/motion";

export interface FormCheckboxProps<T extends FieldValues> {
  /** Field name (must match schema) */
  name: Path<T>;
  /** Checkbox label */
  label: string;
  /** Helper text */
  helperText?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Control from useForm (optional if using FormProvider) */
  control?: Control<T>;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Form Checkbox component integrated with react-hook-form
 */
export function FormCheckbox<T extends FieldValues>({
  name,
  label,
  helperText,
  disabled,
  control: controlProp,
  className = "",
}: FormCheckboxProps<T>) {
  const id = useId();
  const formContext = useFormContext<T>();
  const control = controlProp ?? formContext?.control;

  if (!control) {
    throw new Error(
      "FormCheckbox must be used within a FormProvider or have a control prop"
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const isChecked = !!field.value;

        return (
          <div className={className}>
            <label
              htmlFor={id}
              className={`
                flex items-start gap-3 cursor-pointer
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  {...field}
                  id={id}
                  type="checkbox"
                  checked={isChecked}
                  disabled={disabled}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="sr-only peer"
                  aria-describedby={
                    helperText ? `${id}-helper` : undefined
                  }
                />
                <motion.div
                  animate={{
                    borderColor: isChecked
                      ? "var(--color-primary-600)"
                      : "var(--color-border-default)",
                    backgroundColor: isChecked
                      ? "var(--color-primary-600)"
                      : "transparent",
                  }}
                  transition={spring.snappy}
                  className="w-5 h-5 border-2 rounded-md flex items-center justify-center"
                >
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: isChecked ? 1 : 0,
                      opacity: isChecked ? 1 : 0,
                    }}
                    transition={spring.bouncy}
                  >
                    <Check
                      className="w-3.5 h-3.5 text-white"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                  </motion.span>
                </motion.div>
              </div>
              <div className="flex-1">
                <span
                  className="text-[15px] font-medium text-[var(--color-text-primary)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {label}
                </span>
                {helperText && (
                  <p
                    id={`${id}-helper`}
                    className="text-sm text-[var(--color-text-tertiary)] mt-0.5"
                  >
                    {helperText}
                  </p>
                )}
              </div>
            </label>
            {error && (
              <p
                role="alert"
                className="text-sm text-[var(--color-error-text)] mt-1 ml-8"
              >
                {error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}

FormCheckbox.displayName = "FormCheckbox";
