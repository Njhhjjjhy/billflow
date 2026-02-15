"use client";

import { motion } from "motion/react";
import { spring } from "@billflow/ui/lib/motion";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export function FeatureCard({ icon: Icon, title, description, color }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "8px 8px 0 0 #000000" }}
      transition={spring.snappy}
      className="bg-[var(--color-bg-primary)] border-2 border-black rounded-[16px] p-7 shadow-[var(--shadow-md)] cursor-default overflow-hidden relative"
    >
      {/* Colored top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />

      {/* Icon circle */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        transition={spring.bouncy}
        className="w-14 h-14 rounded-[12px] flex items-center justify-center mb-5 border-2 border-black"
        style={{ backgroundColor: `${color}18` }}
      >
        <Icon size={26} style={{ color }} strokeWidth={2.5} aria-hidden="true" />
      </motion.div>

      {/* Title */}
      <h3
        className="font-bold text-xl text-[var(--color-text-primary)] mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
