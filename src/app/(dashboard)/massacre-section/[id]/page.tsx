"use client";
import MassacreInfo from "@/components/MassacreInfo";
import { getMassacreById } from "@/lib/getMassacreById";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Massacre } from "@/lib/massacreApi";
import MediaGallery from "@/components/MediaGallery";
import Loading2 from "@/components/Loading2/Loading2";

export default function MassacrePage() {
  const { id } = useParams<{ id: string }>();

  const [massacre, setMassacre] = useState<Massacre | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMassacreById(id);
        console.log(res.data);
        setMassacre(res.data.massacre);
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

  console.log(massacre);

  if (loading)
    return (
      <div className="h-dvh flex justify-center items-center">
        <Loading2 />
      </div>
    );
  if (error) return <div className="text-red-500">{error}</div>;
  if (!massacre) return <div>No data found</div>;
  return (
    <div className="p-4 rounded-md shadow-md flex justify-center items-center">
      <div className="w-full sm:max-w-10/12 ">
        <MassacreInfo key={massacre._id} item={massacre} id={id} />
        <div className="m-10"></div>
        {massacre && <MediaGallery media={massacre.media ?? []} />}
      </div>
    </div>
  );
}
