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
    <div className="relative mx-auto mt-12" style={{ perspective: "1000px", maxWidth: "400px" }}>
      {/* Floating decorative chips */}
      {shouldAnimate ? (
        <>
          <motion.div
            className="absolute -top-5 -left-8 bg-[var(--color-accent-yellow)] border-2 border-black rounded-full px-4 py-1.5 text-base font-bold shadow-[var(--shadow-md)]"
            style={{ fontFamily: "var(--font-mono)" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            NT$
          </motion.div>
          <motion.div
            className="absolute -top-3 -right-7 bg-[var(--color-success-bg)] border-2 border-[var(--color-success-border)] rounded-full w-11 h-11 flex items-center justify-center shadow-[var(--shadow-md)]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-success-border)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute -bottom-4 -right-6 bg-[var(--color-accent-coral)] border-2 border-black rounded-lg px-3 py-1.5 text-xs font-bold text-white shadow-[var(--shadow-md)]"
            style={{ fontFamily: "var(--font-display)" }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            統一發票
          </motion.div>
          <motion.div
            className="absolute -bottom-2 -left-5 bg-[var(--color-primary-600)] border-2 border-black rounded-full px-3 py-1 text-xs font-bold text-white shadow-[var(--shadow-sm)]"
            style={{ fontFamily: "var(--font-mono)" }}
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            5% 稅
          </motion.div>
        </>
      ) : (
        <>
          <div
            className="absolute -top-5 -left-8 bg-[var(--color-accent-yellow)] border-2 border-black rounded-full px-4 py-1.5 text-base font-bold shadow-[var(--shadow-md)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            NT$
          </div>
          <div className="absolute -top-3 -right-7 bg-[var(--color-success-bg)] border-2 border-[var(--color-success-border)] rounded-full w-11 h-11 flex items-center justify-center shadow-[var(--shadow-md)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-success-border)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div
            className="absolute -bottom-4 -right-6 bg-[var(--color-accent-coral)] border-2 border-black rounded-lg px-3 py-1.5 text-xs font-bold text-white shadow-[var(--shadow-md)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            統一發票
          </div>
          <div
            className="absolute -bottom-2 -left-5 bg-[var(--color-primary-600)] border-2 border-black rounded-full px-3 py-1 text-xs font-bold text-white shadow-[var(--shadow-sm)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            5% 稅
          </div>
        </>
      )}

      {/* Main invoice card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={shouldAnimate ? { rotateX, rotateY } : undefined}
        className="relative bg-white border-3 border-black rounded-[16px] p-8 shadow-[var(--shadow-xl)]"
      >
        {/* Invoice header */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="text-sm font-bold tracking-widest text-[var(--color-primary-600)] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Invoice
          </span>
          <span
            className="text-sm font-medium text-[var(--color-text-secondary)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            #BF-0042
          </span>
        </div>

        {/* Fake line items with color */}
        <div className="space-y-3.5 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-3 bg-[var(--color-primary-100)] rounded-full flex-1" />
            <div className="h-3 bg-[var(--color-accent-yellow-light)] rounded-full w-20" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-3 bg-[var(--color-primary-100)] rounded-full w-3/4" />
            <div className="h-3 bg-[var(--color-accent-yellow-light)] rounded-full w-20" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-3 bg-[var(--color-primary-100)] rounded-full w-1/2" />
            <div className="h-3 bg-[var(--color-accent-yellow-light)] rounded-full w-20" />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-3 border-dashed border-[var(--color-border-light)] mb-5" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span
            className="text-base font-semibold text-[var(--color-text-secondary)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Total
          </span>
          <span
            className="text-2xl font-bold text-[var(--color-text-primary)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            NT$42,000
          </span>
        </div>

        {/* PAID stamp */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] pointer-events-none">
          <div
            className="border-4 border-[var(--color-success-border)] bg-[var(--color-success-bg)] rounded-lg px-5 py-1.5 text-[var(--color-success-text)] font-bold text-3xl tracking-widest opacity-50"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            PAID
          </div>
        </div>
      </motion.div>
    </div>
  );
}
