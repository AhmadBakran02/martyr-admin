"use client";
import { editRequsetStatus } from "@/lib/editRequestStatus";
import { getAllAddRequset } from "@/lib/getRequestApi";
import { RequestMastyrData } from "@/types/RequestApi";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RequestsDashboard() {
  const router = useRouter();

  const [requestsList, setRequestsList] = useState<RequestMastyrData[]>([]);
  const [error, setError] = useState<string>("");
  const [loadingRequests, setLoadingRequests] = useState<boolean>(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      const res = await getAllAddRequset(5, 1);
      setRequestsList(res.data ? [res.data] : []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "حدث خطأ في التحميل");
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleEditStatus = async (id: string, status: string) => {
    if (status === "rejected") {
      const confirmReject = window.confirm("هل أنت متأكد من رفض هذا الطلب؟");
      if (!confirmReject) return;
    }

    setLoadingId(id);

    try {
      const result = await editRequsetStatus(id, status);
      if (result.success) {
        alert(
          status === "approved"
            ? "✅ تم قبول الطلب بنجاح"
            : "🚫 تم رفض الطلب بنجاح"
        );
        setError("");
      } else {
        setError(result.message);
      }
    } catch {
      setError("حدث خطأ أثناء تحديث الحالة");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className="bg-white p-4 rounded-xl shadow mb-6 overflow-x-auto">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">عرض الطلبات</h2>
        <Link
          href={"/add-request"}
          className="text-sm flex items-center cursor-pointer text-gray-500"
        >
          <p>عرض جميع الطلبات</p>
          <ChevronLeft strokeWidth={1.5} />
        </Link>
      </div>

      {/* 🔹 Skeleton Loading */}
      {loadingRequests ? (
        <div className="animate-pulse">
          <table className="min-w-full text-right text-sm">
            <thead>
              <tr className="text-gray-600 border-b border-gray-300">
                <th className="py-2 px-3">النوع</th>
                <th className="py-2 px-3">الاسم</th>
                <th className="py-2 px-3">مقدم الطلب</th>
                <th className="py-2 px-3">الحالة</th>
                <th className="py-2 px-3 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-200">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="py-3 px-3">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <table className="min-w-full text-right text-sm">
          <thead>
            <tr className="text-gray-600 border-b border-gray-300">
              <th className="py-2 px-3">النوع</th>
              <th className="py-2 px-3">الاسم</th>
              <th className="py-2 px-3">مقدم الطلب</th>
              <th className="py-2 px-3">الحالة</th>
              <th className="py-2 px-3 text-left">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {requestsList.map((r: RequestMastyrData) => (
              <tr
                key={r._id}
                className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => router.push(`/add-request/${r._id}`)}
              >
                <td className="py-2 px-3">{0 ? "مفقود" : "شهيد"}</td>
                <td className="py-2 px-3">{r.fullName}</td>
                <td className="py-2 px-3">{r.requesterName}</td>
                <td className="py-2 px-3">
                  {r.status == "approved" ? "مقبول" : "مرفوض"}
                </td>
                <td className="py-2 px-3 flex gap-2 justify-end">
                  <button
                    disabled={loadingId === r._id || r.status === "approved"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditStatus(r._id, "approved");
                    }}
                    className={`flex items-center justify-center gap-1 px-3 py-1 rounded text-xs font-medium transition-all duration-200
    ${
      loadingId === r._id
        ? "bg-green-300 text-white cursor-wait opacity-70"
        : r.status === "approved"
        ? "bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300"
        : "bg-green-500 text-white hover:bg-green-600 active:scale-[0.97]"
    }
  `}
                  >
                    {loadingId === r._id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>جاري المعالجة...</span>
                      </>
                    ) : r.status === "approved" ? (
                      "تم القبول ✅"
                    ) : (
                      "قبول"
                    )}
                  </button>

                  <button
                    disabled={loadingId === r._id || r.status === "rejected"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditStatus(r._id, "rejected");
                    }}
                    className={`flex items-center justify-center gap-1 px-3 py-1 rounded text-xs font-medium transition-all duration-200
    ${
      loadingId === r._id
        ? "bg-red-300 text-white cursor-wait opacity-70"
        : r.status === "rejected"
        ? "bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300"
        : "bg-red-500 text-white hover:bg-red-600 active:scale-[0.97]"
    }
  `}
                  >
                    {loadingId === r._id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>جاري الرفض...</span>
                      </>
                    ) : r.status === "rejected" ? (
                      "تم الرفض ❌"
                    ) : (
                      "رفض"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {error && (
        <p className="text-red-500 text-center mt-3 text-sm">{error}</p>
      )}
    </section>
  );
}
