"use client";

import { forwardRef, useState, useId } from "react";
import { motion, useAnimationControls } from "motion/react";
import { inputVariants, spring, shakeAnimation } from "@/lib/motion";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"> {
  /** Label text for the input */
  label?: string;
  /** Helper text shown below the input */
  helperText?: string;
  /** Error message (shows error state when provided) */
  error?: string;
  /** Shows success state */
  success?: boolean;
  /** Left icon/element */
  leftElement?: React.ReactNode;
  /** Right icon/element */
  rightElement?: React.ReactNode;
  /** Input size variant */
  inputSize?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-9 text-sm",
  md: "h-11 text-[15px]",
  lg: "h-[52px] text-base",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      leftElement,
      rightElement,
      inputSize = "md",
      className = "",
      required,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const controls = useAnimationControls();

    // Shake animation on error
    const handleShake = async () => {
      if (error) {
        await controls.start(shakeAnimation);
      }
    };

    // Determine current variant state
    const currentVariant = error ? "error" : success ? "success" : isFocused ? "focus" : "idle";

    return (
      <motion.div animate={controls} className="w-full">
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
          {leftElement && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]">
              {leftElement}
            </div>
          )}

          <motion.input
            ref={ref}
            id={id}
            variants={inputVariants}
            animate={currentVariant}
            transition={spring.snappy}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              handleShake();
            }}
            required={required}
            aria-required={required}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={`
              w-full
              bg-white
              border-2 border-black
              rounded-[12px]
              text-[var(--color-text-primary)]
              placeholder:text-[var(--color-text-tertiary)]
              outline-none
              ${sizeClasses[inputSize]}
              ${leftElement ? "pl-10" : "px-3"}
              ${rightElement ? "pr-10" : "px-3"}
              ${className}
            `.trim().replace(/\s+/g, " ")}
            style={{ fontFamily: "var(--font-body)" }}
            {...props}
          />

          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]">
              {rightElement}
            </div>
          )}
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
      </motion.div>
    );
  }
);

Input.displayName = "Input";
