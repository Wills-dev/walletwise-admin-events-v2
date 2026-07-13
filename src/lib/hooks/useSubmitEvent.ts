import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { createEvent } from "../api/event";
import { useEventStore } from "@/store/useEventStore";
import { ApiErrorResponse, promiseErrorFunction } from "../types";
import { toast } from "sonner";
import { validateEventForm } from "../helpers/validateEventForm";
import { SubmitEvent } from "react";

export const useSubmitEvent = () => {
  const router = useRouter();

  const { buildPayload, imageFile, resetForm } = useEventStore();
  const state = useEventStore.getState();

  const { mutate, isPending } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      toast.success("Event created successfully!");
      resetForm();

      router.push(`/overview`);
    },
    onError: (error: ApiErrorResponse) => {
      console.log("error creating event", error);
      promiseErrorFunction(error);
    },
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateEventForm(state);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((msg) => toast.error(msg));
      return null;
    }
    if (imageFile === null) return;

    mutate({ imageFile, buildPayload: buildPayload() });
  };

  return { isPending, handleSubmit };
};
