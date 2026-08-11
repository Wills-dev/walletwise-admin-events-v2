import MainLoader from "@/components/atoms/MainLoader/MainLoader";
import RevenueWrapper from "@/components/organisms/RevenueWrapper/RevenueWrapper";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<MainLoader />}>
      <MainLayout pageTitle="Revenue">
        <RevenueWrapper />
      </MainLayout>
    </Suspense>
  );
};

export default page;
