import LoginForm from "@/components/molecules/LoginForm/LoginForm";
import AuthLayout from "@/components/templates/AuthLayout/AuthLayout";

export default function Home() {
  return (
    <AuthLayout title="Login to WalletWise Events">
      <LoginForm />
    </AuthLayout>
  );
}
