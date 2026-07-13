import LoginForm from "@/components/molecules/LoginForm/LoginForm";
import AuthLayout from "@/components/templates/AuthLayout/AuthLayout";

const page = () => {
  return (
    <AuthLayout title="Login to WalletWise Events">
      <LoginForm />
    </AuthLayout>
  );
};

export default page;
