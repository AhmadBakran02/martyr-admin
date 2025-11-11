import { apiUrl } from "@/config/apiUrl";
import { getAccessToken } from "./auth";

export interface DeleteAddRequestsResponse {
  success: boolean;
  message: string;
  data?: null;
}

export async function deleteRequestApi(
  id: string
): Promise<DeleteAddRequestsResponse> {
  const token = getAccessToken();
  console.log(token);
  if (!token) throw new Error("No access token found. Please login.");
  console.log(token);

  const res = await fetch(`${apiUrl}/api/add-requests/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    throw new Error("Unauthorized — token may have expired");
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch massacres");
  }

  return data as DeleteAddRequestsResponse;
}
