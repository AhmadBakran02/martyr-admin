"use client";
import {
  Building,
  Building2,
  Calendar,
  HandFist,
  Hourglass,
  MapPin,
  NotepadText,
  ChevronDown,
  ChevronUp,
  Sword,
} from "lucide-react";
import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import MartyrdomPicker from "./MartyrdomPicker";
import { GetMartyr } from "@/lib/martyrApi";
import { CitationInfoType } from "@/types/CitationInfoIDType";

// Match CitationInfo.tsx visual style
const DARK_TEAL = "text-[#0B3F3D]";
const BORDER_COLOR = "border-[#0B3F3D]/20";
const TEXT_LABEL = "text-gray-600";

interface AddCitationInfoProps {
  onChange: (data: CitationInfoType) => void;
  martyr?: GetMartyr;
}

const AddCitationInfo = ({ onChange, martyr }: AddCitationInfoProps) => {
  const [dateMartyrdom, setDateMartyrdom] = useState<string>("");
  const [burialDate, setBurialDate] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [ageStatus, setAgeStatus] = useState<string>("");
  const [dissident, setDissident] = useState<string>("true");
  const [preRevolution, setPreRevolution] = useState<string>("true");
  const [countryOfMartyrdom] = useState<string>("");
  const [martyrdomGovernorate, setMartyrdomGovernorate] = useState<string>("");
  const [cityOfMartyrdom, setCityOfMartyrdom] = useState<string>("");
  const [martyrdomLocation, setMartyrdomLocation] = useState<string>("");
  const [citationMethod, setCitationMethod] = useState<string>("");
  const [massacre, setMassacre] = useState<string>("");
  const [massacreId, setMassacreId] = useState<string | null>("");
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // ✅ Pre-fill data when editing existing martyr
  useEffect(() => {
    if (martyr) {
      setDateMartyrdom(martyr.dateOfMartyrdom || "");
      setBurialDate(martyr.burialDate || "");
      setAge(martyr.age?.toString() || "");
      setAgeStatus(martyr.ageStatus || "");
      setDissident(String(martyr.dissident ?? "true"));
      setPreRevolution(String(martyr.preRevolution ?? "true"));
      // setCountryOfMartyrdom(martyr.countryOfMartyrdom || "");
      setMartyrdomGovernorate(martyr.martyrdomGovernorate || "");
      setCityOfMartyrdom(martyr.cityOfMartyrdom || "");
      setMartyrdomLocation(martyr.martyrdomSite || "");
      setCitationMethod(martyr.citationMethod || "");
      // setMassacre(martyr.massacre || "");
      setMassacre(martyr.massacreId?.name || "");
      setMassacreId(martyr.massacreId?._id || martyr.massacreId?.name || null);
    }
  }, [martyr]);

  // ✅ Update parent whenever state changes
  useEffect(() => {
    onChange({
      dateMartyrdom,
      burialDate,
      age,
      ageStatus,
      dissident,
      preRevolution,
      countryOfMartyrdom,
      martyrdomGovernorate,
      cityOfMartyrdom,
      martyrdomLocation,
      citationMethod,
      massacre,
      massacreId,
    });
  }, [
    dateMartyrdom,
    burialDate,
    age,
    ageStatus,
    dissident,
    preRevolution,
    countryOfMartyrdom,
    martyrdomGovernorate,
    cityOfMartyrdom,
    martyrdomLocation,
    citationMethod,
    massacre,
    massacreId,
    onChange,
  ]);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden bg-white border border-[#0B3F3D]/10">
      {/* Header */}
      <div
        className="bg-[#0B3F3D] px-7 py-5 text-right text-white flex justify-between items-center cursor-pointer transition duration-300 hover:bg-[#0B3F3D]/90"
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

      {/* Body */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-full opacity-100 p-7" : "max-h-0 opacity-0 p-0"
        }`}
      >
        <div className="text-right space-y-2">
          <FieldRow icon={Calendar} label="تاريخ الاستشهاد">
            <input
              value={dateMartyrdom}
              type="date"
              onChange={(e) => setDateMartyrdom(e.target.value)}
              className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
            />
          </FieldRow>

          <FieldRow icon={Calendar} label="تاريخ الدفن">
            <input
              value={burialDate}
              onChange={(e) => setBurialDate(e.target.value)}
              type="date"
              className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
            />
          </FieldRow>

          <FieldRow icon={Hourglass} label="العمر">
            <input
              value={age}
              onChange={(e) =>
                setAge(Math.max(0, Number(e.target.value)).toString())
              }
              type="number"
              className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
            />
          </FieldRow>

          {/* <FieldRow icon={SquareActivity} label="الحالة العمرية">
            <input
              value={ageStatus}
              onChange={(e) => setAgeStatus(e.target.value)}
              type="text"
              className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
            />
          </FieldRow> */}

          <FieldRow icon={Sword} label="منشق">
            <RadioGroup
              name="dissident"
              value={dissident}
              onChange={setDissident}
            />
          </FieldRow>

          <FieldRow icon={HandFist} label="ما قبل الثورة">
            <RadioGroup
              name="preRevolution"
              value={preRevolution}
              onChange={setPreRevolution}
            />
          </FieldRow>

          <FieldRow icon={Building} label="محافظة الاستشهاد">
            <select
              value={martyrdomGovernorate}
              onChange={(e) => setMartyrdomGovernorate(e.target.value)}
              className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
            >
              <option value="">اختر المحافظة</option>
              <option value="إدلب">إدلب</option>
              <option value="الحسكة">الحسكة</option>
              <option value="الرقة">الرقة</option>
              <option value="السويداء">السويداء</option>
              <option value="القنيطرة">القنيطرة</option>
              <option value="اللاذقية">اللاذقية</option>
              <option value="حلب">حلب</option>
              <option value="حماة">حماة</option>
              <option value="حمص">حمص</option>
              <option value="درعا">درعا</option>
              <option value="دمشق">دمشق</option>
              <option value="دير الزور">دير الزور</option>
              <option value="ريف دمشق">ريف دمشق</option>
              <option value="طرطوس">طرطوس</option>
            </select>
          </FieldRow>

          <FieldRow icon={Building2} label="مدينة الاستشهاد">
            <input
              value={cityOfMartyrdom}
              onChange={(e) => setCityOfMartyrdom(e.target.value)}
              type="text"
              className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
            />
          </FieldRow>

          <FieldRow icon={MapPin} label="موقع الاستشهاد">
            <input
              value={martyrdomLocation}
              onChange={(e) => setMartyrdomLocation(e.target.value)}
              type="text"
              className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
            />
          </FieldRow>

          {/* Massacre Picker */}
          <div className="relative">
            <MartyrdomPicker
              value={massacre}
              onChange={(v) => setMassacre(v)}
              onChange2={(v) => setMassacreId(v)}
              onAdd={async (name) => ({ id: String(Date.now()), name })}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-5 mt-5 border-t border-[#0B3F3D]/10">
          <div className="flex flex-row gap-3 items-center font-bold mb-3">
            <NotepadText className="w-5 h-5 text-[#0B3F3D]" />
            <p className={DARK_TEAL}>طريقة الاستشهاد</p>
          </div>
          <div className="pr-1 sm:pr-8 text-gray-700 leading-relaxed">
            <textarea
              value={citationMethod}
              onChange={(e) => setCitationMethod(e.target.value)}
              placeholder="اكتب طريقة الاستشهاد ..."
              rows={5}
              className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30 resize-y"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCitationInfo;

/* 🔹 Small helper components for cleaner layout */
const FieldRow = ({
  icon,
  label,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  children: ReactNode;
}) => {
  const Icon = icon;
  return (
    <div
      className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
    >
      <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
        <div
          className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
        >
          {Icon ? <Icon className="w-5 h-5 text-[#0B3F3D]" /> : null}
          <p>{label}</p>
        </div>
        <p className={TEXT_LABEL}>:</p>
      </div>
      <div className="w-full sm:w-2/3">{children}</div>
    </div>
  );
};

const RadioGroup = ({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex flex-row gap-6 text-[#0B3F3D] pr-1 sm:pr-5">
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value="true"
        checked={value === "true"}
        onChange={() => onChange("true")}
        className="accent-[#0B3F3D]"
      />
      نعم
    </label>
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value="false"
        checked={value === "false"}
        onChange={() => onChange("false")}
        className="accent-red-600"
      />
      لا
    </label>
  </div>
);
