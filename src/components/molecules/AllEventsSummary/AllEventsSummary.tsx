import {
  ChartNoAxesColumnIncreasing,
  Ticket,
  Users,
  MicVocal,
  Coins,
  LayoutDashboard,
} from "lucide-react";

import SummaryCardWrapper from "../SummaryCardWrapper/SummaryCardWrapper";
import SummaryCard from "@/components/atoms/SummaryCard/SummaryCard";

const AllEventsSummary = () => {
  return (
    <SummaryCardWrapper variant="maxFour">
      <SummaryCard
        title="Total Revenue"
        value={"6.4M"}
        currency="NGN"
        icon={ChartNoAxesColumnIncreasing}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium"> ₦1.6M avg per event</span>
        </div>
      </SummaryCard>
      <SummaryCard title="Total Events" value={"4"} icon={MicVocal}>
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">
            {" "}
            4 completed • 2 upcoming{" "}
          </span>
        </div>
      </SummaryCard>
      <SummaryCard title="Tickets Sold" value={"457"} icon={Ticket}>
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">114 avg per event</span>
        </div>
      </SummaryCard>
      <SummaryCard title="Total Attendees" value={"349"} icon={Users}>
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">
            76% conversion from sold tickets
          </span>
        </div>
      </SummaryCard>
      <SummaryCard
        currency="NGN"
        title="Avg. revenue per event"
        value={"200k"}
        icon={Coins}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">
            Best: ₦2.4M • Lowest: ₦48k
          </span>
        </div>
      </SummaryCard>
      <SummaryCard
        title="Top performing event"
        value={"Miss Nigeria"}
        icon={MicVocal}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">
            ₦2.4M revenue • 180 attendees
          </span>
        </div>
      </SummaryCard>
      <SummaryCard
        title="Avg. tickets per event"
        value={"13"}
        icon={LayoutDashboard}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">Across 4 completed events</span>
        </div>
      </SummaryCard>
      <SummaryCard title="Fill rate" value={"29%"} icon={Users}>
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">228 of 780 seats filled</span>
        </div>
      </SummaryCard>
    </SummaryCardWrapper>
  );
};

export default AllEventsSummary;
