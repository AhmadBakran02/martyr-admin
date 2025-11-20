"use client";

import DashboardLayoutClient from "@/components/DashboardLayoutClient";
import AuthProvider from "@/app/auth-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </AuthProvider>
  );
}
