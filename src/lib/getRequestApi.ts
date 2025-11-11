import { apiUrl } from "@/config/apiUrl";
import { refreshAccessTokenApi } from "./auth";
import { AddRequestResponse } from "@/types/RequestApi";

export async function getAllAddRequset(
  limit: number = 10,
  page: number = 1
): Promise<AddRequestResponse> {
  const token = await refreshAccessTokenApi();
  console.log(limit, page);
  if (!token) throw new Error("No access token found. Please login.");
  // console.log(token);

  const res = await fetch(`${apiUrl}/api/add-requests`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    throw new Error("Unauthorized — token may have expired22");
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch massacres");
  }

  return data as AddRequestResponse;
}
export type { AddRequestResponse };
