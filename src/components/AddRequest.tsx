"use client";
import { UserRound } from "lucide-react";
import { GrGroup } from "react-icons/gr";
import { IoManOutline } from "react-icons/io5";
import { card } from "@/styles/Card.styles";
import { useEffect, useState } from "react";

export interface RequestInfoValues {
  requesterName: string;
  requesterEmail: string;
  relationship: string;
}

export interface RequestInfoProps {
  onChange?: (data: RequestInfoValues) => void;
}

const AddRequest = ({ onChange }: RequestInfoProps) => {
  // 🧩 State setup
  const [requesterName, setRequesterName] = useState<string>("");
  const [requesterEmail, setRequesterEmail] = useState<string>("");
  const [relationship, setRelationship] = useState<string>("");

  useEffect(() => {
    onChange?.({
      requesterName,
      requesterEmail,
      relationship,
    });
  }, [requesterName, requesterEmail, relationship, onChange]);

  return (
    <div className={`${card} card-shadow bg-[#fbfdff]`}>
      {/* Header */}
      <div className="bg-[var(--mainGreen)] px-7 py-8 sm:text-right text-center text-white">
        <h2 className="text-xl font-bold">المعلومات مقدم الطلب</h2>
      </div>

      {/* Body */}
      <div className="px-7 py-8 text-[var(--textMain)]">
        {/* Full Name */}
        <div className="card-row">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2">
              <UserRound />
              <p>الاسم الثلاثي</p>
              <p className="text-red-500">*</p>
            </div>
            <p>:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={requesterName}
              onChange={(e) => setRequesterName(e.target.value)}
              type="text"
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>

        {/* Communication */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2">
              <IoManOutline className="w-6 h-6" />
              <p>طريقة تواصل</p>
              <p className="text-red-500">*</p>
            </div>
            <p>:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={requesterEmail}
              onChange={(e) => setRequesterEmail(e.target.value)}
              type="text"
              className="bg-gray-100 w-full p-2 rounded-md"
              placeholder="ادخل طريقة تواصل (ايميل / رقم هاتف)"
            />
          </div>
        </div>

        <div className="card-row mt-5 ">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 ">
              <GrGroup className="w-6 h-6" />
              <p>صلة المعرفة</p>
              <p className="text-red-500">*</p>
            </div>
            <p>:</p>
          </div>
          <div className="flex-1 flex items-center">
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="bg-gray-100 w-full p-2 rounded-md"
            >
              <option value="">صلة المعرفة</option>
              <option value="قريب">قريب</option>
              <option value="صديق">صديق</option>
              <option value="مؤسسة">مؤسسة</option>
              <option value="باحث">باحث</option>
              <option value="آخر">آخر</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRequest;
