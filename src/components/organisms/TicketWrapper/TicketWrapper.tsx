"use client";

import TicketEmptyState from "@/components/molecules/TicketEmptyState/TicketEmptyState";
import { useTicketDashboard } from "@/lib/hooks/useTicketDashboard";

import TicketDashboardContent from "./TicketDashboardContent";
import TicketErrorState from "./TicketErrorState";
import TicketPageSkeleton from "./TicketPageSkeleton";

const TicketWrapper = () => {
  const dashboard = useTicketDashboard();

  if (dashboard.status === "loading") {
    return <TicketPageSkeleton />;
  }

  if (dashboard.status === "no-event") {
    return <TicketEmptyState variant="no-event" />;
  }

  if (dashboard.status === "error") {
    return <TicketErrorState onRetry={dashboard.retry} />;
  }

  return (
    <TicketDashboardContent
      data={dashboard.data}
      tableView={dashboard.tableView}
    />
  );
};

export default TicketWrapper;
