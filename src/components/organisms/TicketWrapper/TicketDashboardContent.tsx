import TicketSummary from "@/components/molecules/TicketSummary/TicketSummary";
import type { TicketTableView } from "@/lib/hooks/useTicketTableView";
import type { PartnerTicketsData } from "@/lib/types/tickets";

import TicketTablePanel from "./TicketTablePanel";

interface TicketDashboardContentProps {
  data: PartnerTicketsData;
  tableView: TicketTableView;
}

const TicketDashboardContent = ({
  data,
  tableView,
}: TicketDashboardContentProps) => {
  return (
    <div className="space-y-4">
      <TicketSummary data={data} />
      <TicketTablePanel
        tickets={data.tickets_table ?? []}
        tableView={tableView}
      />
    </div>
  );
};

export default TicketDashboardContent;
