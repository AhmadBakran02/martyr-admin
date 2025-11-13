"use client";

import AnimatedCounter from "@/components/AnimatedCounter";
import { getMartyrInfo, MartyrInfoResponse } from "@/lib/martyrApi";
import React, { JSX, useEffect, useState } from "react";
import MartyrsDashboard from "./@martyrs/page";
import MassaresDashboard from "./@massares/page";
import RequestsDashboard from "./@requests/page";

// type Martyr = { id: string; name: string; date?: string; category?: string };

// type RequestItem = {
//   id: string;
//   type: "addition" | "correction";
//   resource: "martyr" | "massacre";
//   summary: string;
// };

// const sampleMartyrs: Martyr[] = [
//   { id: "m1", name: "اسم الشهيد 1", date: "2023-01-10", category: "عام" },
//   { id: "m2", name: "اسم الشهيد 2", date: "2022-05-01", category: "مجزرة" },
// ];

// const sampleRequests: RequestItem[] = [
//   {
//     id: "r1",
//     type: "addition",
//     resource: "martyr",
//     summary: "اضافة شهيد جديد: ...",
//   },
//   {
//     id: "r2",
//     type: "correction",
//     resource: "massacre",
//     summary: "تصحيح في تاريخ المجزرة",
//   },
// ];

// function AnimatedCounter({
//   value,
//   duration = 1000,
// }: {
//   value: number;
//   duration?: number;
// }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const end = value;
//     if (start === end) return;

//     const incrementTime = 10; // ms per frame
//     const totalSteps = duration / incrementTime;
//     const step = (end - start) / totalSteps;

//     const timer = setInterval(() => {
//       start += step;
//       if (start >= end) {
//         clearInterval(timer);
//         setCount(end);
//       } else {
//         setCount(Math.floor(start));
//       }
//     }, incrementTime);

//     return () => clearInterval(timer);
//   }, [value, duration]);

//   return <>{count}</>;
// }

export default function Dashboard(): JSX.Element {
  // const [requests, setRequests] = useState(sampleRequests);
  const [info, setInfo] = useState<MartyrInfoResponse["data"] | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // const fetchMassacres = async () => {
  //   try {
  //     const res = await getAllMassacres(5, 1);
  //     const cleanList = (res.data.massacres || []).filter(
  //       (m: Massacre) => typeof m.name === "string" && m.name.trim() !== ""
  //     );
  //     setMassacresList(cleanList);
  //   } catch (err: unknown) {
  //     if (err instanceof Error) {
  //       setErrorMassacres(err.message);
  //     } else {
  //       setErrorMassacres("Login failed");
  //     }
  //   } finally {
  //     setLoadingMassacres(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchMassacres();
  // }, []);

  // const filtered = massacreslist.filter(
  //   (it) =>
  //     typeof it.name === "string" &&
  //     it.name.toLowerCase().includes(query.trim().toLowerCase())
  // );

  // const fetchMartyrs = async () => {
  //   try {
  //     const res = await getAllMartyrs(5, 1);
  //     const cleanList = (res.data.martyrs || []).filter(
  //       (m: GetMartyr) => typeof m.name === "string" && m.name.trim() !== ""
  //     );
  //     setList(cleanList);
  //     console.log(cleanList);
  //   } catch (err: unknown) {
  //     if (err instanceof Error) setError(err.message);
  //     else setError("حدث خطأ أثناء تحميل البيانات");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchMartyrs();
  // }, []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMartyrInfo()
      .then((res) => setInfo(res.data))
      .catch(() => setError("Failed to fetch martyr info."))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      title: "طلبات الاضافة",
      count: info?.numberOfAddRequests || 0,
      subtitle: "طلبات اضافة شهيد",
    },
    // {
    //   title: "طلبات التصحيح",
    //   count: info?.numberOfUpdateRequests || 0,
    //   subtitle: "طلبات تصحيح",
    // },
    {
      title: "الشهداء",
      count: info?.numberOfMartyrs || 0,
      subtitle: "مجموع الشهداء",
    },
    {
      title: "المفقودين",
      count: info?.numberOfMissingMartyrs || 0,
      subtitle: "مجموع المفقودين",
    },
    {
      title: "المجازر",
      count: info?.numberOfMassacres || 0,
      subtitle: "مجموع المجازر",
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-900 flex" dir="rtl">
      {/* Main */}
      <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-all text-center border border-gray-100"
            >
              <h3 className="font-semibold text-gray-700">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                <AnimatedCounter
                  value={card.count}
                  loading={loading}
                  duration={1200}
                />
              </p>
              <p className="text-sm text-gray-500">{card.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Requests Table */}
        <RequestsDashboard />

        {/* Martyrs */}
        <MartyrsDashboard />

        {/* Massacres */}
        <MassaresDashboard />
      </main>
      {error && <div>{error}</div>}
    </div>
  );
}
