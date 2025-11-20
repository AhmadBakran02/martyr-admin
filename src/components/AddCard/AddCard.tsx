"use client";
import Image from "next/image";
import { card } from "@/styles/Card.styles";
import { SquareCheckBig, SquareX } from "lucide-react";
import "./style.css";
import { useEffect, useState } from "react";
import { GetMartyr } from "@/lib/martyrApi";
import { apiUrl } from "@/config/apiUrl";
import { uploadImage } from "@/lib/uploadImage";

export interface AddCardValues {
  anonymous: boolean;
  nationalIdNumber: string;
  imageFile: File | null;
  preview: string | null;
}

interface AddCardProps {
  onChange?: (values: AddCardValues) => void;
  onImageUploaded?: (fileId: string) => void;
  onUploadingChange?: (state: boolean) => void; // 👈 NEW
  fullName: string;
  dateMartyrdom: string;
  martyr?: GetMartyr;
}

const AddCard = ({
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

  // Load initial values
  useEffect(() => {
    if (martyr) {
      setAnonymous(martyr.anonymous ?? false);
      setNationalIdNumber(martyr.nationalIdNumber ?? "");

      if (martyr.photoId) {
        const url = `${apiUrl}/api/file?fileID=${martyr.photoId}`;
        setPreview(url);
      }
    }
  }, [martyr]);

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

      // send fileId to parent
      onImageUploaded?.(fileId);
    } catch (err) {
      console.error("Upload failed:", err);
    }

    // 🟢 Notify parent: upload finished
    setUploading(false);
    onUploadingChange?.(false);
  };

  return (
    <div className={`${card} card-shadow`}>
      <div className="bg-[var(--mainGreen)] px-7 py-8 text-right text-white flex flex-row justify-between">
        <h2 className="text-xl font-bold">بيانات الاستشهاد</h2>

        {/* ⬅ SHOW UPLOADING STATUS */}
        {uploading && <p className="text-yellow-300">جاري رفع الصورة...</p>}
      </div>

      <div className="flex bg-[#fbfdff] sm:flex-row flex-col flex-wrap justify-center">
        {/* Image */}
        <div className="min-w-50 sm:w-1/3 px-7 py-8 flex justify-center items-start avatar">
          <label className="cursor-pointer">
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
                className="h-auto w-45 rounded-md card-shadow object-cover"
              />
            ) : (
              <div className="h-48 w-45 flex items-center justify-center rounded-md border-2 border-dashed border-gray-400 text-gray-500 card-shadow">
                اختر صورة
              </div>
            )}
          </label>
        </div>

        {/* Info */}
        <div className="min-w-80 sm:w-2/3 px-7 py-8 flex-1">
          {/* Full Name */}
          <div className="card-row">
            <label
              htmlFor="fullname"
              className="w-1/3 flex flex-row justify-between items-center"
            >
              <p className="text-[#8391a0]">الاسم الكامل</p>
              <p className="text-[#8391a0]">:</p>
            </label>
            <div className="w-2/3">
              <input
                value={fullName || ""}
                disabled
                className="bg-gray-100 w-full p-2 rounded-md"
              />
            </div>
          </div>

          {/* Date */}
          <div className="card-row mt-5">
            <label
              htmlFor="date"
              className="w-1/3 flex flex-row justify-between items-center"
            >
              <p className="text-[#8391a0]">تاريخ الاستشهاد</p>
              <p className="text-[#8391a0]">:</p>
            </label>
            <div className="w-2/3">
              <input
                value={dateMartyrdom || ""}
                disabled
                className="bg-gray-100 w-full p-2 rounded-md"
              />
            </div>
          </div>

          {/* National ID */}
          <div className="card-row mt-5">
            <label
              htmlFor="id"
              className="w-1/3 flex flex-row justify-between items-center"
            >
              <p className="text-[#8391a0]">رقم الهوية الوطنية</p>
              <p className="text-[#8391a0]">:</p>
            </label>
            <div className="w-2/3">
              <input
                value={nationalIdNumber}
                onChange={(e) => setNationalIdNumber(e.target.value)}
                className="bg-gray-100 w-full p-2 rounded-md"
              />
            </div>
          </div>

          {/* Anonymous */}
          <div className="flex flex-row gap-2 mt-5">
            <div className="w-1/3 flex flex-row justify-between">
              <p className="text-[#8391a0]">مجهول</p>
              <p className="text-[#8391a0]">:</p>
            </div>

            <div className="w-2/3 flex flex-row gap-6">
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

export default AddCard;
