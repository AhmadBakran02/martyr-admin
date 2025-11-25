"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { type MediaInput } from "@/lib/massacreApi";
import Image from "next/image";
import FileUploader from "@/components/FileUploader";
import { getMartyrById } from "@/lib/getMastyrById";
import { AddMartyrType, EditMartyrApi, GetMartyr } from "@/lib/martyrApi";
import { AddCardValues } from "@/components/AddCard/AddCard";
import AddCardMissing from "@/components/AddCardMissing/AddCardMissing";
import AddPersonalInfoMissing from "@/components/AddPersonalInfoMissing";
import AddMissingInfo from "@/components/AddMissingInfo";
import { MissingInfoType } from "@/types/MissingInfoType";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { apiUrl } from "@/config/apiUrl";

export interface PersonalInfoType {
  name?: string;
  fatherName?: string;
  motherName?: string;
  lastName?: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  numberOfChildren: string;
  study: string;
  profession: string;
  country: string;
  city: string;
  governorate: string;
  neighborhood: string;
  ethnicAffiliation: string;
  organizationalaffiliation: string;
  religiousAffiliation: string;
  sectarianAffiliation: string;
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
    study: "",
    profession: "",
    country: "",
    city: "",
    governorate: "",
    neighborhood: "",
    ethnicAffiliation: "",
    organizationalaffiliation: "",
    religiousAffiliation: "",
    sectarianAffiliation: "",
    overview: "",
  });
  const [cardValues, setCardValues] = useState<AddCardValues>();
  const [missingInfo, setMissingInfo] = useState<MissingInfoType>();
  const [photoId, setPhotoId] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleCardChange = useCallback((values: AddCardValues) => {
    setCardValues(values);
  }, []);

  const handleUploadComplete = (media: MediaInput[]) => {
    setUploadedMedia(media);
  };

  const handleMissingChange = useCallback((values: MissingInfoType) => {
    setMissingInfo(values);
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
        setFullName(
          `${res.data.martyr.name ?? ""} ${res.data.martyr.fatherName ?? ""} ${
            res.data.martyr.lastName ?? ""
          }`.trim()
        );
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
          const res = await fetch(`${apiUrl}/api/file?id=${m.mediaId}`, {
            method: "GET",
            headers: {},
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

  const handleSave = async () => {
    if (uploading) {
      alert("جارِ رفع الصورة… الرجاء الانتظار");
      return;
    }

    await SaveMissing();
  };

  const SaveMissing = async () => {
    setLoadingUpdate(true);

    // console.log(id);
    const mergedMedia = [...(martyr?.media ?? []), ...(uploadedMedia ?? [])];

    const martyr2: AddMartyrType = {
      photoId: photoId,
      fullName: fullName,
      dateOfMartyrdom: missingInfo?.dateMartyrdom,
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
      study: personalInfo?.study,
      profession: personalInfo?.profession,
      country: personalInfo?.country,
      governorate: personalInfo?.governorate,
      city: personalInfo?.city,
      neighborhood: personalInfo?.neighborhood,
      ethnicAffiliation: personalInfo?.ethnicAffiliation,
      organizationalaffiliation: personalInfo?.organizationalaffiliation,
      religiousAffiliation: personalInfo?.religiousAffiliation,
      sectarianAffiliation: personalInfo?.sectarianAffiliation,
      overview: personalInfo?.overview ?? "",

      age: missingInfo?.age,
      ageStatus: missingInfo?.ageStatus,
      dissident: missingInfo?.dissident,
      preRevolution: missingInfo?.preRevolution,
      martyrdomGovernorate: missingInfo?.martyrdomGovernorate,
      cityOfMartyrdom: missingInfo?.cityOfMartyrdom,
      martyrdomSite: missingInfo?.martyrdomLocation,
      citationMethod: missingInfo?.citationMethod,
      stateOfMartyrdom: missingInfo?.citationMethod,

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

  const handleUploadingChange = (state: boolean) => {
    setUploading(state);
  };

  const handleImageUploaded = (id: string) => {
    setPhotoId(id);
    console.log(id);
  };

  // =====================
  // Render Logic
  // =====================
  if (loading)
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center bg-gradient-to-br from-[#F7F7F0] via-white to-[#E8F1F0] px-4">
        <div className="flex flex-col items-center gap-4 bg-white/70 backdrop-blur-md border border-[#0B3F3D]/10 rounded-2xl px-6 py-8 shadow-lg">
          <Loader2 className="w-10 h-10 text-[#0B3F3D] animate-spin" />
          <p className="text-lg font-semibold text-[#0B3F3D]">
            جاري تحميل بيانات المفقود...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-[#FDF5F5] via-white to-[#FBECEC] px-4">
        <div className="max-w-lg w-full bg-white border border-red-200 rounded-2xl shadow-xl p-8 text-right">
          <div className="flex items-center justify-end gap-3 text-red-700">
            <p className="text-xl font-bold">تعذّر تحميل البيانات</p>
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="mt-3 text-gray-700 leading-relaxed">{error}</p>
          <div className="mt-6 flex gap-3 justify-end">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      </div>
    );
  if (!martyr)
    return (
      <div className="min-h-dvh flex items-center justify-center bg-[#F7F7F0]">
        <div className="bg-white border border-[#0B3F3D]/10 rounded-2xl shadow-lg px-6 py-4 text-[#0B3F3D] font-semibold">
          لا توجد بيانات متاحة
        </div>
      </div>
    );

  // =====================
  // UI
  // =====================
  return (
    <div className="min-h-dvh bg-gradient-to-br from-[#F7F7F0] via-white to-[#E8F1F0] py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page header */}
        <div className="bg-white border border-[#0B3F3D]/10 rounded-2xl shadow-md p-6 flex flex-col gap-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-500">تعديل بيانات المفقود</p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3F3D]">
                {martyr.fullName || fullName || "—"}
              </h1>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#0B3F3D]/5 text-[#0B3F3D] rounded-lg">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-sm font-semibold">وضع التحرير مفعّل</span>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            حدّث بيانات المفقود والمعلومات الشخصية والوسائط. يمكنك إضافة وسائط
            جديدة أو حذف القديمة قبل الحفظ.
          </p>
        </div>

        {/* ✅ Floating success toast */}
        {showToast && (
          <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-500 animate-fadeInOut z-50 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>تم تعديل البيانات بنجاح</span>
          </div>
        )}

        <AddCardMissing
          onChange={handleCardChange}
          onImageUploaded={handleImageUploaded}
          onUploadingChange={handleUploadingChange}
          fullName={martyr.fullName || ""}
          dateMartyrdom={martyr.dateOfMartyrdom || ""}
          martyr={martyr}
        />
        <div className="my-5"></div>
        <AddPersonalInfoMissing
          onChange={handlePersonlChange}
          martyr={martyr}
        />

        <AddMissingInfo onChange={handleMissingChange} martyr={martyr} />
        <div className="my-5"></div>

        {/* OLD MEDIA */}
        <div className="bg-white border border-[#0B3F3D]/10 rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#0B3F3D]">
              الوسائط القديمة
            </h2>
            <span className="text-sm text-gray-500">
              {martyr.media?.length || 0} ملف
            </span>
          </div>
          {martyr.media?.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {martyr.media.map((m) => (
                <div
                  key={m._id}
                  className="relative aspect-video rounded-lg overflow-hidden border-2 border-[#C8A870]/40 shadow-sm group"
                >
                  {mediaUrls[m.mediaId] ? (
                    m.mediaType === "image" ? (
                      <Image
                        src={mediaUrls[m.mediaId]}
                        alt=""
                        width={500}
                        height={300}
                        className="w-full h-full object-cover group-hover:opacity-90 transition"
                      />
                    ) : (
                      <video
                        controls
                        className="w-full h-full object-cover"
                        src={mediaUrls[m.mediaId]}
                      />
                    )
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                      لا توجد وسائط
                    </div>
                  )}
                  <button
                    onClick={() => handleDeleteOldMedia(m.mediaId)}
                    className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow-sm hover:bg-red-700 transition"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">لا توجد وسائط قديمة</p>
          )}
        </div>

        <FileUploader onUploadComplete={handleUploadComplete} />

        {/* SAVE BUTTON */}
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            disabled={!martyr?.name || martyr.name.trim() === ""}
            className="mt-6 px-8 py-3 bg-[#0B3F3D] text-[#F7F7F0] rounded-lg hover:bg-[#0B3F3D]/90 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
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
    </div>
  );
}
