import { apiUrl } from "@/config/apiUrl";
import { refreshAccessTokenApi } from "./auth";
import { AddRequestResponse } from "@/types/RequestApi";

export async function editRequsetStatus(
  id: string,
  status: string = "approved"
): Promise<AddRequestResponse> {
  const token = await refreshAccessTokenApi();
  // console.log(token);
  if (!token) throw new Error("No access token found. Please login.");
  console.log(
    JSON.stringify({
      requestId: id,
      status: status,
    })
  );

  const res = await fetch(`${apiUrl}/api/add-requests/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      requestId: id,
      status: status,
    }),
  });

  if (res.status === 401) {
    throw new Error("Unauthorized — token may have expired");
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch massacres");
  }

  return data as AddRequestResponse;
}
export type { AddRequestResponse };
