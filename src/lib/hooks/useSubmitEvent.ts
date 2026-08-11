import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitEvent, useEffect, useState } from "react";

import { createEvent } from "../api/event";
import { useEventStore } from "@/store/useEventStore";
import { ApiErrorResponse, promiseErrorFunction } from "../types";
import { toast } from "sonner";
import { validateEventForm } from "../helpers/validateEventForm";
import { CURRENT_PARTNER_QUERY_KEY } from "./useGetCurrentPartner";

const ALL_EVENTS_ROUTE = "/tickets";
const REDIRECT_SECONDS = 15;

export const useSubmitEvent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [redirectSeconds, setRedirectSeconds] = useState(REDIRECT_SECONDS);

  const { buildPayload, resetForm } = useEventStore();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: CURRENT_PARTNER_QUERY_KEY,
        exact: true,
      });
      resetForm();
      setRedirectSeconds(REDIRECT_SECONDS);
    },
    onError: (error: ApiErrorResponse) => {
      console.log("error creating event", error);
      promiseErrorFunction(error);
    },
  });

  useEffect(() => {
    if (!isSuccess) return;

    const countdown = window.setInterval(() => {
      setRedirectSeconds((current) => Math.max(current - 1, 0));
    }, 1000);
    const redirect = window.setTimeout(() => {
      router.push(ALL_EVENTS_ROUTE);
    }, REDIRECT_SECONDS * 1000);

    return () => {
      window.clearInterval(countdown);
      window.clearTimeout(redirect);
    };
  }, [isSuccess, router]);

  const goToAllEvents = () => {
    router.push(ALL_EVENTS_ROUTE);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const state = useEventStore.getState();
    const errors = validateEventForm(state);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((msg) => toast.error(msg));
      return null;
    }
    if (state.thumbnailFile === null) return;

    mutate({
      thumbnail: state.thumbnailFile,
      banner: state.bannerFile,
      headlinerImages: state.headliners.map((item) => item.imageFile as File),
      prizeImages:
        state.category === "Beauty Pageant"
          ? state.prizes.map((item) => item.imageFile as File)
          : [],
      buildPayload: buildPayload(),
    });
  };

  return {
    isPending,
    isSuccess,
    redirectSeconds,
    handleSubmit,
    goToAllEvents,
  };
};
