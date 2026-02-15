"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { useMotionPreference } from "@billflow/ui/hooks/useReducedMotion";

export function InvoiceIllustration() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useMotionPreference();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!shouldAnimate || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div className="relative mx-auto mt-12" style={{ perspective: "1000px", maxWidth: "340px" }}>
      {/* Floating decorative chips */}
      {shouldAnimate ? (
        <>
          <motion.div
            className="absolute -top-4 -left-6 bg-[var(--color-accent-yellow)] border-2 border-black rounded-full px-3 py-1 text-sm font-bold shadow-[var(--shadow-sm)]"
            style={{ fontFamily: "var(--font-mono)" }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            NT$
          </motion.div>
          <motion.div
            className="absolute -top-2 -right-5 bg-[var(--color-success-bg)] border-2 border-black rounded-full w-9 h-9 flex items-center justify-center shadow-[var(--shadow-sm)]"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-success-border)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute -bottom-3 -right-4 bg-[var(--color-primary-100)] border-2 border-black rounded-lg px-2 py-1 text-xs font-bold text-[var(--color-primary-700)] shadow-[var(--shadow-sm)]"
            style={{ fontFamily: "var(--font-display)" }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            統一發票
          </motion.div>
        </>
      ) : (
        <>
          <div
            className="absolute -top-4 -left-6 bg-[var(--color-accent-yellow)] border-2 border-black rounded-full px-3 py-1 text-sm font-bold shadow-[var(--shadow-sm)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            NT$
          </div>
          <div className="absolute -top-2 -right-5 bg-[var(--color-success-bg)] border-2 border-black rounded-full w-9 h-9 flex items-center justify-center shadow-[var(--shadow-sm)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-success-border)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div
            className="absolute -bottom-3 -right-4 bg-[var(--color-primary-100)] border-2 border-black rounded-lg px-2 py-1 text-xs font-bold text-[var(--color-primary-700)] shadow-[var(--shadow-sm)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            統一發票
          </div>
        </>
      )}

      {/* Main invoice card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={shouldAnimate ? { rotateX, rotateY } : undefined}
        className="relative bg-white border-2 border-black rounded-[12px] p-6 shadow-[var(--shadow-lg)]"
      >
        {/* Invoice header */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="text-xs font-bold tracking-widest text-[var(--color-text-tertiary)] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Invoice
          </span>
          <span
            className="text-xs text-[var(--color-text-tertiary)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            #BF-0042
          </span>
        </div>

        {/* Fake line items */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="h-2.5 bg-[var(--color-bg-tertiary)] rounded-full flex-1" />
            <div className="h-2.5 bg-[var(--color-bg-tertiary)] rounded-full w-16" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2.5 bg-[var(--color-bg-tertiary)] rounded-full w-3/4" />
            <div className="h-2.5 bg-[var(--color-bg-tertiary)] rounded-full w-16" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2.5 bg-[var(--color-bg-tertiary)] rounded-full w-1/2" />
            <div className="h-2.5 bg-[var(--color-bg-tertiary)] rounded-full w-16" />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-dashed border-[var(--color-border-light)] mb-4" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span
            className="text-sm font-semibold text-[var(--color-text-secondary)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Total
          </span>
          <span
            className="text-lg font-bold text-[var(--color-text-primary)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            NT$42,000
          </span>
        </div>

        {/* PAID stamp */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] pointer-events-none">
          <div
            className="border-3 border-[var(--color-success-border)] rounded-lg px-4 py-1 text-[var(--color-success-border)] font-bold text-2xl tracking-widest opacity-30"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            PAID
          </div>
        </div>
      </motion.div>
    </div>
  );
}
