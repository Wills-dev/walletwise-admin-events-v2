"use client";

import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  getPartnerEventGallery,
  normalizePartnerEventGallery,
} from "@/lib/api/gallery";

export const PARTNER_EVENT_GALLERY_QUERY_KEY = [
  "partner event gallery",
] as const;

export const getPartnerEventGalleryQueryKey = (eventId: string) =>
  [...PARTNER_EVENT_GALLERY_QUERY_KEY, eventId] as const;

export const useGetPartnerEventGallery = (eventId: string | null) => {
  const normalizedEventId = eventId?.trim() || null;
  const query = useQuery({
    queryKey: getPartnerEventGalleryQueryKey(
      normalizedEventId ?? "unselected",
    ),
    queryFn: () => getPartnerEventGallery(normalizedEventId ?? ""),
    enabled: Boolean(normalizedEventId),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && query.data !== undefined) {
      console.log("GET /partner-event/gallery/:eventId response:", {
        eventId: normalizedEventId,
        response: query.data,
      });
    }
  }, [normalizedEventId, query.data]);

  const images = useMemo(
    () =>
      query.data === undefined
        ? undefined
        : normalizePartnerEventGallery(query.data),
    [query.data],
  );

  return {
    ...query,
    images,
    hasUnsupportedResponse: query.data !== undefined && images === null,
  };
};
