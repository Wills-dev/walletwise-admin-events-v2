import AreaChartContent from "../charts/AreaChartContent/AreaChartContent";
import PieChartContent from "../charts/PieChartContent/PieChartContent";
import CurrentEventSummary from "../CurrentEventSummary/CurrentEventSummary";
import CurrentEventTable from "../CurrentEventTable/CurrentEventTable";

const CurrentEventWrapper = () => {
  return (
    <div className="space-y-4">
      <CurrentEventSummary />
      <div className="flex gap-4 flex-wrap ">
        <AreaChartContent />
        <PieChartContent />
      </div>
      <CurrentEventTable />
    </div>
  );
};

export default CurrentEventWrapper;
