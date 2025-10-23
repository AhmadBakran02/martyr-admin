"use client";
import { useEffect, useState } from "react";
import { apiUrl } from "@/config/apiUrl";
import { GetMartyr } from "@/lib/martyrApi";
import {
  Calendar,
  Captions,
  MapPin,
  User,
  Briefcase,
  Cake,
  ImageOff,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface MartyrCardProps {
  martyr: GetMartyr;
}

const MartyrCard = ({ martyr }: MartyrCardProps) => {
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

    // Cleanup old blob URLs
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, [martyr.photoId, photoUrl]);

  return (
    <div className="w-full flex justify-center items-center">
      <Link
        href={`/martyrs-section/${martyr._id}`}
        className="max-w-200 w-full bg-[#fbfdff] text-[var(--mainBlue)] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col sm:flex-row justify-between gap-6"
      >
        {/* Left: Image */}
        <div className="w-full sm:w-1/3 flex justify-center items-center">
          {photoUrl ? (
            <Image
              width={40}
              height={40}
              src={photoUrl}
              alt={martyr.fullName}
              className="w-40 h-40 object-cover rounded-xl border border-gray-200 shadow-sm"
            />
          ) : (
            <div className="w-40 h-40 flex justify-center items-center bg-gray-100 rounded-xl border border-gray-200 text-gray-400">
              <ImageOff className="w-10 h-10" />
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="flex flex-col gap-3 sm:w-2/3 justify-center">
          {/* Full Name */}
          <div className="flex flex-wrap items-center gap-2 text-xl font-semibold">
            <Captions className="w-6 h-6 text-[var(--mainBlue)]" />
            <span>الشهيد:</span>
            <span className="text-black font-bold">{martyr.fullName}</span>
          </div>

          {/* Date & Location */}
          <div className="flex flex-wrap gap-5 text-gray-600 text-sm sm:text-base">
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

          {/* More Info */}
          <div className="flex flex-wrap gap-4 text-gray-700 text-sm sm:text-base mt-2">
            {martyr.gender && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{martyr.gender === "male" ? "ذكر" : "أنثى"}</span>
              </div>
            )}
            {martyr.profession && (
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>{martyr.profession}</span>
              </div>
            )}
            {martyr.age && (
              <div className="flex items-center gap-2">
                <Cake className="w-4 h-4" />
                <span>{martyr.age} سنة</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MartyrCard;
