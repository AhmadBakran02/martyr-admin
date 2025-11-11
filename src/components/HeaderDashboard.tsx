"use client";
import Link from "next/link";
import React from "react";

export default function HeaderDashboard() {
  return (
    <header className="bg-[#0b2523] text-white p-8 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">
        <Link href={"/"}>لوحة التحكم</Link>
      </h1>
    </header>
  );
}
