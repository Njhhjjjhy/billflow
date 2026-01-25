// Accessibility hook for respecting user's reduced motion preference
// Used to disable animations for users who prefer reduced motion

import { useReducedMotion as useMotionReducedMotion } from "motion/react";
import { spring } from "@/lib/motion";

/**
 * Hook to get user's motion preference and provide appropriate animation settings
 * @returns Object with shouldAnimate boolean and transition config
 */
export function useMotionPreference() {
  const shouldReduceMotion = useMotionReducedMotion();

  return {
    /** Whether animations should be shown */
    shouldAnimate: !shouldReduceMotion,
    /** Transition config - instant if reduced motion, spring otherwise */
    transition: shouldReduceMotion
      ? { duration: 0 }
      : spring.smooth,
    /** Snappy transition config */
    transitionSnappy: shouldReduceMotion
      ? { duration: 0 }
      : spring.snappy,
    /** Bouncy transition config */
    transitionBouncy: shouldReduceMotion
      ? { duration: 0 }
      : spring.bouncy,
  };
}

/**
 * Simple hook that returns whether to reduce motion
 * Re-exports from motion/react for consistency
 */
export { useReducedMotion as useReducedMotionPreference } from "motion/react";
