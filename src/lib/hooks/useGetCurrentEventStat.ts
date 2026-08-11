import { useState } from "react";
import { getCurrentEventAnalytics } from "../api/event";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentEventStat = (eventId: string) => {
  const [filter, setFilter] = useState("30days");

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["current event analytics"],
    queryFn: () => getCurrentEventAnalytics({ eventId, filter }),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return { data, isError, isLoading, refetch, filter, setFilter };
};
