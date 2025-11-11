"use client";
import { useEffect, useState } from "react";
import { apiUrl } from "@/config/apiUrl";
import { deleteRequestApi } from "@/lib/deleteRequestApi";
import {
  Calendar,
  Captions,
  MapPin,
  User,
  ImageOff,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { RequestMastyrData } from "@/types/RequestApi";
import { useRouter } from "next/navigation";

interface MartyrCardProps {
  martyr: RequestMastyrData;
}

const MartyrRequsetCard = ({ martyr }: MartyrCardProps) => {
  const router = useRouter();

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  // ✅ Fetch image blob from API
  useEffect(() => {
    const fetchPhoto = async () => {
      if (!martyr.photoId) return;

      try {
        const res = await fetch(`${apiUrl}/api/file?fileID=${martyr.photoId}`);
        if (res.ok) {
          const blob = await res.blob();
          const objectUrl = URL.createObjectURL(blob);
          setPhotoUrl(objectUrl);
        } else {
          console.error("Failed to fetch image:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchPhoto();
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, [martyr.photoId, photoUrl]);

  // ✅ Delete handler
  const handleDelete = async (id: string) => {
    const confirmed = confirm("⚠️ هل أنت متأكد أنك تريد حذف هذا الطلب؟");
    if (!confirmed) return;
    try {
      await deleteRequestApi(id);
      alert("✅ تم حذف الطلب بنجاح!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting request:", error);
      alert("❌ حدث خطأ أثناء الحذف.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex justify-center items-center cursor-pointer"
      onClick={() => router.push(`/add-request/${martyr._id}`)}
    >
      <div className="max-w-200 w-full bg-white text-[var(--textMain)] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col sm:flex-row justify-between gap-6 relative border border-gray-100">
        {/* Left: Image */}
        <div className="w-full sm:w-1/3 flex justify-center items-center">
          {photoUrl ? (
            <Image
              width={160}
              height={160}
              src={photoUrl}
              alt={martyr.fullName}
              className="w-40 h-40 object-cover rounded-xl border border-gray-200 shadow-sm"
            />
          ) : (
            <div className="w-40 h-40 flex justify-center items-center bg-gray-50 rounded-xl border border-gray-200 text-gray-400">
              <ImageOff className="w-10 h-10" />
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="flex flex-col gap-3 sm:w-2/3 justify-center">
          <div className="flex flex-wrap items-center gap-2 text-lg font-semibold">
            <Captions className="w-5 h-5 text-blue-500" />
            <span>الشهيد:</span>
            <span className="text-black font-bold">{martyr.fullName}</span>
          </div>

          <div className="flex flex-wrap gap-5 text-gray-600 text-sm mt-1">
            {martyr.dateOfMartyrdom && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{martyr.dateOfMartyrdom}</span>
              </div>
            )}
            {(martyr.governorate || martyr.city) && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>
                  {martyr.governorate || "غير معروف"} -{" "}
                  {martyr.city || "غير معروف"}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 text-gray-700 text-sm mt-3">
            <div className="flex items-center gap-2 font-bold">
              <User className="w-4 h-4" />
              <p>معلومات مقدم الطلب</p>
            </div>
            <div className="ml-2">
              <p>الاسم: {martyr.requesterName}</p>
              <p>التواصل: {martyr.requesterEmail}</p>
              <p>المعرفه: {martyr.relationship}</p>
            </div>
          </div>

          {/* ✅ Delete Button */}
          <div className="flex items-center justify-between mt-4 ">
            <div>
              <p
                className={`border rounded-xl px-4 py-2 text-sm font-semibold text-white ${
                  martyr.status == "rejected" ? "bg-red-600" : "bg-green-600"
                }`}
              >
                {martyr.status == "rejected" ? "مرفوض" : "مقبول"}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(martyr._id);
                }}
                className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 active:bg-red-200 border border-red-200 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
                حذف الطلب
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MartyrRequsetCard;
