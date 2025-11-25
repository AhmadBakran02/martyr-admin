// "use client";
// import {
//   Badge,
//   BookOpen,
//   BriefcaseBusiness,
//   Building2,
//   Calendar,
//   ChevronDown,
//   ChevronUp,
//   Earth,
//   House,
//   IdCard,
//   NotepadText,
//   UserRound,
//   Users,
//   VenusAndMars,
// } from "lucide-react";
// import { FaChild } from "react-icons/fa";
// import { GrGroup } from "react-icons/gr";
// import { IoManOutline, IoWomanOutline } from "react-icons/io5";
// import { MdFamilyRestroom } from "react-icons/md";
// import { card } from "@/styles/Card.styles";
// import { useState } from "react";
// import { GetMartyrResponse } from "@/lib/getMastyrById";

// interface MastyrCardProps {
//   item: GetMartyrResponse;
// }

// const PersonalInfoMissing = ({ item }: MastyrCardProps) => {
//   const [isOpen, setIsOpen] = useState<boolean>(true);

//   return (
//     <div className={`${card} card-shadow bg-[#fbfdff]`}>
//       {/* Header */}
//       <div
//         className="bg-[var(--mainGreen)] px-7 py-8 sm:text-right text-center text-white flex justify-between items-center cursor-pointer"
//         onClick={() => setIsOpen(!isOpen)} // 👈 toggle on click
//       >
//         <h2 className="text-xl font-bold">المعلومات الشخصية</h2>
//         {isOpen ? <ChevronUp /> : <ChevronDown />} {/* 👇 arrow icon */}
//       </div>

//       {/* Collapsible Content */}
//       <div
//         className={`transition-all duration-300 overflow-hidden ${
//           isOpen ? "opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         {/* Body */}
//         <div className="px-7 py-8 text-[#8B0000]">
//           {/* National ID Number */}
//           <div className="card-row">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <IdCard />
//                 <p>رقم الهوية الوطنية</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.nationalIdNumber || "----"}</p>
//             </div>
//           </div>
//           {/* Name */}
//           <div className="card-row mt-2">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <UserRound />
//                 <p>الاسم</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.name || "----"}</p>
//             </div>
//           </div>
//           {/* fatherName */}
//           <div className="card-row mt-2">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <IoManOutline className="w-6 h-6" />
//                 <p>اسم الأب</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.fatherName || "----"}</p>
//             </div>
//           </div>
//           {/* motherName */}
//           <div className="card-row mt-2">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <IoWomanOutline className="w-6 h-6" />
//                 <p>اسم الأم</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.motherName || "----"}</p>
//             </div>
//           </div>
//           {/* LastName */}
//           <div className="card-row mt-2">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <Users />
//                 <p>الكنية</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.lastName || "----"}</p>
//             </div>
//           </div>
//           {/* dateOfBirth */}
//           <div className="card-row mt-2">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <Calendar />
//                 <p>تاريخ الميلاد</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.dateOfBirth || ""}</p>
//             </div>
//           </div>
//           {/* Gender */}
//           <div className="card-row mt-2">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <VenusAndMars />
//                 <p>الجنس</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.gender == "male" ? "ذكر" : "انثى"}</p>
//             </div>
//           </div>
//           {/* Marital Status */}
//           <div className="card-row mt-2">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <MdFamilyRestroom className="w-6 h-6" />
//                 <p>الحالة الاجتماعية</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.maritalStatus || "----"}</p>
//             </div>
//           </div>
//           {/* NumberOfChildren */}
//           <div className="card-row mt-2">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <FaChild className="w-6 h-6" />
//                 <p>عدد الأطفال</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.numberOfChildren || "----"}</p>
//             </div>
//           </div>
//           {/* Study */}
//           <div className="card-row mt-2">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <BookOpen />
//                 <p>الدراسة</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.study || "----"}</p>
//             </div>
//           </div>
//           {/* Profession */}
//           <div className="card-row mt-2">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <BriefcaseBusiness />
//                 <p>المهنة</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.profession || "----"}</p>
//             </div>
//           </div>
//           {/* Country */}
//           <div className="card-row mt-2">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <Earth />
//                 <p>الدولة</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.country || "----"}</p>
//             </div>
//           </div>
//           {/* Governorate */}
//           <div className="card-row mt-2">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <Earth />
//                 <p>المحافظة</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.governorate || "----"}</p>
//             </div>
//           </div>
//           {/* City */}
//           <div className="card-row mt-2">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <Building2 />
//                 <p>المدينة</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.city || "----"}</p>
//             </div>
//           </div>
//           {/* Neighborhood */}
//           <div className="card-row mt-2">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <House />
//                 <p>الحي</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.neighborhood || "----"}</p>
//             </div>
//           </div>
//           {/* EthnicAffiliation */}
//           <div className="card-row mt-2">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <GrGroup className="w-6 h-6" />
//                 <p>الإنتماء العرقي</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.ethnicAffiliation || "----"}</p>
//             </div>
//           </div>
//           <div className="card-row mt-2">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <Badge className="w-6 h-6" />
//                 <p>الإنتماء التنظيمي</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.organizationalaffiliation || "----"}</p>
//             </div>
//           </div>
//           {/* Religiousal affiliation */}
//           <div className="card-row mt-2">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <GrGroup className="w-6 h-6" />
//                 <p>الإنتماء الديني</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.religiousAffiliation || "----"}</p>
//             </div>
//           </div>
//           {/* Sectarian affiliation */}
//           <div className="card-row mt-2">
//             <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
//               <div className="flex flex-row gap-2 text-gray-700">
//                 <Badge className="w-6 h-6" />
//                 <p>الإنتماء الطائفي</p>
//               </div>
//               <p className="text-gray-700">:</p>
//             </div>
//             <div>
//               <p>{item.data.martyr.sectarianAffiliation || "----"}</p>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="px-5 pb-8 flex flex-col">
//           <div className="flex flex-row justify-between">
//             <div className="flex flex-row gap-2 text-gray-700">
//               <NotepadText />
//               <p>لمحة عن المفقود</p>
//             </div>
//           </div>
//           <div className="pr-8">
//             <p>{item.data.martyr.overview || "----"}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersonalInfoMissing;

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
}

const PersonalMissingInfo = ({ item }: MastyrCardProps) => {
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
            icon={Calendar}
            label="تاريخ الميلاد"
            value={martyr.dateOfBirth}
          />

          <InfoField
            icon={VenusAndMars}
            label="الجنس"
            value={martyr.gender == "male" ? "ذكر" : "أنثى"}
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
          <InfoField icon={BookOpen} label="الدراسة" value={martyr.study} />
          <InfoField
            icon={BriefcaseBusiness}
            label="المهنة"
            value={martyr.profession}
          />
          <InfoField icon={Earth} label="الدولة" value={martyr.country} />
          <InfoField icon={Earth} label="المحافظة" value={martyr.governorate} />
          <InfoField icon={Building2} label="المدينة" value={martyr.city} />
          <InfoField icon={House} label="الحي" value={martyr.neighborhood} />

          <InfoField
            icon={GrGroup}
            label="الإنتماء العرقي"
            value={martyr.ethnicAffiliation}
          />
          <InfoField
            icon={GrGroup}
            label="الإنتماء التنظيمي"
            value={martyr.organizationalaffiliation}
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

          {/* لمحة عن المفقود (تذييل) */}
          <div className="pt-5 mt-5 border-t border-[#0B3F3D]/10">
            <div className="flex flex-row gap-3 items-center font-bold mb-3">
              <NotepadText className="w-5 h-5 text-[#0B3F3D]" />
              <p className={DARK_TEAL}>لمحة عن المفقود</p>
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

export default PersonalMissingInfo;
