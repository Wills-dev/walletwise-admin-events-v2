"use client";

import Link from "next/link";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import { useForgotPassword } from "@/lib/hooks/useForgotPassword";

const ForgotPasswordForm = () => {
  const { email, emailSent, isPending, handleChange, handleSubmit } =
    useForgotPassword();

  if (emailSent) {
    return (
      <div className="space-y-6 pt-5">
        <p className="text-sm leading-6 text-[#666666]">
          If an account exists for <strong>{email}</strong>, you’ll receive an
          email with instructions to reset your password.
        </p>
        <Button href="/login">Back to login</Button>
      </div>
    );
  }

  return (
    <form className="space-y-5 pt-5" onSubmit={handleSubmit}>
      <p className="text-sm leading-6 text-[#666666]">
        Enter the email address linked to your account and we’ll send you reset
        instructions.
      </p>
      <div className="space-y-1">
        <Label title="Email" htmlFor="email" />
        <Input
          value={email}
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Enter email"
        />
      </div>
      <Button type="submit" loading={isPending} disabled={!email.trim()}>
        Send reset link
      </Button>
      <p className="text-center text-sm text-[#666666]">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#5A27CC] transition-colors hover:text-purple-700"
        >
          Back to login
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
