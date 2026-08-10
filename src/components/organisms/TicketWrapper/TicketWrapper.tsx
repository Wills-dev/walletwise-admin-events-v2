"use client";

import { useEffect, useState } from "react";

import FilterWrapper from "@/components/molecules/FilterWrapper/FilterWrapper";
import TicketEmptyState from "@/components/molecules/TicketEmptyState/TicketEmptyState";
import TicketSummary from "@/components/molecules/TicketSummary/TicketSummary";
import TicketTable from "@/components/molecules/TicketTable/TicketTable";
import { Button } from "@/components/ui/button";
import { useGetCurrentPartner } from "@/lib/hooks/useGetCurrentPartner";
import { useGetTickets } from "@/lib/hooks/useGetTickets";
import { useSelectedEventStoreHydrated } from "@/lib/hooks/useSelectedEventStoreHydrated";
import { useSelectedEventStore } from "@/store/selectedEventStore";

import TicketPageSkeleton from "./TicketPageSkeleton";

interface TicketViewState {
  eventId: string | null;
  search: string;
  ticketType: string;
  currentPage: number;
  limit: number;
}

const initialViewState: TicketViewState = {
  eventId: null,
  search: "",
  ticketType: "",
  currentPage: 1,
  limit: 10,
};

const TicketWrapper = () => {
  const selectedEventId = useSelectedEventStore(
    (state) => state.selectedEventId,
  );
  const isSelectionHydrated = useSelectedEventStoreHydrated();
  const { currentUser, isLoading: isPartnerLoading } =
    useGetCurrentPartner();
  const isSelectedEventValid = Boolean(
    selectedEventId &&
      currentUser?.events?.some((event) => event.id === selectedEventId),
  );
  const eventId =
    isSelectionHydrated && !isPartnerLoading && isSelectedEventValid
      ? selectedEventId
      : null;
  const { data, isError, isLoading, refetch } = useGetTickets(eventId);
  const [viewState, setViewState] = useState(initialViewState);

  useEffect(() => {
    if (data !== undefined) {
      console.log(`All tickets response for event ${eventId}:`, data);
    }
  }, [data, eventId]);

  if (!isSelectionHydrated || isPartnerLoading || isLoading) {
    return <TicketPageSkeleton />;
  }

  if (!eventId) {
    return <TicketEmptyState variant="no-event" />;
  }

  if (isError || !data?.success || !data.data) {
    return (
      <div
        className="flex min-h-72 flex-col items-center justify-center gap-3 rounded-[16px] border border-[#F5F5F5] px-6 py-10 text-center"
        role="alert"
      >
        <div className="space-y-1">
          <p className="font-medium text-[#262626]">
            We couldn&apos;t load ticket data
          </p>
          <p className="text-sm text-[#737373]">
            Check your connection and try again.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => void refetch()}
        >
          Try again
        </Button>
      </div>
    );
  }

  const activeViewState =
    viewState.eventId === eventId
      ? viewState
      : {
          ...initialViewState,
          eventId,
          limit: viewState.limit,
        };
  const tickets = data.data.tickets_table ?? [];
  const ticketTypes = Array.from(
    new Set(
      tickets
        .map((ticket) => ticket.ticketType?.trim())
        .filter((ticketType): ticketType is string => Boolean(ticketType)),
    ),
  ).sort((first, second) => first.localeCompare(second));
  const normalizedSearch = activeViewState.search.trim().toLocaleLowerCase();
  const filteredTickets = tickets.filter((ticket) => {
    const matchesTicketType =
      !activeViewState.ticketType ||
      ticket.ticketType?.trim() === activeViewState.ticketType;
    const searchableValues = [
      ticket.transactionId,
      `#${ticket.transactionId}`,
      ticket.name,
      ticket.email,
      ticket.phone,
      ticket.ticketType,
    ]
      .filter((value) => value !== null && value !== undefined)
      .map(String)
      .join(" ")
      .toLocaleLowerCase();
    const matchesSearch =
      !normalizedSearch || searchableValues.includes(normalizedSearch);

    return matchesTicketType && matchesSearch;
  });
  const limit = Math.max(activeViewState.limit, 1);
  const totalPages = Math.max(Math.ceil(filteredTickets.length / limit), 1);
  const currentPage = Math.min(
    Math.max(activeViewState.currentPage, 1),
    totalPages,
  );
  const updateViewState = (
    updates: Partial<Omit<TicketViewState, "eventId">>,
  ) => {
    setViewState({
      ...activeViewState,
      ...updates,
      eventId,
    });
  };

  return (
    <div className="space-y-4">
      <TicketSummary data={data.data} />

      {tickets.length === 0 ? (
        <div className="rounded-[16px] border border-[#F5F5F5]">
          <TicketEmptyState variant="no-tickets" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-[16px] border border-[#F5F5F5]">
          <div className="px-6 py-4">
            <FilterWrapper
              search={activeViewState.search}
              onSearchChange={(search) =>
                updateViewState({ search, currentPage: 1 })
              }
              ticketTypes={ticketTypes}
              selectedTicketType={activeViewState.ticketType}
              onTicketTypeChange={(ticketType) =>
                updateViewState({ ticketType, currentPage: 1 })
              }
              resultsCount={filteredTickets.length}
            />
          </div>

          {filteredTickets.length === 0 ? (
            <TicketEmptyState variant="no-results" />
          ) : (
            <TicketTable
              data={filteredTickets}
              totalPages={totalPages}
              currentPage={currentPage}
              paginationMode="client"
              prevPage={() =>
                updateViewState({
                  currentPage: Math.max(currentPage - 1, 1),
                })
              }
              nextPage={(lastPage) =>
                updateViewState({
                  currentPage: Math.min(currentPage + 1, lastPage),
                })
              }
              goToFirstPage={() => updateViewState({ currentPage: 1 })}
              goToLastPage={(lastPage) =>
                updateViewState({ currentPage: lastPage })
              }
              isFirstPage={() => currentPage <= 1}
              isLastPage={(lastPage) => currentPage >= lastPage}
              limit={limit}
              setLimit={(newLimit) =>
                updateViewState({ limit: newLimit, currentPage: 1 })
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TicketWrapper;
