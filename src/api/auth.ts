import { apiClient } from "./client";
import type { AuthResponse, LoginDto, RegisterDto } from "./types";

export const authApi = {
  login: (data: LoginDto) =>
    apiClient.post<AuthResponse>("/auth/login", data),

  register: (data: RegisterDto) =>
    apiClient.post<AuthResponse>("/auth/register", data),
};
