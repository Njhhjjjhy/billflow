"use client";

import { forwardRef, useState, useId } from "react";
import { motion, useAnimationControls } from "motion/react";
import { inputVariants, spring, shakeAnimation } from "@/lib/motion";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"> {
  /** Label text for the textarea */
  label?: string;
  /** Helper text shown below the textarea */
  helperText?: string;
  /** Error message (shows error state when provided) */
  error?: string;
  /** Shows success state */
  success?: boolean;
  /** Show character count */
  showCount?: boolean;
  /** Maximum character count */
  maxLength?: number;
  /** Minimum height in rows */
  minRows?: number;
  /** Auto-resize based on content */
  autoResize?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      showCount = false,
      maxLength,
      minRows = 3,
      autoResize = false,
      className = "",
      required,
      id: providedId,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [charCount, setCharCount] = useState(
      (value?.toString() || defaultValue?.toString() || "").length
    );
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const counterId = `${id}-counter`;
    const controls = useAnimationControls();

    // Shake animation on error
    const handleShake = async () => {
      if (error) {
        await controls.start(shakeAnimation);
      }
    };

    // Handle change with character counting
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);

      // Auto-resize if enabled
      if (autoResize) {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }

      onChange?.(e);
    };

    // Determine current variant state
    const currentVariant = error
      ? "error"
      : success
      ? "success"
      : isFocused
      ? "focus"
      : "idle";

    const isOverLimit = maxLength && charCount > maxLength;
    const isNearLimit = maxLength && charCount > maxLength * 0.9;

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
                <span
                  className="text-[var(--color-error-border)] ml-1"
                  aria-hidden="true"
                >
                  *
                </span>
                <span className="sr-only">(required)</span>
              </>
            )}
          </label>
        )}

        <motion.textarea
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
          onChange={handleChange}
          value={value}
          defaultValue={defaultValue}
          required={required}
          maxLength={maxLength}
          rows={minRows}
          aria-required={required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            [
              error ? errorId : null,
              helperText ? helperId : null,
              showCount ? counterId : null,
            ]
              .filter(Boolean)
              .join(" ") || undefined
          }
          className={`
            w-full
            bg-white
            border-2 border-black
            rounded-[12px]
            px-3 py-3
            text-[15px]
            text-[var(--color-text-primary)]
            placeholder:text-[var(--color-text-tertiary)]
            outline-none
            resize-y
            ${autoResize ? "resize-none overflow-hidden" : ""}
            ${className}
          `.trim().replace(/\s+/g, " ")}
          style={{
            fontFamily: "var(--font-body)",
            minHeight: `${minRows * 1.6}em`,
          }}
          {...props}
        />

        <div className="flex justify-between items-start mt-2">
          <div className="flex-1">
            {error && (
              <p
                id={errorId}
                role="alert"
                className="text-sm text-[var(--color-error-text)]"
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
          </div>

          {showCount && maxLength && (
            <motion.span
              id={counterId}
              animate={{
                color: isOverLimit
                  ? "var(--color-error-border)"
                  : isNearLimit
                  ? "var(--color-warning-border)"
                  : "var(--color-text-tertiary)",
                scale: isNearLimit ? [1, 1.1, 1] : 1,
              }}
              transition={spring.snappy}
              className="text-sm ml-2 font-mono tabular-nums"
              aria-live="polite"
            >
              {charCount}/{maxLength}
            </motion.span>
          )}
        </div>
      </motion.div>
    );
  }
);

Textarea.displayName = "Textarea";
