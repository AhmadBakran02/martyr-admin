"use client";
import {
  Building2,
  Calendar,
  Captions,
  Earth,
  MapPin,
  NotepadText,
} from "lucide-react";
import { MdFamilyRestroom } from "react-icons/md";
import { card } from "@/styles/Card.styles";
import { Massacre } from "@/lib/massacreApi";
import Link from "next/link";
import { refreshAccessTokenApi } from "@/lib/auth";
import { apiUrl } from "@/config/apiUrl";
import { useRouter } from "next/navigation";

interface MassacreCardProps {
  item: Massacre;
  id: string;
}

const MassacreInfo = ({ item, id }: MassacreCardProps) => {
  const router = useRouter();

  // const [name, setName] = useState("مجزرة");
  // const [start, setStart] = useState("2011-2-23");
  // const [end, setEnd] = useState("2011-4-10");
  // const [governorate, setGovernorate] = useState("حماة");
  // const [city, setCity] = useState("حماة");
  // const [location, setLocation] = useState("جنوب الملعب");
  // const [number, setNumber] = useState("300");
  // const [note, setNote] = useState("");
  if (!item) {
    return (
      <div className="p-5 text-gray-500">جاري تحميل بيانات المجزرة...</div>
    );
  }

  const handleDelete = async (id?: string) => {
    if (!id) return;

    // ✅ Confirm before deleting
    const confirmDelete = window.confirm(
      "هل أنت متأكد أنك تريد حذف هذه المجزرة"
    );
    if (!confirmDelete) return;

    try {
      const token = await refreshAccessTokenApi(); // 🔑 adjust if token stored differently
      if (!token) {
        alert("يرجى تسجيل الدخول أولاً.");
        return;
      }

      const res = await fetch(apiUrl + `/api/massacre/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        alert("تم حذف المجزرة بنجاح ✅");
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

  console.log(item.numberOfMartyrs);
  console.log(item.totalOfMartyrs);
  console.log(item);

  return (
    <div className={`${card} card-shadow bg-[#fbfdff]`}>
      {/* Header */}
      <div className="bg-[var(--mainBlue)] px-7 py-8 sm:text-right text-center text-white flex flex-row justify-between">
        <h2 className="text-xl font-bold">المعلومات المجزرة</h2>
        <div className="flex gap-5 items-center justify-center">
          <button
            onClick={() => handleDelete(id)}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            حذف
          </button>
          <p className="cursor-pointer">
            <Link href={`/edit-massacre/${id}`}>تعديل</Link>
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-7 py-8 text-[#8B0000]">
        {/* Name */}
        <div className="card-row">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <Captions />
              <p>الاسم</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center pr-5">
            <div className="w-2/3 text-[#8B0000]">{item.name || ""}</div>
          </div>
        </div>

        {/* Start Date */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <Calendar />
              <p>تاريخ البداية</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center pr-5">
            <div className="w-2/3 text-[#8B0000]">
              {item.startDate || "----"}
            </div>
          </div>
        </div>

        {/* End Date */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <Calendar />
              <p>تاريخ النهاية</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center pr-5">
            <div className="w-2/3 text-[#8B0000]">{item.endDate || "----"}</div>
          </div>
        </div>

        {/* Governorate */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <Earth />
              <p>المحافظة</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center pr-5">
            <div className="w-2/3 text-[#8B0000]">
              {item.governorate || "----"}
            </div>
          </div>
        </div>

        {/* City */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <Building2 />
              <p>المدينة</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center pr-5">
            <div className="w-2/3 text-[#8B0000]">{item.city || "----"}</div>
          </div>
        </div>

        {/* Location */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <MapPin />
              <p>الموقع</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center pr-5">
            <div className="w-2/3 text-[#8B0000]">
              {item.location || "----"}
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <MdFamilyRestroom className="w-6 h-6" />
              <p>عدد الشهداء الموثقين</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center pr-5">
            <div className="w-2/3 text-[#8B0000]">
              {item.totalOfMartyrs || "0"}
            </div>
          </div>
        </div>
        {/* Number */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <MdFamilyRestroom className="w-6 h-6" />
              <p>الموثقين في الموقع</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center pr-5">
            <div className="w-2/3 text-[#8B0000]">
              {item.numberOfMartyrs || "0"}
            </div>
          </div>
        </div>
      </div>

      {/* Footer (Description) */}
      <div className="px-5 pb-8 flex flex-col">
        <div className="flex flex-row justify-between mb-2">
          <div className="flex flex-row gap-2 text-gray-700">
            <NotepadText />
            <p>تفاصيل المجزرة</p>
          </div>
        </div>
        <div className="pr-8">
          <textarea
            value={item.overview || "----"}
            disabled={true}
            // placeholder="اكتب تفاصيل المجزرة..."
            rows={5}
            className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>
      </div>
    </div>
  );
};

export default MassacreInfo;
