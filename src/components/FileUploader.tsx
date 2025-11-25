"use client";

import React, { useState, useRef } from "react";
import { uploadFileApi } from "@/lib/uploadFileApi";
import { MediaInput } from "@/lib/massacreApi";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Video as VideoIcon,
  Loader2,
  UploadCloud,
} from "lucide-react";

type PreviewItem = {
  file: File;
  url: string;
  type: "image" | "video";
};

interface FileUploaderProps {
  onUploadComplete: (uploadedMedia: MediaInput[]) => void;
}

const DARK_TEAL = "text-[#0B3F3D]";

export default function FileUploader({ onUploadComplete }: FileUploaderProps) {
  const [files, setFiles] = useState<PreviewItem[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles: PreviewItem[] = Array.from(selectedFiles).map((file) => {
      const isVideo = file.type.startsWith("video/");
      const url = URL.createObjectURL(file);

      return {
        file,
        url,
        type: isVideo ? "video" : "image",
      };
    });

    files.forEach((f) => URL.revokeObjectURL(f.url));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    const updated = [...files];
    const removed = updated.splice(index, 1)[0];
    URL.revokeObjectURL(removed.url);
    setFiles(updated);
  };

  const handleUploadAll = async () => {
    setUploading(true);
    const uploadedMedia: MediaInput[] = [];

    for (const item of files) {
      const mediaID = await uploadFileApi(item.file); // returns fileID from backend
      uploadedMedia.push({
        mediaId: mediaID.data!.id,
        mediaType: item.type,
      });
    }

    setUploading(false);
    setUploaded(true);
    onUploadComplete(uploadedMedia);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden bg-white border border-[#0B3F3D]/10">
      {/* Header */}
      <div
        className="bg-[#0B3F3D] px-7 py-5 text-right text-white flex justify-between items-center cursor-pointer transition duration-300 hover:bg-[#0B3F3D]/90"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <UploadCloud className="w-6 h-6 text-[#C8A870]" />
          <h2 className="text-2xl font-extrabold text-[#C8A870]">
            رفع الصور والفيديوهات
          </h2>
        </div>
        {isOpen ? (
          <ChevronUp className="text-[#C8A870] w-6 h-6" />
        ) : (
          <ChevronDown className="text-[#C8A870] w-6 h-6" />
        )}
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-full opacity-100 p-7" : "max-h-0 opacity-0 p-0"
        }`}
      >
        <div className="flex flex-col gap-5">
          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#0B3F3D]/10 pb-4">
            <p className={`flex items-center gap-2 font-semibold ${DARK_TEAL}`}>
              <ImageIcon className="w-5 h-5 text-[#C8A870]" />
              أضف صوراً أو فيديوهات لعرضها في المعرض
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => inputRef.current?.click()}
                className="px-4 py-2 rounded-lg bg-[#C8A870]/80 text-[#0B3F3D] font-semibold shadow-md hover:bg-[#C8A870] transition"
              >
                اختر الملفات
              </button>
              {files.length > 0 && (
                <button
                  onClick={handleUploadAll}
                  disabled={uploading}
                  className={`px-4 py-2 rounded-lg font-semibold text-white shadow-md transition ${
                    uploading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#0B3F3D] hover:bg-[#0B3F3D]/90"
                  }`}
                >
                  {uploading ? "جاري الرفع..." : "رفع الملفات"}
                </button>
              )}
            </div>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />

          {/* PREVIEW */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {files.map((item, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden border-2 border-[#C8A870]/50 shadow-md hover:shadow-xl transition duration-300 transform hover:scale-[1.02]"
              >
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-600 border border-[#0B3F3D]/20 rounded-full w-8 h-8 flex items-center justify-center shadow-sm z-10"
                  aria-label="حذف الملف"
                >
                  ✕
                </button>

                {item.type === "image" ? (
                  <Image
                    src={item.url}
                    alt={item.file.name}
                    fill
                    className="object-cover transition duration-300"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <video
                      src={item.url}
                      controls
                      className="w-full h-full object-cover"
                    />
                    <VideoIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-[#C8A870]/80 pointer-events-none" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {files.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-[#0B3F3D]/20 rounded-xl bg-[#F7F7F0]/50 text-center">
              {uploading ? (
                <>
                  <Loader2 className="w-8 h-8 animate-spin text-[#0B3F3D]" />
                  <p className="mt-3 text-[#0B3F3D] font-semibold">
                    جاري الرفع...
                  </p>
                </>
              ) : (
                <>
                  <UploadCloud className="w-10 h-10 text-[#C8A870]" />
                  <p className="mt-3 text-gray-600">لم يتم اختيار ملفات بعد</p>
                </>
              )}
            </div>
          )}

          {uploaded && (
            <div className="flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-100 border border-green-200 rounded-lg px-4 py-3">
              تمت عملية الرفع بنجاح
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
