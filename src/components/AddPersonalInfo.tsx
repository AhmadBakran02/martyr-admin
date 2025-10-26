"use client";
import {
  BriefcaseBusiness,
  Building2,
  Calendar,
  Earth,
  House,
  NotepadText,
  UserRound,
  Users,
  VenusAndMars,
} from "lucide-react";
import { FaChild } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { IoManOutline, IoWomanOutline } from "react-icons/io5";
import { MdFamilyRestroom } from "react-icons/md";
import { card } from "@/styles/Card.styles";
import { useEffect, useState } from "react";
import { GetMartyr } from "@/lib/martyrApi";

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
    country: string;
    city: string;
    governorate: string;
    neighborhood: string;
    ethnicAffiliation: string;
    overview: string;
  }) => void;
  martyr?: GetMartyr;
}

const AddPersonalInfo = ({ onChange, martyr }: PersonalInfoProps) => {
  // 🧩 State setup
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("male");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [numberOfChildren, setNumberOfChildren] = useState("");
  const [profession, setProfession] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [ethnicAffiliation, setEthnicAffiliation] = useState("");
  const [overview, setOverview] = useState("");

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
      setCountry(martyr.country ?? "");
      setGovernorate(martyr.governorate ?? "");
      setCity(martyr.city ?? "");
      setNeighborhood(martyr.neighborhood ?? "");
      setEthnicAffiliation(martyr.ethnicAffiliation ?? "");
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
      country,
      city,
      governorate,
      neighborhood,
      ethnicAffiliation,
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
    country,
    city,
    governorate,
    neighborhood,
    ethnicAffiliation,
    overview,
  ]);

  return (
    <div className={`${card} card-shadow bg-[#fbfdff]`}>
      {/* Header */}
      <div className="bg-[var(--mainBlue)] px-7 py-8 sm:text-right text-center text-white">
        <h2 className="text-xl font-bold">المعلومات الشخصية</h2>
      </div>

      {/* Body */}
      <div className="px-7 py-8 text-[#8B0000]">
        {/* Name */}
        <div className="card-row">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <UserRound />
              <p>الاسم</p>
              <p className="text-red-500">*</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>

        {/* Father */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <IoManOutline className="w-6 h-6" />
              <p>اسم الأب</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              type="text"
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>

        {/* Mother */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <IoWomanOutline className="w-6 h-6" />
              <p>اسم الأم</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
              type="text"
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>

        {/* Last Name */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <Users />
              <p>الكنية</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>

        {/* Birthday */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <Calendar />
              <p>تاريخ الميلاد</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              type="date"
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>

        {/* Gender */}
        <div className="card-row mt-5 flex items-center">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <VenusAndMars />
              <p>الجنس</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>

          {/* Radio Buttons */}
          <div className="flex flex-row gap-6 text-gray-700 ">
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

        {/* Marital Status */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <MdFamilyRestroom className="w-6 h-6" />
              <p>الحالة الاجتماعية</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              type="text"
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>

        {/* Number of Children */}
        <div className="card-row mt-5 flex items-center">
          <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <FaChild className="w-6 h-6" />
              <p>عدد الأطفال</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={numberOfChildren}
              onChange={(e) => setNumberOfChildren(e.target.value)}
              type="number"
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>

        {/* Profession */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <BriefcaseBusiness />
              <p>المهنة</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              type="text"
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>

        {/* Country */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <Earth />
              <p>الدولة</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>

        {/* Governorate */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <Earth />
              <p>المحافظة</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={governorate}
              onChange={(e) => setGovernorate(e.target.value)}
              type="text"
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>

        {/* City */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <Building2 />
              <p>المدينة</p>
            </div>
            <p className="text-gray-700">:</p>
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

        {/* Neighborhood */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <House />
              <p>الحي</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              type="text"
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>

        {/* Ethnic Affiliation */}
        <div className="card-row mt-5">
          <div className="flex flex-row justify-between items-center w-2/4 sm:w-1/3">
            <div className="flex flex-row gap-2 text-gray-700">
              <GrGroup className="w-6 h-6" />
              <p>الإنتماء العرقي</p>
            </div>
            <p className="text-gray-700">:</p>
          </div>
          <div className="flex-1 flex items-center ">
            <input
              value={ethnicAffiliation}
              onChange={(e) => setEthnicAffiliation(e.target.value)}
              type="text"
              className="bg-gray-100 w-full p-2 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Footer - Overview */}
      <div className="px-5 pb-8 flex flex-col">
        <div className="flex flex-row justify-between mb-2">
          <div className="flex flex-row gap-2 text-gray-700">
            <NotepadText />
            <p>لمحة عن الشهيد</p>
          </div>
        </div>
        <div className="pr-8">
          <textarea
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            placeholder="اكتب لمحة عن الشهيد..."
            rows={5}
            className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>
      </div>
    </div>
  );
};

export default AddPersonalInfo;
