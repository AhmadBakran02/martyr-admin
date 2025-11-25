import { apiUrl } from "@/config/apiUrl";
import { refreshAccessTokenApi } from "./auth";

export interface UploadFileResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    originalName: string;
    mimetype: string;
    size: number;
  };
  error?: string;
}

// 68ee110bbfc66297deaaec5d

/**
 * Upload a single file (image or video)
 * @param file - The File object to upload
 * @returns UploadFileResponse with fileID if successful
 */
export async function uploadFileApi(file: File): Promise<UploadFileResponse> {
  const token = await refreshAccessTokenApi();
  if (!token) throw new Error("No access token found. Please login first.");

  // Create FormData for file upload
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${apiUrl}/api/file`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "File upload failed");
  }

  return data as UploadFileResponse;
}
