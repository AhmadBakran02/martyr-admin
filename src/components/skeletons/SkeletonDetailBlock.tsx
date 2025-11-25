import React from "react";

// Animation class for skeleton loading
const SKELETON_CLASS = "animate-pulse bg-gray-200 rounded-lg";

interface SkeletonDetailBlockProps {
  titleWidth?: string; // Tailwind class like "w-1/3"
  rows: number;
}

export default function SkeletonDetailBlock({
  titleWidth = "w-1/2",
  rows,
}: SkeletonDetailBlockProps) {
  const detailRows = Array.from({ length: rows }, (_, i) => i);

  return (
    <div className="w-full rounded-2xl shadow-xl overflow-hidden bg-white border border-gray-300/50">
      {/* Header Skeleton */}
      <div className={`bg-[#0B3F3D] px-7 py-5 flex justify-end`}>
        <div className={`${SKELETON_CLASS} h-6 ${titleWidth}`}></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {detailRows.map((index) => (
          <div
            key={index}
            className="flex flex-row-reverse justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
          >
            {/* Key Skeleton (Right side) */}
            <div className={`${SKELETON_CLASS} h-4 w-1/4`}></div>
            {/* Value Skeleton (Left side) */}
            <div className={`${SKELETON_CLASS} h-4 w-1/3`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
