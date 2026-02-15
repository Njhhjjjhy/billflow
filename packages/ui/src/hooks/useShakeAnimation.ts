// Hook for triggering shake animation on form errors
// Provides visual feedback when validation fails

import { useAnimationControls } from "motion/react";
import { useCallback } from "react";

/**
 * Hook to trigger a shake animation for error feedback
 * @returns Object with controls for motion component and shake trigger function
 *
 * @example
 * ```tsx
 * function FormField({ error }) {
 *   const { controls, shake } = useShakeAnimation();
 *
 *   useEffect(() => {
 *     if (error) shake();
 *   }, [error, shake]);
 *
 *   return (
 *     <motion.div animate={controls}>
 *       <Input error={error} />
 *     </motion.div>
 *   );
 * }
 * ```
 */
export function useShakeAnimation() {
  const controls = useAnimationControls();

  const shake = useCallback(async () => {
    await controls.start({
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4, ease: "easeInOut" },
    });
  }, [controls]);

  return { controls, shake };
}
