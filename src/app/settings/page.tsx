import MainLoader from "@/components/atoms/MainLoader/MainLoader";
import SettingWrapper from "@/components/organisms/SettingWrapper/SettingWrapper";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<MainLoader />}>
      <MainLayout pageTitle="Settings">
        <SettingWrapper />
      </MainLayout>
    </Suspense>
  );
};

export default page;
