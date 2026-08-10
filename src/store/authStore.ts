import { Partner } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserSlice {
  currentUser: Partner | null;
  setCurrentUser: (user: Partner) => void;
  clearCurrentUser: () => void;
}

export const useAuthStore = create<UserSlice>()(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      clearCurrentUser: () => set({ currentUser: null }),
    }),
    {
      name: "walletwise-admin-event-auth-store",
    },
  ),
);
