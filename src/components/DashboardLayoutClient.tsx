"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import Aside from "@/components/Aside";
import Link from "next/link";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f9f9f9]" dir="rtl">
      {/* Sidebar */}
      <div className={`fixed z-30 ${open ? "block" : "hidden sm:block"}`}>
        <Aside open={open} setOpen={setOpen} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="fixed top-0 right-0 left-0 sm:right-64 bg-white shadow-sm h-16 flex items-center justify-between px-4 sm:px-8 z-20">
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden p-2 rounded-lg bg-[#0b2523] text-white hover:bg-[#113330]"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="sm:hidden text-lg font-semibold text-gray-800">
            <Link href="/">لوحة التحكم</Link>
          </h1>
        </header>

        <main className="flex-1 mt-16 overflow-auto sm:mr-64">{children}</main>
      </div>
    </div>
  );
}
