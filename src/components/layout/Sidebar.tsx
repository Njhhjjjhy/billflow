"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HelpCircle,
} from "lucide-react";
import {
  sidebarVariants,
  sidebarLabelVariants,
  navItemVariants,
  spring,
} from "@/lib/motion";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
}

export interface SidebarProps {
  /** Custom navigation items (defaults to app navigation) */
  navItems?: NavItem[];
  /** User display name for footer */
  userName?: string;
  /** User email for footer */
  userEmail?: string;
  /** Callback when logout is clicked */
  onLogout?: () => void;
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Additional CSS classes */
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { label: "Dashboard", href: "/app", icon: <LayoutDashboard size={20} /> },
  { label: "Invoices", href: "/app/invoices", icon: <FileText size={20} /> },
  { label: "Clients", href: "/app/clients", icon: <Users size={20} /> },
  { label: "Settings", href: "/app/settings", icon: <Settings size={20} /> },
];

export function Sidebar({
  navItems = defaultNavItems,
  userName = "User",
  userEmail,
  onLogout,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  className = "",
}: SidebarProps) {
  const pathname = usePathname();
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  // Support both controlled and uncontrolled mode
  const isCollapsed = controlledCollapsed ?? internalCollapsed;
  const setIsCollapsed = useCallback(
    (value: boolean) => {
      if (onCollapsedChange) {
        onCollapsedChange(value);
      } else {
        setInternalCollapsed(value);
      }
    },
    [onCollapsedChange]
  );

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed, setIsCollapsed]);

  const isActiveRoute = (href: string): boolean => {
    if (href === "/app") {
      return pathname === "/app";
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.aside
      variants={sidebarVariants}
      initial={false}
      animate={isCollapsed ? "collapsed" : "expanded"}
      className={`
        hidden tablet:flex flex-col
        h-screen
        bg-white
        border-r-2 border-black
        fixed left-0 top-0
        z-20
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
      role="complementary"
      aria-label="Sidebar navigation"
    >
      {/* Logo / Brand */}
      <div className="h-16 flex items-center px-4 border-b-2 border-black">
        <Link
          href="/app"
          className="flex items-center gap-3 text-[var(--color-text-primary)] no-underline"
        >
          <div className="w-10 h-10 bg-[var(--color-primary-600)] rounded-lg flex items-center justify-center border-2 border-black shadow-[2px_2px_0_0_#000000]">
            <FileText size={20} className="text-white" aria-hidden="true" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                variants={sidebarLabelVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Billflow
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 py-4 overflow-y-auto"
        role="navigation"
        aria-label="Main navigation"
      >
        <ul className="space-y-1 px-2" role="list">
          {navItems.map((item) => {
            const isActive = isActiveRoute(item.href);
            return (
              <li key={item.href}>
                <Link href={item.href} className="block no-underline">
                  <motion.div
                    variants={navItemVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                    transition={spring.snappy}
                    className={`
                      flex items-center gap-3
                      px-3 py-3
                      rounded-lg
                      transition-colors
                      ${
                        isActive
                          ? "bg-[var(--color-primary-50)] text-[var(--color-primary-700)] border-2 border-[var(--color-primary-600)]"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] border-2 border-transparent"
                      }
                    `
                      .trim()
                      .replace(/\s+/g, " ")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span
                      className={`flex-shrink-0 ${isActive ? "text-[var(--color-primary-600)]" : ""}`}
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          variants={sidebarLabelVariants}
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          className="font-medium whitespace-nowrap"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {!isCollapsed && item.badge && (
                      <motion.span
                        variants={sidebarLabelVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        className="ml-auto bg-[var(--color-primary-600)] text-white text-xs font-medium px-2 py-0.5 rounded-full"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Help link */}
      <div className="px-2 py-2 border-t border-[var(--color-border-light)]">
        <Link href="/app/help" className="block no-underline">
          <motion.div
            variants={navItemVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            transition={spring.snappy}
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] border-2 border-transparent"
          >
            <HelpCircle size={20} aria-hidden="true" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  variants={sidebarLabelVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="font-medium"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Help
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </Link>
      </div>

      {/* User section */}
      <div className="px-2 py-3 border-t-2 border-black">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-[var(--color-bg-tertiary)] rounded-full flex items-center justify-center border-2 border-black text-sm font-bold flex-shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                variants={sidebarLabelVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="flex-1 min-w-0"
              >
                <p
                  className="font-medium text-sm truncate"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {userName}
                </p>
                {userEmail && (
                  <p className="text-xs text-[var(--color-text-tertiary)] truncate">
                    {userEmail}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {!isCollapsed && onLogout && (
            <motion.button
              variants={sidebarLabelVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              onClick={onLogout}
              className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]"
              aria-label="Log out"
            >
              <LogOut size={16} aria-hidden="true" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Collapse toggle button */}
      <button
        onClick={toggleCollapsed}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0_0_#000000] hover:shadow-[3px_3px_0_0_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!isCollapsed}
      >
        {isCollapsed ? (
          <ChevronRight size={14} aria-hidden="true" />
        ) : (
          <ChevronLeft size={14} aria-hidden="true" />
        )}
      </button>
    </motion.aside>
  );
}

Sidebar.displayName = "Sidebar";
