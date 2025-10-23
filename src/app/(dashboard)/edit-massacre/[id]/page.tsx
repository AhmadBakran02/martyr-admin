"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiUrl } from "@/config/apiUrl";
import Loading2 from "@/components/Loading2/Loading2";
import { getMassacreById } from "@/lib/getMassacreById";
import {
  EditMassacreApi,
  type Massacre,
  type MediaInput,
} from "@/lib/massacreApi";
import Image from "next/image";
import FileUploader from "@/components/FileUploader";

export default function EditMassacrePage() {
  const { id } = useParams<{ id: string }>();

  const [massacre, setMassacre] = useState<Massacre | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [mediaUrls, setMediaUrls] = useState<Record<string, string>>({});
  // const [newFiles, setNewFiles] = useState<File[]>([]);
  const [uploadedMedia, setUploadedMedia] = useState<MediaInput[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

  const handleUploadComplete = (media: MediaInput[]) => {
    setUploadedMedia(media);
  };

  // =====================
  // Fetch massacre details
  // =====================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMassacreById(id);
        setMassacre(res.data.massacre);
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
    fetchData();
  }, [id]);

  // =====================
  // Fetch media files as blobs
  // =====================
  useEffect(() => {
    if (!massacre?.media?.length) return;

    let cancelled = false;
    const createdUrls: string[] = [];

    const fetchBlobs = async () => {
      const map: Record<string, string> = {};
      for (const m of massacre.media ?? []) {
        try {
          const res = await fetch(`${apiUrl}/api/file?fileID=${m.mediaId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (!res.ok) continue;

          const blob = await res.blob();
          const objectUrl = URL.createObjectURL(blob);
          createdUrls.push(objectUrl);
          map[m.mediaId] = objectUrl;
        } catch (err) {
          console.error("Failed to load media:", err);
        }
        if (cancelled) break;
      }

      if (!cancelled) setMediaUrls(map);
    };

    fetchBlobs();

    // Cleanup: revoke URLs when component unmounts or massacre changes
    return () => {
      cancelled = true;
      [...createdUrls, ...Object.values(mediaUrls)].forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {}
      });
    };
  }, [massacre?.media, mediaUrls]);

  // =====================
  // Handlers
  // =====================
  const handleDeleteOldMedia = (mediaID: string) => {
    if (!massacre) return;
    setMassacre({
      ...massacre,
      media: massacre.media?.filter((m) => m.mediaId !== mediaID) ?? [],
    });

    if (mediaUrls[mediaID]) {
      URL.revokeObjectURL(mediaUrls[mediaID]);
      const updatedUrls = { ...mediaUrls };
      delete updatedUrls[mediaID];
      setMediaUrls(updatedUrls);
    }
  };

  // const handleNewFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setNewFiles((prev) => [...prev, ...Array.from(e.target.files ?? [])]);
  //   }
  // };

  // const handleRemoveNewFile = (index: number) => {
  //   const newList = [...newFiles];
  //   newList.splice(index, 1);
  //   setNewFiles(newList);
  // };

  const handleSave = async () => {
    // if (!massacre) return;
    setLoadingUpdate(true);

    const mergedMedia = [...(massacre?.media ?? []), ...(uploadedMedia ?? [])];

    const massacre2 = {
      name: massacre!.name,
      startDate: massacre?.startDate,
      endDate: massacre?.endDate,
      governorate: massacre?.governorate,
      city: massacre?.city,
      location: massacre?.location,
      overview: massacre?.overview,
      totalOfMartyrs: Number(massacre?.totalOfMartyrs || "0"),
      photoID: massacre?.photoId,
      media: mergedMedia,
    };

    const result = await EditMassacreApi(massacre2, id);
    console.log(result);
    if (result.success) {
      console.log("✅ Added successfully:");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Hide toast after 3s
    } else {
      console.error("❌ Error:", result.message);
    }

    setLoadingUpdate(false);
  };

  // =====================
  // Render Logic
  // =====================
  if (loading)
    return (
      <div className="h-dvh flex justify-center items-center">
        <Loading2 />
      </div>
    );

  if (error) return <div className="text-red-500">{error}</div>;
  if (!massacre) return <div>No data found</div>;

  // =====================
  // UI
  // =====================
  return (
    <div className="my-5 p-4 sm:p-10 max-w-6xl mx-auto bg-white shadow-md rounded-xl">
      {/* ✅ Floating success toast */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-500 animate-fadeInOut z-50">
          ✅ تمت التعديل بنجاح
        </div>
      )}
      <h1 className="text-2xl font-bold mb-8 text-[var(--mainBlue)] text-center">
        تعديل المجزرة
      </h1>

      {/* FORM FIELDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {/* Name */}
        <div className="sm:col-span-2">
          <label className="block mb-1 text-gray-700">اسم المجزرة</label>
          <input
            type="text"
            value={massacre?.name ?? ""}
            onChange={(e) =>
              setMassacre({ ...massacre!, name: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[var(--mainBlue)]"
          />
        </div>

        {/* Governorate */}
        <div>
          <label className="block mb-1 text-gray-700">المحافظة</label>
          <input
            type="text"
            value={massacre?.governorate ?? ""}
            onChange={(e) =>
              setMassacre({ ...massacre!, governorate: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[var(--mainBlue)]"
          />
        </div>

        {/* City */}
        <div>
          <label className="block mb-1 text-gray-700">المدينة</label>
          <input
            type="text"
            value={massacre?.city ?? ""}
            onChange={(e) =>
              setMassacre({ ...massacre!, city: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[var(--mainBlue)]"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 text-gray-700">الموقع</label>
          <input
            type="text"
            value={massacre?.location ?? ""}
            onChange={(e) =>
              setMassacre({ ...massacre!, location: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[var(--mainBlue)]"
          />
        </div>

        {/* Total Martyrs */}
        <div>
          <label className="block mb-1 text-gray-700">عدد الشهداء</label>
          <input
            type="number"
            value={massacre?.totalOfMartyrs ?? 0}
            onChange={(e) =>
              setMassacre({
                ...massacre!,
                totalOfMartyrs: Math.max(0, Number(e.target.value)),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[var(--mainBlue)]"
          />
        </div>

        {/* Start & End Dates */}
        <div>
          <label className="block mb-1 text-gray-700">تاريخ البداية</label>
          <input
            type="date"
            value={massacre?.startDate?.slice(0, 10) ?? ""}
            onChange={(e) =>
              setMassacre({ ...massacre!, startDate: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[var(--mainBlue)]"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">تاريخ النهاية</label>
          <input
            type="date"
            value={massacre?.endDate?.slice(0, 10) ?? ""}
            onChange={(e) =>
              setMassacre({ ...massacre!, endDate: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[var(--mainBlue)]"
          />
        </div>

        {/* Overview */}
        <div className="sm:col-span-2">
          <label className="block mb-1 text-gray-700">الوصف</label>
          <textarea
            rows={4}
            value={massacre?.overview ?? ""}
            onChange={(e) =>
              setMassacre({ ...massacre!, overview: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[var(--mainBlue)]"
          />
        </div>
      </div>

      {/* OLD MEDIA */}
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        الوسائط القديمة
      </h2>
      {massacre.media?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {massacre.media.map((m) => (
            <div
              key={m._id}
              className="relative border rounded-lg overflow-hidden"
            >
              {mediaUrls[m.mediaId] ? (
                m.mediaType === "image" ? (
                  <Image
                    src={mediaUrls[m.mediaId]}
                    alt=""
                    width={300}
                    height={200}
                    className="w-full h-32 object-cover"
                  />
                ) : (
                  <video
                    controls
                    className="w-full h-32 object-cover"
                    src={mediaUrls[m.mediaId]}
                  />
                )
              ) : (
                <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400">
                  لا توجد وسائط
                </div>
              )}
              <button
                onClick={() => handleDeleteOldMedia(m.mediaId)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-8">لا توجد وسائط قديمة</p>
      )}

      {/* ADD NEW FILES */}
      {/* <h2 className="text-lg font-semibold mb-4 text-gray-700">
        إضافة وسائط جديدة
      </h2>
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleNewFileChange}
        className="mb-4"
      />
      {newFiles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {newFiles.map((file, i) => {
            const url = URL.createObjectURL(file);
            return (
              <div
                key={i}
                className="relative border rounded-lg overflow-hidden"
              >
                {file.type.startsWith("image") ? (
                  <Image
                    src={url}
                    alt=""
                    width={300}
                    height={200}
                    className="w-full h-32 object-cover"
                  />
                ) : (
                  <video
                    src={url}
                    controls
                    className="w-full h-32 object-cover"
                  />
                )}
                <button
                  onClick={() => handleRemoveNewFile(i)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
                >
                  حذف
                </button>
              </div>
            );
          })}
        </div>
      )} */}

      <FileUploader onUploadComplete={handleUploadComplete} />

      {/* SAVE BUTTON */}
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          disabled={!massacre?.name || massacre.name.trim() === ""}
          className="mt-6 px-8 py-3 bg-[var(--mainBlue)] text-white rounded-md hover:bg-[var(--hoverBlue)] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loadingUpdate ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>جاري الحفظ...</span>
            </div>
          ) : (
            <p> حفظ التعديلات</p>
          )}
        </button>
      </div>

      {/* ✅ Toast animation style */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
