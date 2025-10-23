"use client";
import { Calendar, Captions, MapPin } from "lucide-react";

import { Massacre } from "@/lib/massacreApi";
import Link from "next/link";

interface MassacreCardProps {
  item: Massacre;
}

const MassacreCard = (item: MassacreCardProps) => {
  return (
    <div className="w-full flex justify-center items-center">
      {/* Right Section */}
      <Link
        href={`/massacre-section/${item.item._id}`}
        className="max-w-200 w-full bg-[#fbfdff] text-[var(--mainBlue)] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col sm:flex-row justify-between gap-6"
      >
        <div className="flex flex-col gap-4 sm:w-1/2 justify-center">
          {/* Name */}
          <div className="flex flex-wrap items-center gap-2 text-xl font-semibold">
            <Captions className="w-6 h-6 text-[var(--mainBlue)]" />
            <span>اسم المجزرة:</span>
            <span className="text-black font-bold">{item.item.name}</span>
          </div>
          {/* Date & Location */}
          <div className="flex flex-wrap gap-5 text-gray-500 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{item.item.startDate || "2011/2/2"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>
                {item.item.governorate || "المحافظة"} -{" "}
                {item.item.city || "المدينة"}
              </span>
            </div>
          </div>
        </div>

        {/* Left Section */}
        <div className="flex flex-col justify-center gap-3 sm:w-1/2 bg-[#f0f7ff] rounded-xl p-4 sm:p-5">
          <div className="flex justify-between items-center text-base sm:text-lg">
            <span>عدد الشهداء الموثق:</span>
            <span className="font-bold text-black">
              {item.item.totalOfMartyrs || 0}
            </span>
          </div>
          <div className="flex justify-between items-center text-base sm:text-lg">
            <span>الموثقين في الموقع:</span>
            <span className="font-bold text-black">
              {item.item.numberOfMartyrs || 0}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MassacreCard;
