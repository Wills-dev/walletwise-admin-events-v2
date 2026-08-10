"use client";

import { ChevronDown, Plus } from "lucide-react";

import EventDropdownEmptyState from "@/components/atoms/EventDropdownEmptyState/EventDropdownEmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { useEventDropdown } from "@/lib/hooks/useEventDropdown";
import { PartnerEvent } from "@/lib/types";

interface EventDropdownProps {
  events: PartnerEvent[];
  isLoading: boolean;
}

const EventDropdown = ({ events, isLoading }: EventDropdownProps) => {
  const {
    containerRef,
    selectedEvent,
    isOpen,
    toggleDropdown,
    handleSelectEvent,
    handleCreateEvent,
  } = useEventDropdown(events);

  return (
    <div
      ref={containerRef}
      className="relative w-full space-y-2 rounded-[10px] border border-[#E5E5E5] bg-white px-1 py-2.25"
    >
      <label className="px-2 text-[10px] font-medium text-[#737373]">
        Event name
      </label>

      <button
        type="button"
        onClick={toggleDropdown}
        disabled={isLoading}
        className="m-0 flex w-full justify-between p-0 px-2 disabled:cursor-wait"
      >
        {isLoading ? (
          <Skeleton className="h-5 w-32" />
        ) : (
          <span className="cursor-pointer truncate text-sm text-[#262626] hover:text-gray-950">
            {selectedEvent?.name || "Choose company event"}
          </span>
        )}
        <ChevronDown className="h-4 w-4 opacity-70" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-2xl bg-white shadow-lg">
          <p className="px-3 py-2 text-xs text-gray-400">Switch event</p>

          {events.length > 0 ? (
            events.map((event) => (
              <button
                type="button"
                key={event.id}
                onClick={() => handleSelectEvent(event.id)}
                className="w-full border-b border-[#F5F5F5] px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100"
              >
                {event.name}
              </button>
            ))
          ) : (
            <EventDropdownEmptyState />
          )}

          <div className="px-3 py-2">
            <button
              type="button"
              onClick={handleCreateEvent}
              className="flex w-full items-center gap-2 rounded-xl text-sm font-semibold text-[#5c24cc]"
            >
              <Plus className="h-4 w-4" />
              New Event
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDropdown;
