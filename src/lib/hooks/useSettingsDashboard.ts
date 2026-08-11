"use client";

import { useEffect } from "react";

import { getLocalDate } from "@/lib/helpers/getLocalDate";
import { normalizePartnerEventDetails } from "@/lib/helpers/settings";
import { useGetPartnerEvent } from "@/lib/hooks/useGetPartnerEvent";
import { useSelectedPartnerEvent } from "@/lib/hooks/useSelectedPartnerEvent";
import type { PartnerEventSettings } from "@/lib/types/settings";

type SettingsDashboardState =
  | { status: "loading" }
  | { status: "no-event" }
  | { status: "error"; retry: () => void }
  | {
      status: "ready";
      eventId: string;
      event: PartnerEventSettings;
      phase: "editable" | "past" | "unknown";
    };

const getEventPhase = (date: string) => {
  if (!date) {
    return "unknown" as const;
  }

  return date < getLocalDate() ? ("past" as const) : ("editable" as const);
};

export const useSettingsDashboard = (): SettingsDashboardState => {
  const selectedEvent = useSelectedPartnerEvent();
  const eventQuery = useGetPartnerEvent(
    selectedEvent.eventId,
    !selectedEvent.isResolving && !selectedEvent.isError,
  );

  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      eventQuery.data !== undefined
    ) {
      console.log("GET /partner-event/events/:eventId response:", {
        eventId: selectedEvent.eventId,
        response: eventQuery.data,
      });
    }
  }, [eventQuery.data, selectedEvent.eventId]);

  const event = eventQuery.data
    ? normalizePartnerEventDetails(eventQuery.data)
    : null;

  if (selectedEvent.isResolving || eventQuery.isLoading) {
    return { status: "loading" };
  }

  if (selectedEvent.isError) {
    return {
      status: "error",
      retry: () => void selectedEvent.refetch(),
    };
  }

  if (!selectedEvent.eventId) {
    return { status: "no-event" };
  }

  if (
    !eventQuery.data?.success ||
    !event ||
    event.eventId !== selectedEvent.eventId
  ) {
    return {
      status: "error",
      retry: () => void eventQuery.refetch(),
    };
  }

  return {
    status: "ready",
    eventId: selectedEvent.eventId,
    event,
    phase: getEventPhase(event.date),
  };
};
