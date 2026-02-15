"use client";

import { motion } from "motion/react";
import { spring } from "@/lib/motion";
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
      whileHover={{ y: -4, boxShadow: "6px 6px 0 0 #000000" }}
      transition={spring.snappy}
      className="bg-[var(--color-bg-primary)] border-2 border-black rounded-[16px] p-6 shadow-[var(--shadow-md)] cursor-default"
    >
      {/* Icon circle */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        transition={spring.bouncy}
        className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon size={20} style={{ color }} aria-hidden="true" />
      </motion.div>

      {/* Title */}
      <h3
        className="font-semibold text-lg text-[var(--color-text-primary)] mb-2"
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
