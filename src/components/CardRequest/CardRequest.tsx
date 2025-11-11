"use client";
import Image from "next/image";
import { card } from "@/styles/Card.styles";
import { SquareCheckBig, SquareX } from "lucide-react";
import "./style.css";
import { refreshAccessTokenApi } from "@/lib/auth";
import { apiUrl } from "@/config/apiUrl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RequestMastyrData } from "@/types/RequestApi";

interface MastyrCardProps {
  item: RequestMastyrData | undefined;
}

const CardRequest = ({ item }: MastyrCardProps) => {
  // console.log(item);
  const router = useRouter();
  console.log(item);

  // Delete
  const handleDelete = async (id?: string) => {
    if (!id) return;

    // Confirm before deleting
    const confirmDelete = window.confirm("هل أنت متأكد أنك تريد حذف هذا الطلب");
    if (!confirmDelete) return;

    try {
      const token = await refreshAccessTokenApi();
      if (!token) {
        alert("يرجى تسجيل الدخول أولاً.");
        return;
      }

      const res = await fetch(apiUrl + `/api/add-requests/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        alert("تم حذف الشهيد بنجاح ✅");
        router.back();
      } else {
        const err = await res.json();
        console.error("Delete failed:", err);
        alert("حدث خطأ أثناء الحذف ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ في الاتصال بالخادم ❌");
    }
  };

  const photoID = item?.photoId;
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  // ✅ Fetch image blob from API
  useEffect(() => {
    const fetchPhoto = async () => {
      if (!photoID) return;

      try {
        const res = await fetch(`${apiUrl}/api/file?fileID=${photoID}`);
        if (res.ok) {
          const blob = await res.blob();
          const objectUrl = URL.createObjectURL(blob);
          setPhotoUrl(objectUrl);
        } else {
          console.error("Failed to fetch image:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchPhoto();

    // Cleanup old blob URLs
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, [photoUrl, photoID]);

  return (
    <div className={`${card} card-shadow`}>
      {/* Header */}
      <div className="bg-[var(--mainGreen)] px-7 py-8 text-right text-white flex flex-row justify-between">
        <h2 className="text-xl font-bold text-white">بطاقة الشهيد</h2>
        <div className="flex gap-5 items-center justify-center">
          <button
            onClick={() => handleDelete(item?._id)}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            حذف
          </button>

          {/* <Link href={`/edit-martys/${item?._id}`}>تعديل</Link> */}
        </div>
      </div>
      {/* Body */}
      <div className="flex bg-[#fbfdff] sm:flex-row flex-col flex-wrap">
        {/* Image */}
        <div className="sm:w-1/3 px-7 py-8 flex justify-center items-start avatar">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt="globe"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-48 rounded-md card-shadow"
            />
          ) : (
            <Image
              src={"/images/user.png"}
              alt="globe"
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-48 rounded-md card-shadow"
            />
          )}
        </div>

        {/* Info */}
        <div className="sm:w-2/3 px-7 py-8">
          <div className="flex flex-row gap-2 border-gray-200 pb-5 border-b">
            <div className=" w-1/3 flex flex-row justify-between">
              <p className="text-[#8391a0]">الرقم التسلسلي</p>
              <p className="text-[#8391a0]">:</p>
            </div>
            <div className="w-2/3 text-[#8B0000]">---</div>
          </div>

          {/* Full Name */}
          <div className="flex flex-row gap-2 border-gray-200 pb-5 border-b mt-5">
            <div className=" w-1/3 flex flex-row justify-between">
              <p className="text-[#8391a0]">الاسم الكامل</p>
              <p className="text-[#8391a0]">:</p>
            </div>
            <div className="w-2/3 text-[#8B0000]">{item?.fullName || ""}</div>
          </div>

          {/* Date Of Martyrdom */}
          <div className="flex flex-row gap-2 border-gray-200 pb-5 border-b mt-5">
            <div className=" w-1/3 flex flex-row justify-between">
              <p className="text-[#8391a0]">تاريخ الاستشهاد</p>
              <p className="text-[#8391a0]">:</p>
            </div>
            <div className="w-2/3 text-[#8B0000]">
              {item?.dateOfMartyrdom || ""}
            </div>
          </div>

          {/* National ID Number */}
          <div className="flex flex-row gap-2 border-gray-200 pb-5 border-b mt-5">
            <div className=" w-1/3 flex flex-row justify-between">
              <p className="text-[#8391a0]">رقم الهوية الوطنية</p>
              <p className="text-[#8391a0]">:</p>
            </div>
            <div className="w-2/3 text-[#8B0000]">
              {item?.nationalIdNumber || ""}
            </div>
          </div>

          {/* Anonymous */}
          <div className="flex flex-row gap-2 mt-5">
            <div className=" w-1/3 flex flex-row justify-between ">
              <p className="text-[#8391a0]">مجهول</p>
              <p className="text-[#8391a0]">:</p>
            </div>
            <div className="w-2/3 text-[#8B0000] flex flex-row gap-4">
              <div
                className={`flex items-center justify-center gap-1 ${
                  item?.anonymous ? "" : "text-gray-300"
                }`}
              >
                <p>نعم</p>
                <SquareCheckBig />
              </div>
              <div
                className={`flex items-center justify-center gap-1 ${
                  item?.anonymous ? "text-gray-300" : ""
                }`}
              >
                <p>لا</p>
                <SquareX />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRequest;
