import { axiosInstance } from "../axiosInstance";
import {
  ApiResponse,
  LoginResponseData,
  Partner,
} from "../types";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ApiResponse<LoginResponseData>> => {
  try {
    const { data } = await axiosInstance.post("/partner/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  const { data } = await axiosInstance.post("/partner/forgot-password", {
    email,
  });

  return data;
};

export const resetPassword = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) => {
  const { data } = await axiosInstance.post("/partner/reset-password", {
    token,
    newPassword,
  });

  return data;
};

export const verifyLogin = async ({
  otp,
  email,
}: {
  otp: string;
  email: string;
}) => {
  try {
    const { data } = await axiosInstance.post(`/verify-otp`, {
      otp,
      email,
    });
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentPartner = async (): Promise<ApiResponse<Partner>> => {
  try {
    const { data } = await axiosInstance.get("/partner/me");
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post("/logout");
  } catch (error) {
    throw error;
  }
};
