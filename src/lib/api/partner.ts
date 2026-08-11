import { axiosInstance } from "@/lib/axiosInstance";
import type {
  ChangePasswordPayload,
  ChangePasswordResponse,
} from "@/lib/types/settings";

export const changePartnerPassword = async (
  payload: ChangePasswordPayload,
): Promise<ChangePasswordResponse> => {
  const { data } = await axiosInstance.patch<ChangePasswordResponse>(
    "/partner/change-password",
    payload,
  );

  return data;
};
