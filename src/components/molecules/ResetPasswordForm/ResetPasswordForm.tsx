"use client";

import Link from "next/link";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import { useResetPassword } from "@/lib/hooks/useResetPassword";

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const {
    newPassword,
    confirmPassword,
    showPassword,
    isPending,
    isFormFilled,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
  } = useResetPassword(token);

  if (!token) {
    return (
      <div className="space-y-6 pt-5">
        <p className="text-sm leading-6 text-[#666666]">
          This reset link is invalid or incomplete. Request a new link to
          continue.
        </p>
        <Button href="/forgot-password">Request a new link</Button>
        <p className="text-center text-sm">
          <Link
            href="/login"
            className="font-semibold text-[#5A27CC] transition-colors hover:text-purple-700"
          >
            Back to login
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-5 pt-5" onSubmit={handleSubmit}>
      <p className="text-sm leading-6 text-[#666666]">
        Choose a new password with at least 8 characters.
      </p>
      <div className="space-y-1">
        <Label title="New password" htmlFor="newPassword" />
        <Input
          value={newPassword}
          onChange={handleChange}
          type={showPassword}
          showPassword={showPassword}
          name="newPassword"
          onTogglePassword={togglePasswordVisibility}
          placeholder="Enter new password"
        />
      </div>
      <div className="space-y-1">
        <Label title="Confirm password" htmlFor="confirmPassword" />
        <Input
          value={confirmPassword}
          onChange={handleChange}
          type={showPassword}
          showPassword={showPassword}
          name="confirmPassword"
          onTogglePassword={togglePasswordVisibility}
          placeholder="Confirm new password"
        />
      </div>
      <Button type="submit" loading={isPending} disabled={!isFormFilled}>
        Reset password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
