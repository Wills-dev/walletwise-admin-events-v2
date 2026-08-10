"use client";

import { useQuery } from "@tanstack/react-query";

import { getTickets } from "@/lib/api/ticket";

export const useGetTickets = (eventId: string | null) => {
  const query = useQuery({
    queryKey: ["tickets", eventId],
    queryFn: () => getTickets(eventId!),
    enabled: Boolean(eventId),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    data: query.data,
    isError: query.isError,
    isLoading: query.isLoading,
    refetch: query.refetch,
    eventId,
  };
};
