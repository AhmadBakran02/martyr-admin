"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getMartyrById, GetMartyrResponse } from "@/lib/getMastyrById";
import Loading2 from "@/components/Loading2/Loading2";
import MediaGallery from "@/components/MediaGallery";
import CardMissing from "@/components/CardMissing/CardMissing";
import MissingInfo from "@/components/MissingInfo";
import PersonalInfoMissing from "@/components/PersonalInfoMissing";

export default function MartyrPage() {
  const { id } = useParams<{ id: string }>();
  const [martyr, setMartyr] = useState<GetMartyrResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMartyrById(id);
        setMartyr(res);
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

  if (loading)
    return (
      <div className="h-dvh flex justify-center items-center">
        <Loading2 />
      </div>
    );

  if (error) return <div className="text-red-500">{error}</div>;
  if (!martyr) return <div>No data found</div>;

  return (
    <div className="p-4 rounded-md shadow-md flex justify-center items-center">
      <div className="sm:max-w-10/12 w-full">
        {/* <MassacreInfo key={massacre._id} item={massacre} /> */}
        <CardMissing item={martyr} />
        <div className="m-10"></div>
        <PersonalInfoMissing item={martyr} />
        <div className="m-10"></div>
        <MissingInfo item={martyr} />
        <div className="m-10"></div>
        {martyr && <MediaGallery media={martyr.data.martyr.media ?? []} />}
      </div>
    </div>
  );
}
