import { useGetCurrentEventStat } from "@/lib/hooks/useGetCurrentEventStat";
import AreaChartContent from "../charts/AreaChartContent/AreaChartContent";
import PieChartContent from "../charts/PieChartContent/PieChartContent";
import CurrentEventSummary from "../CurrentEventSummary/CurrentEventSummary";
import CurrentEventTable from "../CurrentEventTable/CurrentEventTable";
import { useSelectedPartnerEvent } from "@/lib/hooks/useSelectedPartnerEvent";
import AllEventSkeleton from "../AllEventWrapper/AllEventSkeleton";

type RevenueChartItem = {
  period: string;
  revenue: number;
};

type TicketBreakdownItem = {
  type: string;
  revenue: number;
  color: string;
};

const CurrentEventWrapper = () => {
  const selectedEvent = useSelectedPartnerEvent();
  const { eventId } = selectedEvent;

  const { data, isError, isLoading, refetch, filter, setFilter } =
    useGetCurrentEventStat(eventId || "");

  if (isLoading) {
    return <AllEventSkeleton />;
  }

  // if (isError || (data && !data.success)) {
  //   return (
  //     <div
  //       className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-[16px] border border-[#F5F5F5] px-6 py-10 text-center"
  //       role="alert"
  //     >
  //       <div className="space-y-1">
  //         <h3 className="font-medium text-[#262626]">
  //           We couldn&apos;t load event analytics
  //         </h3>
  //         <p className="text-sm text-[#737373]">
  //           Check your connection and try again.
  //         </p>
  //       </div>
  //       <Button type="button" variant="outline" onClick={() => void refetch()}>
  //         Try again
  //       </Button>
  //     </div>
  //   );
  // }

  const revenueChart = (data?.revenueChart ?? []).map(
    (item: RevenueChartItem) => ({
      label: item.period,
      value: item.revenue,
    }),
  );

  const ticketBreakdown = (data?.ticketBreakdown ?? []).map(
    (item: TicketBreakdownItem) => ({
      id: item.type,
      label: item.type,
      value: item.revenue,
      color: item.color,
    }),
  );

  return (
    <div className="space-y-4">
      <CurrentEventSummary summary={data?.summary} />
      <div className="flex gap-4 flex-wrap ">
        <AreaChartContent
          data={revenueChart}
          filter={filter}
          setFilter={setFilter}
          totalRevenue={data?.summary?.totalRevenue || 0}
        />
        <PieChartContent data={ticketBreakdown} title="Ticket Breakdown" />
      </div>
      {/* <CurrentEventTable /> */}
    </div>
  );
};

export default CurrentEventWrapper;
