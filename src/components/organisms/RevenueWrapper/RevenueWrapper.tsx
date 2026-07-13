import RevenueBreakdownTable from "@/components/molecules/RevenueBreakdownTable/RevenueBreakdownTable";
import RevenueSummary from "@/components/molecules/RevenueSummary/RevenueSummary";

const RevenueWrapper = () => {
  return (
    <div className="space-y-4">
      <RevenueSummary />
      <RevenueBreakdownTable />
    </div>
  );
};

export default RevenueWrapper;
