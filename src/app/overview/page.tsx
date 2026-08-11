import MainLoader from "@/components/atoms/MainLoader/MainLoader";
import OverviewWrapper from "@/components/organisms/OverviewWrapper/OverviewWrapper";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<MainLoader />}>
      <MainLayout pageTitle="Dashboard">
        <OverviewWrapper />
      </MainLayout>
    </Suspense>
  );
};

export default page;
