"use client";
import { useCallback, useState } from "react";
import AddCard, { AddCardValues } from "@/components/AddCard/AddCard";
import AddCitationInfo from "@/components/AddCitationInfo";
import AddPersonalInfo from "@/components/AddPersonalInfo";
import { addMartyr, AddMartyrType } from "@/lib/martyrApi";
import FileUploader from "@/components/FileUploader";
import { MediaInput } from "@/lib/massacreApi";
import { uploadImage } from "@/lib/uploadImage";
import { CitationInfoType } from "@/types/CitationInfoIDType";
import { PersonalInfoType } from "@/types/PersonalInfoIDType";

export default function AddMartyr() {
  const [fullName, setFullName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [dateMartyrdom, setDateMartyrdom] = useState<string>("");
  const [cardValues, setCardValues] = useState<AddCardValues>();
  const [citationInfo, setCitationInfo] = useState<CitationInfoType>();
  const [uploadedMedia, setUploadedMedia] = useState<MediaInput[]>([]);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>({
    name: "",
    fatherName: "",
    motherName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    numberOfChildren: "",
    profession: "",
    country: "",
    city: "",
    governorate: "",
    neighborhood: "",
    ethnicAffiliation: "",
    overview: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const handleUploadComplete = (media: MediaInput[]) => {
    setUploadedMedia(media);
  };
  const handleCardChange = (values: AddCardValues) => {
    setCardValues(values);
  };

  // console.log(cardValues);
  console.log(citationInfo);
  console.log(personalInfo);

  const handleCitationChange = (values: CitationInfoType) => {
    setCitationInfo(values);
    setDateMartyrdom(values.dateMartyrdom);
  };

  const handlePersonlChange = useCallback((data: PersonalInfoType) => {
    setPersonalInfo(data);
    setFullName(`${data.name} ${data.fatherName} ${data.lastName}`);
  }, []);

  const handleSave = async () => {
    setLoading(true);
    let fileID = "";

    if (cardValues?.imageFile) {
      fileID = await uploadImage(cardValues.imageFile);
    }

    console.log(fileID);

    const martyr: AddMartyrType = {
      photoId: fileID || null,
      fullName: fullName,
      dateOfMartyrdom: citationInfo?.dateMartyrdom,
      nationalIdNumber: cardValues?.nationalIdNumber,
      anonymous: cardValues?.anonymous || false,
      name: personalInfo?.name,
      fatherName: personalInfo?.fatherName,
      motherName: personalInfo?.motherName,
      lastName: personalInfo?.lastName,
      dateOfBirth: personalInfo?.dateOfBirth,
      gender: personalInfo?.gender,
      maritalStatus: personalInfo?.maritalStatus,
      numberOfChildren: Number(personalInfo?.numberOfChildren || "0"),
      profession: personalInfo?.profession,
      country: personalInfo?.country,
      governorate: personalInfo?.governorate,
      city: personalInfo?.city,
      neighborhood: personalInfo?.neighborhood,
      ethnicAffiliation: personalInfo?.ethnicAffiliation,
      overview: personalInfo?.overview ?? "",

      burialDate: citationInfo?.burialDate,
      age: citationInfo?.age,
      ageStatus: citationInfo?.ageStatus,
      dissident: citationInfo?.dissident,
      preRevolution: citationInfo?.preRevolution,
      massacreId: citationInfo?.massacreId || null,
      martyrdomGovernorate: citationInfo?.martyrdomGovernorate,
      cityOfMartyrdom: citationInfo?.cityOfMartyrdom,
      martyrdomSite: citationInfo?.martyrdomLocation,
      citationMethod: citationInfo?.citationMethod,
      stateOfMartyrdom: citationInfo?.citationMethod,

      media: uploadedMedia ?? [],
    };

    console.log(martyr);

    const result = await addMartyr(martyr);

    if (result.success) {
      console.log("✅ Added successfully:", result.data);
      setMessage(" ✅ تمت الإضافة بنجاح");
      setError(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
    } else {
      setMessage("حدث خطأ");
      setError(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
      console.error("Error:", result.message);
    }

    setLoading(false);
  };

  return (
    <div className="relative p-10 flex justify-center items-center">
      {/* ✅ Floating success toast */}

      {showToast && (
        <div
          className={`fixed top-5 right-5 ${
            error ? "bg-red-600" : "bg-green-600"
          } text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-500 animate-fadeInOut z-50`}
        >
          {message}
        </div>
      )}

      <div className="w-[95%] sm:w-[80%]">
        <AddCard
          onChange={handleCardChange}
          fullName={fullName == undefined ? "" : fullName}
          dateMartyrdom={dateMartyrdom}
        />

        <div className="my-5"></div>
        <AddPersonalInfo onChange={handlePersonlChange} />

        <div className="my-5"></div>
        <AddCitationInfo onChange={handleCitationChange} />

        <div className="my-5"></div>
        <FileUploader onUploadComplete={handleUploadComplete} />

        <button
          disabled={fullName.length < 3 || loading}
          onClick={handleSave}
          className={`mt-8 w-full sm:w-auto px-8 py-2.5 rounded-lg font-semibold text-white transition-all duration-300
            ${loading ? "cursor-wait" : ""}
            ${
              fullName.length < 3 || loading
                ? "bg-blue-300 cursor-not-allowed opacity-70"
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.97] shadow-md hover:shadow-lg"
            }
          `}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>جاري الحفظ...</span>
            </div>
          ) : (
            <p>حفظ</p>
          )}
        </button>
      </div>

      {/* Animation for toast */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
