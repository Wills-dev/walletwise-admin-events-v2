import { axiosInstance } from "../axiosInstance";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axiosInstance.post("/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    throw error;
  }
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

export const getCurrentUser = async () => {
  try {
    const { data } = await axiosInstance.get("/admins/me");
    return data?.data;
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
