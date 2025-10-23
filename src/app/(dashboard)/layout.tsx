import type { Metadata } from "next";
import "@/app/globals.css";
import { Cairo } from "next/font/google";
import Footer from "@/components/Footer";
import HeaderDashboard from "@/components/HeaderDashboard";
import AuthGuard from "@/lib/authGuard";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700"], // choose what you need
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Dashborad",
  description: "Dashborad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body>
        <AuthGuard>
          <HeaderDashboard />
          {children}
          {/* <Footer /> */}
        </AuthGuard>
      </body>
    </html>
  );
}
