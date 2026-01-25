"use client";

import { motion } from "motion/react";
import { FileText, Users, DollarSign, Plus } from "lucide-react";
import { buttonVariants, cardVariants, spring } from "@/lib/motion";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-bg-secondary)] p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header - Title Case for hero */}
        <header className="mb-12">
          <h1
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Billflow
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            Neo-brutalist invoice management for Taiwan freelancers
          </p>
        </header>

        {/* Demo: Status badges - sentence case */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Status badges
          </h2>
          <div className="flex flex-wrap gap-3">
            <span className="badge badge-success">Paid</span>
            <span className="badge badge-warning">Pending</span>
            <span className="badge badge-error">Overdue</span>
            <span className="badge badge-info">Sent</span>
            <span className="badge badge-neutral">Draft</span>
          </div>
        </section>

        {/* Demo: Buttons - sentence case */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Buttons with squircle corners
          </h2>
          <div className="flex flex-wrap gap-4">
            <motion.button
              className="btn btn-primary btn-md"
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              transition={spring.snappy}
            >
              <Plus size={20} aria-hidden="true" />
              Create invoice
            </motion.button>

            <motion.button
              className="btn btn-secondary btn-md"
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              transition={spring.snappy}
            >
              View clients
            </motion.button>

            <button className="btn btn-ghost btn-md">
              Cancel
            </button>

            <button className="btn btn-danger btn-md">
              Delete
            </button>
          </div>
        </section>

        {/* Demo: Cards - sentence case */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Dashboard cards with hover lift
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Outstanding", value: "NT$125,000", icon: DollarSign, color: "var(--color-primary-600)" },
              { label: "This month", value: "NT$85,000", icon: DollarSign, color: "var(--color-success-border)" },
              { label: "Invoices", value: "24", icon: FileText, color: "var(--color-info-border)" },
              { label: "Clients", value: "8", icon: Users, color: "var(--color-accent-coral)" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="card card-interactive"
                variants={cardVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                transition={spring.smooth}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="p-2 border-2 border-black"
                    style={{ backgroundColor: stat.color, borderRadius: '8px' }}
                  >
                    <stat.icon size={20} className="text-white" aria-hidden="true" />
                  </div>
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    {stat.label}
                  </span>
                </div>
                <p
                  className="text-2xl font-bold numeric"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Demo: Input - sentence case */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Form input with squircle corners
          </h2>
          <div className="max-w-md">
            <label htmlFor="demo-input" className="block text-sm font-medium mb-2">
              Client name <span className="text-[var(--color-error-border)]">*</span>
            </label>
            <input
              id="demo-input"
              type="text"
              className="input"
              placeholder="e.g., Chen Design Co."
            />
            <p className="text-sm text-[var(--color-text-tertiary)] mt-2">
              This will appear on the invoice
            </p>
          </div>
        </section>

        {/* Demo: Typography - sentence case */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Typography
          </h2>
          <div className="card">
            <p className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
              Space Grotesk for headings
            </p>
            <p className="mb-4">
              Noto Sans TC for body text. Clean, readable, bilingual-ready.
            </p>
            <p className="numeric text-lg" style={{ fontFamily: "var(--font-mono)" }}>
              Space Mono for numbers: NT$123,456.00 | INV-2026-001
            </p>
          </div>
        </section>

        {/* Footer - sentence case */}
        <footer className="text-center text-sm text-[var(--color-text-tertiary)] pt-8 border-t-2 border-black">
          <p>Billflow MVP - built with Next.js 14, Motion.dev, Tailwind CSS</p>
          <p>Neo-brutalist design system v2.0</p>
        </footer>
      </div>
    </main>
  );
}
