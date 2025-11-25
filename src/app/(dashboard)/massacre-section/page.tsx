"use client";
import MassacreCard from "@/components/MassacreCard";
import MassacreCardSkeleton from "@/components/MassacreCardSkeleton";
import {
  getAllMassacres,
  type Massacre,
  type MassacreMeta,
  type MassacreResponse,
} from "@/lib/massacreApi";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search, Skull } from "lucide-react";
import ClientPageWrapper from "@/components/ClientPageWrapper";

export default function EditMassacre() {
  const [massacreslist, setMassacresList] = useState<Massacre[]>([]);
  const [loadingMassacres, setLoadingMassacres] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const [errorMassacres, setErrorMassacres] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [meta, setMeta] = useState<MassacreMeta>({
    limit: 10,
    page: 1,
    total: 0,
    pages: 0,
  });

  const fetchMassacres = async (pageNum = page) => {
    setLoadingMassacres(true);
    try {
      const res = (await getAllMassacres(
        meta.limit,
        pageNum
      )) as MassacreResponse;
      console.log(res);
      const data = res.data;
      const cleanList = (data.massacres || []).filter(
        (m: Massacre) => typeof m.name === "string" && m.name.trim() !== ""
      );
      setMassacresList(cleanList);
      if (data.pagination) setMeta(data.pagination);
      setPage(pageNum);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMassacres(err.message);
      } else {
        setErrorMassacres("Login failed");
      }
    } finally {
      setLoadingMassacres(false);
    }
  };

  useEffect(() => {
    fetchMassacres(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const canPrev = page > 1;
  const canNext = meta.pages ? page < meta.pages : false;

  const filtered = massacreslist.filter(
    (it) =>
      typeof it.name === "string" &&
      it.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  console.log(filtered);

  return (
    <ClientPageWrapper>
      <div className="bg-gradient-to-br from-[#F7F7F0] via-white to-[#E8F1F0] p-6 min-h-dvh">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500">آخر 10 مجازر</p>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0B3F3D] flex items-center gap-2">
              <Skull className="w-5 h-5 text-[#C8A870]" />
              قائمة المجازر
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث باسم المجزرة..."
                className="pl-9 pr-3 py-2 w-full bg-white border border-[#0B3F3D]/10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/20"
              />
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="px-3 py-1 rounded-full bg-white border border-[#0B3F3D]/10 shadow-sm">
                الصفحة {page} من {meta.pages || 1}
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#0B3F3D]/10 shadow-sm">
                إجمالي: {meta.total || massacreslist.length}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {loadingMassacres && (
            <ul className="flex flex-col gap-5 p-5 rounded-2xl bg-white shadow-sm border border-[#0B3F3D]/10">
              {Array.from({ length: 4 }).map((_, i) => (
                <MassacreCardSkeleton key={i} />
              ))}
            </ul>
          )}

          {filtered.length === 0 && !loadingMassacres ? (
            <div className="p-6 text-center text-gray-500 bg-white border border-[#0B3F3D]/10 rounded-2xl shadow-sm">
              لا توجد نتائج
            </div>
          ) : (
            <ul className="flex flex-col gap-5 bg-white p-5 rounded-2xl border border-[#0B3F3D]/10 shadow-sm">
              {filtered.map((item) => (
                <MassacreCard key={item._id} item={item} />
              ))}
            </ul>
          )}
        </div>

        {errorMassacres && (
          <div className="text-red-600 mt-6 bg-white border border-red-200 rounded-xl shadow-sm p-4 text-center">
            {errorMassacres}
          </div>
        )}

        {meta.pages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              disabled={!canPrev}
              onClick={() => canPrev && setPage((p) => Math.max(1, p - 1))}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-[#0B3F3D]/20 text-[#0B3F3D] bg-white shadow-sm transition ${
                canPrev ? "hover:bg-[#F7F7F0]" : "opacity-50 cursor-not-allowed"
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
                canNext ? "hover:bg-[#F7F7F0]" : "opacity-50 cursor-not-allowed"
              }`}
            >
              التالي
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </ClientPageWrapper>
  );
}
