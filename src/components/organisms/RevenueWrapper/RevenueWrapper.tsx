"use client";

import { useRevenueDashboard } from "@/lib/hooks/useRevenueDashboard";

import RevenueDashboardContent from "./RevenueDashboardContent";
import RevenueErrorState from "./RevenueErrorState";
import RevenuePageSkeleton from "./RevenuePageSkeleton";

const RevenueWrapper = () => {
  const dashboard = useRevenueDashboard();

  if (dashboard.status === "loading") {
    return <RevenuePageSkeleton />;
  }

  if (dashboard.status === "error") {
    return <RevenueErrorState onRetry={dashboard.retry} />;
  }

  return (
    <RevenueDashboardContent
      data={dashboard.data}
      view={dashboard.view}
    />
  );
};

export default RevenueWrapper;
