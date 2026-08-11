"use client";

import RevenueBreakdownTable from "@/components/molecules/RevenueBreakdownTable/RevenueBreakdownTable";
import RevenueByTicketType from "@/components/molecules/RevenueByTicketType/RevenueByTicketType";
import RevenueSummary from "@/components/molecules/RevenueSummary/RevenueSummary";
import type { RevenueViewModel } from "@/lib/hooks/useRevenueViewState";
import type { RevenueDashboardData } from "@/lib/types/revenue";

interface RevenueDashboardContentProps {
  data: RevenueDashboardData;
  view: RevenueViewModel;
}

const RevenueDashboardContent = ({
  data,
  view,
}: RevenueDashboardContentProps) => {
  const totalPages = data.pagination?.totalPages ?? 1;
  const currentPage = data.pagination?.page ?? 1;
  const limit =
    data.pagination?.limit ?? Math.max(data.monthlyBreakdown.length, 1);

  return (
    <div className="space-y-7">
      <RevenueSummary
        totalRevenue={data.totalRevenue}
        averageOrderValue={data.averageOrderValue}
      />
      <RevenueByTicketType
        items={data.revenueByTicketType}
        totalRevenue={data.totalRevenue}
      />
      <RevenueBreakdownTable
        data={data.monthlyBreakdown}
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
        search={view.searchDraft}
        submittedSearch={view.params.search}
        setPage={view.actions.setPage}
        setLimit={view.actions.setLimit}
        setSearch={view.actions.setSearchDraft}
        submitSearch={view.actions.submitSearch}
        clearSearch={view.actions.clearSearch}
      />
    </div>
  );
};

export default RevenueDashboardContent;
