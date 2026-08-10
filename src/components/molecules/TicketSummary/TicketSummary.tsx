import {
  ChartNoAxesColumnIncreasing,
  Coins,
  Ticket,
  Users,
} from "lucide-react";

import SummaryCard from "@/components/atoms/SummaryCard/SummaryCard";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";
import type { PartnerTicketsData } from "@/lib/types/tickets";

import SummaryCardWrapper from "../SummaryCardWrapper/SummaryCardWrapper";

interface TicketSummaryProps {
  data: PartnerTicketsData;
}

const TicketSummary = ({ data }: TicketSummaryProps) => {
  return (
    <SummaryCardWrapper variant="maxFour">
      <SummaryCard
        title="Unique Attendees"
        value={numberWithCommas(data.unique_attendees)}
        icon={Users}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">Registered attendees</span>
        </div>
      </SummaryCard>
      <SummaryCard
        title="Total Tickets Sold"
        value={numberWithCommas(data.total_tickets_sold)}
        icon={Ticket}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">Across all ticket types</span>
        </div>
      </SummaryCard>
      <SummaryCard
        title="Total Revenue"
        value={numberWithCommas(data.total_revenue)}
        currency="NGN"
        icon={ChartNoAxesColumnIncreasing}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">From ticket sales</span>
        </div>
      </SummaryCard>
      <SummaryCard
        title="Average Spending"
        value={numberWithCommas(data.average_spending)}
        currency="NGN"
        icon={Coins}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">Per attendee</span>
        </div>
      </SummaryCard>
    </SummaryCardWrapper>
  );
};

export default TicketSummary;
