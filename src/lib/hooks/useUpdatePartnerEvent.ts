"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updatePartnerEvent } from "@/lib/api/event";
import { CURRENT_PARTNER_QUERY_KEY } from "@/lib/hooks/useGetCurrentPartner";
import { getPartnerEventQueryKey } from "@/lib/hooks/useGetPartnerEvent";
import type { UpdatePartnerEventInput } from "@/lib/types/settings";

export const useUpdatePartnerEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePartnerEvent,
    onSuccess: async (_, variables: UpdatePartnerEventInput) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: getPartnerEventQueryKey(variables.eventId),
          exact: true,
        }),
        queryClient.invalidateQueries({
          queryKey: CURRENT_PARTNER_QUERY_KEY,
          exact: true,
        }),
        queryClient.invalidateQueries({
          queryKey: ["partner event analytics"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["tickets", variables.eventId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["partner revenue"],
        }),
      ]);
    },
  });
};
