import { apiUrl } from "@/config/apiUrl";
import { getAccessToken, refreshAccessTokenApi } from "./auth";

export interface MediaItem {
  mediaType: "image" | "video";
  mediaId: string;
  _id: string;
}

export interface Massacre {
  _id: string | null;
  name: string;
  startDate?: string;
  endDate?: string;
  city?: string;
  governorate?: string;
  location?: string;
  overview?: string;
  totalOfMartyrs?: number;
  photoId?: string;
  media?: MediaItem[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  numberOfMartyrs?: number;
}

export interface MassacreMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface MassacreResponse {
  success: boolean;
  message: string;
  data: {
    massacres: Massacre[];
    pagination: MassacreMeta;
  };
}

/**
 * Fetch massacres list
 * @param limit number of results per page
 * @paramMediaInput page current page number
 */
export async function getAllMassacres(
  limit: number = 10,
  page: number = 1
): Promise<MassacreResponse> {
  const token = getAccessToken();
  console.log(token);
  if (!token) throw new Error("No access token found. Please login.");
  console.log(token);

  const res = await fetch(
    `${apiUrl}/api/massacre/all?limit=${limit}&page=${page}`,
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

  return data as MassacreResponse;
}

export interface MediaInput {
  mediaId: string;
  mediaType: "image" | "video";
}

export interface MassacreInput {
  name: string;
  startDate?: string;
  endDate?: string;
  city?: string;
  governorate?: string;
  location?: string;
  overview?: string;
  totalOfMaryrs?: number;
  photoID?: string;
  media?: MediaInput[];
}

export interface AddMassacreResponse {
  success: boolean;
  message: string;
  data?: {
    massacreId: string;
  };
}

/**
 * Add new massacre
 * @param massacre - massacre data (only name is required)
 */
export async function addMassacreApi(
  massacre: MassacreInput
): Promise<AddMassacreResponse> {
  const token = await refreshAccessTokenApi();
  console.log(token);
  console.log("-----");
  if (!token) throw new Error("No access token found. Please login.");

  const res = await fetch(`${apiUrl}/api/massacre`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ massacre }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to add massacre");
  }

  return data as AddMassacreResponse;
}

export async function EditMassacreApi(
  massacre: MassacreInput,
  id: string
): Promise<AddMassacreResponse> {
  const token = await refreshAccessTokenApi();
  console.log(token);
  // console.log("-----");
  if (!token) throw new Error("No access token found. Please login.");

  const res = await fetch(`${apiUrl}/api/massacre/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ massacre }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to add massacre");
  }

  return data as AddMassacreResponse;
}
