"use client";

import { useMutation } from "@tanstack/react-query";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { toast } from "sonner";

import { changePartnerPassword } from "@/lib/api/partner";
import type { ApiErrorResponse } from "@/lib/types";
import { promiseErrorFunction } from "@/lib/types";

interface ChangePasswordFormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

type PasswordField = keyof ChangePasswordFormState;
type PasswordVisibility = Record<PasswordField, boolean>;

const initialFormState: ChangePasswordFormState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const initialVisibility: PasswordVisibility = {
  currentPassword: false,
  newPassword: false,
  confirmPassword: false,
};

export const useChangePassword = () => {
  const [form, setForm] = useState(initialFormState);
  const [visibility, setVisibility] =
    useState<PasswordVisibility>(initialVisibility);
  const mutation = useMutation({
    mutationFn: changePartnerPassword,
    onSuccess: (response) => {
      if (response?.success === false) {
        toast.error(response.message || "Unable to change password");
        return;
      }

      toast.success(response?.message || "Password changed successfully");
      setForm(initialFormState);
      setVisibility(initialVisibility);
    },
    onError: (error: ApiErrorResponse) => {
      promiseErrorFunction(error);
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name as keyof ChangePasswordFormState;

    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      toast.error("Complete all password fields");
      return;
    }

    if (form.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    if (form.currentPassword === form.newPassword) {
      toast.error("New password must be different from the current password");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    mutation.mutate({
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
    });
  };

  return {
    ...form,
    visibility,
    isPending: mutation.isPending,
    isFormFilled: Boolean(
      form.currentPassword && form.newPassword && form.confirmPassword,
    ),
    handleChange,
    handleSubmit,
    togglePasswordVisibility: (field: PasswordField) =>
      setVisibility((current) => ({
        ...current,
        [field]: !current[field],
      })),
  };
};
