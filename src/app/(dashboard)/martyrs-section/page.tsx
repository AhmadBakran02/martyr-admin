"use client";
import Loading2 from "@/components/Loading2/Loading2";
import MartyrCard from "@/components/MartyrCard";
import { getAllMartyrs, GetMartyr } from "@/lib/martyrApi";
import { useEffect, useState } from "react";

export default function EditMartyr() {
  const [list, setList] = useState<GetMartyr[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query] = useState<string>("");
  const [error, setError] = useState<string>("");

  const fetchMassacres = async () => {
    try {
      const res = await getAllMartyrs(100, 1);
      console.log("123213");
      const cleanList = (res.data.martyrs || []).filter(
        (m: GetMartyr) => typeof m.name === "string" && m.name.trim() !== ""
      );
      console.log(cleanList);
      setList(cleanList);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  console.log(error);
  useEffect(() => {
    fetchMassacres();
  }, []);

  const filtered = list.filter(
    (it) =>
      typeof it.name === "string" &&
      it.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="p-5 h-dvh">
      {/* List */}
      <div className="flex flex-col gap-5">
        {loading && (
          <div className=" rounded-2xl p-10 flex justify-center items-center">
            <Loading2 />
          </div>
        )}
        {filtered.length === 0 && !loading ? (
          <div className="p-4 text-center text-gray-500">لا توجد نتائج</div>
        ) : (
          <ul className="flex flex-col gap-5 bg-gray-100 p-5 rounded-xl justify-center items-center">
            {filtered.map((item) => (
              <MartyrCard key={item._id} martyr={item} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
