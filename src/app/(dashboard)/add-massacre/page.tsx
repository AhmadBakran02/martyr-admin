"use client";

import { useCallback, useState } from "react";
import AddMassacreInfo, {
  MassacreInfoData,
} from "@/components/AddMassacreInfo";
import FileUploader from "@/components/FileUploader";
import { addMassacreApi, MediaInput } from "@/lib/massacreApi";
import ImageUploader from "@/components/ImageUploader";

export default function AddMassacre() {
  const [massacreInfo, setMassacreInfo] = useState<MassacreInfoData | null>(
    null
  );
  const [uploadedMedia, setUploadedMedia] = useState<MediaInput[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleUploadComplete = (media: MediaInput[]) => {
    setUploadedMedia(media);
  };

  const handleUploadImage = (photoId: string) => {
    setUploadedImage(photoId);
  };
  console.log(massacreInfo?.number);

  const handleSave = async () => {
    if (!massacreInfo) return;
    setLoading(true);

    const massacre = {
      name: massacreInfo.name,
      startDate: massacreInfo.start,
      endDate: massacreInfo.end,
      governorate: massacreInfo.governorate,
      city: massacreInfo.city,
      overview: massacreInfo.note,
      totalOfMartyrs: Number(massacreInfo.number || "0"),
      photoId: uploadedImage,
      media: uploadedMedia,
    };

    console.log(massacre);
    const result = await addMassacreApi(massacre);

    if (result.success) {
      console.log("✅ Added successfully:", result.data);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Hide toast after 3s
    } else {
      console.error("❌ Error:", result.message);
    }

    setLoading(false);
  };

  const handleMassacreInfoChange = useCallback((data: MassacreInfoData) => {
    setMassacreInfo(data);
  }, []);

  return (
    <div className="relative p-10 flex justify-center items-center">
      {/* ✅ Floating success toast */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-500 animate-fadeInOut z-50">
          ✅ تمت الإضافة بنجاح
        </div>
      )}

      <div className="w-[95%] sm:w-[80%]">
        <AddMassacreInfo onChange={handleMassacreInfoChange} />

        <div className="my-5" />

        <ImageUploader onUploadComplete={handleUploadImage} />

        <div className="my-5" />

        <FileUploader onUploadComplete={handleUploadComplete} />

        <button
          disabled={
            !massacreInfo?.name || massacreInfo.name.length < 1 || loading
          }
          onClick={handleSave}
          className={`mt-8 px-8 py-2.5 rounded-lg font-semibold text-white transition-all duration-300
            ${loading ? "cursor-wait" : ""}
            ${
              !massacreInfo?.name || massacreInfo.name.length < 1 || loading
                ? "bg-blue-300 cursor-not-allowed opacity-70"
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.97] shadow-md hover:shadow-lg"
            }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>جاري الحفظ...</span>
            </div>
          ) : (
            <p>حفظ</p>
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
