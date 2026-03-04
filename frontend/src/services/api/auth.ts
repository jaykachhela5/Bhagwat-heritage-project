import { apiClient } from "./client";

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  name?: string;
  token?: string;
  role?: string;
}

export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient.post<LoginResponse>("/api/auth/login", payload),

  signup: (payload: SignupPayload) =>
    apiClient.post<{ message: string }>("/api/auth/signup", payload),
};
