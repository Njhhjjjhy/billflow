"use client";

import { forwardRef, useId } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { spring } from "@/lib/motion";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Label text */
  label?: string;
  /** Helper/description text */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: {
    box: "h-4 w-4",
    icon: "h-2.5 w-2.5",
    label: "text-sm",
    gap: "gap-2",
  },
  md: {
    box: "h-5 w-5",
    icon: "h-3 w-3",
    label: "text-[15px]",
    gap: "gap-2.5",
  },
  lg: {
    box: "h-6 w-6",
    icon: "h-4 w-4",
    label: "text-base",
    gap: "gap-3",
  },
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      helperText,
      error = false,
      size = "md",
      className = "",
      id: providedId,
      disabled,
      checked,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const helperId = `${id}-helper`;
    const config = sizeConfig[size];

    return (
      <div className={`flex items-start ${config.gap} ${className}`}>
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            disabled={disabled}
            checked={checked}
            aria-describedby={helperText ? helperId : undefined}
            className="
              peer
              sr-only
            "
            {...props}
          />

          <motion.div
            animate={{
              borderColor: error
                ? "var(--color-error-border)"
                : checked
                ? "var(--color-primary-600)"
                : "#000000",
              backgroundColor: checked
                ? "var(--color-primary-600)"
                : "white",
              scale: checked ? 1 : 1,
            }}
            whileTap={{ scale: 0.9 }}
            transition={spring.bouncy}
            className={`
              ${config.box}
              flex items-center justify-center
              border-2
              rounded-[6px]
              cursor-pointer
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-primary-600)] peer-focus-visible:ring-offset-2
            `.trim().replace(/\s+/g, " ")}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: checked ? 1 : 0,
                opacity: checked ? 1 : 0,
              }}
              transition={spring.bouncy}
            >
              <Check className={`${config.icon} text-white`} aria-hidden="true" />
            </motion.div>
          </motion.div>
        </div>

        {(label || helperText) && (
          <div className="flex-1">
            {label && (
              <label
                htmlFor={id}
                className={`
                  block
                  ${config.label}
                  font-medium
                  text-[var(--color-text-primary)]
                  cursor-pointer
                  ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                `.trim().replace(/\s+/g, " ")}
              >
                {label}
              </label>
            )}
            {helperText && (
              <p
                id={helperId}
                className="text-sm text-[var(--color-text-secondary)] mt-0.5"
              >
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

// Radio variant
export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Label text */
  label?: string;
  /** Helper/description text */
  helperText?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      helperText,
      size = "md",
      className = "",
      id: providedId,
      disabled,
      checked,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const helperId = `${id}-helper`;
    const config = sizeConfig[size];

    return (
      <div className={`flex items-start ${config.gap} ${className}`}>
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            type="radio"
            id={id}
            disabled={disabled}
            checked={checked}
            aria-describedby={helperText ? helperId : undefined}
            className="peer sr-only"
            {...props}
          />

          <motion.div
            animate={{
              borderColor: checked ? "var(--color-primary-600)" : "#000000",
            }}
            whileTap={{ scale: 0.9 }}
            transition={spring.bouncy}
            className={`
              ${config.box}
              flex items-center justify-center
              border-2
              rounded-full
              cursor-pointer
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-primary-600)] peer-focus-visible:ring-offset-2
            `.trim().replace(/\s+/g, " ")}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: checked ? 1 : 0 }}
              transition={spring.bouncy}
              className={`
                ${size === "sm" ? "h-2 w-2" : size === "md" ? "h-2.5 w-2.5" : "h-3 w-3"}
                rounded-full
                bg-[var(--color-primary-600)]
              `}
            />
          </motion.div>
        </div>

        {(label || helperText) && (
          <div className="flex-1">
            {label && (
              <label
                htmlFor={id}
                className={`
                  block
                  ${config.label}
                  font-medium
                  text-[var(--color-text-primary)]
                  cursor-pointer
                  ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                `.trim().replace(/\s+/g, " ")}
              >
                {label}
              </label>
            )}
            {helperText && (
              <p
                id={helperId}
                className="text-sm text-[var(--color-text-secondary)] mt-0.5"
              >
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";

// Radio Group
export interface RadioGroupProps {
  /** Name for the radio group */
  name: string;
  /** Current value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Children (Radio components) */
  children: React.ReactNode;
  /** Layout direction */
  direction?: "horizontal" | "vertical";
  /** Accessible label */
  label?: string;
  className?: string;
}

export function RadioGroup({
  name,
  value,
  onChange,
  children,
  direction = "vertical",
  label,
  className = "",
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`
        flex
        ${direction === "horizontal" ? "flex-row gap-4" : "flex-col gap-2"}
        ${className}
      `.trim().replace(/\s+/g, " ")}
    >
      {children}
    </div>
  );
}
