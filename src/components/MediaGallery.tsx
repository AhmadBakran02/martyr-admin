"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Video,
  Image as ImageIcon,
  Loader2,
} from "lucide-react"; // استبدال Image بـ ImageIcon لتجنب التعارض واستخدام Loader2 للتحميل
// تم التعليق على الاستيراد الخارجي ليتم استخدام فئات Tailwind مباشرة
// import { card } from "@/styles/Card.styles";
import type { MediaItem } from "@/lib/massacreApi";
import { apiUrl } from "@/config/apiUrl";
import Image from "next/image";

// تعريف الألوان المستخدمة لسهولة القراءة والتوحيد
const DARK_TEAL = "text-[#0B3F3D]";
const GOLD = "text-[#C8A870]";

interface MediaGalleryProps {
  media: MediaItem[];
}

interface LoadedMedia {
  id: string;
  type: "image" | "video";
  src: string; // fetched URL (Blob URL)
}

export default function MediaGallery({ media }: MediaGalleryProps) {
  // الافتراضي هو أن البطاقة مفتوحة
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [filterType, setFilterType] = useState<"all" | "image" | "video">(
    "all"
  );
  const [loadedMedia, setLoadedMedia] = useState<LoadedMedia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ------------------------------------------------------------------
  // ✅ Fetch URLs for each file in massacre.media[]
  // ------------------------------------------------------------------
  useEffect(() => {
    const objectUrls: string[] = [];

    const fetchMediaFiles = async () => {
      setLoading(true);
      const results: LoadedMedia[] = [];

      try {
        for (const m of media) {
          const res = await fetch(apiUrl + `/api/file?id=${m.mediaId}`, {
            method: "GET",
          });

          if (res.ok) {
            const blob = await res.blob();
            const objectUrl = URL.createObjectURL(blob);
            objectUrls.push(objectUrl); // حفظ URL لتنظيفه لاحقًا

            results.push({
              id: m._id,
              type: m.mediaType,
              src: objectUrl,
            });
          } else {
            console.error(
              `Failed to fetch media ID ${m.mediaId}:`,
              res.statusText
            );
          }
        }

        setLoadedMedia(results);
      } catch (err) {
        console.error("Error fetching media:", err);
      } finally {
        setLoading(false);
      }
    };

    if (media?.length > 0) {
      fetchMediaFiles();
    } else {
      setLoading(false);
    }

    // Cleanup blob URLs when the component unmounts or media changes
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [media]);

  // ------------------------------------------------------------------
  // Filtering Logic
  // ------------------------------------------------------------------
  const filtered =
    filterType === "all"
      ? loadedMedia
      : loadedMedia.filter((m) => m.type === filterType);

  const imageCount = loadedMedia.filter((m) => m.type === "image").length;
  const videoCount = loadedMedia.filter((m) => m.type === "video").length;

  // ------------------------------------------------------------------
  // Component Render
  // ------------------------------------------------------------------
  return (
    <div
      className={`w-full max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden bg-white border border-[#0B3F3D]/10`}
    >
      {/* Header - تطبيق الهوية البصرية الزمردية والذهبية */}
      <div
        className={`bg-[#0B3F3D] px-7 py-5 text-right text-white flex justify-between items-center cursor-pointer transition duration-300 hover:bg-[#0B3F3D]/90`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-2xl font-extrabold text-[#C8A870]">
          معرض الصور والفيديوهات
        </h2>
        {isOpen ? (
          <ChevronUp className={`${GOLD} w-6 h-6`} />
        ) : (
          <ChevronDown className={`${GOLD} w-6 h-6`} />
        )}
      </div>

      {/* Collapsible Content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-full opacity-100 p-7" : "max-h-0 opacity-0 p-0"
        }`}
      >
        {/* Filter Buttons */}
        <div className="flex flex-row-reverse justify-start gap-6 items-center border-b border-[#0B3F3D]/10 pb-4 mb-4 text-sm text-gray-700">
          {/* زر تصفية الصور */}
          <button
            onClick={() => setFilterType("image")}
            className={`flex items-center gap-2 font-semibold p-2 rounded-lg transition duration-200 ${
              filterType === "image"
                ? "bg-[#C8A870]/30 text-[#0B3F3D]"
                : "text-gray-600 hover:bg-[#F7F7F0]"
            }`}
          >
            <ImageIcon
              className={`w-5 h-5 ${
                filterType === "image" ? DARK_TEAL : "text-gray-500"
              }`}
            />
            <span>الصور ({imageCount})</span>
          </button>

          {/* زر تصفية الفيديوهات */}
          <button
            onClick={() => setFilterType("video")}
            className={`flex items-center gap-2 font-semibold p-2 rounded-lg transition duration-200 ${
              filterType === "video"
                ? "bg-[#C8A870]/30 text-[#0B3F3D]"
                : "text-gray-600 hover:bg-[#F7F7F0]"
            }`}
          >
            <Video
              className={`w-5 h-5 ${
                filterType === "video" ? DARK_TEAL : "text-gray-500"
              }`}
            />
            <span>الفيديوهات ({videoCount})</span>
          </button>

          {/* زر عرض الكل */}
          {(filterType !== "all" || loadedMedia.length > 0) && (
            <button
              onClick={() => setFilterType("all")}
              className="text-gray-500 hover:text-[#0B3F3D] underline text-sm pr-4"
            >
              عرض الكل
            </button>
          )}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {loading ? (
            <div className="col-span-full text-center py-8 flex flex-col items-center justify-center text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin text-[#0B3F3D]" />
              <p className="mt-3 font-medium">جاري تحميل الوسائط...</p>
            </div>
          ) : filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                className="relative aspect-video rounded-lg overflow-hidden border-2 border-[#C8A870]/50 shadow-md hover:shadow-xl transition duration-300 transform hover:scale-[1.02] cursor-pointer group"
              >
                {item.type === "image" ? (
                  <Image
                    // تم تغيير الحجم إلى 500x300 لتحسين التحميل والعرض
                    width={500}
                    height={300}
                    src={item.src}
                    alt="وسائط المذبحة"
                    className="w-full h-full object-cover transition duration-300 group-hover:opacity-90"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <video
                      controls
                      className="w-full h-full object-cover"
                      src={item.src}
                      // إضافة مؤشر مرئي للفيديو
                      poster="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='24' height='24' fill='%231B4D3E'/><path d='M10 16.5v-9l6 4.5z' fill='%23D4AF37'/></svg>"
                    />
                    <Video className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-[#C8A870]/80 opacity-0 group-hover:opacity-100 transition pointer-events-none" />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-8 bg-[#F7F7F0]/50 rounded-xl border border-[#0B3F3D]/10">
              <p className={`text-xl font-medium ${DARK_TEAL}`}>
                لا توجد وسائط من نوع
                {filterType === "image"
                  ? "صور"
                  : filterType === "video"
                  ? "فيديوهات"
                  : "الكل"}
                متاحة حالياً.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
