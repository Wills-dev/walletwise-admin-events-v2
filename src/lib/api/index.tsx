import { axiosInstance } from "../axiosInstance";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return data?.data;
  } catch (error) {
    throw error;
  }
};
