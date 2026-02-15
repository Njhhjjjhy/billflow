"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Plus,
} from "lucide-react";
import { mobileNavVariants, spring } from "@/lib/motion";

export interface MobileNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface MobileNavProps {
  /** Custom navigation items */
  navItems?: MobileNavItem[];
  /** Show the quick action (+ button) */
  showQuickAction?: boolean;
  /** Callback when quick action is clicked */
  onQuickAction?: () => void;
  /** Quick action label for accessibility */
  quickActionLabel?: string;
  /** Additional CSS classes */
  className?: string;
}

const defaultNavItems: MobileNavItem[] = [
  { label: "Dashboard", href: "/app", icon: <LayoutDashboard size={22} /> },
  { label: "Invoices", href: "/app/invoices", icon: <FileText size={22} /> },
  { label: "Clients", href: "/app/clients", icon: <Users size={22} /> },
  { label: "Settings", href: "/app/settings", icon: <Settings size={22} /> },
];

export function MobileNav({
  navItems = defaultNavItems,
  showQuickAction = true,
  onQuickAction,
  quickActionLabel = "Create new invoice",
  className = "",
}: MobileNavProps) {
  const pathname = usePathname();

  const isActiveRoute = (href: string): boolean => {
    if (href === "/app") {
      return pathname === "/app";
    }
    return pathname.startsWith(href);
  };

  // Split nav items for FAB placement (2 on each side)
  const leftItems = navItems.slice(0, 2);
  const rightItems = navItems.slice(2, 4);

  return (
    <motion.nav
      variants={mobileNavVariants}
      initial="hidden"
      animate="visible"
      className={`tablet:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t-2 border-black z-30 safe-area-inset-bottom ${className}`}
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="h-full flex items-center justify-around px-4 max-w-md mx-auto relative">
        {/* Left side nav items */}
        {leftItems.map((item) => (
          <MobileNavLink
            key={item.href}
            item={item}
            isActive={isActiveRoute(item.href)}
          />
        ))}

        {/* Quick Action FAB */}
        {showQuickAction && (
          <div className="relative -top-4">
            <motion.button
              onClick={onQuickAction}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={spring.snappy}
              className="w-14 h-14 bg-[var(--color-primary-600)] rounded-full flex items-center justify-center border-2 border-black shadow-[4px_4px_0_0_#000000] text-white"
              aria-label={quickActionLabel}
            >
              <Plus size={24} aria-hidden="true" />
            </motion.button>
          </div>
        )}

        {/* Right side nav items */}
        {rightItems.map((item) => (
          <MobileNavLink
            key={item.href}
            item={item}
            isActive={isActiveRoute(item.href)}
          />
        ))}
      </div>
    </motion.nav>
  );
}

interface MobileNavLinkProps {
  item: MobileNavItem;
  isActive: boolean;
}

function MobileNavLink({ item, isActive }: MobileNavLinkProps) {
  return (
    <Link
      href={item.href}
      className={`flex flex-col items-center justify-center gap-1 min-w-[48px] min-h-[48px] px-3 py-2 rounded-lg no-underline transition-colors ${isActive ? "text-[var(--color-primary-600)]" : "text-[var(--color-text-secondary)]"}`}
      aria-current={isActive ? "page" : undefined}
    >
      <motion.span
        initial={false}
        animate={{
          scale: isActive ? 1.1 : 1,
          y: isActive ? -2 : 0,
        }}
        transition={spring.snappy}
        aria-hidden="true"
      >
        {item.icon}
      </motion.span>
      <span
        className="text-[10px] font-medium"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {item.label}
      </span>
      {isActive && (
        <motion.div
          layoutId="mobile-nav-indicator"
          className="absolute bottom-1 w-1 h-1 bg-[var(--color-primary-600)] rounded-full"
          transition={spring.bouncy}
        />
      )}
    </Link>
  );
}

MobileNav.displayName = "MobileNav";
