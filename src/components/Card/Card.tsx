"use client";

import Image from "next/image";
// تم التعليق على الاستيرادات الخارجية لتجنب الأخطاء، وسيتم استبدال card بـ Tailwind classes
// import { card } from "@/styles/Card.styles";
import {
  SquareCheckBig,
  SquareX,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
// import "./style.css"; // تم التعليق على ملف الستايل المحلي
import { GetMartyrResponse } from "@/lib/getMastyrById";
import Link from "next/link";
import { refreshAccessTokenApi } from "@/lib/auth";
import { apiUrl } from "@/config/apiUrl";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

// تعريف الألوان المستخدمة لسهولة القراءة
const DARK_TEAL = "text-[#0B3F3D]";
const GOLD = "bg-[#C8A870] hover:bg-amber-400";
const LIGHT_BG = "bg-[#F7F7F0]";
const BORDER_COLOR = "border-[#0B3F3D]/20";
const TEXT_LABEL = "text-gray-500";
const TEXT_VALUE = DARK_TEAL;

interface MastyrCardProps {
  item: GetMartyrResponse | null;
}

// --------------------------------------------------
// تعريف أنواع الرسائل ونظام الإشعارات المخصص
// --------------------------------------------------
interface Message {
  text: string;
  type: "success" | "error" | "confirm";
  onConfirm?: () => void;
}

const Card = ({ item }: MastyrCardProps) => {
  const router = useRouter();

  // حالة لعرض الرسائل والإشعارات
  const [message, setMessage] = useState<Message | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // وظيفة عرض رسالة مؤقتة
  const showMessage = useCallback(
    (text: string, type: "success" | "error", duration = 3000) => {
      setMessage({ text, type });
      setTimeout(() => setMessage(null), duration);
    },
    []
  );

  // وظيفة معالجة طلب الحذف (تفتح التأكيد أولاً)
  const handleDeleteRequest = (id?: string) => {
    if (!id) return;
    setMessage({
      text: "هل أنت متأكد أنك تريد حذف هذا الشهيد؟ هذه العملية لا يمكن التراجع عنها.",
      type: "confirm",
      onConfirm: () => handleDeleteConfirmed(id),
    });
  };

  // وظيفة تنفيذ الحذف بعد التأكيد
  const handleDeleteConfirmed = async (id: string) => {
    setMessage(null); // إغلاق صندوق التأكيد
    setIsDeleting(true);

    try {
      const token = await refreshAccessTokenApi();
      if (!token) {
        showMessage("يرجى تسجيل الدخول أولاً.", "error");
        setIsDeleting(false);
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
        showMessage("تم حذف الشهيد بنجاح ✅", "success");
        setTimeout(() => router.back(), 1500); // العودة للخلف بعد فترة قصيرة
      } else {
        const err = await res.json();
        console.error("Delete failed:", err);
        showMessage("حدث خطأ أثناء الحذف ❌", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showMessage("حدث خطأ في الاتصال بالخادم ❌", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const photoID = item?.data.martyr.photoId;
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  // ✅ Fetch image blob from API
  useEffect(() => {
    const fetchPhoto = async () => {
      if (!photoID) return;

      let currentUrl: string | null = null;

      try {
        const res = await fetch(`${apiUrl}/api/file?id=${photoID}`);
        if (res.ok) {
          const blob = await res.blob();
          currentUrl = URL.createObjectURL(blob);
          setPhotoUrl(currentUrl);
        } else {
          console.error("Failed to fetch image:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }

      // Cleanup old blob URL upon component unmount or dependency change
      return () => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
      };
    };

    fetchPhoto();

    // Cleanup old blob URLs when component unmounts
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, [photoID, photoUrl]);
  // إزالة photoUrl من الـ dependency array لتجنب التكرار في useEffect
  // والاعتماد فقط على photoID لتشغيل الجلب.

  // --------------------------------------------------
  // مكون عرض الرسائل والإشعارات
  // --------------------------------------------------
  const MessageDisplay = () => {
    if (!message) return null;

    const isConfirm = message.type === "confirm";
    const bgColor =
      message.type === "success"
        ? "bg-green-100 border-green-400 text-green-700"
        : message.type === "error"
        ? "bg-red-100 border-red-400 text-red-700"
        : "bg-yellow-100 border-yellow-400 text-yellow-700";
    const Icon = message.type === "success" ? CheckCircle : AlertTriangle;

    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div
          className={`rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-md ${bgColor} border-r-4 ${DARK_TEAL} text-right`}
        >
          <div className="flex items-center justify-end mb-4">
            <h4 className={`text-lg font-bold mr-3 ${DARK_TEAL}`}>
              {isConfirm
                ? "تأكيد الإجراء"
                : message.type === "success"
                ? "نجاح"
                : "خطأ"}
            </h4>
            <Icon className={`w-6 h-6 ${isConfirm ? "text-yellow-600" : ""}`} />
          </div>

          <p className="text-gray-800 mb-6 leading-relaxed">{message.text}</p>

          <div
            className={`flex ${
              isConfirm ? "justify-between" : "justify-center"
            } gap-4`}
          >
            {isConfirm && (
              <button
                onClick={message.onConfirm}
                disabled={isDeleting}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold text-white ${
                  isDeleting ? "bg-red-300" : "bg-red-600 hover:bg-red-700"
                } transition duration-200`}
              >
                {isDeleting ? "جارٍ الحذف..." : "حذف"}
              </button>
            )}

            <button
              onClick={() => setMessage(null)}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold ${
                isConfirm
                  ? "bg-gray-300 hover:bg-gray-400 text-gray-800"
                  : "bg-[#0B3F3D] text-[#F7F7F0] hover:bg-[#0B3F3D]/90"
              } transition duration-200`}
            >
              {isConfirm ? "إلغاء" : "إغلاق"}
            </button>
          </div>
        </div>
      </div>
    );
  };
  // --------------------------------------------------
  // نهاية مكون عرض الرسائل
  // --------------------------------------------------

  return (
    <>
      <MessageDisplay />

      <div
        className={`w-full max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden ${LIGHT_BG} border border-[#0B3F3D]/10`}
      >
        {/* Header - تم تطبيق ألوان الهوية البصرية */}
        <div
          className={`bg-[#0B3F3D] px-7 py-5 text-right flex flex-row justify-between items-center`}
        >
          <h2 className="text-2xl font-extrabold text-[#F7F7F0]">
            بطاقة تفاصيل الشهيد
          </h2>

          <div className="flex gap-4 items-center justify-center text-sm font-semibold">
            {/* زر التعديل - تصميم ذهبي */}
            <Link
              href={`/edit-martyrs/${item?.data.martyr._id}`}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg ${GOLD} text-[#0B3F3D] transition duration-300 shadow-md`}
            >
              <Edit className="w-4 h-4" />
              تعديل
            </Link>

            {/* زر الحذف - تصميم تحذيري */}
            <button
              onClick={() => handleDeleteRequest(item?.data.martyr._id)}
              disabled={isDeleting}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition duration-300 shadow-md ${
                isDeleting ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting ? "جاري الحذف..." : "حذف"}
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex bg-white sm:flex-row flex-col flex-wrap">
          {/* Image */}
          <div className="sm:w-1/3 px-7 py-8 flex justify-center items-start border-b sm:border-b-0 sm:border-l sm:border-l-[#0B3F3D]/10 border-[#0B3F3D]/10">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt="صورة الشهيد"
                width={200} // تحديد حجم ثابت لتحسين الأداء
                height={200}
                className="h-auto w-48 rounded-md object-cover  shadow-lg"
              />
            ) : (
              <Image
                src={"/images/user.png"} // يجب أن يكون هذا المسار متاحًا
                alt="صورة شخصية افتراضية"
                width={200}
                height={200}
                className="h-auto w-48 rounded-md object-cover shadow-lg"
              />
            )}
          </div>

          {/* Info */}
          <div className="sm:w-2/3 px-7 py-8">
            {/* عنصر معلومات مفرد */}
            {[
              {
                label: "الاسم الكامل",
                value: item?.data?.martyr.fullName || "غير متوفر",
              },
              {
                label: "الرقم التسلسلي",
                value: "----",
              },
              {
                label: "تاريخ الاستشهاد",
                value: item?.data.martyr.dateOfMartyrdom || "غير متوفر",
              },
              {
                label: "رقم الهوية الوطنية",
                value: item?.data.martyr.nationalIdNumber || "غير متوفر",
              },
            ].map((field, index) => (
              <div
                key={index}
                className={`flex flex-row gap-2 pb-5 ${
                  index < 3 ? `border-b ${BORDER_COLOR} mb-5` : ""
                }`}
              >
                <div className=" w-1/3 flex flex-row justify-between">
                  <p className={TEXT_LABEL}>{field.label}</p>
                  <p className={TEXT_LABEL}>:</p>
                </div>
                <div className={`w-2/3 font-semibold ${TEXT_VALUE}`}>
                  {field.value}
                </div>
              </div>
            ))}

            {/* حالة مجهول/معلوم */}
            <div className="flex flex-row gap-2 mt-5">
              <div className=" w-1/3 flex flex-row justify-between ">
                <p className={TEXT_LABEL}>مجهول</p>
                <p className={TEXT_LABEL}>:</p>
              </div>
              <div className="w-2/3 flex flex-row gap-4 items-center">
                {/* نعم */}
                <div
                  className={`flex items-center justify-center gap-1 font-semibold ${
                    item?.data.martyr.anonymous
                      ? "text-[#0B3F3D]"
                      : "text-gray-300"
                  }`}
                >
                  <p>نعم</p>
                  <SquareCheckBig className="w-5 h-5" />
                </div>

                {/* لا */}
                <div
                  className={`flex items-center justify-center gap-1 font-semibold ${
                    item?.data.martyr.anonymous
                      ? "text-gray-300"
                      : "text-[#0B3F3D]"
                  }`}
                >
                  <p>لا</p>
                  <SquareX className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
