"use client";

import DashboardLayoutClient from "@/components/DashboardLayoutClient";
import AuthProvider from "@/app/auth-provider";

export default function DashboardLayout({
  children,
  martyrs: _martyrs,
  massares: _massares,
  requests: _requests,
}: {
  children: React.ReactNode;
  martyrs: React.ReactNode;
  massares: React.ReactNode;
  requests: React.ReactNode;
}) {
  void _martyrs;
  void _massares;
  void _requests;

  return (
    <AuthProvider>
      <DashboardLayoutClient>
        {children}
      </DashboardLayoutClient>
    </AuthProvider>
  );
}
