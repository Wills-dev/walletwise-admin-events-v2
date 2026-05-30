import TicketWrapper from "@/components/organisms/TicketWrapper/TicketWrapper";
import MainLayout from "@/components/templates/MainLayout/MainLayout";

const TicketPage = () => {
  return (
    <MainLayout pageTitle="Tickets">
      <TicketWrapper />
    </MainLayout>
  );
};

export default TicketPage;
