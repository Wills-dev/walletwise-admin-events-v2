import NewEventWrapper from "@/components/organisms/NewEventWrapper/NewEventWrapper";
import MainLayout from "@/components/templates/MainLayout/MainLayout";

const page = () => {
  return (
    <MainLayout pageTitle="Create event">
      <NewEventWrapper />
    </MainLayout>
  );
};

export default page;
