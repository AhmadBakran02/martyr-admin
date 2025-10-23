"use client";
import { logout } from "@/lib/auth";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function HeaderDashboard() {
  const router = useRouter(); // ✅ correct usage

  const handleLogOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="bg-[#1A1A1A] text-white p-8 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">
        <Link href={"/"}>لوحة التحكم</Link>
      </h1>
      <button
        onClick={() => handleLogOut()}
        className="flex gap-2 bg-white text-black py-2 px-4 rounded-md"
      >
        <p>تسجيل الخروج</p>
        <LogOut />
      </button>
    </header>
  );
}
