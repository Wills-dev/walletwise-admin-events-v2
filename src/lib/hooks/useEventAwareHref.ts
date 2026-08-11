"use client";

import { useSearchParams } from "next/navigation";

import { useSelectedEventStore } from "@/store/selectedEventStore";

export const useEventAwareHref = (href: string) => {
  const searchParams = useSearchParams();
  const storedEventId = useSelectedEventStore(
    (state) => state.selectedEventId,
  );
  const eventId = searchParams.get("event") ?? storedEventId;

  if (!eventId) {
    return href;
  }

  const params = new URLSearchParams();
  params.set("event", eventId);

  return `${href}?${params.toString()}`;
};
