import ResetPasswordForm from "@/components/molecules/ResetPasswordForm/ResetPasswordForm";
import AuthLayout from "@/components/templates/AuthLayout/AuthLayout";

const ResetPasswordPage = async ({
  searchParams,
}: PageProps<"/reset-password">) => {
  const { token } = await searchParams;
  const resetToken = Array.isArray(token) ? token[0] : (token ?? "");

  return (
    <AuthLayout title="Create a new password">
      <ResetPasswordForm token={resetToken} />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
