"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiUrl } from "@/config/apiUrl";
import Loading2 from "@/components/Loading2/Loading2";
import { type MediaInput } from "@/lib/massacreApi";
import Image from "next/image";
import FileUploader from "@/components/FileUploader";
import { getMartyrById } from "@/lib/getMastyrById";
import { AddMartyrType, EditMartyrApi, GetMartyr } from "@/lib/martyrApi";
import AddCard, { AddCardValues } from "@/components/AddCard/AddCard";
import AddPersonalInfo from "@/components/AddPersonalInfo";
import AddCitationInfo from "@/components/AddCitationInfo";
import { uploadImage } from "@/lib/uploadImage";

export interface PersonalInfoType {
  name?: string;
  fatherName?: string;
  motherName?: string;
  lastName?: string;
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
}
export interface CitationInfoType {
  dateMartyrdom: string;
  burialDate: string;
  age: string;
  ageStatus: string;
  dissident: string;
  preRevolution: string;
  martyrdomGovernorate: string;
  countryOfMartyrdom: string;
  cityOfMartyrdom: string;
  martyrdomLocation: string;
  citationMethod: string;
  massacreId: string | null;
  massacre: string;
}
export default function EditMartyPage() {
  const { id } = useParams<{ id: string }>();
  const [fullName, setFullName] = useState<string>("");
  const [martyr, setMartyr] = useState<GetMartyr | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [mediaUrls, setMediaUrls] = useState<Record<string, string>>({});
  const [uploadedMedia, setUploadedMedia] = useState<MediaInput[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
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
  const [cardValues, setCardValues] = useState<AddCardValues>();
  const [citationInfo, setCitationInfo] = useState<CitationInfoType>();

  const handleCardChange = (values: AddCardValues) => {
    setCardValues(values);
  };

  const handleUploadComplete = (media: MediaInput[]) => {
    setUploadedMedia(media);
  };

  const handleCitationChange = useCallback((values: CitationInfoType) => {
    setCitationInfo(values);
    // setDateMartyrdom(values.dateMartyrdom);
  }, []);

  const handlePersonlChange = useCallback((data: PersonalInfoType) => {
    setPersonalInfo(data);
    setFullName(`${data.name} ${data.fatherName} ${data.lastName}`);
  }, []);

  // =====================
  // Fetch massacre details
  // =====================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMartyrById(id);
        setMartyr(res.data.martyr);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Login failed");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // =====================
  // Fetch media files as blobs
  // =====================
  useEffect(() => {
    if (!martyr?.media?.length) return;

    let cancelled = false;
    const createdUrls: string[] = [];

    const fetchBlobs = async () => {
      const map: Record<string, string> = {};
      for (const m of martyr.media ?? []) {
        try {
          const res = await fetch(`${apiUrl}/api/file?fileID=${m.mediaId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (!res.ok) continue;

          const blob = await res.blob();
          const objectUrl = URL.createObjectURL(blob);
          createdUrls.push(objectUrl);
          map[m.mediaId] = objectUrl;
        } catch (err) {
          console.error("Failed to load media:", err);
        }
        if (cancelled) break;
      }

      if (!cancelled) setMediaUrls(map);
    };

    fetchBlobs();

    // Cleanup: revoke URLs when component unmounts or massacre changes
    return () => {
      cancelled = true;
      [...createdUrls, ...Object.values(mediaUrls)].forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {}
      });
    };
  }, [martyr?.media, mediaUrls]);

  // =====================
  // Handlers
  // =====================
  // const handleDeleteOldMedia = (mediaID: string) => {
  //   if (!massacre) return;
  //   setMassacre({
  //     ...massacre,
  //     media: massacre.media?.filter((m) => m.mediaID !== mediaID) ?? [],
  //   });

  //   if (mediaUrls[mediaID]) {
  //     URL.revokeObjectURL(mediaUrls[mediaID]);
  //     const { [mediaID]: _, ...rest } = mediaUrls;
  //     setMediaUrls(rest);
  //   }
  // };

  // const handleNewFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setNewFiles((prev) => [...prev, ...Array.from(e.target.files ?? [])]);
  //   }
  // };

  // const handleRemoveNewFile = (index: number) => {
  //   const newList = [...newFiles];
  //   newList.splice(index, 1);
  //   setNewFiles(newList);
  // };

  const handleSave = async () => {
    // if (!massacre) return;
    setLoadingUpdate(true);

    const mergedMedia = [...(martyr?.media ?? []), ...(uploadedMedia ?? [])];

    let fileID = "";

    if (cardValues?.imageFile) {
      fileID = await uploadImage(cardValues.imageFile);
    }

    console.log(fileID);
    const martyr2: AddMartyrType = {
      photoId: fileID || martyr?.photoId,
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

      media: mergedMedia ?? [],
    };

    const result = await EditMartyrApi(martyr2, id);

    console.log(result);
    if (result.success) {
      console.log("✅ Added successfully:");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Hide toast after 3s
    } else {
      console.error("❌ Error:", result.message);
    }

    setLoadingUpdate(false);
  };

  const handleDeleteOldMedia = (mediaID: string) => {
    if (!martyr) return;
    setMartyr({
      ...martyr,
      media: martyr.media?.filter((m) => m.mediaId !== mediaID) ?? [],
    });

    if (mediaUrls[mediaID]) {
      URL.revokeObjectURL(mediaUrls[mediaID]);
      const updatedUrls = { ...mediaUrls };
      delete updatedUrls[mediaID];
      setMediaUrls(updatedUrls);
    }
  };

  // =====================
  // Render Logic
  // =====================
  if (loading)
    return (
      <div className="h-dvh flex justify-center items-center">
        <Loading2 />
      </div>
    );

  if (error) return <div className="text-red-500">{error}</div>;
  if (!martyr) return <div>No data found</div>;

  // =====================
  // UI
  // =====================
  return (
    <div className="my-5 p-4 sm:p-10 max-w-6xl mx-auto bg-white shadow-md rounded-xl">
      {/* ✅ Floating success toast */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-500 animate-fadeInOut z-50">
          ✅ تمت التعديل بنجاح
        </div>
      )}

      <AddCard
        onChange={handleCardChange}
        fullName={martyr.fullName || ""}
        dateMartyrdom={martyr.dateOfMartyrdom || ""}
        martyr={martyr}
      />
      <div className="my-5"></div>
      <AddPersonalInfo onChange={handlePersonlChange} martyr={martyr} />

      <AddCitationInfo onChange={handleCitationChange} martyr={martyr} />
      <div className="my-5"></div>

      {/* OLD MEDIA */}
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        الوسائط القديمة
      </h2>
      {martyr.media?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {martyr.media.map((m) => (
            <div
              key={m._id}
              className="relative border rounded-lg overflow-hidden"
            >
              {mediaUrls[m.mediaId] ? (
                m.mediaType === "image" ? (
                  <Image
                    src={mediaUrls[m.mediaId]}
                    alt=""
                    width={300}
                    height={200}
                    className="w-full h-32 object-cover"
                  />
                ) : (
                  <video
                    controls
                    className="w-full h-32 object-cover"
                    src={mediaUrls[m.mediaId]}
                  />
                )
              ) : (
                <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400">
                  لا توجد وسائط
                </div>
              )}
              <button
                onClick={() => handleDeleteOldMedia(m.mediaId)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-8">لا توجد وسائط قديمة</p>
      )}

      <FileUploader onUploadComplete={handleUploadComplete} />

      {/* SAVE BUTTON */}
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          disabled={!martyr?.name || martyr.name.trim() === ""}
          className="mt-6 px-8 py-3 bg-[var(--mainBlue)] text-white rounded-md hover:bg-[var(--hoverBlue)] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loadingUpdate ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>جاري الحفظ...</span>
            </div>
          ) : (
            <p> حفظ التعديلات</p>
          )}
        </button>
      </div>

      {/* ✅ Toast animation style */}
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
