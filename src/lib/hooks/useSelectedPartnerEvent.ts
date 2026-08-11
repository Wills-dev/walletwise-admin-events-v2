"use client";

import { useSearchParams } from "next/navigation";

import { useGetCurrentPartner } from "@/lib/hooks/useGetCurrentPartner";
import { useSelectedEventStoreHydrated } from "@/lib/hooks/useSelectedEventStoreHydrated";
import { useSelectedEventStore } from "@/store/selectedEventStore";

export const useSelectedPartnerEvent = () => {
  const searchParams = useSearchParams();
  const selectedEventId = useSelectedEventStore(
    (state) => state.selectedEventId,
  );
  const eventIdFromUrl = searchParams.get("event");
  const requestedEventId = eventIdFromUrl ?? selectedEventId;
  const isSelectionHydrated = useSelectedEventStoreHydrated();
  const {
    currentUser,
    isError: isPartnerError,
    isLoading: isPartnerLoading,
    refetch: refetchPartner,
  } = useGetCurrentPartner();
  const hasSelection = Boolean(requestedEventId);
  const isResolving =
    !isSelectionHydrated || (hasSelection && isPartnerLoading);
  const isError =
    hasSelection && isPartnerError && currentUser?.events === undefined;
  const eventId =
    !isResolving &&
    requestedEventId &&
    currentUser?.events?.some((event) => event.id === requestedEventId)
      ? requestedEventId
      : null;

  return { eventId, isError, isResolving, refetch: refetchPartner };
};
