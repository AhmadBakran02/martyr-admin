// "use client";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { getMartyrById, GetMartyrResponse } from "@/lib/getMastyrById";
// import Loading2 from "@/components/Loading2/Loading2";
// import MediaGallery from "@/components/MediaGallery";
// import CardMissing from "@/components/CardMissing/CardMissing";
// import MissingInfo from "@/components/MissingInfo";
// import PersonalInfoMissing from "@/components/PersonalInfoMissing";

// export default function MartyrPage() {
//   const { id } = useParams<{ id: string }>();
//   const [martyr, setMartyr] = useState<GetMartyrResponse | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getMartyrById(id);
//         setMartyr(res);
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError("Login failed");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   if (loading)
//     return (
//       <div className="h-dvh flex justify-center items-center">
//         <Loading2 />
//       </div>
//     );

//   if (error) return <div className="text-red-500">{error}</div>;
//   if (!martyr) return <div>No data found</div>;

//   return (
//     <div className="p-4 rounded-md shadow-md flex justify-center items-center">
//       <div className="sm:max-w-10/12 w-full">
//         {/* <MassacreInfo key={massacre._id} item={massacre} /> */}
//         <CardMissing item={martyr} />
//         <div className="m-10"></div>
//         <PersonalInfoMissing item={martyr} />
//         <div className="m-10"></div>
//         <MissingInfo item={martyr} />
//         <div className="m-10"></div>
//         {martyr && <MediaGallery media={martyr.data.martyr.media ?? []} />}
//       </div>
//     </div>
//   );
// }

"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getMartyrById, GetMartyrResponse } from "@/lib/getMastyrById";
import MediaGallery from "@/components/MediaGallery";
import MartyrPageSkeleton from "@/components/skeletons/MartyrPageSkeleton";
import CardMissing from "@/components/CardMissing/CardMissing";
import MissingInfo from "@/components/MissingInfo";
import PersonalInfo from "@/components/PersonalInfo";

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
            {martyrData.fullName || "ملف المفقود"}
          </h1>
          <p className="text-lg font-medium text-gray-600 mt-2">
            تفاصيل ومعلومات كاملة عن المفقود
          </p>
        </header>

        {/* تنسيق المحتوى الرئيسي بمسافات متناسقة */}
        <div className="space-y-10">
          {/* البطاقة الرئيسية (التي تحتوي على الصورة) */}
          <CardMissing item={martyr} />

          {/* معلومات شخصية */}
          <PersonalInfo item={martyr} missing={true} />

          {/* معلومات الاستشهاد */}
          <MissingInfo item={martyr} />

          {/* معرض الوسائط  */}
          <MediaGallery media={martyrData.media} />
        </div>
      </div>
    </div>
  );
}
