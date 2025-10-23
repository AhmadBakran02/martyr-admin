"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, getRefreshToken, refreshAccessTokenApi } from "./auth";

interface Props {
  children: ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const access = getAccessToken();
      const refresh = getRefreshToken();

      // If both tokens are missing, redirect to login
      if (!access && !refresh) {
        router.replace("/login");
        setChecking(false);
        return;
      }

      // Try to refresh token if needed
      if (!access && refresh) {
        const newAccess = await refreshAccessTokenApi();
        if (!newAccess) {
          router.replace("/login");
          return;
        }
      }

      setChecking(false);
    };

    verifyAuth();
  }, [router]);

  if (checking)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Checking authentication...
      </div>
    );

  return <>{children}</>;
}
