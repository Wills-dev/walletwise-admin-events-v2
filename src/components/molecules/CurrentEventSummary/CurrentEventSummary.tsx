import {
  TrendingUp,
  ChartNoAxesColumnIncreasing,
  Ticket,
  Users,
} from "lucide-react";

import SummaryCardWrapper from "../SummaryCardWrapper/SummaryCardWrapper";
import SummaryCard from "@/components/atoms/SummaryCard/SummaryCard";

const CurrentEventSummary = () => {
  return (
    <SummaryCardWrapper variant="maxThree">
      <SummaryCard
        title="Total Revenue"
        value={"501k"}
        currency="NGN"
        icon={ChartNoAxesColumnIncreasing}
      >
        <div className="flex items-center gap-1 text-green-500">
          <TrendingUp className="w-3.25 h-3.25" />
          <span className="text-xs font-medium">+8.4% this month</span>
        </div>
      </SummaryCard>
      <SummaryCard title="Total Tickets" value={"40"} icon={Ticket}>
        <div className="flex items-center gap-1 text-green-500">
          <TrendingUp className="w-3.25 h-3.25" />
          <span className="text-xs font-medium">+12% this month</span>
        </div>
      </SummaryCard>
      <SummaryCard title="Total Attendees" value={"20"} icon={Users}>
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium"> Unique registrants</span>
        </div>
      </SummaryCard>
    </SummaryCardWrapper>
  );
};

export default CurrentEventSummary;
