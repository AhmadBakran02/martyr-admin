"use client";
import { useCallback, useState } from "react";
import AddCard, { AddCardValues } from "@/components/AddCard/AddCard";
import AddCitationInfo from "@/components/AddCitationInfo";
import AddPersonalInfo from "@/components/AddPersonalInfo";
import { addMartyr, AddMartyrType } from "@/lib/martyrApi";
import FileUploader from "@/components/FileUploader";
import { MediaInput } from "@/lib/massacreApi";
import { CitationInfoType } from "@/types/CitationInfoIDType";
import { PersonalInfoType } from "@/types/PersonalInfoIDType";

export default function AddMartyr() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [fullName, setFullName] = useState("");
  const [dateMartyrdom, setDateMartyrdom] = useState("");

  const [cardValues, setCardValues] = useState<AddCardValues>();
  const [citationInfo, setCitationInfo] = useState<CitationInfoType>();
  const [uploadedMedia, setUploadedMedia] = useState<MediaInput[]>([]);
  const [photoId, setPhotoId] = useState<string | null>(null);

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
    study: "",
    country: "",
    city: "",
    governorate: "",
    neighborhood: "",
    ethnicAffiliation: "",
    overview: "",
    organizationalaffiliation: "",
    sectarianAffiliation: "",
    religiousAffiliation: "",
  });

  // --------------------------------------------------
  // STABLE CALLBACKS (Fix focus problems!)
  // --------------------------------------------------

  const handleUploadComplete = useCallback((media: MediaInput[]) => {
    setUploadedMedia(media);
  }, []);

  const handleCardChange = useCallback((values: AddCardValues) => {
    setCardValues(values);
  }, []);

  const handleCitationChange = useCallback((values: CitationInfoType) => {
    setCitationInfo(values);
    setDateMartyrdom(values.dateMartyrdom);
  }, []);

  const handlePersonlChange = useCallback((data: PersonalInfoType) => {
    setPersonalInfo(data);
    setFullName(`${data.name} ${data.fatherName} ${data.lastName}`);
  }, []);

  const handleUploadingChange = useCallback((state: boolean) => {
    setUploading(state);
  }, []);

  const handleImageUploaded = useCallback((id: string) => {
    setPhotoId(id);
  }, []);

  // --------------------------------------------------
  // SAVE LOGIC
  // --------------------------------------------------

  const SaveMartyr = useCallback(async () => {
    setLoading(true);

    const martyr: AddMartyrType = {
      photoId,
      fullName,
      dateOfMartyrdom: citationInfo?.dateMartyrdom,
      nationalIdNumber: cardValues?.nationalIdNumber,
      anonymous: cardValues?.anonymous || false,

      name: personalInfo.name,
      fatherName: personalInfo.fatherName,
      motherName: personalInfo.motherName,
      lastName: personalInfo.lastName,
      dateOfBirth: personalInfo.dateOfBirth,
      gender: personalInfo.gender,
      maritalStatus: personalInfo.maritalStatus,
      numberOfChildren: Number(personalInfo.numberOfChildren || "0"),
      profession: personalInfo.profession,
      study: personalInfo.study,
      country: personalInfo.country,
      governorate: personalInfo.governorate,
      city: personalInfo.city,
      neighborhood: personalInfo.neighborhood,
      ethnicAffiliation: personalInfo.ethnicAffiliation,
      overview: personalInfo.overview ?? "",
      organizationalaffiliation: personalInfo.organizationalaffiliation,
      religiousAffiliation: personalInfo.religiousAffiliation,
      sectarianAffiliation: personalInfo.sectarianAffiliation,
      placeOfBirth: personalInfo.placeOfBirth,
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
      sourceOfInformation: citationInfo?.sourceOfInformation,
      media: uploadedMedia ?? [],
    };

    const result = await addMartyr(martyr);

    if (result.success) {
      setMessage(" تمت الإضافة بنجاح");
      setError(false);
      setShowToast(true);

      setTimeout(() => setShowToast(false), 4000);
      setTimeout(() => window.location.reload(), 4000);
    } else {
      setMessage("حدث خطأ");
      setError(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      console.error("Error:", result.message);
    }

    setLoading(false);
  }, [
    photoId,
    fullName,
    citationInfo,
    cardValues,
    personalInfo,
    uploadedMedia,
  ]);

  const handleSave = useCallback(async () => {
    if (uploading) {
      alert("جارِ رفع الصورة… الرجاء الانتظار");
      return;
    }
    await SaveMartyr();
  }, [uploading, SaveMartyr]);

  return (
    <div className="relative p-10 flex justify-center items-center">
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
          onImageUploaded={handleImageUploaded}
          onUploadingChange={handleUploadingChange}
          fullName={fullName}
          dateMartyrdom={dateMartyrdom}
        />

        <div className="my-5"></div>
        <AddPersonalInfo onChange={handlePersonlChange} />

        <div className="my-5"></div>
        <AddCitationInfo onChange={handleCitationChange} />

        <div className="my-5"></div>
        <FileUploader onUploadComplete={handleUploadComplete} />

        <div className="flex items-center mt-8 gap-5">
          <button
            disabled={fullName.length < 3 || loading}
            onClick={handleSave}
            className={` w-full sm:w-auto px-8 py-2.5 rounded-lg font-semibold text-white transition-all duration-300
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

          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto px-8 py-2.5 rounded-lg font-semibold bg-gray-300 text-gray-800 hover:bg-gray-400 active:scale-[0.97] transition-all"
          >
            تصفية الحقول
          </button>
        </div>
      </div>

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
