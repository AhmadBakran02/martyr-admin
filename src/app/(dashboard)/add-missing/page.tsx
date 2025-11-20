"use client";
import { useCallback, useState } from "react";
import { addMartyr, AddMartyrType } from "@/lib/martyrApi";
import FileUploader from "@/components/FileUploader";
import { MediaInput } from "@/lib/massacreApi";
import AddMissingInfo from "@/components/AddMissingInfo";
import { PersonalInfoType } from "@/types/PersonalInfoIDType";
import { MissingInfoType } from "@/types/MissingInfoType";
import AddPersonalInfoMissing from "@/components/AddPersonalInfoMissing";
import AddCardMissing, {
  AddCardMissingValues,
} from "@/components/AddCardMissing/AddCardMissing";

export default function AddMartyr() {
  const [fullName, setFullName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [dateMartyrdom, setDateMartyrdom] = useState<string>("");
  const [cardMissingValues, setCardMissingValues] =
    useState<AddCardMissingValues>();
  const [missingInfo, setMissingInfo] = useState<MissingInfoType>();
  const [uploadedMedia, setUploadedMedia] = useState<MediaInput[]>([]);
  const [personalInfoMissing, setPersonalInfoMissing] =
    useState<PersonalInfoType>({
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
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [photoId, setPhotoId] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleUploadComplete = useCallback((media: MediaInput[]) => {
    setUploadedMedia(media);
  }, []);

  const handleCardChange = useCallback((values: AddCardMissingValues) => {
    setCardMissingValues(values);
  }, []);

  const handleCitationChange = useCallback((values: MissingInfoType) => {
    setMissingInfo(values);
    setDateMartyrdom(values.dateMartyrdom);
  }, []);

  const handlePersonlChange = useCallback((data: PersonalInfoType) => {
    setPersonalInfoMissing(data);
    setFullName(`${data.name} ${data.fatherName} ${data.lastName}`);
  }, []);

  // console.log(cardMissingValues);
  // console.log(personalInfoMissing);

  const handleSave = async () => {
    if (uploading) {
      alert("جارِ رفع الصورة… الرجاء الانتظار");
      return;
    }

    await SaveMissing();
  };

  const SaveMissing = async () => {
    setLoading(true);

    // console.log(fileID);

    const martyr: AddMartyrType = {
      photoId: photoId,
      fullName: fullName,
      dateOfMartyrdom: missingInfo?.dateMartyrdom,
      nationalIdNumber: cardMissingValues?.nationalIdNumber,
      anonymous: cardMissingValues?.anonymous || false,
      name: personalInfoMissing?.name,
      fatherName: personalInfoMissing?.fatherName,
      motherName: personalInfoMissing?.motherName,
      lastName: personalInfoMissing?.lastName,
      dateOfBirth: personalInfoMissing?.dateOfBirth,
      gender: personalInfoMissing?.gender,
      maritalStatus: personalInfoMissing?.maritalStatus,
      numberOfChildren: Number(personalInfoMissing?.numberOfChildren || "0"),
      profession: personalInfoMissing?.profession,
      study: personalInfoMissing?.study,
      country: personalInfoMissing?.country,
      governorate: personalInfoMissing?.governorate,
      city: personalInfoMissing?.city,
      neighborhood: personalInfoMissing?.neighborhood,
      ethnicAffiliation: personalInfoMissing?.ethnicAffiliation,
      overview: personalInfoMissing?.overview ?? "",
      organizationalaffiliation: personalInfoMissing?.organizationalaffiliation,
      religiousAffiliation: personalInfoMissing?.religiousAffiliation,
      sectarianAffiliation: personalInfoMissing?.sectarianAffiliation,

      age: missingInfo?.age,
      ageStatus: missingInfo?.ageStatus,
      dissident: missingInfo?.dissident,
      preRevolution: missingInfo?.preRevolution,
      martyrdomGovernorate: missingInfo?.martyrdomGovernorate,
      cityOfMartyrdom: missingInfo?.cityOfMartyrdom,
      martyrdomSite: missingInfo?.martyrdomLocation,
      citationMethod: missingInfo?.citationMethod,
      stateOfMartyrdom: missingInfo?.citationMethod,

      isMissing: true,

      media: uploadedMedia ?? [],
    };
    // console.log(martyr);

    const result = await addMartyr(martyr);

    if (result.success) {
      console.log("✅ Added successfully:", result.data);
      setMessage(" ✅ تمت الإضافة بنجاح");
      setError(false);
      setShowToast(true);

      setTimeout(() => setShowToast(false), 4000);
      setTimeout(() => window.location.reload(), 4000);
    } else {
      setMessage("حدث خطأ");
      setError(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
      console.error("Error:", result.message);
    }

    setLoading(false);
  };

  const handleUploadingChange = (state: boolean) => {
    setUploading(state);
  };

  const handleImageUploaded = (id: string) => {
    setPhotoId(id);
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
        <AddCardMissing
          onChange={handleCardChange}
          onImageUploaded={handleImageUploaded}
          onUploadingChange={handleUploadingChange}
          fullName={fullName == undefined ? "" : fullName}
          dateMartyrdom={dateMartyrdom}
        />

        <div className="my-5"></div>
        <AddPersonalInfoMissing onChange={handlePersonlChange} />

        <div className="my-5"></div>
        <AddMissingInfo onChange={handleCitationChange} />

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
