"use client";

import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { getCurrentPartner } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export const CURRENT_PARTNER_QUERY_KEY = ["current partner"] as const;

export const useGetCurrentPartner = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  const query = useQuery({
    queryKey: CURRENT_PARTNER_QUERY_KEY,
    queryFn: getCurrentPartner,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    if (query.data !== undefined) {
      console.log("GET /partner/me response:", query.data);
      setCurrentUser(query.data.data);
    }
  }, [query.data, setCurrentUser]);

  return {
    currentUser: query.data?.data ?? currentUser,
    isError: query.isError,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
};
