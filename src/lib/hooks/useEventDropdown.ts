"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { PartnerEvent } from "@/lib/types";
import { useSelectedEventStore } from "@/store/selectedEventStore";

export const useEventDropdown = (events: PartnerEvent[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectedEventId = useSelectedEventStore(
    (state) => state.selectedEventId,
  );
  const setSelectedEventId = useSelectedEventStore(
    (state) => state.setSelectedEventId,
  );

  const selectedEvent = events.find((event) => event.id === selectedEventId);

  const handleSelectEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("event", eventId);
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const handleCreateEvent = () => {
    router.push("/events/new");
    setIsOpen(false);
  };

  useEffect(() => {
    const eventIdFromUrl = searchParams.get("event");

    if (eventIdFromUrl && !selectedEventId) {
      setSelectedEventId(eventIdFromUrl);
    }
  }, [searchParams, selectedEventId, setSelectedEventId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    containerRef,
    selectedEvent,
    isOpen,
    toggleDropdown: () => setIsOpen((current) => !current),
    handleSelectEvent,
    handleCreateEvent,
  };
};
