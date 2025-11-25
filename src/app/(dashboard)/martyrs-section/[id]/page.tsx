"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card/Card";
import { getMartyrById, GetMartyrResponse } from "@/lib/getMastyrById";
import PersonalInfo from "@/components/PersonalInfo";
import CitationInfo from "@/components/CitationInfo";
import MediaGallery from "@/components/MediaGallery";
import MartyrPageSkeleton from "@/components/skeletons/MartyrPageSkeleton";

export default function MartyrPage() {
  const { id } = useParams<{ id: string }>();

  const [martyr, setMartyr] = useState<GetMartyrResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMartyrById(id);
        setMartyr(res);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("فشل في تحميل البيانات");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // حالة التحميل - تصميم مركزي وجميل
  if (loading) return <MartyrPageSkeleton />;

  // حالة الخطأ
  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center bg-red-50 p-8">
        <div className="text-center p-8 bg-white rounded-xl shadow-xl border-4 border-red-500">
          <h2 className="text-2xl font-bold text-red-700 mb-4">حدث خطأ</h2>
          <p className="text-lg text-gray-700">{error}</p>
          <p className="text-sm mt-3 text-red-500">
            يرجى المحاولة لاحقًا أو التحقق من معرف الشهيد.
          </p>
        </div>
      </div>
    );

  // حالة عدم وجود بيانات
  if (!martyr)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-8">
        <div className="text-center p-8 bg-white rounded-xl shadow-xl border-4 border-[#C8A870]/70">
          <h2 className="text-2xl font-bold text-[#0B3F3D] mb-4">
            لا توجد بيانات
          </h2>
          <p className="text-lg text-gray-700">
            لم يتم العثور على بيانات لهذا الشهيد.
          </p>
        </div>
      </div>
    );

  const martyrData = martyr.data.martyr;

  return (
    <div className="min-h-screen bg-[#F7F7F0]/30 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto py-8">
        {/* Hero Section / Martyr Name - تطبيق تصميم الزمرد والذهب */}
        <header className="text-center mb-12 py-6 bg-white rounded-2xl shadow-xl border-b-4 border-[#C8A870]">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B3F3D] tracking-wide">
            {martyrData.fullName || "ملف الشهيد"}
          </h1>
          <p className="text-lg font-medium text-gray-600 mt-2">
            تفاصيل ومعلومات كاملة عن الشهيد
          </p>
        </header>

        {/* تنسيق المحتوى الرئيسي بمسافات متناسقة */}
        <div className="space-y-10">
          {/* البطاقة الرئيسية (التي تحتوي على الصورة) */}
          <Card item={martyr} />

          {/* معلومات شخصية */}
          <PersonalInfo item={martyr} />

          {/* معلومات الاستشهاد */}
          <CitationInfo item={martyr} />

          {/* معرض الوسائط  */}
          <MediaGallery media={martyrData.media} />
        </div>

        {/* تذييل الصفحة */}
        <footer className="text-center mt-12 pt-6 border-t border-[#0B3F3D]/20 text-gray-500 text-sm">
          <p>© 2024 نظام التوثيق. جميع الحقوق محفوظة.</p>
        </footer>
      </div>
    </div>
  );
}
