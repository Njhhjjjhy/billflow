// Animation tokens for Billflow Neo-Brutalist design system
// Used with Motion.dev (Framer Motion)

import type { Variants, Transition, Easing } from "motion/react";

// Spring transition presets
export const spring = {
  snappy: { type: "spring" as const, stiffness: 500, damping: 30 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 20 },
  smooth: { type: "spring" as const, stiffness: 300, damping: 30 },
  gentle: { type: "spring" as const, stiffness: 200, damping: 25 },
} satisfies Record<string, Transition>;

// Duration presets (in seconds)
export const duration = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
  slower: 0.6,
} as const;

// Easing presets
export const ease = {
  out: [0.22, 1, 0.36, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
} satisfies Record<string, Easing>;

// Button variants for neo-brutalist press effect
export const buttonVariants: Variants = {
  idle: {
    scale: 1,
    x: 0,
    y: 0,
    boxShadow: "4px 4px 0 0 #000000",
  },
  hover: {
    scale: 1.02,
    x: -2,
    y: -2,
    boxShadow: "6px 6px 0 0 #000000",
  },
  tap: {
    scale: 0.98,
    x: 2,
    y: 2,
    boxShadow: "2px 2px 0 0 #000000",
  },
  disabled: {
    scale: 1,
    opacity: 0.5,
    boxShadow: "2px 2px 0 0 #94A3B8",
  },
};

// Card variants for hover lift effect
export const cardVariants: Variants = {
  idle: {
    scale: 1,
    y: 0,
    boxShadow: "4px 4px 0 0 #000000",
  },
  hover: {
    scale: 1.01,
    y: -4,
    boxShadow: "8px 8px 0 0 #000000",
  },
  tap: {
    scale: 0.99,
    y: 0,
    boxShadow: "2px 2px 0 0 #000000",
  },
};

// Input variants for focus animation
export const inputVariants: Variants = {
  idle: {
    boxShadow: "0 0 0 0 transparent",
    borderColor: "#000000",
  },
  focus: {
    boxShadow: "4px 4px 0 0 #2563EB",
    borderColor: "#2563EB",
  },
  error: {
    borderColor: "#DC2626",
    boxShadow: "4px 4px 0 0 #DC2626",
  },
  success: {
    borderColor: "#16A34A",
    boxShadow: "0 0 0 0 transparent",
  },
};

// Staggered list animation
export const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
};

// Page transition variants
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as Easing },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
};

// Toast notification variants
export const toastVariants: Variants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 400, damping: 20 },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

// Modal variants
export const modalOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const modalContentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

// Shake animation for errors
export const shakeAnimation = {
  x: [0, -10, 10, -10, 10, 0],
  transition: { duration: 0.4, ease: "easeInOut" as const },
};

// Dropdown variants for Select component
export const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    scaleY: 0,
    transformOrigin: "top",
  },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { type: "spring" as const, stiffness: 500, damping: 30 },
  },
  exit: {
    opacity: 0,
    scaleY: 0,
    transition: { duration: 0.15 },
  },
};

// Sidebar variants for layout
export const sidebarVariants: Variants = {
  expanded: {
    width: 240,
    transition: { type: "spring" as const, stiffness: 400, damping: 30 },
  },
  collapsed: {
    width: 72,
    transition: { type: "spring" as const, stiffness: 400, damping: 30 },
  },
};

export const sidebarLabelVariants: Variants = {
  expanded: {
    opacity: 1,
    x: 0,
    display: "block",
    transition: { delay: 0.1, duration: 0.2 },
  },
  collapsed: {
    opacity: 0,
    x: -10,
    transitionEnd: { display: "none" },
    transition: { duration: 0.1 },
  },
};

// Mobile navigation variants
export const mobileNavVariants: Variants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 400, damping: 30 },
  },
};

// Nav item hover effect
export const navItemVariants: Variants = {
  idle: {
    scale: 1,
    x: 0,
  },
  hover: {
    scale: 1.02,
    x: 4,
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  },
  tap: {
    scale: 0.98,
  },
  active: {
    scale: 1,
    x: 0,
    backgroundColor: "var(--color-primary-50)",
  },
};
