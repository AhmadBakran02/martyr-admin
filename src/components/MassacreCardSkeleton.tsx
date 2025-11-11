"use client";

export default function MassacreCardSkeleton() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-200 w-full bg-[#fbfdff] rounded-2xl shadow-md p-6 flex flex-col sm:flex-row justify-between gap-6 animate-pulse">
        {/* Right Section */}
        <div className="flex flex-col gap-4 sm:w-1/2 justify-center">
          {/* Name */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
            <div className="w-40 h-4 bg-gray-300 rounded"></div>
          </div>
          {/* Date & Location */}
          <div className="flex flex-wrap gap-5 text-gray-500 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="w-20 h-3 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="w-32 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Left Section */}
        <div className="flex flex-col justify-center gap-3 sm:w-1/2 bg-[#f0f7ff] rounded-xl p-4 sm:p-5">
          <div className="flex justify-between items-center">
            <div className="w-28 h-3 bg-gray-200 rounded"></div>
            <div className="w-10 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="w-28 h-3 bg-gray-200 rounded"></div>
            <div className="w-10 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
