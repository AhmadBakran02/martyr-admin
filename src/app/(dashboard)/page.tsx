"use client";

import { getMartyrInfo, MartyrInfoResponse } from "@/lib/martyrApi";
import {
  FilePenLine,
  HeartCrack,
  LayoutTemplate,
  MessageSquarePlus,
  SquarePen,
  UserRoundPlus,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { JSX, useEffect, useState } from "react";

type Martyr = {
  id: string;
  name: string;
  date?: string;
  description?: string;
  category?: string;
};

type Massacre = {
  id: string;
  title: string;
  date?: string;
  location?: string;
  description?: string;
};

type RequestItem = {
  id: string;
  type: "addition" | "correction";
  resource: "martyr" | "massacre";
  summary: string;
};

const sampleMartyrs: Martyr[] = [
  { id: "m1", name: "اسم الشهيد 1", date: "2023-01-10", category: "عام" },
  { id: "m2", name: "اسم الشهيد 2", date: "2022-05-01", category: "مجزرة" },
];

const sampleMassacres: Massacre[] = [
  { id: "mm1", title: "مجزرة أ", date: "2021-12-12", location: "المنطقة أ" },
];

const sampleRequests: RequestItem[] = [
  {
    id: "r1",
    type: "addition",
    resource: "martyr",
    summary: "اضافة شهيد جديد: ...",
  },
  {
    id: "r2",
    type: "correction",
    resource: "massacre",
    summary: "تصحيح في تاريخ المجزرة",
  },
];

export default function Dashboard(): JSX.Element {
  const [martyrs] = useState<Martyr[]>(sampleMartyrs);
  const [massacres] = useState<Massacre[]>(sampleMassacres);
  const [requests, setRequests] = useState<RequestItem[]>(sampleRequests);
  const [categories, setCategories] = useState<string[]>(["عام", "مجزرة"]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [info, setInfo] = useState<MartyrInfoResponse["data"] | null>(null);

  if (error) console.log(error);

  useEffect(() => {
    getMartyrInfo()
      .then((res) => {
        setInfo(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch martyr info.");
        console.error(err);
      });
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-50 text-gray-900 p-4 sm:p-6 font-sans"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Mobile Navbar */}
        <div className="flex justify-between items-center mb-4 sm:hidden">
          <h1 className="text-lg font-semibold">لوحة التحكم</h1>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 border rounded-lg bg-white shadow-sm"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex flex-col sm:grid sm:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside
            className={`${
              menuOpen ? "block" : "hidden sm:block"
            } col-span-3 bg-white rounded-2xl shadow p-4 transition-all duration-300`}
          >
            <nav className="space-y-2">
              {[
                {
                  href: "/add-martyr",
                  icon: <UserRoundPlus />,
                  text: "اضافة شهيد",
                },
                {
                  href: "/add-massacre",
                  icon: <HeartCrack />,
                  text: "اضافة مجزرة",
                },
                {
                  href: "/soon",
                  icon: <MessageSquarePlus />,
                  text: "طلبات الاضافة",
                },
                {
                  href: "/soon",
                  icon: <FilePenLine />,
                  text: "طلبات التصحيح",
                },
                {
                  href: "/soon",
                  icon: <LayoutTemplate />,
                  text: "اضافة اقسام جديده",
                },
                {
                  href: "/massacre-section",
                  icon: <SquarePen />,
                  text: "عرض المجازر وتعديل",
                },
                {
                  href: "/martyrs-section",
                  icon: <SquarePen />,
                  text: "عرض الشهداء وتعديل",
                },
              ].map((item) => (
                <Link
                  key={item.text}
                  href={item.href}
                  className="w-full text-right py-2 px-3 rounded hover:bg-gray-100 flex items-center gap-2"
                >
                  {item.icon}
                  <p>{item.text}</p>
                </Link>
              ))}
            </nav>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">الأقسام</h4>
              <ul className="text-sm space-y-1">
                {categories.map((c) => (
                  <li key={c} className="flex justify-between items-center">
                    <span>{c}</span>
                    <button
                      onClick={() =>
                        setCategories(categories.filter((x) => x !== c))
                      }
                      className="text-xs text-red-500"
                    >
                      حذف
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main */}
          <main className="col-span-9 space-y-6">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "طلبات الاضافة",
                  count: info?.numberOfAddRequests || 0,
                  subtitle: "طلبات اضافة شهيد",
                },
                {
                  title: "طلبات التصحيح",
                  count: info?.numberOfUpdateRequests || 0,
                  subtitle: "طلبات تصحيح معلومات",
                },
                {
                  title: "الشهداء",
                  count: info?.numberOfMartyrs || 0,
                  subtitle: "مجموع الشهداء",
                },
                {
                  title: "المجازر",
                  count: info?.numberOfMassacres || 0,
                  subtitle: "مجموع المجازر",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-white p-4 rounded-lg shadow text-center hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="text-2xl mt-2">{card.count}</p>
                  <p className="text-sm text-gray-500">{card.subtitle}</p>
                </div>
              ))}
            </div>

            {/* Requests Table */}
            <section className="bg-white p-4 rounded-lg shadow overflow-x-auto">
              <h2 className="text-lg font-semibold mb-3">عرض الطلبات</h2>
              <table className="min-w-full text-right">
                <thead>
                  <tr className="text-sm text-gray-600 border-b border-gray-300">
                    <th className="py-2 px-3">النوع</th>
                    <th className="py-2 px-3">المورد</th>
                    <th className="py-2 px-3">الملخص</th>
                    <th className="py-2 px-3">إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((r) => (
                    <tr key={r.id} className="border-b border-gray-300 text-sm">
                      <td className="py-2 px-3">
                        {r.type === "addition" ? "طلب اضافة" : "طلب تصحيح"}
                      </td>
                      <td className="py-2 px-3">
                        {r.resource === "martyr" ? "شهيد" : "مجزرة"}
                      </td>
                      <td className="py-2 px-3">{r.summary}</td>
                      <td className="py-2 px-3">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => alert("قبول الطلب: " + r.id)}
                            className="px-3 py-1 rounded bg-green-500 text-white text-xs"
                          >
                            قبول
                          </button>
                          <button
                            onClick={() =>
                              setRequests(requests.filter((x) => x.id !== r.id))
                            }
                            className="px-3 py-1 rounded bg-red-400 text-white text-xs"
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Martyrs list */}
            <section className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3">عرض الشهداء</h2>
              <ul className="space-y-3">
                {martyrs.map((m) => (
                  <li
                    key={m.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-gray-300 p-3 rounded"
                  >
                    <div>
                      <div className="font-medium">{m.name}</div>
                      <div className="text-sm text-gray-500">
                        {m.date} • {m.category}
                      </div>
                    </div>
                    <div className="flex gap-2 self-end sm:self-auto">
                      <button className="px-3 py-1 rounded bg-yellow-300 text-sm text-gray-700">
                        تعديل
                      </button>
                      <button className="px-3 py-1 rounded bg-red-400 text-white text-sm">
                        حذف
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Massacres list */}
            <section className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-3">عرض المجازر</h2>
              <ul className="space-y-3">
                {massacres.map((mm) => (
                  <li
                    key={mm.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-gray-300 p-3 rounded"
                  >
                    <div>
                      <div className="font-medium">{mm.title}</div>
                      <div className="text-sm text-gray-500">
                        {mm.date} • {mm.location}
                      </div>
                    </div>
                    <div className="flex gap-2 self-end sm:self-auto">
                      <button className="px-3 py-1 rounded bg-yellow-300 text-sm text-gray-700">
                        تعديل
                      </button>
                      <button className="px-3 py-1 rounded bg-red-400 text-white text-sm">
                        حذف
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
