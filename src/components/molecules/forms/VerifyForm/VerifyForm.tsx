"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useVerifyLogin } from "@/lib/hooks/useVerifyLogin";

import Button from "@/components/atoms/Button/Button";

const VerifyForm = () => {
  const { otp, setOtp, handleSubmit, isPending } = useVerifyLogin();

  return (
    <form className="space-y-6 pt-7" onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={otp}
          onChange={(value) => setOtp(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button type="submit" loading={isPending} disabled={otp.trim() === ""}>
        Proceed
      </Button>
    </form>
  );
};

export default VerifyForm;
