"use client";
import {
  Badge,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Calendar,
  Earth,
  House,
  NotepadText,
  ChevronDown,
  ChevronUp,
  UserRound,
  Users,
  VenusAndMars,
} from "lucide-react";
import { FaChild } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { IoManOutline, IoWomanOutline } from "react-icons/io5";
import { MdFamilyRestroom } from "react-icons/md";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { GetMartyr } from "@/lib/martyrApi";

// Align styling with PersonalInfo.tsx
const DARK_TEAL = "text-[#0B3F3D]";
const LIGHT_BG = "bg-syrian-light";
const BORDER_COLOR = "border-[#0B3F3D]/20";
const TEXT_LABEL = "text-gray-600";

interface PersonalInfoProps {
  onChange: (data: {
    name: string;
    fatherName: string;
    motherName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    maritalStatus: string;
    numberOfChildren: string;
    profession: string;
    study: string;
    country: string;
    city: string;
    governorate: string;
    neighborhood: string;
    ethnicAffiliation: string;
    organizationalaffiliation: string;
    religiousAffiliation: string;
    sectarianAffiliation: string;
    overview: string;
  }) => void;
  martyr?: GetMartyr;
}

const AddPersonalInfoMissing = ({ onChange, martyr }: PersonalInfoProps) => {
  // 🧩 State setup
  const [name, setName] = useState<string>("");
  const [fatherName, setFatherName] = useState<string>("");
  const [motherName, setMotherName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [maritalStatus, setMaritalStatus] = useState<string>("");
  const [numberOfChildren, setNumberOfChildren] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const [study, setStudy] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [governorate, setGovernorate] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [ethnicAffiliation, setEthnicAffiliation] = useState<string>("");
  const [overview, setOverview] = useState<string>("");
  const [organizationalaffiliation, setOrganizationalaffiliation] =
    useState<string>("");
  const [religiousAffiliation, setReligiousAffiliation] = useState<string>("");
  const [sectarianAffiliation, setSectarianAffiliation] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const lastFocused = useRef<HTMLInputElement | HTMLTextAreaElement | null>(
    null
  );

  const handleFocus = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    lastFocused.current = e.target;
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (lastFocused.current === e.target) {
      lastFocused.current = null;
    }
  };

  // ✅ Initialize fields when martyr data is available (edit mode)
  useEffect(() => {
    if (martyr) {
      setName(martyr.name ?? "");
      setFatherName(martyr.fatherName ?? "");
      setMotherName(martyr.motherName ?? "");
      setLastName(martyr.lastName ?? "");
      setDateOfBirth(martyr.dateOfBirth ?? "");
      setGender(martyr.gender ?? "male");
      setMaritalStatus(martyr.maritalStatus ?? "");
      setNumberOfChildren(
        martyr.numberOfChildren !== null &&
          martyr.numberOfChildren !== undefined
          ? String(martyr.numberOfChildren)
          : ""
      );
      setProfession(martyr.profession ?? "");
      setStudy(martyr.study ?? "");
      setCountry(martyr.country ?? "");
      setGovernorate(martyr.governorate ?? "");
      setCity(martyr.city ?? "");
      setNeighborhood(martyr.neighborhood ?? "");
      setEthnicAffiliation(martyr.ethnicAffiliation ?? "");
      setOrganizationalaffiliation(martyr.organizationalaffiliation ?? "");
      setReligiousAffiliation(martyr.religiousAffiliation ?? "");
      setSectarianAffiliation(martyr.sectarianAffiliation ?? "");
      setOverview(martyr.overview ?? "");
    }
  }, [martyr]);

  useEffect(() => {
    onChange({
      name,
      fatherName,
      motherName,
      lastName,
      dateOfBirth,
      gender,
      maritalStatus,
      numberOfChildren,
      profession,
      study,
      country,
      city,
      governorate,
      neighborhood,
      ethnicAffiliation,
      organizationalaffiliation,
      religiousAffiliation,
      sectarianAffiliation,
      overview,
    });
  }, [
    onChange,
    name,
    fatherName,
    motherName,
    lastName,
    dateOfBirth,
    gender,
    maritalStatus,
    numberOfChildren,
    profession,
    study,
    country,
    city,
    governorate,
    neighborhood,
    ethnicAffiliation,
    organizationalaffiliation,
    religiousAffiliation,
    sectarianAffiliation,
    overview,
  ]);

  useEffect(() => {
    if (lastFocused.current) {
      lastFocused.current.focus({ preventScroll: true });
    }
  });

  return (
    <div
      className={`w-full max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden bg-white border border-[#0B3F3D]/10`}
    >
      {/* Header */}
      <div
        className="bg-[#0B3F3D] px-7 py-5 text-right text-white flex justify-between items-center cursor-pointer transition duration-300 hover:bg-[#0B3F3D]/90"
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

      {/* Body */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-full opacity-100 p-7" : "max-h-0 opacity-0 p-0"
        }`}
      >
        <div className={`text-right space-y-2 ${LIGHT_BG}`}>
          <div
            className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
              <div
                className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
              >
                <UserRound className="w-5 h-5 text-[#0B3F3D]" />
                <p>الاسم</p>
              </div>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
                placeholder="أدخل الاسم"
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
              <div
                className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
              >
                <IoManOutline className="w-5 h-5 text-[#0B3F3D]" />
                <p>اسم الأب</p>
              </div>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <input
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
              <div
                className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
              >
                <IoWomanOutline className="w-5 h-5 text-[#0B3F3D]" />
                <p>اسم الأم</p>
              </div>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <input
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
              <div
                className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
              >
                <Users className="w-5 h-5 text-[#0B3F3D]" />
                <p>الكنية</p>
              </div>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
              <div
                className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
              >
                <Calendar className="w-5 h-5 text-[#0B3F3D]" />
                <p>تاريخ الميلاد</p>
              </div>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <input
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                type="date"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
              <div
                className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
              >
                <VenusAndMars className="w-5 h-5 text-[#0B3F3D]" />
                <p>الجنس</p>
              </div>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <div className="flex gap-6 text-[#0B3F3D]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                  />
                  ذكر
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                  />
                  أنثى
                </label>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
              <div
                className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
              >
                <MdFamilyRestroom className="w-5 h-5 text-[#0B3F3D]" />
                <p>الحالة الاجتماعية</p>
              </div>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <input
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
              <div
                className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
              >
                <FaChild className="w-5 h-5 text-[#0B3F3D]" />
                <p>عدد الأطفال</p>
              </div>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <input
                value={numberOfChildren}
                onChange={(e) => setNumberOfChildren(e.target.value)}
                type="number"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
              <div
                className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
              >
                <BookOpen className="w-5 h-5 text-[#0B3F3D]" />
                <p>الدراسة</p>
              </div>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <input
                value={study}
                onChange={(e) => setStudy(e.target.value)}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
              <div
                className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
              >
                <BriefcaseBusiness className="w-5 h-5 text-[#0B3F3D]" />
                <p>المهنة</p>
              </div>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <input
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
              <div
                className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
              >
                <Earth className="w-5 h-5 text-[#0B3F3D]" />
                <p>الدولة</p>
              </div>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
              <div
                className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
              >
                <Earth className="w-5 h-5 text-[#0B3F3D]" />
                <p>المحافظة</p>
              </div>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <input
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value)}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
              <div
                className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
              >
                <Building2 className="w-5 h-5 text-[#0B3F3D]" />
                <p>المدينة</p>
              </div>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
              <div
                className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
              >
                <House className="w-5 h-5 text-[#0B3F3D]" />
                <p>الحي</p>
              </div>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <input
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
              <div
                className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
              >
                <GrGroup className="w-5 h-5 text-[#0B3F3D]" />
                <p>الإنتماء العرقي</p>
              </div>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <input
                value={ethnicAffiliation}
                onChange={(e) => setEthnicAffiliation(e.target.value)}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
              <div
                className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
              >
                <GrGroup className="w-5 h-5 text-[#0B3F3D]" />
                <p>الإنتماء التنظيمي</p>
              </div>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <input
                value={organizationalaffiliation}
                onChange={(e) => setOrganizationalaffiliation(e.target.value)}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
              <div
                className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
              >
                <Badge className="w-5 h-5 text-[#0B3F3D]" />
                <p>الإنتماء الديني</p>
              </div>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <input
                value={religiousAffiliation}
                onChange={(e) => setReligiousAffiliation(e.target.value)}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-2 py-3 border-b ${BORDER_COLOR} last:border-b-0`}
          >
            <div className="flex flex-row justify-between w-full sm:w-1/3 min-w-[200px]">
              <div
                className={`flex flex-row gap-3 items-center font-medium ${TEXT_LABEL}`}
              >
                <Badge className="w-5 h-5 text-[#0B3F3D]" />
                <p>الإنتماء الطائفي</p>
              </div>
              <p className={TEXT_LABEL}>:</p>
            </div>
            <div className="w-full sm:w-2/3">
              <input
                value={sectarianAffiliation}
                onChange={(e) => setSectarianAffiliation(e.target.value)}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30"
              />
            </div>
          </div>

          {/* Overview */}
          <div className="pt-5 mt-5 border-t border-[#0B3F3D]/10">
            <div className="flex flex-row gap-3 items-center font-bold mb-3">
              <NotepadText className="w-5 h-5 text-[#0B3F3D]" />
              <p className={DARK_TEAL}>لمحة عن المفقود</p>
            </div>
            <div className="pr-1 sm:pr-8 text-gray-700 leading-relaxed">
              <textarea
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                placeholder="اكتب لمحة عن المفقود..."
                rows={5}
                className="w-full bg-white border border-[#0B3F3D]/15 rounded-lg px-3 py-2 font-semibold text-[#0B3F3D] focus:outline-none focus:ring-2 focus:ring-[#0B3F3D]/30 resize-y"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPersonalInfoMissing;
