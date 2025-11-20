"use client";

import AuthGuard from "@/lib/authGuard";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
