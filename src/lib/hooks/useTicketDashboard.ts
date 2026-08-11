"use client";

import { useEffect } from "react";

import { useGetTickets } from "@/lib/hooks/useGetTickets";
import { useSelectedPartnerEvent } from "@/lib/hooks/useSelectedPartnerEvent";
import {
  useTicketTableView,
  type TicketTableView,
} from "@/lib/hooks/useTicketTableView";
import type { PartnerTicketsData } from "@/lib/types/tickets";

type TicketDashboardState =
  | { status: "loading" }
  | { status: "no-event" }
  | { status: "error"; retry: () => void }
  | {
      status: "ready";
      data: PartnerTicketsData;
      tableView: TicketTableView;
    };

export const useTicketDashboard = (): TicketDashboardState => {
  const selectedEvent = useSelectedPartnerEvent();
  const { eventId } = selectedEvent;
  const { data, isError, isLoading, refetch } = useGetTickets(eventId);

  const tableView = useTicketTableView(
    eventId,
    data?.data?.tickets_table ?? [],
  );

  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      eventId &&
      data !== undefined
    ) {
      console.log(`All tickets response for event ${eventId}:`, data);
    }
  }, [data, eventId]);

  if (selectedEvent.isResolving || isLoading) {
    return { status: "loading" };
  }

  if (selectedEvent.isError) {
    return {
      status: "error",
      retry: () => void selectedEvent.refetch(),
    };
  }

  if (!eventId) {
    return { status: "no-event" };
  }

  if (isError || !data?.success || !data.data) {
    return {
      status: "error",
      retry: () => void refetch(),
    };
  }

  return {
    status: "ready",
    data: data.data,
    tableView,
  };
};
