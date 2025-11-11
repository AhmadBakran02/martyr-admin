"use client";
import { UserRound } from "lucide-react";
import { GrGroup } from "react-icons/gr";
import { IoManOutline } from "react-icons/io5";
import { card } from "@/styles/Card.styles";
import { RequestMastyrData } from "@/types/RequestApi";

// export interface RequestInfoValues {
//   requesterName: string;
//   requesterEmail: string;
//   relationship: string;
// }

interface MastyrCardProps {
  item: RequestMastyrData | undefined;
}
const AdditionInfo = ({ item }: MastyrCardProps) => {
  // 🧩 State setup
  // const [requesterName, setRequesterName] = useState<string>("");
  // const [requesterEmail, setRequesterEmail] = useState<string>("");
  // const [relationship, setRelationship] = useState<string>("");

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
            </div>
            <p>:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <div className="w-2/3 text-[#8B0000]">
              {item?.requesterName || ""}
            </div>
          </div>
        </div>

        {/* Communication */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2">
              <IoManOutline className="w-6 h-6" />
              <p>طريقة تواصل</p>
            </div>
            <p>:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <div className="w-2/3 text-[#8B0000]">
              {item?.requesterEmail || ""}
            </div>
          </div>
        </div>

        <div className="card-row mt-5 ">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 ">
              <GrGroup className="w-6 h-6" />
              <p>صلة المعرفة</p>
            </div>
            <p>:</p>
          </div>
          <div className="flex-1 flex items-center">
            <div className="w-2/3 text-[#8B0000]">
              {item?.relationship || ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionInfo;
