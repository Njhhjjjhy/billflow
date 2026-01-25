"use client";

import { motion } from "motion/react";
import { pageVariants } from "@/lib/motion";
import { useMotionPreference } from "@/hooks/useReducedMotion";

export interface PageTransitionProps {
  /** Page content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Wrapper component for page transitions
 * Uses fade and slide animation on mount
 * Respects user's reduced motion preference
 */
export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const { shouldAnimate, transition } = useMotionPreference();

  if (!shouldAnimate) {
    return (
      <main id="main-content" className={className}>
        {children}
      </main>
    );
  }

  return (
    <motion.main
      id="main-content"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      transition={transition}
      className={className}
    >
      {children}
    </motion.main>
  );
}

PageTransition.displayName = "PageTransition";

/**
 * Page header component with consistent styling
 */
export interface PageHeaderProps {
  /** Page title */
  title: string;
  /** Optional description */
  description?: string;
  /** Actions to display on the right side */
  actions?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  className = "",
}: PageHeaderProps) {
  return (
    <header
      className={`mb-6 tablet:mb-8 ${className}`.trim()}
    >
      <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4">
        <div>
          <h1
            className="text-2xl tablet:text-3xl font-bold text-[var(--color-text-primary)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-[var(--color-text-secondary)]">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-3 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}

PageHeader.displayName = "PageHeader";

/**
 * Page section component for consistent content grouping
 */
export interface PageSectionProps {
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Section content */
  children: React.ReactNode;
  /** Actions to display in the header */
  actions?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export function PageSection({
  title,
  description,
  children,
  actions,
  className = "",
}: PageSectionProps) {
  return (
    <section className={`mb-6 tablet:mb-8 ${className}`.trim()}>
      {(title || actions) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && (
              <h2
                className="text-lg tablet:text-xl font-semibold text-[var(--color-text-primary)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

PageSection.displayName = "PageSection";
