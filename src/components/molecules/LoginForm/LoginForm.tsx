"use client";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";

import { areAllFieldsFilled } from "@/lib/helpers/areAllFieldsFilled";
import { useLogin } from "@/lib/hooks/useLogin";

const LoginForm = () => {
  const {
    showPassword,
    togglePasswordVisibility,
    handleChange,
    handleSubmit,
    loginForm,
    isPending,
  } = useLogin();

  const isFormFilled = areAllFieldsFilled(loginForm);

  return (
    <form className="space-y-4 pt-7" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <Label title="Email" htmlFor="email" />
        <Input
          value={loginForm.email}
          onChange={handleChange}
          name="email"
          type="text"
          placeholder="Enter email"
        />
      </div>
      <div className="space-y-1">
        <Label title="Password" htmlFor="password" />
        <Input
          value={loginForm.password}
          onChange={handleChange}
          type={showPassword}
          showPassword={showPassword}
          name="password"
          onTogglePassword={togglePasswordVisibility}
          placeholder="Enter password"
        />
      </div>
      <Button type="submit" loading={isPending} disabled={!isFormFilled}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
