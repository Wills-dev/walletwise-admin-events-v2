import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { resetPassword } from "@/lib/api";
import {
  ApiErrorResponse,
  promiseErrorFunction,
} from "@/lib/types";

export const useResetPassword = (token: string) => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState<"password" | "text">(
    "password",
  );

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully. You can now log in.");
      router.push("/login");
    },
    onError: (error: ApiErrorResponse) => {
      promiseErrorFunction(error);
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "newPassword") {
      setNewPassword(value);
      return;
    }

    setConfirmPassword(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((current) =>
      current === "password" ? "text" : "password",
    );
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      toast.error("This password reset link is invalid or incomplete");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    mutate({ token, newPassword });
  };

  return {
    newPassword,
    confirmPassword,
    showPassword,
    isPending,
    isFormFilled: Boolean(newPassword && confirmPassword),
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
  };
};
