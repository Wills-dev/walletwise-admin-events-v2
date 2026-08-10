"use client";

import { useSyncExternalStore } from "react";

import { useSelectedEventStore } from "@/store/selectedEventStore";

const subscribeToHydration = (onStoreChange: () => void) => {
  const unsubscribeFromStart = useSelectedEventStore.persist.onHydrate(() =>
    onStoreChange(),
  );
  const unsubscribeFromFinish =
    useSelectedEventStore.persist.onFinishHydration(() => onStoreChange());

  return () => {
    unsubscribeFromStart();
    unsubscribeFromFinish();
  };
};

const getHydrationSnapshot = () =>
  useSelectedEventStore.persist.hasHydrated();

const getServerHydrationSnapshot = () => false;

export const useSelectedEventStoreHydrated = () =>
  useSyncExternalStore(
    subscribeToHydration,
    getHydrationSnapshot,
    getServerHydrationSnapshot,
  );
