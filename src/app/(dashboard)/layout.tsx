import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "@/app/globals.css";
import DashboardLayoutClient from "@/components/DashboardLayoutClient";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="bg-[#f9f9f9] text-gray-900">
        <DashboardLayoutClient>{children}</DashboardLayoutClient>
      </body>
    </html>
  );
}
