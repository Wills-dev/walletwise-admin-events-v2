import VerifyForm from "@/components/molecules/forms/VerifyForm/VerifyForm";
import AuthLayout from "@/components/templates/AuthLayout/AuthLayout";

const page = () => {
  return (
    <AuthLayout title="Verify OTP sent to your email.">
      <VerifyForm />
    </AuthLayout>
  );
};

export default page;
