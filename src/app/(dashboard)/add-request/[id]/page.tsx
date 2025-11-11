"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getRequestMartyrById } from "@/lib/getRequestMartyrById";
import { AddRequestResponse } from "@/types/RequestApi";
import CardRequest from "@/components/CardRequest/CardRequest";
import PersonalInfoRequest from "@/components/PersonalInfoRequest";
import CitationInfoRequest from "@/components/CitationInfoRequest";
import MediaGalleryRequest from "@/components/MediaGalleryRequest";
import AdditionInfo from "@/components/AdditionInfo";
import { editRequsetStatus } from "@/lib/editRequestStatus";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function MartyrPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [martyr, setMartyr] = useState<AddRequestResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [actionLoading, setActionLoading] = useState<string | null>(null); // for approve/reject buttons

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRequestMartyrById(id);
        setMartyr(res);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("حدث خطأ أثناء التحميل");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleStatus = async (status: "approved" | "rejected") => {
    if (!id) return;

    if (status === "rejected") {
      const confirmReject = confirm("هل أنت متأكد من رفض هذا الطلب؟");
      if (!confirmReject) return;
    }

    setActionLoading(status);
    try {
      const result = await editRequsetStatus(id, status);
      if (result.success) {
        alert(
          status === "approved"
            ? "✅ تم قبول الطلب بنجاح"
            : "🚫 تم رفض الطلب بنجاح"
        );
        router.back();
      } else {
        alert("❌ فشل في تحديث الحالة");
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ في الاتصال بالخادم");
    } finally {
      setActionLoading(null);
    }
  };

  // 💫 Skeleton Loader Design
  if (loading)
    return (
      <div className="p-8 space-y-6 animate-pulse">
        <div className="h-10 w-1/3 bg-gray-200 rounded"></div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="h-6 w-1/2 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-40 bg-gray-200 rounded col-span-1"></div>
            <div className="col-span-2 space-y-4">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-5 bg-gray-200 rounded w-2/3"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 text-lg py-10">⚠️ {error}</div>
    );

  if (!martyr)
    return (
      <div className="text-center text-gray-600 text-lg py-10">
        لا توجد بيانات متاحة
      </div>
    );

  return (
    <motion.div
      className="p-6 sm:p-10 space-y-8 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* --- Top Buttons --- */}
      <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-2xl sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-800">مراجعة الطلب</h1>
        <div className="flex gap-3">
          <button
            onClick={() => handleStatus("approved")}
            disabled={actionLoading === "approved"}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium transition-all ${
              actionLoading === "approved"
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {actionLoading === "approved" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "قبول الطلب"
            )}
          </button>
          <button
            onClick={() => handleStatus("rejected")}
            disabled={actionLoading === "rejected"}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium transition-all ${
              actionLoading === "rejected"
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {actionLoading === "rejected" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "رفض الطلب"
            )}
          </button>
        </div>
      </div>

      {/* --- Content --- */}
      <div className="max-w-6xl mx-auto space-y-10">
        <CardRequest item={martyr.data} />
        <AdditionInfo item={martyr.data} />
        <PersonalInfoRequest item={martyr.data} />
        <CitationInfoRequest item={martyr.data} />
        {martyr && (
          <MediaGalleryRequest media={martyr.data?.media || undefined} />
        )}
      </div>
    </motion.div>
  );
}
