"use client";

import { useQuery } from "@tanstack/react-query";

import { getPartnerEvent } from "@/lib/api/event";

export const PARTNER_EVENT_QUERY_KEY = ["partner event details"] as const;

export const getPartnerEventQueryKey = (eventId: string) =>
  [...PARTNER_EVENT_QUERY_KEY, eventId] as const;

export const useGetPartnerEvent = (
  eventId: string | null,
  enabled = true,
) =>
  useQuery({
    queryKey: getPartnerEventQueryKey(eventId ?? "unselected"),
    queryFn: () => getPartnerEvent(eventId ?? ""),
    enabled: enabled && Boolean(eventId),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
