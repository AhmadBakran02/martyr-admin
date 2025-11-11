"use client";
import {
  Building,
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  HandFist,
  Hourglass,
  MapPin,
  NotepadText,
  SquareActivity,
  Swords,
} from "lucide-react";
import { card } from "@/styles/Card.styles";
import { useState } from "react";
import { RequestMastyrData } from "@/types/RequestApi";

interface MastyrCardProps {
  item: RequestMastyrData;
}

const CitationInfoRequest = ({ item }: MastyrCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={`${card} card-shadow bg-[#fbfdff]`}>
      {/* Header */}
      <div
        className="bg-[var(--mainGreen)] px-7 py-8 sm:text-right text-center text-white flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)} // 👈 toggle on click
      >
        <h2 className="text-xl font-bold">معلومات الاستشهاد</h2>
        {isOpen ? <ChevronUp /> : <ChevronDown />} {/* 👇 arrow icon */}
      </div>

      {/* Collapsible Content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? " opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Body */}
        <div className="px-7 py-8 text-[#8B0000]">
          <div className="card-row">
            <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
              <div className="flex flex-row gap-2 text-gray-700">
                <Calendar />
                <p>تاريخ الاستشهاد</p>
              </div>
              <p className="text-gray-700">:</p>
            </div>
            <div>
              <p>{item.dateOfMartyrdom}</p>
            </div>
          </div>
          <div className="card-row mt-5">
            <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
              <div className="flex flex-row gap-2 text-gray-700">
                <Calendar />
                <p>تاريخ الدفن</p>
              </div>
              <p className="text-gray-700">:</p>
            </div>
            <div>
              <p>{item.burialDate}</p>
            </div>
          </div>
          {/* Age */}
          <div className="card-row mt-5">
            <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
              <div className="flex flex-row gap-2 text-gray-700">
                <Hourglass />
                <p>العمر</p>
              </div>
              <p className="text-gray-700">:</p>
            </div>
            <div>
              <p>{item.age}</p>
            </div>
          </div>
          <div className="card-row mt-5">
            <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
              <div className="flex flex-row gap-2 text-gray-700">
                <SquareActivity />
                <p>الحالة العمرية</p>
              </div>
              <p className="text-gray-700">:</p>
            </div>
            <div>
              <p>{item.ageStatus}</p>
            </div>
          </div>
          <div className="card-row mt-5">
            <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
              <div className="flex flex-row gap-2 text-gray-700">
                <Swords />
                <p>منشق</p>
              </div>
              <p className="text-gray-700">:</p>
            </div>
            <div>
              <p>{item.dissident == "true" ? "نعم" : "لا"}</p>
            </div>
          </div>
          <div className="card-row mt-5">
            <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
              <div className="flex flex-row gap-2 text-gray-700">
                <HandFist />
                <p>ما قبل الثورة</p>
              </div>
              <p className="text-gray-700">:</p>
            </div>
            <div>
              <p>{item.preRevolution == "true" ? "نعم" : "لا"}</p>
            </div>
          </div>
          {/* <div className="card-row mt-5">
            <div className="flex flex-row justify-between w-2/4">
              <div className="flex flex-row gap-2 text-gray-700">
                <Earth />
                <p>دولة الاستشهاد</p>
              </div>
              <p className="text-gray-700">:</p>
            </div>
            <div>
              <p>{item.cu}</p>
            </div>
          </div> */}
          <div className="card-row mt-5">
            <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
              <div className="flex flex-row gap-2 text-gray-700">
                <Building /> <p>محافظة الاستشهاد</p>
              </div>
              <p className="text-gray-700">:</p>
            </div>
            <div>
              <p>{item.martyrdomGovernorate}</p>
            </div>
          </div>
          <div className="card-row mt-5">
            <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
              <div className="flex flex-row gap-2 text-gray-700">
                <Building2 />
                <p>مدينة الاستشهاد</p>
              </div>
              <p className="text-gray-700">:</p>
            </div>
            <div>
              <p>{item.cityOfMartyrdom}</p>
            </div>
          </div>
          <div className="card-row mt-5">
            <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
              <div className="flex flex-row gap-2 text-gray-700">
                <MapPin />
                <p>موقع الاستشهاد</p>
              </div>
              <p className="text-gray-700">:</p>
            </div>
            <div>
              <p>{item.martyrdomSite}</p>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="px-5 pb-8 flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2 text-gray-700">
              <NotepadText />
              <p>طريقة الاستشهاد</p>
            </div>
          </div>
          <div className="pr-8">
            <p>{item.stateOfMartyrdom}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitationInfoRequest;
