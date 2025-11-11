import { LoginResponse } from "@/types/loginType";
import { apiUrl } from "@/config/apiUrl";

export async function loginApi(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const res = await fetch(apiUrl + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    return await res.json();
  } catch (error) {
    console.error("Login API error:", error);
    return {
      success: false,
      message: "Request failed",
      error: "Network error, please try again.",
      data: undefined,
    };
  }
}
