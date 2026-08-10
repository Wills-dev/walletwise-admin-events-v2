"use client";

import { useSelectedEventStore } from "@/store/selectedEventStore";

export const useEventAwareHref = (href: string) => {
  const eventId = useSelectedEventStore((state) => state.selectedEventId);

  if (!eventId) {
    return href;
  }

  const params = new URLSearchParams();
  params.set("event", eventId);

  return `${href}?${params.toString()}`;
};
