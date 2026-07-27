import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { forgotPassword } from "@/lib/api";
import {
  ApiErrorResponse,
  promiseErrorFunction,
} from "@/lib/types";

export const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setEmailSent(true);
      toast.success("Password reset instructions sent");
    },
    onError: (error: ApiErrorResponse) => {
      promiseErrorFunction(error);
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    mutate(email.trim());
  };

  return {
    email,
    emailSent,
    isPending,
    handleChange,
    handleSubmit,
  };
};
