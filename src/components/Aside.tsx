"use client";

import { logout } from "@/lib/auth";
import {
  FilePenLine,
  HeartCrack,
  LogOut,
  MessageSquarePlus,
  SquarePen,
  UserRoundPlus,
  UserRoundSearch,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Aside({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const router = useRouter();
  // const [categories, setCategories] = useState(["عام", "مجزرة"]);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    setUserName(localStorage.getItem("userName") ?? "");
  }, []);

  const navLinks = [
    { href: "/add-martyr", icon: <UserRoundPlus />, text: "اضافة شهيد" },
    { href: "/add-missing", icon: <UserRoundSearch />, text: "اضافة مفقود" },
    { href: "/add-massacre", icon: <HeartCrack />, text: "اضافة مجزرة" },
    {
      href: "/add-request",
      icon: <MessageSquarePlus />,
      text: "طلبات الاضافة",
    },
    { href: "/soon", icon: <FilePenLine />, text: "طلبات التصحيح" },
    // { href: "/soon", icon: <LayoutTemplate />, text: "اضافة اقسام جديدة" },
    {
      href: "/martyrs-section",
      icon: <SquarePen />,
      text: "عرض الشهداء وتعديل",
    },
    {
      href: "/missing-section",
      icon: <SquarePen />,
      text: "عرض المفقودين وتعديل",
    },
    {
      href: "/massacre-section",
      icon: <SquarePen />,
      text: "عرض المجازر وتعديل",
    },
  ];

  const handleLogOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 sm:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-[#0b2523] to-[#002623] text-white 
          w-72 sm:w-64 h-screen flex flex-col justify-between transition-transform duration-300
          fixed sm:static top-0 right-0 z-30
          ${open ? "translate-x-0" : "translate-x-full sm:translate-x-0"}
        `}
      >
        <div className="p-5 space-y-4 overflow-y-auto">
          <h2 className="sm:hidde text-lg font-bold tracking-wide">
            <Link href={"/"}>لوحة التحكم</Link>
          </h2>

          <nav className="mt-6 space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.text}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#081c1b] transition-colors"
              >
                {item.icon}
                <span>{item.text}</span>
              </Link>
            ))}
          </nav>

          {/* Categories
          <div className="mt-6 border-t border-[#b6a981] pt-4">
            <h4 className="text-sm font-semibold mb-2">الأقسام</h4>
            <ul className="text-sm space-y-1">
              {categories.map((c) => (
                <li
                  key={c}
                  className="flex justify-between items-center bg-[#081c1b] px-3 py-2 rounded-lg"
                >
                  <span>{c}</span>
                  <button
                    onClick={() =>
                      setCategories(categories.filter((x) => x !== c))
                    }
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    حذف
                  </button>
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        {/* Logout */}
        <div className="border-t border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-lg font-bold">
              م
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{userName ?? "المستخدم"}</p>
              <p className="text-xs text-gray-400">مدير النظام</p>
            </div>
            <button
              onClick={handleLogOut}
              className="p-2 bg-red-400 rounded-lg hover:bg-red-300 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
