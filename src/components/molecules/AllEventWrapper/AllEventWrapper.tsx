"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useGetCurrentTicket } from "@/lib/hooks/useGetCurrentTicket";
import { useGetPartnerEventAnalytics } from "@/lib/hooks/useGetPartnerEventAnalytics";
import type { PartnerEventAnalyticsSummary } from "@/lib/types/analytics";

import AllEventTable from "../AllEventTable/AllEventTable";
import AllEventsSummary from "../AllEventsSummary/AllEventsSummary";
import BarChartContent from "../charts/BarChartContent/BarChartContent";
import PieChartContent from "../charts/PieChartContent/PieChartContent";
import AllEventSkeleton from "./AllEventSkeleton";

const emptySummary: PartnerEventAnalyticsSummary = {
  totalEvents: 0,
  totalRevenue: 0,
  totalTicketsSold: 0,
  totalAttendees: 0,
  averageRevenuePerEvent: 0,
  averageTicketsPerEvent: 0,
};

const AllEventWrapper = () => {
  const { currentPage, limit, setLimit, goToPage } = useGetCurrentTicket();
  const { data, isError, isLoading, refetch } =
    useGetPartnerEventAnalytics({
      page: currentPage,
      limit,
    });
  const responsePagination = data?.data?.pagination;
  const totalPages = Math.max(responsePagination?.totalPages ?? 1, 1);
  const responsePage = responsePagination
    ? Math.min(Math.max(responsePagination.page, 1), totalPages)
    : undefined;
  const displayedPage = responsePage ?? currentPage;

  useEffect(() => {
    if (responsePage !== undefined && responsePage !== currentPage) {
      goToPage(responsePage);
    }
  }, [currentPage, goToPage, responsePage]);

  if (isLoading) {
    return <AllEventSkeleton />;
  }

  if (isError || (data && !data.success)) {
    return (
      <div
        className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-[16px] border border-[#F5F5F5] px-6 py-10 text-center"
        role="alert"
      >
        <div className="space-y-1">
          <h3 className="font-medium text-[#262626]">
            We couldn&apos;t load event analytics
          </h3>
          <p className="text-sm text-[#737373]">
            Check your connection and try again.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => void refetch()}
        >
          Try again
        </Button>
      </div>
    );
  }

  const analytics = data?.data;
  const summary = analytics?.summary ?? emptySummary;
  const revenueByEvent = (analytics?.revenueByEvent ?? []).map((item) => ({
    id: item.eventId,
    label: item.event,
    value: item.revenue,
  }));
  const revenueByCategory = (analytics?.revenueByCategory ?? []).map(
    (item) => ({
      id: item.category,
      label: item.category,
      value: item.revenue,
      color: item.color,
    }),
  );

  return (
    <div className="space-y-4">
      <AllEventsSummary
        summary={summary}
        topPerformingEvent={analytics?.topPerformingEvent ?? null}
      />
      <div className="flex flex-wrap gap-4">
        <BarChartContent
          data={revenueByEvent}
          title="Revenue by event"
          total={summary.totalRevenue}
        />
        <PieChartContent
          data={revenueByCategory}
          title="Revenue by category"
          total={summary.totalRevenue}
        />
      </div>
      <AllEventTable
        data={analytics?.eventsTable ?? []}
        totalPages={totalPages}
        currentPage={displayedPage}
        prevPage={() => goToPage(Math.max(displayedPage - 1, 1))}
        nextPage={(lastPage) =>
          goToPage(Math.min(displayedPage + 1, lastPage))
        }
        goToFirstPage={() => goToPage(1)}
        goToLastPage={(lastPage) => goToPage(lastPage)}
        isFirstPage={() => displayedPage <= 1}
        isLastPage={(lastPage) => displayedPage >= lastPage}
        limit={limit}
        setLimit={setLimit}
      />
    </div>
  );
};

export default AllEventWrapper;
