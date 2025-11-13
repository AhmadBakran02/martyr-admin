"use client";
import MartyrRequsetCard from "@/components/MartyrRequsetCard";
import { getAllAddRequset } from "@/lib/getRequestApi";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RequestMastyrData } from "@/types/RequestApi";

export default function AddRequsetPage() {
  const [requestsList, setRequestsList] = useState<RequestMastyrData[]>([]);
  const [error, setError] = useState<string>("");
  const [loadingRequests, setLoadingRequests] = useState<boolean>(true);

  const fetchRequests = async () => {
    try {
      const res = await getAllAddRequset(100, 1);
      console.log(res.data);
      console.log([res.data]);

      setRequestsList(res.data.addRequests);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "حدث خطأ في التحميل");
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  console.log("123123");

  const skeletons = Array(3).fill(0);

  return (
    <div className="p-5 bg-gray-50">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">
            طلبات اضافة الشهداء
          </h1>
          {!loadingRequests && (
            <p className="text-sm text-gray-500">
              {requestsList.length} الطلبات
            </p>
          )}
        </div>
        {/* ✅ Skeleton Loading */}
        {loadingRequests && (
          <div className="flex flex-col gap-4">
            {skeletons.map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="w-full bg-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-6 border border-gray-100 animate-pulse"
              >
                <div className="w-full sm:w-1/3 h-40 bg-gray-200 rounded-xl" />
                <div className="flex-1 flex flex-col gap-3">
                  <div className="h-6 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 mt-2" />
                  <div className="h-8 bg-gray-200 rounded w-20 self-end mt-4" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ✅ Data List */}
        {!loadingRequests && requestsList.length === 0 && (
          <div className="p-6 text-center text-gray-500 bg-white rounded-xl shadow-sm">
            لا توجد نتائج
          </div>
        )}

        {!loadingRequests && requestsList.length > 0 && (
          <ul className="flex flex-col gap-5 bg-gray-100 p-5 rounded-xl justify-center items-center">
            {requestsList.map((item: RequestMastyrData, i) => (
              <MartyrRequsetCard key={item._id || i} martyr={item} />
            ))}
          </ul>
        )}
        {error && <div>{error}</div>}
      </div>
    </div>
  );
}
