"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToSignup() {
    const el = document.getElementById("signup");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b-2 border-black transition-all ${
        scrolled
          ? "py-3 bg-white/90 backdrop-blur-md"
          : "py-5 bg-white"
      }`}
      style={{ transitionDuration: "200ms" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Billflow
        </a>

        <Button size="sm" variant="primary" onClick={scrollToSignup}>
          Get Early Access
        </Button>
      </div>
    </nav>
  );
}
