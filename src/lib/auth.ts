import { apiUrl } from "@/config/apiUrl";

export function saveTokens(access: string, refresh: string) {
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
}

export function saveAccessToken(access: string) {
  localStorage.setItem("accessToken", access);
}

export function getAccessToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("accessToken")
    : null;
}

export function getRefreshToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("refreshToken")
    : null;
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

export async function loginApi(email: string, password: string) {
  const res = await fetch(`${apiUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) throw new Error(data.message || "Login failed");

  saveTokens(data.data.accessToken, data.data.refreshToken);
  localStorage.setItem("userName", data.data.name);

  return data;
}

export async function refreshAccessTokenApi(): Promise<string | null> {
  const refresh = getRefreshToken();
  // console.log(refresh);
  if (!refresh) return null;

  const res = await fetch(`${apiUrl}/api/auth/access-token`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refresh}`,
    },
  });

  const respon = await res.json();

  if (respon.success) {
    const newToken = respon.data.accesstoken;
    saveAccessToken(newToken);
    // console.log(newToken);
    return newToken;
  }

  return null;
}
