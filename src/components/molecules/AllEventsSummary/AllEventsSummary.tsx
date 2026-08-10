import {
  ChartNoAxesColumnIncreasing,
  Coins,
  LayoutDashboard,
  MicVocal,
  Ticket,
  Users,
} from "lucide-react";

import SummaryCard from "@/components/atoms/SummaryCard/SummaryCard";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";
import type {
  PartnerEventAnalyticsSummary,
  TopPerformingEvent,
} from "@/lib/types/analytics";

import SummaryCardWrapper from "../SummaryCardWrapper/SummaryCardWrapper";

interface AllEventsSummaryProps {
  summary: PartnerEventAnalyticsSummary;
  topPerformingEvent: TopPerformingEvent | null;
}

const AllEventsSummary = ({
  summary,
  topPerformingEvent,
}: AllEventsSummaryProps) => {
  const ticketToAttendeeConversion = summary.totalTicketsSold
    ? Math.round((summary.totalAttendees / summary.totalTicketsSold) * 100)
    : 0;
  const eventLabel = summary.totalEvents === 1 ? "event" : "events";

  return (
    <SummaryCardWrapper variant="maxFour">
      <SummaryCard
        title="Total Revenue"
        value={numberWithCommas(summary.totalRevenue)}
        currency="NGN"
        icon={ChartNoAxesColumnIncreasing}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">
            ₦{numberWithCommas(summary.averageRevenuePerEvent)} avg per event
          </span>
        </div>
      </SummaryCard>
      <SummaryCard
        title="Total Events"
        value={numberWithCommas(summary.totalEvents)}
        icon={MicVocal}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">
            Across your event portfolio
          </span>
        </div>
      </SummaryCard>
      <SummaryCard
        title="Tickets Sold"
        value={numberWithCommas(summary.totalTicketsSold)}
        icon={Ticket}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">
            {numberWithCommas(summary.averageTicketsPerEvent)} avg per event
          </span>
        </div>
      </SummaryCard>
      <SummaryCard
        title="Total Attendees"
        value={numberWithCommas(summary.totalAttendees)}
        icon={Users}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">
            {summary.totalTicketsSold
              ? `${ticketToAttendeeConversion}% conversion from sold tickets`
              : "No ticket sales yet"}
          </span>
        </div>
      </SummaryCard>
      <SummaryCard
        currency="NGN"
        title="Avg. revenue per event"
        value={numberWithCommas(summary.averageRevenuePerEvent)}
        icon={Coins}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">
            Based on {numberWithCommas(summary.totalEvents)} {eventLabel}
          </span>
        </div>
      </SummaryCard>
      <SummaryCard
        title="Top performing event"
        value={topPerformingEvent?.title ?? "No event yet"}
        icon={MicVocal}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">
            {topPerformingEvent
              ? `₦${numberWithCommas(topPerformingEvent.revenue)} revenue • ${numberWithCommas(topPerformingEvent.ticketsSold)} tickets sold`
              : "Performance data will appear here"}
          </span>
        </div>
      </SummaryCard>
      <SummaryCard
        title="Avg. tickets per event"
        value={numberWithCommas(summary.averageTicketsPerEvent)}
        icon={LayoutDashboard}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">
            Across {numberWithCommas(summary.totalEvents)} {eventLabel}
          </span>
        </div>
      </SummaryCard>
    </SummaryCardWrapper>
  );
};

export default AllEventsSummary;
