"use client";

import { useEffect } from "react";

import { normalizePartnerRevenueData } from "@/lib/helpers/revenue";
import { useGetPartnerRevenue } from "@/lib/hooks/useGetPartnerRevenue";
import {
  useRevenueViewState,
  type RevenueViewModel,
} from "@/lib/hooks/useRevenueViewState";
import { useSelectedPartnerEvent } from "@/lib/hooks/useSelectedPartnerEvent";
import type { RevenueDashboardData } from "@/lib/types/revenue";

type RevenueDashboardState =
  | { status: "loading" }
  | { status: "error"; retry: () => void }
  | {
      status: "ready";
      data: RevenueDashboardData;
      view: RevenueViewModel;
    };

export const useRevenueDashboard = (): RevenueDashboardState => {
  const selectedEvent = useSelectedPartnerEvent();
  const view = useRevenueViewState(selectedEvent.eventId);
  const query = useGetPartnerRevenue(
    view.params,
    !selectedEvent.isResolving && !selectedEvent.isError,
  );

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && query.data !== undefined) {
      console.log("Partner revenue response:", {
        params: view.params,
        response: query.data,
      });
    }
  }, [query.data, view.params]);

  if (selectedEvent.isResolving || query.isLoading) {
    return { status: "loading" };
  }

  if (selectedEvent.isError) {
    return {
      status: "error",
      retry: () => void selectedEvent.refetch(),
    };
  }

  if (query.isError || !query.data?.success || !query.data.data) {
    return {
      status: "error",
      retry: () => void query.refetch(),
    };
  }

  return {
    status: "ready",
    data: normalizePartnerRevenueData(query.data.data),
    view,
  };
};
