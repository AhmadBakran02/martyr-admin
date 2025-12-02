import { apiUrl } from "@/config/apiUrl";
import { getAccessToken, refreshAccessTokenApi } from "./auth";
import { Massacre, MediaInput } from "./massacreApi";
import { AddRequestResponse } from "./getRequestApi";

// ===============================
// Martyrs API Response Interfaces
// ===============================

export interface MartyrMedia {
  mediaType: "image" | "video";
  mediaId: string;
  _id: string;
}

export interface GetMartyr {
  _id?: string;
  fullName: string;
  dateOfMartyrdom?: string;
  burialDate?: string;
  nationalIdNumber?: string;
  anonymous: boolean;
  name?: string;
  fatherName?: string;
  motherName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  maritalStatus?: string;
  numberOfChildren?: number | null;
  profession?: string;
  study?: string;
  country?: string;
  governorate?: string;
  city?: string;
  neighborhood?: string;
  ethnicAffiliation?: string;
  organizationalaffiliation?: string;
  sectarianAffiliation?: string;
  religiousAffiliation?: string;
  placeOfBirth?: string;
  sourceOfInformation?: string;
  age?: string;
  overview: string;
  ageStatus?: string;
  dissident?: string;
  preRevolution?: string;
  stateOfMartyrdom?: string;
  martyrdomGovernorate?: string;
  cityOfMartyrdom?: string;
  martyrdomSite?: string;
  citationMethod?: string;
  like?: number;
  photoId?: string | null;
  media: MartyrMedia[];
  massacreId?: Massacre | null;
  otherFields?: string;
  createdAt?: string;
  updatedAt?: string;
  seq?: number;
  __v?: number;
  isMissing?: boolean;
}

export interface AddMartyrType {
  // Basic Identity
  fullName: string;
  anonymous: boolean;
  name?: string;
  fatherName?: string;
  motherName?: string;
  lastName?: string;
  nationalIdNumber?: string;
  gender?: string;
  dateOfBirth?: string;
  age?: string;
  ageStatus?: string;
  maritalStatus?: string;
  numberOfChildren?: number;
  profession?: string;
  study?: string;
  placeOfBirth?: string;
  sourceOfInformation?: string;

  ethnicAffiliation?: string;
  organizationalaffiliation?: string;
  religiousAffiliation?: string;
  sectarianAffiliation?: string;

  // Location Info
  country?: string;
  governorate?: string;
  city?: string;
  neighborhood?: string;

  // Martyrdom Info
  dateOfMartyrdom?: string;
  burialDate?: string;
  stateOfMartyrdom?: string;
  martyrdomGovernorate?: string;
  cityOfMartyrdom?: string;
  martyrdomSite?: string;
  citationMethod?: string;
  dissident?: string;
  preRevolution?: string;
  massacreId?: string | null;
  // massacreName?: string | null;

  isMissing?: boolean;

  // Media & Description
  overview: string;
  photoId?: string | null;
  media: MediaInput[];
}

export interface MartyrInfoResponse {
  success: boolean;
  message: string;
  data: {
    numberOfMartyrs: number;
    totalOfMartyrs: number;
    numberOfMassacres: number;
    numberOfUpdateRequests: number;
    numberOfAddRequests: number;
    numberOfMissingMartyrs: number;
  };
}

export interface MartyrsMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface MartyrsData {
  martyrs: GetMartyr[];
  pagination: MartyrsMeta;
}

export interface GetMartyrsResponse {
  success: boolean;
  message: string;
  data: MartyrsData;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: {
    martyr: {
      age: string;
      ageStatus: string;
      anonymous: boolean;
      burialDate: string;
      citationMethod: string;
      city: string;
      cityOfMartyrdom: string;
      country: string;
      createdAt: string;
      dateOfBirth: string;
      dateOfMartyrdom: string;
      dissident: string;
      ethnicAffiliation: string;
      fatherName: string;
      fullName: string;
      gender: string;
      governorate: string;
      lastName: string;
      like: number;
      maritalStatus: string;
      martyrdomGovernorate: string;
      martyrdomSite: string;
      massacreId: null;
      media: [
        {
          mediaId: string;
          mediaType: string;
          _id: string;
        }
      ];
      motherName: string;
      name: string;
      nationalIdNumber: string;
      neighborhood: string;
      numberOfChildren: number;
      overview: string;
      photoId: null;
      preRevolution: string;
      profession: string;
      seq: number;
      stateOfMartyrdom: string;
      updatedAt: string;
      __v: number;
      _id: string;
    };
  };
}
export interface ApiRequestResponse {
  success: boolean;
  message: string;
  data?: AddRequestResponse;
}

export async function addMartyr(martyr: AddMartyrType): Promise<ApiResponse> {
  try {
    const token = await refreshAccessTokenApi();
    console.log(token);
    console.log(JSON.stringify({ martyr }));

    const response = await fetch(`${apiUrl}/api/martyr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ martyr }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add martyr");
    }

    return {
      success: true,
      message: data.message || "Martyr added successfully",
      data: data,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong",
    };
  }
}

export async function getAllMartyrs(
  limit: number = 10,
  page: number = 1,
  isMissing: boolean = false
): Promise<GetMartyrsResponse> {
  const token = getAccessToken();
  console.log(token);
  if (!token) throw new Error("No access token found. Please login.");
  console.log(token);

  const res = await fetch(
    `${apiUrl}/api/martyr/all?limit=${limit}&page=${page}&isMissing=${isMissing}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("121222");
  // Optional: auto-refresh if 401 (if you don't use apiFetch)
  if (res.status === 401) {
    throw new Error("Unauthorized — token may have expired");
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch massacres");
  }

  return data as GetMartyrsResponse;
}

export async function getMartyrInfo(): Promise<MartyrInfoResponse> {
  const token = await refreshAccessTokenApi();
  try {
    const res = await fetch(`${apiUrl}/api/martyr/info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data as MartyrInfoResponse;
  } catch (error) {
    console.error("Error fetching martyr info:", error);
    throw error;
  }
}

export async function EditMartyrApi(
  martyr: AddMartyrType,
  id: string
): Promise<ApiResponse> {
  const token = await refreshAccessTokenApi();
  console.log(token);
  console.log(martyr);
  console.log(id);
  // console.log("-----");
  if (!token) throw new Error("No access token found. Please login.");

  const res = await fetch(`${apiUrl}/api/martyr/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ martyr }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to add massacre");
  }

  return data as ApiResponse;
}
