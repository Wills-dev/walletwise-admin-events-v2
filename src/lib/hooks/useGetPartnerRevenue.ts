"use client";

import { useQuery } from "@tanstack/react-query";

import { getPartnerRevenue } from "@/lib/api/revenue";
import type { PartnerRevenueParams } from "@/lib/types/revenue";

export const useGetPartnerRevenue = (
  params: PartnerRevenueParams,
  enabled = true,
) => {
  const eventId = params.eventId?.trim() || undefined;
  const search = params.search?.trim() || undefined;

  return useQuery({
    queryKey: [
      "partner revenue",
      eventId ?? "all-events",
      params.page,
      params.limit,
      params.period,
      search ?? "",
    ],
    queryFn: () => getPartnerRevenue({ ...params, eventId, search }),
    enabled,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
