"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cardVariants, spring } from "@/lib/motion";

export interface CardProps extends Omit<HTMLMotionProps<"div">, "ref" | "children"> {
  /** Makes the card interactive with hover/tap animations */
  interactive?: boolean;
  /** Removes padding for custom content */
  noPadding?: boolean;
  /** Card content */
  children?: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ interactive = false, noPadding = false, className = "", children, ...props }, ref) => {
    const baseClasses = `
      bg-[var(--color-bg-primary)]
      border-2 border-black
      rounded-[16px]
      ${noPadding ? "" : "p-6"}
      ${interactive ? "cursor-pointer" : ""}
    `.trim().replace(/\s+/g, " ");

    if (interactive) {
      return (
        <motion.div
          ref={ref}
          variants={cardVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          transition={spring.smooth}
          className={`${baseClasses} ${className}`}
          role="button"
          tabIndex={0}
          {...props}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={`${baseClasses} shadow-[4px_4px_0_0_#000000] ${className}`}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// Card sub-components for structured content
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function CardHeader({ title, description, action, className = "", ...props }: CardHeaderProps) {
  return (
    <div className={`flex items-start justify-between mb-4 ${className}`} {...props}>
      <div>
        <h3
          className="text-lg font-semibold text-[var(--color-text-primary)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h3>
        {description && (
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className = "", children, ...props }: CardContentProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className = "", children, ...props }: CardFooterProps) {
  return (
    <div
      className={`flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[var(--color-border-light)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
