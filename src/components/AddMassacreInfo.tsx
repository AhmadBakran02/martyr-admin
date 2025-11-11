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
import { useState, useEffect } from "react";

interface MassacreInfoProps {
  onChange: (data: MassacreInfoData) => void;
}

export interface MassacreInfoData {
  name: string;
  start: string;
  end: string;
  governorate: string;
  city: string;
  location: string;
  number: string;
  note: string;
}

const AddMassacreInfo = ({ onChange }: MassacreInfoProps) => {
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");
  const [note, setNote] = useState("");

  // 🔁 send all state to parent whenever any value changes
  useEffect(() => {
    onChange({ name, start, end, governorate, city, location, number, note });
  }, [name, start, end, governorate, city, location, number, note, onChange]);

  return (
    <div className={`${card} card-shadow bg-[#fbfdff] text-[var(--textMain)]`}>
      {/* Header */}
      <div className="bg-[var(--mainGreen)] px-7 py-8 sm:text-right text-center text-white">
        <h2 className="text-xl font-bold">المعلومات المجزرة</h2>
      </div>

      {/* Body */}
      <div className="px-7 py-8">
        {/* Name */}
        <div className="card-row">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 ">
              <Captions />
              <p>الاسم</p>
            </div>
            <p className="">:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>

        {/* Start Date */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 ">
              <Calendar />
              <p>تاريخ البداية</p>
            </div>
            <p className="">:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={start}
              onChange={(e) => setStart(e.target.value)}
              type="date"
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>

        {/* End Date */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-[var(--textMain)]">
              <Calendar />
              <p>تاريخ النهاية</p>
            </div>
            <p className="">:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              type="date"
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>

        {/* Governorate */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 ">
              <Earth />
              <p>المحافظة</p>
            </div>
            <p className="">:</p>
          </div>
          <div className="flex-1 flex items-center">
            <select
              value={governorate}
              onChange={(e) => setGovernorate(e.target.value)}
              className="bg-gray-100 w-full p-2 rounded-md"
            >
              <option value="">اختر المحافظة</option>
              <option value="إدلب">إدلب</option>
              <option value="الحسكة">الحسكة</option>
              <option value="الرقة">الرقة</option>
              <option value="السويداء">السويداء</option>
              <option value="دمشق">دمشق</option>
              <option value="القنيطرة">القنيطرة</option>
              <option value="اللاذقية">اللاذقية</option>
              <option value="حلب">حلب</option>
              <option value="حمص">حمص</option>
              <option value="حماة">حماة</option>
              <option value="دير الزور">دير الزور</option>
              <option value="ريف دمشق">ريف دمشق</option>
              <option value="طرطوس">طرطوس</option>
              <option value="درعا">درعا</option>
            </select>
          </div>
        </div>

        {/* City */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 ">
              <Building2 />
              <p>المدينة</p>
            </div>
            <p className="">:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>

        {/* Location */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 ">
              <MapPin />
              <p>الموقع</p>
            </div>
            <p className="">:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>

        {/* Number */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 ">
              <MdFamilyRestroom className="w-6 h-6" />
              <p>عدد الشهداء الموثقين</p>
            </div>
            <p className="">:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={number}
              type="number"
              onChange={(e) => setNumber(e.target.value)}
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Footer (Description) */}
      <div className="px-5 pb-8 flex flex-col">
        <div className="flex flex-row justify-between mb-2">
          <div className="flex flex-row gap-2 ">
            <NotepadText />
            <p>تفاصيل المجزرة</p>
          </div>
        </div>
        <div className="pr-8">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="اكتب تفاصيل المجزرة..."
            rows={5}
            className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>
      </div>
    </div>
  );
};

export default AddMassacreInfo;
