import MainLoader from "@/components/atoms/MainLoader/MainLoader";
import TicketWrapper from "@/components/organisms/TicketWrapper/TicketWrapper";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import { Suspense } from "react";

const TicketPage = () => {
  return (
    <Suspense fallback={<MainLoader />}>
      <MainLayout pageTitle="Tickets">
        <TicketWrapper />
      </MainLayout>
    </Suspense>
  );
};

export default TicketPage;
