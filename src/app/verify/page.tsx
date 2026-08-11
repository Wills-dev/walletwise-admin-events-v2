import MainLoader from "@/components/atoms/MainLoader/MainLoader";
import VerifyForm from "@/components/molecules/forms/VerifyForm/VerifyForm";
import AuthLayout from "@/components/templates/AuthLayout/AuthLayout";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<MainLoader />}>
      <AuthLayout title="Verify OTP sent to your email.">
        <VerifyForm />
      </AuthLayout>
    </Suspense>
  );
};

export default page;
