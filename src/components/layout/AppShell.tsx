"use client";

import { useState, useCallback, createContext, useContext } from "react";
import { motion } from "motion/react";
import { Sidebar, type NavItem } from "./Sidebar";
import { MobileNav, type MobileNavItem } from "./MobileNav";
import { spring } from "@/lib/motion";

// Context for app shell state
interface AppShellContextValue {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
}

const AppShellContext = createContext<AppShellContextValue | null>(null);

export function useAppShell(): AppShellContextValue {
  const context = useContext(AppShellContext);
  if (!context) {
    throw new Error("useAppShell must be used within an AppShell");
  }
  return context;
}

export interface AppShellProps {
  /** Page content */
  children: React.ReactNode;
  /** Desktop sidebar navigation items */
  sidebarNavItems?: NavItem[];
  /** Mobile navigation items */
  mobileNavItems?: MobileNavItem[];
  /** User display name */
  userName?: string;
  /** User email */
  userEmail?: string;
  /** Callback when logout is clicked */
  onLogout?: () => void;
  /** Show mobile quick action button */
  showMobileQuickAction?: boolean;
  /** Callback when mobile quick action is clicked */
  onMobileQuickAction?: () => void;
  /** Quick action button label */
  mobileQuickActionLabel?: string;
  /** Initial sidebar collapsed state */
  defaultSidebarCollapsed?: boolean;
  /** Additional CSS classes for the main content area */
  className?: string;
}

/**
 * AppShell provides the main layout structure for the application.
 * It includes:
 * - Sidebar navigation (desktop/tablet)
 * - Bottom navigation (mobile)
 * - Responsive content area
 * - User section with logout
 */
export function AppShell({
  children,
  sidebarNavItems,
  mobileNavItems,
  userName,
  userEmail,
  onLogout,
  showMobileQuickAction = true,
  onMobileQuickAction,
  mobileQuickActionLabel,
  defaultSidebarCollapsed = false,
  className = "",
}: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(defaultSidebarCollapsed);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const contextValue: AppShellContextValue = {
    sidebarCollapsed,
    setSidebarCollapsed,
    toggleSidebar,
  };

  return (
    <AppShellContext.Provider value={contextValue}>
      <div className="min-h-screen bg-[var(--color-bg-secondary)]">
        {/* Sidebar - hidden on mobile, shown on tablet+ */}
        <Sidebar
          navItems={sidebarNavItems}
          userName={userName}
          userEmail={userEmail}
          onLogout={onLogout}
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        />

        {/* Main content area */}
        <motion.div
          initial={false}
          animate={{
            marginLeft: sidebarCollapsed ? 72 : 240,
          }}
          transition={spring.smooth}
          className="min-h-screen ml-0 tablet:ml-[240px] pb-20 tablet:pb-0 transition-[margin]"
          style={{
            // CSS fallback for SSR - JS will take over
            marginLeft: undefined,
          }}
        >
          {/* Top header bar for mobile - optional branding/actions */}
          <header className="tablet:hidden sticky top-0 z-10 bg-white border-b-2 border-black">
            <div className="h-14 flex items-center justify-between px-4">
              <span
                className="text-lg font-bold text-[var(--color-text-primary)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Billflow
              </span>
              {userName && (
                <div className="w-8 h-8 bg-[var(--color-bg-tertiary)] rounded-full flex items-center justify-center border-2 border-black text-sm font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </header>

          {/* Page content */}
          <div className={`p-4 tablet:p-6 desktop:p-8 max-w-[1400px] ${className}`}>
            {children}
          </div>
        </motion.div>

        {/* Mobile bottom navigation */}
        <MobileNav
          navItems={mobileNavItems}
          showQuickAction={showMobileQuickAction}
          onQuickAction={onMobileQuickAction}
          quickActionLabel={mobileQuickActionLabel}
        />
      </div>
    </AppShellContext.Provider>
  );
}

AppShell.displayName = "AppShell";

/**
 * Empty state component for pages with no content
 */
export interface EmptyStateProps {
  /** Icon to display */
  icon?: React.ReactNode;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Action button(s) */
  action?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 tablet:py-16 text-center ${className}`}>
      {icon && (
        <div className="w-20 h-20 mb-6 flex items-center justify-center bg-[var(--color-bg-tertiary)] border-2 border-black rounded-2xl shadow-[4px_4px_0_0_#000000]">
          <div className="text-[var(--color-primary-600)]">
            {icon}
          </div>
        </div>
      )}
      <h3
        className="text-xl font-bold text-[var(--color-text-primary)] mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>
      {description && (
        <p className="text-[var(--color-text-secondary)] max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}

EmptyState.displayName = "EmptyState";
