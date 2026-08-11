"use client";

import { useRef, useState, type SubmitEvent } from "react";
import { toast } from "sonner";

import { useUpdatePartnerEvent } from "@/lib/hooks/useUpdatePartnerEvent";
import type { ApiErrorResponse } from "@/lib/types";
import { promiseErrorFunction } from "@/lib/types";
import type { PartnerEventSettings } from "@/lib/types/settings";

export const useRefundPolicyForm = (event: PartnerEventSettings) => {
  const initialRefundPolicy = useRef(event.refundPolicy);
  const [refundPolicy, setRefundPolicy] = useState(event.refundPolicy);
  const mutation = useUpdatePartnerEvent();

  const handleSubmit = (submitEvent: SubmitEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

    if (refundPolicy === initialRefundPolicy.current) {
      toast.info("There are no changes to save");
      return;
    }

    mutation.mutate(
      {
        eventId: event.eventId,
        patch: { refund_policy: refundPolicy },
      },
      {
        onSuccess: (response) => {
          toast.success(response.message || "Refund policy updated");
          initialRefundPolicy.current = refundPolicy;
        },
        onError: (error) => {
          promiseErrorFunction(error as ApiErrorResponse);
        },
      },
    );
  };

  return {
    refundPolicy,
    isPending: mutation.isPending,
    setRefundPolicy,
    handleSubmit,
  };
};
