import OverviewWrapper from "@/components/organisms/OverviewWrapper/OverviewWrapper";
import MainLayout from "@/components/templates/MainLayout/MainLayout";

const page = () => {
  return (
    <MainLayout pageTitle="Dashboard">
      <OverviewWrapper />
    </MainLayout>
  );
};

export default page;
