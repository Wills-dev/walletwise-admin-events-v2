import AllEventsSummary from "../AllEventsSummary/AllEventsSummary";
import AllEventTable from "../AllEventTable/AllEventTable";
import BarChartContent from "../charts/BarChartContent/BarChartContent";
import PieChartContent from "../charts/PieChartContent/PieChartContent";

const AllEventWrapper = () => {
  return (
    <div className="space-y-4">
      <AllEventsSummary />
      <div className="flex gap-4 flex-wrap">
        <BarChartContent />
        <PieChartContent />
      </div>
      <AllEventTable />
    </div>
  );
};

export default AllEventWrapper;
