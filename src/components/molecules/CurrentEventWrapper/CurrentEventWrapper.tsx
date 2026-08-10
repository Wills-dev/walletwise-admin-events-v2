import AreaChartContent from "../charts/AreaChartContent/AreaChartContent";
import PieChartContent from "../charts/PieChartContent/PieChartContent";
import CurrentEventSummary from "../CurrentEventSummary/CurrentEventSummary";
import CurrentEventTable from "../CurrentEventTable/CurrentEventTable";

const ticketBreakdown = [
  { id: "regular", label: "Regular", value: 2275, color: "#2B7FFF" },
  { id: "vip", label: "VIP", value: 2000, color: "#E17100" },
  { id: "vvip", label: "VVIP", value: 187, color: "#00C950" },
];

const CurrentEventWrapper = () => {
  return (
    <div className="space-y-4">
      <CurrentEventSummary />
      <div className="flex gap-4 flex-wrap ">
        <AreaChartContent />
        <PieChartContent
          data={ticketBreakdown}
          title="Ticket Breakdown"
        />
      </div>
      <CurrentEventTable />
    </div>
  );
};

export default CurrentEventWrapper;
