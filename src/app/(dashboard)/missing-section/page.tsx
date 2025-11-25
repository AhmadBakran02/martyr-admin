"use client";
import { useEffect, useState } from "react";
import MartyrCard from "@/components/MartyrCard";
import MartyrCardSkeleton from "@/components/MartyrCardSkeleton";
import {
  getAllMartyrs,
  GetMartyr,
  type MartyrsData,
  type MartyrsMeta,
} from "@/lib/martyrApi";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import ClientPageWrapper from "@/components/ClientPageWrapper";

export default function EditMissing() {
  const [list, setList] = useState<GetMartyr[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [meta, setMeta] = useState<MartyrsMeta>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [page, setPage] = useState<number>(1);

  const fetchMartyrs = async (pageNum = page) => {
    setLoading(true);
    try {
      const res = await getAllMartyrs(meta.limit, pageNum, true);
      const data = res.data as MartyrsData;
      const cleanList = (data.martyrs || []).filter(
        (m: GetMartyr) => typeof m.name === "string" && m.name.trim() !== ""
      );
      setList(cleanList);
      if (data.pagination) setMeta(data.pagination);
      setPage(pageNum);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("حدث خطأ أثناء تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMartyrs(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const canPrev = page > 1;
  const canNext = meta.pages ? page < meta.pages : false;

  return (
    <ClientPageWrapper>
      <div className="bg-gradient-to-br from-[#F7F7F0] via-white to-[#E8F1F0] p-6 min-h-dvh">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500">آخر 10 مفقودين</p>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0B3F3D] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#C8A870]" />
              قائمة المفقودين
            </h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="px-3 py-1 rounded-full bg-white border border-[#0B3F3D]/10 shadow-sm">
              الصفحة {page} من {meta.pages || 1}
            </span>
            <span className="px-3 py-1 rounded-full bg-white border border-[#0B3F3D]/10 shadow-sm">
              إجمالي: {meta.total || list.length}
            </span>
          </div>
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
          <div className="text-center text-red-600 mt-10 bg-white border border-red-200 rounded-2xl shadow-sm p-4">
            ❌ حدث خطأ أثناء تحميل البيانات: {error}
          </div>
        )}

        {/* Real Cards */}
        {!loading && !error && (
          <>
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
                  <MartyrCard martyr={item} isMissing />
                </motion.li>
              ))}
            </motion.ul>

            {/* Pagination */}
            {meta.pages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  disabled={!canPrev}
                  onClick={() => canPrev && setPage((p) => Math.max(1, p - 1))}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-[#0B3F3D]/20 text-[#0B3F3D] bg-white shadow-sm transition ${
                    canPrev
                      ? "hover:bg-[#F7F7F0]"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                  السابق
                </button>
                <span className="text-sm text-gray-600">
                  الصفحة {page} / {meta.pages}
                </span>
                <button
                  disabled={!canNext}
                  onClick={() => canNext && setPage((p) => p + 1)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-[#0B3F3D]/20 text-[#0B3F3D] bg-white shadow-sm transition ${
                    canNext
                      ? "hover:bg-[#F7F7F0]"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  التالي
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </ClientPageWrapper>
  );
}
