"use client";
import { apiUrl } from "@/config/apiUrl";
import { refreshAccessTokenApi } from "@/lib/auth";
import { getAllMartyrs, GetMartyr } from "@/lib/martyrApi";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MartyrsDashboard() {
  const router = useRouter();
  const [martyrsList, setMartyrsList] = useState<GetMartyr[]>([]);
  const [loadingMartyrs, setLoadingMartyrs] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchMartyrs = async () => {
    try {
      const res = await getAllMartyrs(5, 1);
      const cleanList = (res.data.martyrs || []).filter(
        (m: GetMartyr) => typeof m.name === "string" && m.name.trim() !== ""
      );
      setMartyrsList(cleanList);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("حدث خطأ أثناء تحميل البيانات");
    } finally {
      setLoadingMartyrs(false);
    }
  };

  useEffect(() => {
    fetchMartyrs();
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "هل أنت متأكد أنك تريد حذف هذا الشهيد؟"
    );
    if (!confirmDelete) return;

    try {
      const token = await refreshAccessTokenApi();
      if (!token) {
        alert("يرجى تسجيل الدخول أولاً.");
        return;
      }

      const res = await fetch(apiUrl + `/api/martyr/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        alert("تم حذف الشهيد بنجاح ✅");
        router.back();
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
    <section className="bg-white p-4 rounded-xl shadow mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">عرض الشهداء</h2>
        <Link
          href={"/martyrs-section"}
          className="text-sm flex items-center cursor-pointer text-gray-500"
        >
          <p className="p-0">عرض جميع الشهداء</p>
          <ChevronLeft strokeWidth={1.5} />
        </Link>
      </div>

      {/* 🔄 Skeleton Loading State */}
      {loadingMartyrs ? (
        <ul className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <li
              key={i}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-gray-200 p-3 rounded-lg animate-pulse"
            >
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-7 w-16 bg-gray-300 rounded"></div>
                <div className="h-7 w-16 bg-gray-300 rounded"></div>
              </div>
            </li>
          ))}
        </ul>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="space-y-3">
          {martyrsList.map((martyr) => (
            <li
              key={martyr._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-gray-200 p-3 rounded-lg hover:bg-gray-50 transition"
              onClick={() => router.push(`/martyrs-section/${martyr._id}`)}
            >
              <div>
                <p className="font-medium">{martyr.name}</p>
                <p className="text-sm text-gray-500">
                  {martyr.dateOfMartyrdom} • {martyr.martyrdomGovernorate}
                </p>
              </div>
              <div className="flex gap-2">
                {/* Buttons */}
                <div className="flex gap-2 sm:ml-auto">
                  <Link
                    href={`/edit-martyrs/${martyr._id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-1.5 rounded-lg border border-yellow-400 text-yellow-700 text-sm font-medium bg-yellow-50 hover:bg-yellow-100 hover:scale-105 transition"
                  >
                    تعديل
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(martyr._id);
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
