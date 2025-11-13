"use client";
import MassacreCard from "@/components/MassacreCard";
import MassacreCardSkeleton from "@/components/MassacreCardSkeleton";
import { getAllMassacres, Massacre } from "@/lib/massacreApi";
import { useEffect, useState } from "react";

export default function EditMassacre() {
  const [massacreslist, setMassacresList] = useState<Massacre[]>([]);
  const [loadingMassacres, setLoadingMassacres] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const [errorMassacres, setErrorMassacres] = useState<string>("");

  const fetchMassacres = async () => {
    try {
      const res = await getAllMassacres(100, 1);
      console.log("123213");
      const cleanList = (res.data.massacres || []).filter(
        (m: Massacre) => typeof m.name === "string" && m.name.trim() !== ""
      );
      setMassacresList(cleanList);
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
    fetchMassacres();
  }, []);

  const filtered = massacreslist.filter(
    (it) =>
      typeof it.name === "string" &&
      it.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  console.log(filtered);

  return (
    <div className="p-5 h-dvh">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ابحث باسم المجزرة..."
        className="flex-1 bg-gray-100 w-full p-2 rounded-md"
      />
      <div className="m-5"></div>
      <div className="m-5"></div>
      {/* List */}
      <div className="flex flex-col gap-5">
        {loadingMassacres && (
          <ul className="flex flex-col gap-5 p-5 rounded-xl">
            {Array.from({ length: 4 }).map((_, i) => (
              <MassacreCardSkeleton key={i} />
            ))}
          </ul>
        )}

        {filtered.length === 0 && !loadingMassacres ? (
          <div className="p-4 text-center text-gray-500">لا توجد نتائج</div>
        ) : (
          <ul
            className={`flex flex-col gap-5 ${
              !loadingMassacres ? "bg-gray-100" : ""
            } p-5 rounded-xl justify-center items-center`}
          >
            {filtered.map((item) => (
              <MassacreCard key={item._id} item={item} />
            ))}
          </ul>
        )}
      </div>
      {errorMassacres && <div>{errorMassacres}</div>}
    </div>
  );
}
