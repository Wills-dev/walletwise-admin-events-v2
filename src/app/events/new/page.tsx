import MainLoader from "@/components/atoms/MainLoader/MainLoader";
import NewEventWrapper from "@/components/organisms/NewEventWrapper/NewEventWrapper";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<MainLoader />}>
      <MainLayout pageTitle="Create event">
        <NewEventWrapper />
      </MainLayout>
    </Suspense>
  );
};

export default page;
