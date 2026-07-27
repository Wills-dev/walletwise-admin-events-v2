import React from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { login } from "../api";
import { ApiErrorResponse } from "@/lib/types";
import { useLoginState } from "./useLoginState";
import { promiseErrorFunction } from "@/lib/types";
import { useAuthStore } from "@/store/authStore";
import { createAuthCookie } from "../helpers/cookie";

export const useLogin = () => {
  const router = useRouter();

  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  const {
    showPassword,
    togglePasswordVisibility,
    handleChange,
    loginForm,
    resetForm,
  } = useLoginState();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { partner, token } = data?.data;
      createAuthCookie("walletwiseEventAdminToken", token);
      setCurrentUser(partner);
      toast.success("Login success");
      router.push(`/overview`);
      resetForm();
    },
    onError: (error: ApiErrorResponse) => {
      console.log("error logging in", error);
      promiseErrorFunction(error);
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginForm.email) {
      return toast.error("Email is required");
    } else if (!loginForm.password) {
      return toast.error("Password is required");
    }
    mutate(loginForm);
  };

  return {
    showPassword,
    togglePasswordVisibility,
    handleChange,
    handleSubmit,
    loginForm,
    isPending,
  };
};
