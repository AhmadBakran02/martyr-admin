"use client";
import { useEffect, useState } from "react";
import MartyrCard from "@/components/MartyrCard";
import MartyrCardSkeleton from "@/components/MartyrCardSkeleton";
import { getAllMartyrs, GetMartyr } from "@/lib/martyrApi";
import { motion } from "framer-motion";
import ClientPageWrapper from "@/components/ClientPageWrapper";

export default function EditMartyr() {
  const [list, setList] = useState<GetMartyr[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchMartyrs = async () => {
    try {
      const res = await getAllMartyrs(100, 1);
      const cleanList = (res.data.martyrs || []).filter(
        (m: GetMartyr) => typeof m.name === "string" && m.name.trim() !== ""
      );
      setList(cleanList);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("حدث خطأ أثناء تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMartyrs();
  }, []);

  return (
    <ClientPageWrapper>
      <div className=" bg-gray-50 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">قائمة الشهداء</h1>
          {!loading && (
            <p className="text-sm text-gray-500">{list.length} شهيد</p>
          )}
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            {[...Array(6)].map((_, i) => (
              <MartyrCardSkeleton key={i} />
            ))}
          </motion.ul>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center text-red-600 mt-10">
            ❌ حدث خطأ أثناء تحميل البيانات: {error}
          </div>
        )}

        {/* Real Cards */}
        {!loading && !error && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            {list.map((item, index) => (
              <motion.li
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <MartyrCard martyr={item} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </ClientPageWrapper>
  );
}
