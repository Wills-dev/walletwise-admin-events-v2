"use client";

import { useMemo, useState } from "react";

import { filterTickets, getTicketTypeOptions } from "@/lib/helpers/tickets";
import type { PartnerTicketRow } from "@/lib/types/tickets";

interface TicketViewState {
  eventId: string | null;
  search: string;
  ticketType: string;
  currentPage: number;
  limit: number;
}

const createInitialViewState = (
  eventId: string | null,
  limit = 10,
): TicketViewState => ({
  eventId,
  search: "",
  ticketType: "",
  currentPage: 1,
  limit,
});

export const useTicketTableView = (
  eventId: string | null,
  tickets: PartnerTicketRow[],
) => {
  const [viewState, setViewState] = useState(() =>
    createInitialViewState(eventId),
  );
  const eventViewState =
    viewState.eventId === eventId
      ? viewState
      : createInitialViewState(eventId, viewState.limit);
  const ticketTypeOptions = useMemo(
    () => getTicketTypeOptions(tickets),
    [tickets],
  );
  const ticketType = ticketTypeOptions.some(
    (option) => option.value === eventViewState.ticketType,
  )
    ? eventViewState.ticketType
    : "";
  const filteredTickets = useMemo(
    () =>
      filterTickets(tickets, {
        search: eventViewState.search,
        ticketType,
      }),
    [eventViewState.search, ticketType, tickets],
  );
  const limit = Math.max(eventViewState.limit, 1);
  const totalPages = Math.max(Math.ceil(filteredTickets.length / limit), 1);
  const currentPage = Math.min(
    Math.max(eventViewState.currentPage, 1),
    totalPages,
  );
  const activeViewState: TicketViewState = {
    ...eventViewState,
    ticketType,
    currentPage,
    limit,
  };

  if (
    viewState.eventId !== activeViewState.eventId ||
    viewState.ticketType !== activeViewState.ticketType ||
    viewState.currentPage !== activeViewState.currentPage ||
    viewState.limit !== activeViewState.limit
  ) {
    setViewState(activeViewState);
  }

  const updateViewState = (
    updates: Partial<Omit<TicketViewState, "eventId">>,
  ) => {
    setViewState((currentViewState) => {
      const eventViewState =
        currentViewState.eventId === eventId
          ? currentViewState
          : createInitialViewState(eventId, currentViewState.limit);
      const currentTicketType = ticketTypeOptions.some(
        (option) => option.value === eventViewState.ticketType,
      )
        ? eventViewState.ticketType
        : "";

      return {
        ...eventViewState,
        ticketType: currentTicketType,
        ...updates,
        eventId,
      };
    });
  };

  return {
    filteredTickets,
    filters: {
      search: activeViewState.search,
      ticketType: activeViewState.ticketType,
      ticketTypeOptions,
      resultsCount: filteredTickets.length,
      setSearch: (search: string) =>
        updateViewState({ search, currentPage: 1 }),
      setTicketType: (ticketType: string) =>
        updateViewState({ ticketType, currentPage: 1 }),
    },
    pagination: {
      currentPage,
      totalPages,
      limit,
      previousPage: () =>
        updateViewState({ currentPage: Math.max(currentPage - 1, 1) }),
      nextPage: () =>
        updateViewState({
          currentPage: Math.min(currentPage + 1, totalPages),
        }),
      firstPage: () => updateViewState({ currentPage: 1 }),
      lastPage: () => updateViewState({ currentPage: totalPages }),
      isFirstPage: () => currentPage <= 1,
      isLastPage: () => currentPage >= totalPages,
      setLimit: (newLimit: number) =>
        updateViewState({ limit: newLimit, currentPage: 1 }),
    },
  };
};

export type TicketTableView = ReturnType<typeof useTicketTableView>;
