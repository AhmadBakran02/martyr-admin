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
import { motion } from "framer-motion";

interface MartyrCardProps {
  martyr: GetMartyr;
  isMissing?: boolean;
}

const MartyrCard = ({ martyr, isMissing }: MartyrCardProps) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const photoID = martyr.photoId;

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex justify-center items-center"
    >
      <Link
        href={`/${isMissing ? "missing-section" : "martyrs-section"}/${
          martyr._id
        }`}
        className="max-w-200 w-full bg-white text-[var(--textMain)] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col sm:flex-row justify-between gap-6 border border-gray-100"
      >
        {/* Left: Image */}
        <div className="w-full sm:w-1/3 flex justify-center items-center">
          {photoUrl ? (
            <Image
              src={photoUrl}
              width={0}
              height={0}
              alt={martyr.fullName}
              sizes="100vw"
              className="h-auto w-48 rounded-md card-shadow"
            />
          ) : (
            <div className="w-40 h-40 flex justify-center items-center bg-gray-50 rounded-xl border border-gray-200 text-gray-400">
              <ImageOff className="w-10 h-10" />
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="flex flex-col gap-3 sm:w-2/3 justify-center">
          {/* Full Name */}
          <div className="flex flex-wrap items-center gap-2 text-lg font-semibold">
            <Captions className="w-5 h-5 text-blue-500" />
            {isMissing ? <span>المفقود:</span> : <span>الشهيد:</span>}

            <span className="text-black font-bold">{martyr.fullName}</span>
          </div>

          {/* Date & Location */}
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

          {/* More Info */}
          <div className="flex flex-wrap gap-4 text-gray-700 text-sm mt-2">
            {martyr.gender && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-400" />
                <span>{martyr.gender === "male" ? "ذكر" : "أنثى"}</span>
              </div>
            )}
            {martyr.profession && (
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>{martyr.profession}</span>
              </div>
            )}
            {martyr.age && (
              <div className="flex items-center gap-2">
                <Cake className="w-4 h-4 text-blue-400" />
                <span>{martyr.age} سنة</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MartyrCard;
