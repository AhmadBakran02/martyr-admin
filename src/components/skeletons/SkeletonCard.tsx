import React from "react";

const SKELETON_CLASS = "animate-pulse bg-gray-200 rounded-lg";

export default function SkeletonCard() {
  return (
    <div className="w-full rounded-2xl shadow-xl overflow-hidden bg-white border border-[#C8A870]/70">
      <div className="p-6 md:p-8 flex flex-col md:flex-row-reverse gap-6">
        {/* Image/Avatar Placeholder */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <div
            className={`${SKELETON_CLASS} w-40 h-40 rounded-full border-4 border-[#C8A870]/50`}
          ></div>
        </div>

        {/* Details and Name Placeholder */}
        <div className="flex-grow text-center md:text-right space-y-4">
          {/* Name Placeholder */}
          <div
            className={`${SKELETON_CLASS} h-8 w-3/4 md:w-1/2 mx-auto md:mx-0 mb-4`}
          ></div>

          {/* Main Attributes Placeholder (e.g., age, status) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center md:items-end">
              <div className={`${SKELETON_CLASS} h-4 w-20 mb-1`}></div>{" "}
              {/* Key */}
              <div className={`${SKELETON_CLASS} h-6 w-24`}></div> {/* Value */}
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className={`${SKELETON_CLASS} h-4 w-20 mb-1`}></div>
              <div className={`${SKELETON_CLASS} h-6 w-24`}></div>
            </div>
            {/* More Attributes */}
            <div className="flex flex-col items-center md:items-end">
              <div className={`${SKELETON_CLASS} h-4 w-24 mb-1`}></div>
              <div className={`${SKELETON_CLASS} h-6 w-32`}></div>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className={`${SKELETON_CLASS} h-4 w-24 mb-1`}></div>
              <div className={`${SKELETON_CLASS} h-6 w-32`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
