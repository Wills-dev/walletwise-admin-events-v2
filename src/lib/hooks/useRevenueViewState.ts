"use client";

import { useMemo, useState } from "react";

import type { PartnerRevenueParams } from "@/lib/types/revenue";

interface RevenueViewState {
  eventId: string | null;
  page: number;
  limit: number;
  period: string;
  searchDraft: string;
  submittedSearch: string;
}

const createInitialRevenueViewState = (
  eventId: string | null,
  limit = 10,
): RevenueViewState => ({
  eventId,
  page: 1,
  limit,
  period: "all",
  searchDraft: "",
  submittedSearch: "",
});

export const useRevenueViewState = (eventId: string | null) => {
  const [viewState, setViewState] = useState(() =>
    createInitialRevenueViewState(eventId),
  );
  const eventViewState =
    viewState.eventId === eventId
      ? viewState
      : createInitialRevenueViewState(eventId, viewState.limit);
  const activeViewState: RevenueViewState = {
    ...eventViewState,
    page: Math.max(eventViewState.page, 1),
    limit: Math.max(eventViewState.limit, 1),
  };

  if (
    viewState.eventId !== activeViewState.eventId ||
    viewState.page !== activeViewState.page ||
    viewState.limit !== activeViewState.limit
  ) {
    setViewState(activeViewState);
  }

  const updateViewState = (
    updates: Partial<Omit<RevenueViewState, "eventId">>,
  ) => {
    setViewState((currentViewState) => {
      const currentEventViewState =
        currentViewState.eventId === eventId
          ? currentViewState
          : createInitialRevenueViewState(
              eventId,
              currentViewState.limit,
            );

      return {
        ...currentEventViewState,
        ...updates,
        eventId,
      };
    });
  };
  const params = useMemo<PartnerRevenueParams>(
    () => ({
      eventId: eventId ?? undefined,
      page: activeViewState.page,
      limit: activeViewState.limit,
      period: activeViewState.period,
      search: activeViewState.submittedSearch.trim() || undefined,
    }),
    [
      activeViewState.limit,
      activeViewState.page,
      activeViewState.period,
      activeViewState.submittedSearch,
      eventId,
    ],
  );

  return {
    params,
    searchDraft: activeViewState.searchDraft,
    actions: {
      setPage: (page: number) => updateViewState({ page }),
      setLimit: (limit: number) => updateViewState({ limit, page: 1 }),
      setPeriod: (period: string) =>
        updateViewState({ period, page: 1 }),
      setSearchDraft: (searchDraft: string) =>
        updateViewState({ searchDraft }),
      submitSearch: () =>
        updateViewState({
          submittedSearch: activeViewState.searchDraft.trim(),
          page: 1,
        }),
      clearSearch: () =>
        updateViewState({
          searchDraft: "",
          submittedSearch: "",
          page: 1,
        }),
    },
  };
};

export type RevenueViewModel = ReturnType<typeof useRevenueViewState>;
