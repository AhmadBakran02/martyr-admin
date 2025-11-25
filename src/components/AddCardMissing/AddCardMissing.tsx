"use client";
import Image from "next/image";
import { SquareCheckBig, SquareX } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { GetMartyr } from "@/lib/martyrApi";
import { apiUrl } from "@/config/apiUrl";
import { uploadImage } from "@/lib/uploadImage";

// Colors to match Card.tsx design
const DARK_TEAL = "text-[#0B3F3D]";
const BORDER_COLOR = "border-[#0B3F3D]/15";
const TEXT_LABEL = "text-gray-600";

export interface AddCardValues {
  anonymous: boolean;
  nationalIdNumber: string;
  imageFile: File | null;
  preview: string | null;
}
export type AddCardMissingValues = AddCardValues;

interface AddCardProps {
  onChange?: (values: AddCardValues) => void;
  onImageUploaded?: (fileId: string) => void;
  onUploadingChange?: (state: boolean) => void; // 👈 NEW
  fullName: string;
  dateMartyrdom: string;
  martyr?: GetMartyr;
}

const AddCardMissing = ({
  onChange,
  onImageUploaded, // ✅ MUST BE ADDED HERE
  fullName,
  dateMartyrdom,
  onUploadingChange,
  martyr,
}: AddCardProps) => {
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [nationalIdNumber, setNationalIdNumber] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState<boolean>(false); // ⬅ NEW
  const nationalIdRef = useRef<HTMLInputElement | null>(null);
  const [idFocused, setIdFocused] = useState<boolean>(false);

  // Load initial values

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!martyr?.photoId) return;

      let currentUrl: string | null = null;

      try {
        const res = await fetch(`${apiUrl}/api/file?id=${martyr.photoId}`);
        if (res.ok) {
          const blob = await res.blob();
          currentUrl = URL.createObjectURL(blob);
          setPreview(currentUrl);
        } else {
          console.error("Failed to fetch image:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }

      // Cleanup old blob URL upon component unmount or dependency change
      return () => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
      };
    };
    if (martyr) {
      setAnonymous(martyr.anonymous ?? false);
      setNationalIdNumber(martyr.nationalIdNumber ?? "");

      if (martyr.photoId) {
        fetchPhoto();

        // const url = `${apiUrl}/api/file?id=${martyr.photoId}`;
        // setPreview(url);
      }
    }
  }, [martyr]);

  useEffect(() => {
    if (idFocused) {
      nationalIdRef.current?.focus({ preventScroll: true });
    }
  }, [nationalIdNumber, idFocused]);

  useEffect(() => {
    onChange?.({
      anonymous,
      nationalIdNumber,
      imageFile,
      preview,
    });
  }, [anonymous, nationalIdNumber, imageFile, preview, onChange]);

  // Upload image when selected
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    // Preview
    const url = URL.createObjectURL(file);
    setImageFile(file);
    setPreview(url);

    // 🔵 Notify parent: start uploading
    onUploadingChange?.(true);
    setUploading(true);

    try {
      const fileId = await uploadImage(file);
      console.log(fileId);

      // send fileId to parent
      onImageUploaded?.(fileId);
    } catch (err) {
      console.error("Upload failed:", err);
    }

    // 🟢 Notify parent: upload finished
    setUploading(false);
    onUploadingChange?.(false);
  };

  const InfoRow = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div
      className={`flex flex-col sm:flex-row gap-2 pb-5 border-b ${BORDER_COLOR} last:border-b-0 items-center justify-center`}
    >
      <div className="flex flex-row justify-between w-full sm:w-1/3">
        <p className={`${TEXT_LABEL} font-medium`}>{label}</p>
        <p className={TEXT_LABEL}>:</p>
      </div>
      <div className="w-full sm:w-2/3">{children}</div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden bg-white border border-[#0B3F3D]/10">
      <div className="bg-[#0B3F3D] px-7 py-5 text-right flex flex-row justify-between items-center">
        <h2 className="text-2xl font-extrabold text-[#F7F7F0]">
          بيانات الاختفاء
        </h2>

        {uploading && (
          <p className="text-amber-200 text-sm font-semibold">
            جاري رفع الصورة...
          </p>
        )}
      </div>

      <div className="flex bg-white sm:flex-row flex-col flex-wrap">
        {/* Image */}
        <div className="sm:w-1/3 px-7 py-8 flex justify-center items-start border-b sm:border-b-0 sm:border-l sm:border-l-[#0B3F3D]/10 border-[#0B3F3D]/10">
          <label className="cursor-pointer group relative w-full flex justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {preview ? (
              <Image
                src={preview}
                alt="selected"
                width={192}
                height={192}
                className="h-auto w-48 rounded-md object-cover shadow-lg border border-[#0B3F3D]/20"
              />
            ) : (
              <div className="h-48 w-48 flex items-center justify-center rounded-md border-2 border-dashed border-[#0B3F3D]/30 text-gray-500 bg-[#F7F7F0] hover:border-[#0B3F3D]/60 hover:text-[#0B3F3D] transition">
                <span className="font-semibold">اختر صورة</span>
              </div>
            )}

            <div className="absolute bottom-3 right-3 text-xs text-white bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              {preview ? "تغيير الصورة" : "رفع صورة"}
            </div>
          </label>
        </div>

        <div className="sm:w-2/3 px-7 py-8 flex flex-col gap-5">
          <InfoRow label="الاسم الكامل">
            <input
              value={fullName || ""}
              readOnly
              className={`w-full bg-[#F7F7F0] border border-[#0B3F3D]/10 rounded-lg px-3 py-2 font-semibold ${DARK_TEAL}`}
            />
          </InfoRow>

          <InfoRow label="تاريخ الاختفاء">
            <input
              value={dateMartyrdom || ""}
              readOnly
              className={`w-full bg-[#F7F7F0] border border-[#0B3F3D]/10 rounded-lg px-3 py-2 font-semibold ${DARK_TEAL}`}
            />
          </InfoRow>

          <div
            className={`flex flex-col sm:flex-row gap-2 pb-5 border-b ${BORDER_COLOR} last:border-b-0 items-center justify-center`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3">
              <p className={`${TEXT_LABEL} font-medium`}>رقم الهوية الوطنية</p>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <input
                type="text"
                value={nationalIdNumber}
                ref={nationalIdRef}
                onChange={(e) => setNationalIdNumber(e.target.value)}
                onFocus={() => setIdFocused(true)}
                onBlur={() => setIdFocused(false)}
                className="w-full bg-white border border-[#0B3F3D]/20 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
                placeholder="أدخل رقم الهوية الوطنية"
              />
            </div>
          </div>

          {/* Anonymous */}
          <div className="flex flex-col sm:flex-row gap-2 mt-5">
            <div className="sm:w-1/3 flex flex-row justify-between">
              <p className={TEXT_LABEL}>مجهول</p>
              <p className={TEXT_LABEL}>:</p>
            </div>

            <div className="sm:w-2/3 w-full flex flex-row gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="anonymous"
                  checked={anonymous === true}
                  onChange={() => setAnonymous(true)}
                  className="hidden"
                />
                <SquareCheckBig
                  className={anonymous ? "text-green-500" : "text-gray-400"}
                />
                <span>نعم</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="anonymous"
                  checked={anonymous === false}
                  onChange={() => setAnonymous(false)}
                  className="hidden"
                />
                <SquareX
                  className={!anonymous ? "text-red-500" : "text-gray-400"}
                />
                <span>لا</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AddCardMissing);
