import {
  TrendingUp,
  ChartNoAxesColumnIncreasing,
  Ticket,
  Users,
} from "lucide-react";

import SummaryCardWrapper from "../SummaryCardWrapper/SummaryCardWrapper";
import SummaryCard from "@/components/atoms/SummaryCard/SummaryCard";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";

const CurrentEventSummary = ({
  summary,
}: {
  summary: {
    totalOrders: number;
    totalRevenue: number;
    totalTicketsSold: number;
  };
}) => {
  return (
    <SummaryCardWrapper variant="maxThree">
      <SummaryCard
        title="Gross Revenue"
        value={
          summary?.totalRevenue ? numberWithCommas(summary?.totalRevenue) : 0
        }
        currency="NGN"
        icon={ChartNoAxesColumnIncreasing}
      >
        <div className="flex items-center gap-1 text-green-500">
          <TrendingUp className="w-3.25 h-3.25" />
          <span className="text-xs font-medium">+3.5% vs last periodh</span>
        </div>
      </SummaryCard>
      <SummaryCard
        title="Order Value"
        value={
          summary?.totalOrders ? numberWithCommas(summary?.totalOrders) : 0
        }
        icon={Ticket}
      >
        <div className="flex items-center gap-1 text-green-500">
          <TrendingUp className="w-3.25 h-3.25" />
          <span className="text-xs font-medium">+12% this month</span>
        </div>
      </SummaryCard>
      <SummaryCard
        title="Total Attendees"
        value={
          summary?.totalTicketsSold
            ? numberWithCommas(summary?.totalTicketsSold)
            : 0
        }
        icon={Users}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium"> Unique registrants</span>
        </div>
      </SummaryCard>
    </SummaryCardWrapper>
  );
};

export default CurrentEventSummary;
