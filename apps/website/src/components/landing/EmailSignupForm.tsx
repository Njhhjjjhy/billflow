"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@billflow/ui/components/Button";
import { Input } from "@billflow/ui/components/Input";
import { CheckCircle } from "lucide-react";
import { spring } from "@billflow/ui/lib/motion";

interface EmailSignupFormProps {
  /** Visual variant for different backgrounds */
  variant?: "light" | "dark";
  className?: string;
}

export function EmailSignupForm({ variant = "light", className = "" }: EmailSignupFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [error, setError] = useState<string | undefined>(undefined);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email");
      return;
    }

    // TODO: Connect to Supabase or email service
    setStatus("success");
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring.bouncy}
        className={`flex items-center gap-3 ${className}`}
      >
        <CheckCircle
          className={`h-6 w-6 ${variant === "dark" ? "text-[var(--color-accent-yellow)]" : "text-[var(--color-success-border)]"}`}
          aria-hidden="true"
        />
        <p
          className={`text-base font-medium ${variant === "dark" ? "text-white" : "text-[var(--color-text-primary)]"}`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          You&apos;re on the list! We&apos;ll be in touch.
        </p>
      </motion.div>
    );
  }

  const isDark = variant === "dark";

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row gap-3 ${className}`}
      noValidate
    >
      <div className="flex-1">
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(undefined);
          }}
          error={error}
          aria-label="Email address"
          required
          inputSize="lg"
          className={isDark ? "bg-white text-[var(--color-text-primary)] border-black placeholder:text-[var(--color-text-tertiary)]" : ""}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        variant="primary"
        className={isDark ? "!bg-[var(--color-accent-yellow)] !text-[var(--color-text-primary)] !border-black hover:!bg-[var(--color-accent-yellow-light)]" : ""}
      >
        Get Early Access
      </Button>
    </form>
  );
}
