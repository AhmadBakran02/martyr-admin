import React from "react";

const SKELETON_CLASS = "animate-pulse bg-gray-200 rounded-lg";

export default function SkeletonMediaGallery() {
  const mediaItems = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="w-full rounded-2xl shadow-xl overflow-hidden bg-white border border-[#0B3F3D]/10">
      {/* Header Skeleton */}
      <div
        className={`bg-[#0B3F3D] px-7 py-5 flex justify-between items-center`}
      >
        <div className={`${SKELETON_CLASS} h-6 w-1/3`}></div>
        <div className={`${SKELETON_CLASS} h-6 w-6 rounded-full`}></div>
      </div>

      {/* Filter Buttons Skeleton */}
      <div className="p-7">
        <div className="flex flex-row-reverse justify-start gap-6 items-center border-b border-gray-100 pb-4 mb-4">
          <div className={`${SKELETON_CLASS} h-8 w-24`}></div>
          <div className={`${SKELETON_CLASS} h-8 w-28`}></div>
          <div className={`${SKELETON_CLASS} h-8 w-20`}></div>
        </div>

        {/* Media Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {mediaItems.map((index) => (
            <div
              key={index}
              className={`relative aspect-video ${SKELETON_CLASS}`}
            >
              {/* Image/Video Placeholder */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
