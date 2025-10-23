"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import Card from "@/components/Card/Card";
import { getMartyrById, GetMartyrResponse } from "@/lib/getMastyrById";
import Loading2 from "@/components/Loading2/Loading2";
import PersonalInfo from "@/components/PersonalInfo";
import CitationInfo from "@/components/CitationInfo";
import MediaGallery from "@/components/MediaGallery";

export default function MartyrPage() {
  const { id } = useParams<{ id: string }>(); // 👈 get massacre id from URL

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
  // console.log(martyr);
  if (error) return <div className="text-red-500">{error}</div>;
  if (!martyr) return <div>No data found</div>;
  console.log(martyr.data.martyr.media);
  return (
    <div className="p-4 rounded-md shadow-md flex justify-center items-center">
      <div className="w-full max-w-10/12 ">
        {/* <MassacreInfo key={massacre._id} item={massacre} /> */}
        <Card item={martyr} />
        <div className="m-10"></div>
        <PersonalInfo item={martyr} />
        <div className="m-10"></div>
        <CitationInfo item={martyr} />
        <div className="m-10"></div>
        {martyr && <MediaGallery media={martyr.data.martyr.media ?? []} />}
      </div>
    </div>
  );
}
