"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout";
import { ToastProvider } from "@/components/ui";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Implement actual logout with Supabase Auth
    router.push("/");
  };

  const handleQuickAction = () => {
    router.push("/app/invoices/new");
  };

  return (
    <ToastProvider position="bottom-right">
      <AppShell
        userName="John Doe"
        userEmail="john@example.com"
        onLogout={handleLogout}
        showMobileQuickAction={true}
        onMobileQuickAction={handleQuickAction}
        mobileQuickActionLabel="Create new invoice"
      >
        {children}
      </AppShell>
    </ToastProvider>
  );
}
