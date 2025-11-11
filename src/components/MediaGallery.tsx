"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Video } from "lucide-react";
import { card } from "@/styles/Card.styles";
import type { MediaItem } from "@/lib/massacreApi";
import { apiUrl } from "@/config/apiUrl";
import Image from "next/image";

interface MediaGalleryProps {
  media: MediaItem[];
}

interface LoadedMedia {
  id: string;
  type: "image" | "video";
  src: string; // fetched URL
}

export default function MediaGallery({ media }: MediaGalleryProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<"all" | "image" | "video">(
    "all"
  );
  const [loadedMedia, setLoadedMedia] = useState<LoadedMedia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch URLs for each file in massacre.media[]
  console.log(media);
  useEffect(() => {
    const fetchMediaFiles = async () => {
      try {
        const results: LoadedMedia[] = [];
        for (const m of media) {
          console.log(m.mediaId);
          const res = await fetch(apiUrl + `/api/file?fileID=${m.mediaId}`, {
            method: "GET",
          });

          if (res.ok) {
            const blob = await res.blob(); // ✅ get binary
            const objectUrl = URL.createObjectURL(blob);
            results.push({
              id: m._id,
              type: m.mediaType,
              src: objectUrl, // use blob URL
            });
          }
        }

        setLoadedMedia(results);
      } catch (err) {
        console.error("Error fetching media:", err);
      } finally {
        setLoading(false);
      }
    };

    if (media?.length > 0) fetchMediaFiles();
    else setLoading(false);
  }, [media]);

  const filtered =
    filterType === "all"
      ? loadedMedia
      : loadedMedia.filter((m) => m.type === filterType);

  return (
    <div className={`${card} card-shadow bg-[#fbfdff]`}>
      {/* Header */}
      <div
        className="bg-[var(--mainGreen)] px-7 py-8 sm:text-right text-center text-white flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-bold">معرض الصور والفيديوهات</h2>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>

      {/* Collapsible Content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Filter Buttons */}
        <div className="flex flex-row-reverse justify-end gap-4 items-center px-7 py-8 text-sm text-gray-700">
          <button
            onClick={() => setFilterType("image")}
            className={`flex items-center gap-1 cursor-pointer transition ${
              filterType === "image"
                ? "text-[var(--hoverBlue)] font-semibold"
                : "hover:text-[var(--hoverBlue)]"
            }`}
          >
            {/* <Image className="w-4 h-4 text-[var(--mainBlue)]" /> */}
            <span>
              انقر لمشاهدة الصور (
              {loadedMedia.filter((m) => m.type === "image").length})
            </span>
          </button>
          <button
            onClick={() => setFilterType("video")}
            className={`flex items-center gap-1 cursor-pointer transition ${
              filterType === "video"
                ? "text-red-700 font-semibold"
                : "hover:text-red-700"
            }`}
          >
            <Video className="w-4 h-4 text-red-700" />
            <span>
              انقر لمشاهدة الفيديوهات (
              {loadedMedia.filter((m) => m.type === "video").length})
            </span>
          </button>
          {filterType !== "all" && (
            <button
              onClick={() => setFilterType("all")}
              className="text-gray-500 hover:text-gray-700 underline text-xs"
            >
              عرض الكل
            </button>
          )}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-7 py-8">
          {loading ? (
            <p className="text-gray-500 text-center col-span-full py-6">
              جاري تحميل الوسائط...
            </p>
          ) : filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                className="relative rounded-lg overflow-hidden border border-gray-300 hover:shadow-md transition"
              >
                {item.type === "image" ? (
                  <Image
                    width={40}
                    height={40}
                    src={item.src}
                    alt="media"
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <video
                    controls
                    className="w-full h-40 object-cover"
                    src={item.src}
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full py-6">
              لا توجد وسائط متاحة
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
