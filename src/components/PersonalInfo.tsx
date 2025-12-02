"use client";
import {
  Badge,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  Earth,
  House,
  IdCard,
  MapPinHouse,
  NotepadText,
  UserRound,
  Users,
  VenusAndMars,
} from "lucide-react";
import { FaChild } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { IoManOutline, IoWomanOutline } from "react-icons/io5";
import { MdFamilyRestroom } from "react-icons/md";
// تم التعليق على الاستيراد الخارجي ليتم استخدام فئات Tailwind مباشرة
// import { card } from "@/styles/Card.styles";
import { useState, type ComponentType } from "react";
import { GetMartyrResponse } from "@/lib/getMastyrById";

// تعريف الألوان المستخدمة لسهولة القراءة والتوحيد مع مكون Card.tsx
const DARK_TEAL = "text-[#0B3F3D]";
const BORDER_COLOR = "border-[#0B3F3D]/20";
const TEXT_LABEL = "text-gray-600"; // أغمق قليلاً من السابق
const TEXT_VALUE = DARK_TEAL;

interface MastyrCardProps {
  item: GetMartyrResponse;
  missing?: boolean;
}

const PersonalInfo = ({ item, missing }: MastyrCardProps) => {
  // الافتراض هو أن البطاقة مفتوحة في البداية
  const [isOpen, setIsOpen] = useState(true);

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
    value: string | number | undefined;
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
          المعلومات الشخصية
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
        <div className={`text-right space-y-2`}>
          <InfoField
            icon={IdCard}
            label="رقم الهوية الوطنية"
            value={martyr.nationalIdNumber}
          />
          <InfoField icon={UserRound} label="الاسم" value={martyr.name} />
          <InfoField
            icon={IoManOutline}
            label="اسم الأب"
            value={martyr.fatherName}
          />
          <InfoField
            icon={IoWomanOutline}
            label="اسم الأم"
            value={martyr.motherName}
          />
          <InfoField icon={Users} label="الكنية" value={martyr.lastName} />
          <InfoField
            icon={VenusAndMars}
            label="الجنس"
            value={martyr.gender == "male" ? "ذكر" : "أنثى"}
          />
          <InfoField
            icon={Calendar}
            label="تاريخ الميلاد"
            value={martyr.dateOfBirth}
          />

          <InfoField
            icon={MapPinHouse}
            label="مكان الولادة"
            value={martyr.placeOfBirth}
          />
          <InfoField icon={Earth} label="الدولة" value={martyr.country} />
          <InfoField icon={Earth} label="المحافظة" value={martyr.governorate} />
          <InfoField icon={Building2} label="المدينة" value={martyr.city} />
          <InfoField icon={House} label="الحي" value={martyr.neighborhood} />
          <InfoField icon={BookOpen} label="الدراسة" value={martyr.study} />
          <InfoField
            icon={BriefcaseBusiness}
            label="المهنة"
            value={martyr.profession}
          />
          <InfoField
            icon={MdFamilyRestroom}
            label="الحالة الاجتماعية"
            value={martyr.maritalStatus}
          />
          <InfoField
            icon={FaChild}
            label="عدد الأطفال"
            value={martyr.numberOfChildren || 0}
          />

          <InfoField
            icon={GrGroup}
            label="الإنتماء العرقي"
            value={martyr.ethnicAffiliation}
          />
          <InfoField
            icon={Badge}
            label="الإنتماء الديني"
            value={martyr.religiousAffiliation}
          />
          <InfoField
            icon={Badge}
            label="الإنتماء الطائفي"
            value={martyr.sectarianAffiliation}
          />
          <InfoField
            icon={GrGroup}
            label="الإنتماء التنظيمي"
            value={martyr.organizationalaffiliation}
          />

          {/* لمحة عن الشهيد (تذييل) */}
          <div className="pt-5 mt-5 border-t border-[#0B3F3D]/10">
            <div className="flex flex-row gap-3 items-center font-bold mb-3">
              <NotepadText className="w-5 h-5 text-[#0B3F3D]" />
              <p className={DARK_TEAL}>
                {missing ? "لمحة عن المفقود" : "لمحة عن الشهيد"}
              </p>
            </div>
            <div className="pr-8 text-gray-700 leading-relaxed">
              <p>{martyr.overview || "----"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
