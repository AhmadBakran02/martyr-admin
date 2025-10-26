"use client";
import {
  Building,
  Building2,
  Calendar,
  HandFist,
  Hourglass,
  MapPin,
  NotepadText,
  SquareActivity,
  Sword,
} from "lucide-react";
import { card } from "@/styles/Card.styles";
import { useEffect, useState } from "react";
import MartyrdomPicker from "./MartyrdomPicker";
import { GetMartyr } from "@/lib/martyrApi";
import { CitationInfoType } from "@/app/(dashboard)/edit-martys/[id]/page";

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
      setMassacre(martyr.massacreId || "");
      setMassacreId(martyr.massacreId || null);
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
  ]);

  return (
    <div className={`${card} card-shadow bg-[#fbfdff]`}>
      {/* Header */}
      <div className="bg-[var(--mainBlue)] px-7 py-8 sm:text-right text-center text-white">
        <h2 className="text-xl font-bold">معلومات الاستشهاد</h2>
      </div>

      {/* Body */}
      <div className="px-7 py-8 text-[#8B0000]">
        {/* Date of Martyrdom */}
        <FieldRow icon={<Calendar />} label="تاريخ الاستشهاد">
          <input
            value={dateMartyrdom}
            type="date"
            onChange={(e) => setDateMartyrdom(e.target.value)}
            className="bg-gray-100 w-full p-2 rounded-md"
          />
        </FieldRow>

        {/* Burial Date */}
        <FieldRow icon={<Calendar />} label="تاريخ الدفن">
          <input
            value={burialDate}
            onChange={(e) => setBurialDate(e.target.value)}
            type="date"
            className="bg-gray-100 w-full p-2 rounded-md"
          />
        </FieldRow>

        {/* Age */}
        <FieldRow icon={<Hourglass />} label="العمر">
          <input
            value={age}
            onChange={(e) =>
              setAge(Math.max(0, Number(e.target.value)).toString())
            }
            type="number"
            className="bg-gray-100 w-full p-2 rounded-md"
          />
        </FieldRow>

        {/* Age Status */}
        <FieldRow icon={<SquareActivity />} label="الحالة العمرية">
          <input
            value={ageStatus}
            onChange={(e) => setAgeStatus(e.target.value)}
            type="text"
            className="bg-gray-100 w-full p-2 rounded-md"
          />
        </FieldRow>

        {/* Dissident */}
        <FieldRow icon={<Sword />} label="منشق">
          <RadioGroup
            name="dissident"
            value={dissident}
            onChange={setDissident}
          />
        </FieldRow>

        {/* Pre-Revolution */}
        <FieldRow icon={<HandFist />} label="ما قبل الثورة">
          <RadioGroup
            name="preRevolution"
            value={preRevolution}
            onChange={setPreRevolution}
          />
        </FieldRow>

        {/* Massacre Picker */}
        <MartyrdomPicker
          value={massacre}
          onChange={(v) => setMassacre(v)}
          onChange2={(v) => setMassacreId(v)}
          onAdd={async (name) => ({ id: String(Date.now()), name })}
        />
        {/* Country */}
        {/* 
        <FieldRow icon={<Earth />} label="دولة الاستشهاد">
          <input
            value={countryOfMartyrdom}
            onChange={(e) => setCountryOfMartyrdom(e.target.value)}
            type="text"
            className="bg-gray-100 w-full p-2 rounded-md"
          />
        </FieldRow> */}

        {/* Governorate */}
        <FieldRow icon={<Building />} label="محافظة الاستشهاد">
          <input
            value={martyrdomGovernorate}
            onChange={(e) => setMartyrdomGovernorate(e.target.value)}
            type="text"
            className="bg-gray-100 w-full p-2 rounded-md"
          />
        </FieldRow>

        {/* City */}
        <FieldRow icon={<Building2 />} label="مدينة الاستشهاد">
          <input
            value={cityOfMartyrdom}
            onChange={(e) => setCityOfMartyrdom(e.target.value)}
            type="text"
            className="bg-gray-100 w-full p-2 rounded-md"
          />
        </FieldRow>

        {/* Location */}
        <FieldRow icon={<MapPin />} label="موقع الاستشهاد">
          <input
            value={martyrdomLocation}
            onChange={(e) => setMartyrdomLocation(e.target.value)}
            type="text"
            className="bg-gray-100 w-full p-2 rounded-md"
          />
        </FieldRow>
      </div>

      {/* Footer */}
      <div className="px-5 pb-8 flex flex-col">
        <div className="flex flex-row justify-between mb-2">
          <div className="flex flex-row gap-2 text-gray-700">
            <NotepadText />
            <p>طريقة الاستشهاد</p>
          </div>
        </div>
        <div className="pr-8">
          <textarea
            value={citationMethod}
            onChange={(e) => setCitationMethod(e.target.value)}
            placeholder="اكتب طريقة الاستشهاد ..."
            rows={5}
            className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
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
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="card-row mt-5">
    <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
      <div className="flex flex-row gap-2 text-gray-700">
        {icon}
        <p>{label}</p>
      </div>
      <p className="text-gray-700">:</p>
    </div>
    <div className="flex-1 flex items-center">{children}</div>
  </div>
);

const RadioGroup = ({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex flex-row gap-6 text-gray-700 pr-5">
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value="true"
        checked={value === "true"}
        onChange={() => onChange("true")}
        className="accent-blue-600"
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
