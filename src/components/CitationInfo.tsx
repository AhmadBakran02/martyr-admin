"use client";
import {
  BookOpenCheck,
  Building,
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  HandFist,
  Hourglass,
  MapPin,
  NotepadText,
  Skull, // استخدام أيقونة Skull بدلاً من الصورة الخارجية kill.svg
  SquareActivity,
  Swords,
} from "lucide-react";
// تم التعليق على الاستيراد الخارجي ليتم استخدام فئات Tailwind مباشرة
// import { card } from "@/styles/Card.styles";
import { useState, type ComponentType } from "react";
import { GetMartyrResponse } from "@/lib/getMastyrById";
// تم إزالة استيراد Image غير المستخدم هنا

// تعريف الألوان المستخدمة لسهولة القراءة والتوحيد
const DARK_TEAL = "text-[#0B3F3D]";
const BORDER_COLOR = "border-[#0B3F3D]/20";
const TEXT_LABEL = "text-gray-600";
const TEXT_VALUE = DARK_TEAL;

interface MastyrCardProps {
  item: GetMartyrResponse;
}

const CitationInfo = ({ item }: MastyrCardProps) => {
  // الافتراضي هو أن البطاقة مغلقة
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // فئة CSS للصف الواحد
  const CardRowStyle = `flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`;

  // وظيفة عرض حقل المعلومة
  const InfoField = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: ComponentType<{ className?: string }>;
    label: string;
    value: string | number | undefined | null;
  }) => (
    <div className={CardRowStyle}>
      <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
        <div
          className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
        >
          <Icon className="w-5 h-5 text-[#0B3F3D]" />{" "}
          {/* أيقونة باللون الزمردي */}
          <p>{label}</p>
        </div>
        <p className={TEXT_LABEL}>:</p>
      </div>
      <div
        className={`w-full sm:w-2/3 pr-8 sm:pr-0 font-semibold ${TEXT_VALUE}`}
      >
        <p>{value || "----"}</p>
      </div>
    </div>
  );

  const martyr = item.data.martyr;

  const booleanToText = (value: string | undefined) => {
    if (value === "true") return "نعم";
    if (value === "false") return "لا";
    return "----";
  };

  return (
    <div
      className={`w-full max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden bg-white border border-[#0B3F3D]/10`}
    >
      {/* Header - تطبيق الهوية البصرية الزمردية والذهبية */}
      <div
        className={`bg-[#0B3F3D] px-7 py-5 text-right text-white flex justify-between items-center cursor-pointer transition duration-300 hover:bg-[#0B3F3D]/90`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-2xl font-extrabold text-[#C8A870]">
          معلومات الاستشهاد
        </h2>
        {isOpen ? (
          <ChevronUp className="text-[#C8A870] w-6 h-6" />
        ) : (
          <ChevronDown className="text-[#C8A870] w-6 h-6" />
        )}
      </div>

      {/* Collapsible Content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-full opacity-100 p-7" : "max-h-0 opacity-0 p-0"
        }`}
      >
        {/* Body */}
        <div className={`text-right space-y-2`}>
          <InfoField
            icon={Calendar}
            label="تاريخ الاستشهاد"
            value={martyr.dateOfMartyrdom}
          />
          <InfoField
            icon={Calendar}
            label="تاريخ الدفن"
            value={martyr.burialDate}
          />
          <InfoField icon={Hourglass} label="العمر" value={martyr.age} />
          <InfoField
            icon={SquareActivity}
            label="الحالة العمرية"
            value={martyr.ageStatus}
          />

          <InfoField
            icon={Swords}
            label="منشق"
            value={booleanToText(martyr.dissident)}
          />

          <InfoField
            icon={HandFist}
            label="ما قبل الثورة"
            value={booleanToText(martyr.preRevolution)}
          />

          {/* مجزرة - تم استبدال kill.svg بـ Skull */}
          <InfoField
            icon={Skull}
            label="مجزرة"
            value={martyr.massacreId?.name || "لا يوجد"}
          />

          <InfoField
            icon={Building}
            label="محافظة الاستشهاد"
            value={martyr.martyrdomGovernorate}
          />
          <InfoField
            icon={Building2}
            label="مدينة الاستشهاد"
            value={martyr.cityOfMartyrdom}
          />
          <InfoField
            icon={MapPin}
            label="موقع الاستشهاد"
            value={martyr.martyrdomSite}
          />
          <InfoField
            icon={BookOpenCheck}
            label="مصدر المعلومات"
            value={martyr.sourceOfInformation}
          />
        </div>

        {/* Footer (طريقة الاستشهاد) */}
        <div className="pt-5 mt-5 border-t border-[#0B3F3D]/10">
          <div className="flex flex-row gap-3 items-center font-bold mb-3">
            <NotepadText className="w-5 h-5 text-[#0B3F3D]" />
            <p className={DARK_TEAL}>طريقة الاستشهاد</p>
          </div>
          <div className="pr-8 text-gray-700 leading-relaxed">
            <p>{martyr.stateOfMartyrdom || "----"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitationInfo;
