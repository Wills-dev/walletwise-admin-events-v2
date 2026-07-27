import ForgotPasswordForm from "@/components/molecules/ForgotPasswordForm/ForgotPasswordForm";
import AuthLayout from "@/components/templates/AuthLayout/AuthLayout";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout title="Forgot your password?">
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
