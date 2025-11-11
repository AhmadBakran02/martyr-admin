"use client";

import React, { useState, useRef } from "react";
import { uploadFileApi } from "@/lib/uploadFileApi";
import { MediaInput } from "@/lib/massacreApi";
import { card } from "@/styles/Card.styles";
import Image from "next/image";

type PreviewItem = {
  file: File;
  url: string;
  type: "image" | "video";
};

interface FileUploaderProps {
  onUploadComplete: (uploadedMedia: MediaInput[]) => void;
}

export default function FileUploader({ onUploadComplete }: FileUploaderProps) {
  const [files, setFiles] = useState<PreviewItem[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<boolean>(false);

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
        mediaId: mediaID.data!.fileID,
        mediaType: item.type,
      });
    }

    setUploading(false);
    setUploaded(true);
    onUploadComplete(uploadedMedia);
  };

  return (
    <div className={`${card} card-shadow bg-[#fbfdff]`}>
      <div className="flex p-5 justify-between items-center mb-4 bg-[var(--mainGreen)]">
        <h2 className="font-bold text-white ">اختر الصور والفيديوهات</h2>
        <button
          onClick={() => inputRef.current?.click()}
          className="bg-blue-50 text-[var(--mainBlue)] rounded-md px-4 py-2"
        >
          اختر الملفات
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <div className="p-5 ">
        {/* PREVIEW */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {files.map((item, index) => (
            <div
              key={index}
              className="relative border border-gray-300 rounded-md overflow-hidden"
            >
              <button
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-[#fbfdff] border border-gray-400 rounded-full w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>
              {item.type === "image" ? (
                <div className="relative w-full h-40">
                  <Image
                    src={item.url}
                    alt={item.file.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <video
                  src={item.url}
                  controls
                  className="w-full h-40 object-cover"
                />
              )}
            </div>
          ))}
        </div>

        {files.length > 0 && (
          <button
            onClick={handleUploadAll}
            disabled={uploading}
            className="mt-5 bg-green-600 text-white rounded-md px-6 py-2"
          >
            {uploading ? "جاري الرفع..." : "رفع الملفات"}
          </button>
        )}
        {uploaded && (
          <p className="text-white bg-green-500 rounded-md px-6 py-2 mt-5 w-40 text-center">
            تم رفع الملفات
          </p>
        )}
      </div>
    </div>
  );
}
