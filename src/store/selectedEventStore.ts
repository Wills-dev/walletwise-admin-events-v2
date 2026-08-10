import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectedEventState {
  selectedEventId: string | null;
  setSelectedEventId: (eventId: string) => void;
}

export const useSelectedEventStore = create<SelectedEventState>()(
  persist(
    (set) => ({
      selectedEventId: null,
      setSelectedEventId: (selectedEventId) => set({ selectedEventId }),
    }),
    {
      name: "walletwise-selected-event",
    },
  ),
);
