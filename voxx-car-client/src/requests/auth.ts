import { axiosClient } from "@/lib/axios";
import type { LoginRequest, LoginResponse } from "@/schemas/auth";

export const login = async (credentials: LoginRequest) => {
  const { data } = await axiosClient.post<LoginResponse>(
    "/auth/login",
    credentials
  );
  return data;
};
