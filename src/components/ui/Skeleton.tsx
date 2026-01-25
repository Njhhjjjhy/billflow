"use client";

import { motion } from "motion/react";

// Base Skeleton with pulse animation
export interface SkeletonProps {
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Shape variant */
  variant?: "text" | "circular" | "rectangular" | "rounded";
  /** Custom class name */
  className?: string;
  /** Animation enabled */
  animate?: boolean;
}

export function Skeleton({
  width,
  height,
  variant = "text",
  className = "",
  animate = true,
}: SkeletonProps) {
  const variantClasses = {
    text: "rounded-[4px]",
    circular: "rounded-full",
    rectangular: "rounded-none",
    rounded: "rounded-[12px]",
  };

  const defaultHeight = variant === "text" ? "1em" : height;

  const style: React.CSSProperties = {
    width: width ?? "100%",
    height: defaultHeight,
  };

  if (animate) {
    return (
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`
          bg-gray-200
          ${variantClasses[variant]}
          ${className}
        `.trim().replace(/\s+/g, " ")}
        style={style}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`
        bg-gray-200
        ${variantClasses[variant]}
        ${className}
      `.trim().replace(/\s+/g, " ")}
      style={style}
      aria-hidden="true"
    />
  );
}

// Text skeleton with multiple lines
export interface SkeletonTextProps {
  /** Number of lines */
  lines?: number;
  /** Line spacing */
  spacing?: "sm" | "md" | "lg";
  /** Last line width percentage */
  lastLineWidth?: string;
  className?: string;
}

export function SkeletonText({
  lines = 3,
  spacing = "md",
  lastLineWidth = "75%",
  className = "",
}: SkeletonTextProps) {
  const spacingClasses = {
    sm: "space-y-1.5",
    md: "space-y-2",
    lg: "space-y-3",
  };

  return (
    <div
      className={`${spacingClasses[spacing]} ${className}`}
      aria-label="Loading content..."
    >
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? lastLineWidth : "100%"}
          height="1em"
        />
      ))}
    </div>
  );
}

// Avatar skeleton
export interface SkeletonAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const avatarSizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

export function SkeletonAvatar({ size = "md", className = "" }: SkeletonAvatarProps) {
  return (
    <Skeleton
      variant="circular"
      className={`${avatarSizes[size]} ${className}`}
    />
  );
}

// Card skeleton
export interface SkeletonCardProps {
  /** Show header with avatar */
  showHeader?: boolean;
  /** Number of text lines */
  lines?: number;
  /** Show footer action */
  showFooter?: boolean;
  className?: string;
}

export function SkeletonCard({
  showHeader = true,
  lines = 3,
  showFooter = false,
  className = "",
}: SkeletonCardProps) {
  return (
    <div
      className={`
        p-6
        bg-white
        border-2 border-black
        rounded-[16px]
        shadow-[4px_4px_0_0_#000000]
        ${className}
      `.trim().replace(/\s+/g, " ")}
      aria-label="Loading card..."
    >
      {showHeader && (
        <div className="flex items-center gap-3 mb-4">
          <SkeletonAvatar size="md" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="40%" height="1em" />
            <Skeleton variant="text" width="25%" height="0.875em" />
          </div>
        </div>
      )}

      <SkeletonText lines={lines} />

      {showFooter && (
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
          <Skeleton variant="rounded" width={80} height={36} />
          <Skeleton variant="rounded" width={100} height={36} />
        </div>
      )}
    </div>
  );
}

// Table row skeleton
export interface SkeletonTableRowProps {
  /** Number of columns */
  columns?: number;
  /** Column widths (percentage or px) */
  columnWidths?: (string | number)[];
  className?: string;
}

export function SkeletonTableRow({
  columns = 4,
  columnWidths,
  className = "",
}: SkeletonTableRowProps) {
  const widths = columnWidths || Array(columns).fill("100%");

  return (
    <tr className={className} aria-label="Loading row...">
      {widths.map((width, index) => (
        <td key={index} className="px-4 py-3">
          <Skeleton variant="text" width={width} height="1em" />
        </td>
      ))}
    </tr>
  );
}

// Invoice card skeleton
export function SkeletonInvoiceCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`
        p-6
        bg-white
        border-2 border-black
        rounded-[16px]
        shadow-[4px_4px_0_0_#000000]
        ${className}
      `.trim().replace(/\s+/g, " ")}
      aria-label="Loading invoice..."
    >
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <Skeleton variant="text" width={100} height="0.875em" />
          <Skeleton variant="text" width={180} height="1.25em" />
        </div>
        <Skeleton variant="rounded" width={70} height={24} />
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <Skeleton variant="text" width={60} height="0.875em" />
          <Skeleton variant="text" width={80} height="0.875em" />
        </div>
        <div className="flex justify-between">
          <Skeleton variant="text" width={50} height="0.875em" />
          <Skeleton variant="text" width={100} height="0.875em" />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <Skeleton variant="text" width={120} height="1.5em" />
      </div>
    </div>
  );
}

// Dashboard KPI skeleton
export function SkeletonKPI({ className = "" }: { className?: string }) {
  return (
    <div
      className={`
        p-6
        bg-white
        border-2 border-black
        rounded-[16px]
        shadow-[4px_4px_0_0_#000000]
        ${className}
      `.trim().replace(/\s+/g, " ")}
      aria-label="Loading metric..."
    >
      <div className="flex items-center gap-3 mb-3">
        <Skeleton variant="rounded" width={40} height={40} />
        <Skeleton variant="text" width={80} height="0.875em" />
      </div>
      <Skeleton variant="text" width={140} height="2em" />
      <Skeleton variant="text" width={100} height="0.75em" className="mt-2" />
    </div>
  );
}

// Full page loading skeleton
export function SkeletonPage({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-6 ${className}`} aria-label="Loading page...">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton variant="text" width={200} height="2em" />
          <Skeleton variant="text" width={300} height="1em" />
        </div>
        <Skeleton variant="rounded" width={140} height={44} />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-4">
        <SkeletonKPI />
        <SkeletonKPI />
        <SkeletonKPI />
        <SkeletonKPI />
      </div>

      {/* Table */}
      <div className="bg-white border-2 border-black rounded-[16px] overflow-hidden">
        <div className="bg-gray-100 border-b-2 border-black px-4 py-3">
          <div className="flex gap-4">
            <Skeleton variant="text" width={100} height="1em" />
            <Skeleton variant="text" width={80} height="1em" />
            <Skeleton variant="text" width={120} height="1em" />
            <Skeleton variant="text" width={60} height="1em" />
          </div>
        </div>
        <div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="px-4 py-3 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex gap-4">
                <Skeleton variant="text" width={100} height="1em" />
                <Skeleton variant="text" width={80} height="1em" />
                <Skeleton variant="text" width={120} height="1em" />
                <Skeleton variant="text" width={60} height="1em" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
