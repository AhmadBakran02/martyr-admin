import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { addMassacreApi, getAllMassacres, Massacre } from "@/lib/massacreApi";
import Loading2 from "./Loading2/Loading2";

type MartyrdomItem = {
  id: string;
  name: string;
};

type Props = {
  value: string;
  onChange: (v: string) => void;
  onChange2: (v: string | null) => void;
  // optional: initial list or fetcher
  initialList?: MartyrdomItem[];
  onAdd?: (name: string) => Promise<MartyrdomItem> | MartyrdomItem; // optional API hook to add new item
};

export default function MartyrdomPicker({ value, onChange, onChange2 }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [list, setList] = useState<Massacre[]>([]);
  const [query, setQuery] = useState<string>("");
  const [adding, setAdding] = useState<boolean>(false);
  const [newMassacre, setNewMassacre] = useState<string>("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  // const [massacres, setMassacres] = useState<Massacre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [loadingAddMassacre, setLoadingAddMassacre] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const fetchMassacres = async () => {
    try {
      const res = await getAllMassacres(100, 1);
      const cleanList = (res.data.massacres || []).filter(
        (m: Massacre) => typeof m.name === "string" && m.name.trim() !== ""
      );
      const withStatic: Massacre[] = [
        { _id: null, name: "لا يوجد مجزرة" },
        ...cleanList,
      ];
      setList(withStatic);
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

  useEffect(() => {
    fetchMassacres();
  }, []);

  // close on Esc
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // close when clicking outside modal content
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const filtered = list.filter(
    (it) =>
      typeof it.name === "string" &&
      it.name.toLowerCase().includes(query.trim().toLowerCase())
  );
  if (message) console.log(message);
  if (error) console.log(error);

  const handleAdd = async () => {
    if (!newMassacre.trim()) {
      setMessage("يجب إدخال اسم المجزرة");
      return;
    }

    setLoadingAddMassacre(true);
    setMessage("");

    try {
      const res = await addMassacreApi({
        name: newMassacre,
      });
      fetchMassacres();
      setNewMassacre("");
      setMessage(res.message || "تمت إضافة المجزرة بنجاح ✅");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed");
      }
    } finally {
      setLoadingAddMassacre(false);
    }
  };

  return (
    <div>
      <div className="card-row mt-5">
        <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
          <div className="flex flex-row gap-2 text-[var(--textMain)]">
            <Image src={"/kill.svg"} alt="" width={29} height={29} />
            <p>مجزرة</p>
          </div>
          <p>:</p>
        </div>

        <div className="flex-1 flex items-center">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)} // still allow typing
            onFocus={() => setOpen(true)}
            onClick={() => setOpen(true)}
            type="text"
            className="bg-gray-100 w-full p-2 rounded-md cursor-pointer"
            placeholder="اختر مجزرة أو اكتب لبحث..."
            readOnly={false} // keep editable if you want typing
          />
        </div>
      </div>

      {/* Modal overlay */}
      {open && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          {/* translucent backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" />

          {/* modal content */}
          <div
            ref={containerRef}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-10 overflow-hidden px-6 py-6 transform transition-all duration-300 scale-100 animate-fadeIn"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between py-4 border-b border-gray-300">
              <h3 className="text-lg font-bold">اختر اسم المجزرة</h3>
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 rounded-md hover:bg-gray-100"
              >
                إغلاق
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث باسم المجزرة..."
                  // className="flex-1 border p-2 rounded-md"
                  className="flex-1 bg-gray-100 w-full p-2 rounded-md"
                />
                <button
                  onClick={() => {
                    setQuery("");
                    setAdding(true);
                  }}
                  className="px-3 py-2 bg-[var(--mainBlue)] text-white rounded-md cursor-pointer"
                >
                  إضافة مجزرة جديدة
                </button>
              </div>

              {/* Add new form */}
              {adding && (
                <div className="border border-gray-300 p-3 rounded-md shadow-md">
                  <label className="block mb-2">اسم المجزرة الجديدة</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMassacre}
                      onChange={(e) => setNewMassacre(e.target.value)}
                      className="flex-1 bg-gray-100 w-full p-2 rounded-md"
                      placeholder="اكتب اسم المجزرة..."
                    />
                    <button
                      onClick={handleAdd}
                      className="px-3 py-2 bg-blue-700 text-white rounded-md cursor-pointer"
                    >
                      {loadingAddMassacre ? "..loading" : <p>حفظ</p>}
                    </button>
                    <button
                      onClick={() => {
                        setAdding(false);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-md cursor-pointer"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              )}

              {/* List */}
              <div className="max-h-64 overflow-auto border border-gray-300 rounded-md">
                {loading && (
                  <div className="flex justify-center items-center p-5">
                    <Loading2 />
                  </div>
                )}
                {filtered.length === 0 && !loading ? (
                  <div className="p-4 text-center text-gray-500">
                    لا توجد نتائج
                  </div>
                ) : (
                  <ul className="px-2">
                    {filtered.map((item) => (
                      <li
                        key={item._id}
                        className="px-4 py-3 hover:bg-gray-100 flex justify-between items-center cursor-pointer border-b border-gray-300"
                        onClick={() => {
                          onChange(item.name);
                          onChange2(item._id);
                          setOpen(false);
                        }}
                      >
                        <span>{item.name}</span>
                        <small className="text-gray-400">اختر</small>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* optional: show total */}
              <div className="text-sm text-gray-500">
                عدد النتائج: {filtered.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
