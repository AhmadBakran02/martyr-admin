"use client";
import MassacreInfo from "@/components/MassacreInfo";
import { getMassacreById } from "@/lib/getMassacreById";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Massacre } from "@/lib/massacreApi";
import MediaGallery from "@/components/MediaGallery";
import Loading2 from "@/components/Loading2/Loading2";
import Image from "next/image";
import { apiUrl } from "@/config/apiUrl";

export default function MassacrePage() {
  const { id } = useParams<{ id: string }>();
  const [massacre, setMassacre] = useState<Massacre | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null); // ✅ moved up here

  // Fetch massacre data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMassacreById(id);
        setMassacre(res.data.massacre);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ✅ Fetch image blob from API (depends only on massacre.photoId)
  useEffect(() => {
    const fetchPhoto = async () => {
      if (!massacre?.photoId) return;

      try {
        const res = await fetch(
          `${apiUrl}/api/file?fileID=${massacre.photoId}`
        );
        if (res.ok) {
          const blob = await res.blob();
          const objectUrl = URL.createObjectURL(blob);
          setPhotoUrl(objectUrl);
        } else {
          console.error("Failed to fetch image:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchPhoto();

    // Cleanup old blob URLs
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, [massacre?.photoId]);

  // Conditional UI rendering (AFTER all hooks)
  if (loading)
    return (
      <div className="h-dvh flex justify-center items-center">
        <Loading2 />
      </div>
    );
  if (error) return <div className="text-red-500">{error}</div>;
  if (!massacre) return <div>No data found</div>;

  return (
    <div className="w-full">
      {/* --- Wide Image Header --- */}
      {massacre.photoId && (
        <div className="relative w-full h-64 sm:h-96">
          <Image
            src={photoUrl || "/images/jj.webp"}
            alt="Massacre Cover"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <h1 className="text-white text-3xl sm:text-5xl font-bold p-6">
              {massacre.name}
            </h1>
          </div>
        </div>
      )}

      {/* --- Content --- */}
      <div className="p-4 flex justify-center items-center">
        <div className="w-full sm:max-w-5xl">
          <MassacreInfo key={massacre._id} item={massacre} id={id} />
          <div className="my-10"></div>
          {massacre.media && <MediaGallery media={massacre.media} />}
        </div>
      </div>
    </div>
  );
}
