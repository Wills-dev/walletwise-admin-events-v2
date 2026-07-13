import { SubmitEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { verifyLogin } from "../api";
import { ApiErrorResponse } from "@/lib/types";
import { createAuthCookie } from "@/lib/helpers/cookie";
import { promiseErrorFunction } from "@/lib/types";
import { useAuthStore } from "@/store/authStore";

export const useVerifyLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  const [otp, setOtp] = useState("");

  const email = searchParams.get("email") || "";

  const { mutate, isPending } = useMutation({
    mutationFn: verifyLogin,
    onSuccess: (data) => {
      const { adminDetails, token } = data;
      createAuthCookie("walletwiseEventAdminToken", token);
      setCurrentUser(adminDetails);
      toast.success("Login success");
      router.push(`/overview`);
    },
    onError: (error: ApiErrorResponse) => {
      console.log("error logging in", error);
      promiseErrorFunction(error);
    },
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter otp sent to your mail");
      return;
    }
    mutate({ otp, email });
  };

  return {
    otp,
    setOtp,
    handleSubmit,
    isPending,
  };
};
