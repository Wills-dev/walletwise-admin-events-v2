import {
  TrendingUp,
  ChartNoAxesColumnIncreasing,
  Ticket,
  Users,
} from "lucide-react";

import SummaryCard from "@/components/atoms/SummaryCard/SummaryCard";
import SummaryCardWrapper from "../SummaryCardWrapper/SummaryCardWrapper";

const TicketSummary = () => {
  return (
    <SummaryCardWrapper variant="maxThree">
      <SummaryCard title="Unique Attendees" value={"20"} icon={Users}>
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium"> Registered users</span>
        </div>
      </SummaryCard>
      <SummaryCard
        title="Total Tickets Sold"
        value={"40"}
        icon={ChartNoAxesColumnIncreasing}
      >
        <div className="flex items-center gap-1 text-green-500">
          <TrendingUp className="w-3.25 h-3.25" />
          <span className="text-xs font-medium">Across all types</span>
        </div>
      </SummaryCard>
      <SummaryCard
        title="Avg. Spend"
        value={"20,000"}
        currency="NGN"
        icon={Ticket}
      >
        <div className="flex items-center gap-1 text-green-500">
          <TrendingUp className="w-3.25 h-3.25" />
          <span className="text-xs font-medium">Per attendee</span>
        </div>
      </SummaryCard>
    </SummaryCardWrapper>
  );
};

export default TicketSummary;
