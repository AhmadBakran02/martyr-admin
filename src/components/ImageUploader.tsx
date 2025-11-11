"use client";

import React, { useState } from "react";
import { uploadFileApi } from "@/lib/uploadFileApi";
import { card } from "@/styles/Card.styles";
import Image from "next/image";

type PreviewItem = {
  file: File;
  url: string;
  type: "image";
};

interface FileUploaderProps {
  onUploadComplete: (uploadedImage: string) => void;
}

export default function ImageUploader({ onUploadComplete }: FileUploaderProps) {
  const [file, setFile] = useState<PreviewItem | null>(null);
  // const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      alert("الرجاء اختيار صورة فقط");
      e.target.value = "";
      return;
    }

    // Clean up previous URL if exists
    if (file) URL.revokeObjectURL(file.url);

    const url = URL.createObjectURL(selectedFile);
    setFile({
      file: selectedFile,
      url,
      type: "image",
    });
    setPreview(url);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const res = await uploadFileApi(file.file);
    const uploadedImage: string = res.data!.fileID;

    setUploading(false);
    onUploadComplete(uploadedImage);
  };

  return (
    <div className={`${card} card-shadow bg-[#fbfdff]`}>
      <div className="p-5 bg-[var(--mainGreen)]">
        <h2 className="font-bold text-white ">
          اختر صورة غلاف الخاصة بالمجزره
        </h2>
      </div>

      <div className=" px-7 py-8 flex justify-center items-start avatar">
        <label className="cursor-pointer block w-full">
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Preview Image or Placeholder */}
          {preview ? (
            <div className="relative w-full h-64 border border-gray-300 rounded-xl">
              <Image
                src={preview}
                alt="selected"
                fill
                className="rounded-md object-cover card-shadow"
              />
            </div>
          ) : (
            <div className="h-64 w-full flex items-center justify-center rounded-md border-2 border-dashed border-gray-400 text-gray-500 card-shadow">
              اختر صورة
            </div>
          )}
        </label>
      </div>

      <div className="pb-5">
        {/* PREVIEW */}

        {file && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-green-600 text-white rounded-md px-6 py-2 w-full max-w-sm mx-auto block"
          >
            {uploading ? "جاري الرفع..." : "رفع الصورة"}
          </button>
        )}
      </div>
    </div>
  );
}
