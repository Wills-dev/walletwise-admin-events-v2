"use client";

import { useQuery } from "@tanstack/react-query";

import { getPartnerEventAnalytics } from "@/lib/api/event";

export const useGetPartnerEventAnalytics = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["partner event analytics"],
    queryFn: () => getPartnerEventAnalytics(),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    data,
    isLoading,
  };
};
