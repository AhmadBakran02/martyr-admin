import React from "react";
import SkeletonCard from "./SkeletonCard";
import SkeletonDetailBlock from "./SkeletonDetailBlock";
import SkeletonMediaGallery from "./SkeletonMediaGallery";

const SKELETON_CLASS = "animate-pulse bg-gray-200 rounded-lg";

export default function MartyrPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#F7F7F0]/30 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto py-8">
        {/* Hero Section Skeleton */}
        <header className="text-center mb-12 py-6 bg-white rounded-2xl shadow-xl border-b-4 border-[#C8A870]/50">
          <div
            className={`${SKELETON_CLASS} h-10 w-2/3 sm:w-1/3 mx-auto`}
          ></div>
          <div className={`${SKELETON_CLASS} h-4 w-1/4 mx-auto mt-3`}></div>
        </header>

        {/* Main Content Skeletons */}
        <div className="space-y-10">
          {/* Main Card Skeleton */}
          <SkeletonCard />

          {/* Personal Info Skeleton (more rows) */}
          <SkeletonDetailBlock titleWidth="w-1/4" rows={5} />

          {/* Citation Info Skeleton (fewer rows) */}
          <SkeletonDetailBlock titleWidth="w-1/3" rows={3} />

          {/* Media Gallery Skeleton */}
          <SkeletonMediaGallery />
        </div>

        {/* Footer Skeleton */}
        <footer className="text-center mt-12 pt-6 border-t border-gray-300/50 text-gray-500 text-sm">
          <div className={`${SKELETON_CLASS} h-3 w-1/5 mx-auto`}></div>
        </footer>
      </div>
    </div>
  );
}
