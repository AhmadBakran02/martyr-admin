import { apiUrl } from "@/config/apiUrl";
import { refreshAccessTokenApi } from "./auth";
import { AddRequestResponse } from "@/types/RequestApi";

// interface GetMartyrResponse {
//   success: boolean;
//   message: string;
//   data: AddRequestResponse;
// }

/**
 * Fetch a single martyr by its ID
 * @param id - The martyr ID
 * @returns GetMartyrResponse
 */
export async function getRequestMartyrById(
  id: string
): Promise<AddRequestResponse> {
  const token = await refreshAccessTokenApi();

  try {
    const res = await fetch(`${apiUrl}/api/add-requests/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch martyr: ${res.status}`);
    }

    const data = (await res.json()) as AddRequestResponse;
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Error fetching martyr");
  }
}
