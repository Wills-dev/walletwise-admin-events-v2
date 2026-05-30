import { useState } from "react";
import { LoginProps } from "../types";

export const useLoginState = () => {
  const [showPassword, setShowPassword] = useState<"text" | "password">(
    "password"
  );
  const [loginForm, setLoginForm] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const resetForm = () => {
    setLoginForm({
      email: "",
      password: "",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  return {
    showPassword,
    togglePasswordVisibility,
    handleChange,
    loginForm,
    resetForm,
  };
};
