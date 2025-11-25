import { apiUrl } from "@/config/apiUrl";
import { refreshAccessTokenApi } from "./auth";

export const uploadImage = async (photo: File): Promise<string> => {
  const token = await refreshAccessTokenApi();
  if (!token) throw new Error("No access token found. Please login first.");

  try {
    const formData = new FormData();
    formData.append("file", photo);

    const response = await fetch(`${apiUrl}/api/file`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Upload failed");
    }

    return data.data.id as string;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
