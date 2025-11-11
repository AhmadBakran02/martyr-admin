"use client";
import React, { useState } from "react";
import { card } from "@/styles/Card.styles";
import { ChevronDown, ChevronUp } from "lucide-react";
import Comments from "./Comments";
import FeedbackForm from "./Feedback";

export default function CommentsSection() {
  const [isOpen, setIsOpen] = useState(true); // 👈 controls collapse

  return (
    <div className={`${card} card-shadow bg-[#fbfdff]`}>
      {/* Header */}
      <div
        className="bg-[var(--mainGreen)] px-7 py-8 sm:text-right text-center text-white flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)} // 👈 toggle on click
      >
        <h2 className="text-xl font-bold">التعليقات</h2>
        {isOpen ? <ChevronUp /> : <ChevronDown />} {/* 👇 arrow icon */}
      </div>

      {/* Collapsible Content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? " opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-7 py-8">
          <p>
            إن كنت قريبا أو صديقاً أو على معرفة بالشهيد، وكان لك معه موقف أو
            ذكرى، أو جاشت مشاعرك تجاهه بأحاسيس و عواطف ، ورغبت في أن تشاركك
            مشاعر،ماعليك سوى أن تضغط لى أيقونة المشاركة بعد أن تخط بيمينك كل ما
            لديك
          </p>
        </div>
        <div className="p-5 flex-1 ">
          <Comments />
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
}
