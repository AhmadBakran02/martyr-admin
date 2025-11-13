"use client";
import { apiUrl } from "@/config/apiUrl";
import { refreshAccessTokenApi } from "@/lib/auth";
import { getAllMassacres, Massacre } from "@/lib/massacreApi";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function MassaresDashboard() {
  const router = useRouter();
  const [massacreslist, setMassacresList] = useState<Massacre[]>([]);
  const [loadingMassacres, setLoadingMassacres] = useState<boolean>(true);
  const [errorMassacres, setErrorMassacres] = useState<string>("");

  const fetchMassacres = async () => {
    setLoadingMassacres(true);
    try {
      const res = await getAllMassacres(5, 1);
      const cleanList = (res.data.massacres || []).filter(
        (m: Massacre) => typeof m.name === "string" && m.name.trim() !== ""
      );
      setMassacresList(cleanList);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMassacres(err.message);
      } else {
        setErrorMassacres("حدث خطأ أثناء التحميل");
      }
    } finally {
      setLoadingMassacres(false);
    }
  };

  useEffect(() => {
    fetchMassacres();
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id) return;

    // ✅ Confirm before deleting
    const confirmDelete = window.confirm(
      "هل أنت متأكد أنك تريد حذف هذه المجزرة"
    );
    if (!confirmDelete) return;

    try {
      const token = await refreshAccessTokenApi();
      if (!token) {
        alert("يرجى تسجيل الدخول أولاً.");
        return;
      }

      const res = await fetch(apiUrl + `/api/massacre/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        alert("تم حذف المجزرة بنجاح ✅");
        fetchMassacres();
      } else {
        const err = await res.json();
        console.error("Delete failed:", err);
        alert("حدث خطأ أثناء الحذف ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ في الاتصال بالخادم ❌");
    }
  };

  return (
    <section className="bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">عرض المجازر</h2>
        <Link
          href={"/massacre-section"}
          className="text-sm flex items-center cursor-pointer text-gray-500"
        >
          <p className="p-0">عرض جميع المجازر</p>
          <ChevronLeft strokeWidth={1.5} />
        </Link>
      </div>

      {/* 🟡 Error state */}
      {errorMassacres && (
        <p className="text-red-600 text-sm mb-3">{errorMassacres}</p>
      )}

      {/* 🔄 Skeleton loading */}
      {loadingMassacres ? (
        <ul className="space-y-3 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <li
              key={i}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-gray-200 p-3 rounded-lg"
            >
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <div className="h-7 w-14 bg-gray-200 rounded"></div>
                <div className="h-7 w-14 bg-gray-200 rounded"></div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        // ✅ Normal content
        <ul className="space-y-3">
          {massacreslist.map((mm) => (
            <li
              key={mm._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-gray-200 p-3 rounded-lg hover:bg-gray-50 transition-all"
              onClick={() => router.push(`/massacre-section/${mm._id}`)}
            >
              <div>
                <p className="font-medium">{mm.name}</p>
                <p className="text-sm text-gray-500">
                  {mm.startDate} • {mm.location}
                </p>
              </div>
              <div className="flex gap-2">
                {/* Buttons */}
                <div className="flex gap-2 sm:ml-auto">
                  <Link
                    href={`/edit-martyrs/${mm._id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-1.5 rounded-lg border border-yellow-400 text-yellow-700 text-sm font-medium bg-yellow-50 hover:bg-yellow-100 hover:scale-105 transition"
                  >
                    تعديل
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(mm._id || "");
                    }}
                    className="px-4 py-1.5 rounded-lg border border-red-500 text-red-600 text-sm font-medium bg-red-50 hover:bg-red-100 hover:scale-105 transition"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
