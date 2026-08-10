"use client";

import { useQuery } from "@tanstack/react-query";

import { getPartnerEventAnalytics } from "@/lib/api/event";
import type { PartnerEventAnalyticsParams } from "@/lib/types/analytics";

export const useGetPartnerEventAnalytics = (
  params: PartnerEventAnalyticsParams = {},
) => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["partner event analytics", params.page, params.limit],
    queryFn: () => getPartnerEventAnalytics(params),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};
