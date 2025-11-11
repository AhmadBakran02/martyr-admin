export interface LoginResponse {
  success: boolean;
  message: string;
  error?: string;
  data?: {
    message: string;
    token: string;
    name: string;
  };
}
