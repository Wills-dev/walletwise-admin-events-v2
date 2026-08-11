"use client";

import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { toast } from "sonner";

import { validateSettingsImage } from "@/lib/helpers/settings";
import { useUpdatePartnerEvent } from "@/lib/hooks/useUpdatePartnerEvent";
import type { ApiErrorResponse } from "@/lib/types";
import { promiseErrorFunction } from "@/lib/types";
import type { PartnerEventSettings } from "@/lib/types/settings";

export interface EventPrizeDraft {
  clientId: string;
  name: string;
  description: string;
  imageFile: File | null;
  previewUrl: string | null;
}

type PrizeTextField = "name" | "description";

const getPrizeSignature = (prizes: EventPrizeDraft[]) =>
  JSON.stringify(
    prizes.map((prize) => [
      prize.name,
      prize.description,
      prize.imageFile?.name ?? "",
      prize.imageFile?.size ?? 0,
      prize.imageFile?.lastModified ?? 0,
    ]),
  );

export const useEventPrizesForm = (event: PartnerEventSettings) => {
  const [prizes, setPrizes] = useState<EventPrizeDraft[]>([]);
  const initialSignature = useRef(getPrizeSignature([]));
  const nextId = useRef(0);
  const objectUrls = useRef(new Set<string>());
  const mutation = useUpdatePartnerEvent();

  useEffect(
    () => () => {
      objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrls.current.clear();
    },
    [],
  );

  const addPrize = () => {
    nextId.current += 1;
    setPrizes((current) => [
      ...current,
      {
        clientId: `new-prize:${Date.now()}:${nextId.current}`,
        name: "",
        description: "",
        imageFile: null,
        previewUrl: null,
      },
    ]);
  };

  const updatePrize = (
    clientId: string,
    field: PrizeTextField,
    value: string,
  ) => {
    setPrizes((current) =>
      current.map((prize) =>
        prize.clientId === clientId
          ? { ...prize, [field]: value }
          : prize,
      ),
    );
  };

  const setPrizeImage = (clientId: string, file: File | null) => {
    if (!file) return;

    const error = validateSettingsImage(file);

    if (error) {
      toast.error(error);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    objectUrls.current.add(previewUrl);
    setPrizes((current) =>
      current.map((prize) => {
        if (prize.clientId !== clientId) return prize;

        if (prize.previewUrl) {
          URL.revokeObjectURL(prize.previewUrl);
          objectUrls.current.delete(prize.previewUrl);
        }

        return { ...prize, imageFile: file, previewUrl };
      }),
    );
  };

  const clearPrizeImage = (clientId: string) => {
    setPrizes((current) =>
      current.map((prize) => {
        if (prize.clientId !== clientId) return prize;

        if (prize.previewUrl) {
          URL.revokeObjectURL(prize.previewUrl);
          objectUrls.current.delete(prize.previewUrl);
        }

        return { ...prize, imageFile: null, previewUrl: null };
      }),
    );
  };

  const removePrize = (clientId: string) => {
    setPrizes((current) => {
      const removed = current.find((prize) => prize.clientId === clientId);

      if (removed?.previewUrl) {
        URL.revokeObjectURL(removed.previewUrl);
        objectUrls.current.delete(removed.previewUrl);
      }

      return current.filter((prize) => prize.clientId !== clientId);
    });
  };

  const handleSubmit = (submitEvent: SubmitEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

    if (event.hasExistingPrizes) return;

    if (getPrizeSignature(prizes) === initialSignature.current) {
      toast.info("There are no prize changes to save");
      return;
    }

    if (prizes.some((prize) => !prize.name.trim())) {
      toast.error("Every prize needs a name");
      return;
    }

    if (prizes.some((prize) => !prize.description.trim())) {
      toast.error("Every prize needs a description");
      return;
    }

    if (prizes.some((prize) => !prize.imageFile)) {
      toast.error("Every new prize needs an image");
      return;
    }

    mutation.mutate(
      {
        eventId: event.eventId,
        patch: {
          prizes: prizes.map((prize) => ({
            name: prize.name.trim(),
            description: prize.description,
          })),
        },
        prizeImages: prizes.map((prize) => prize.imageFile as File),
      },
      {
        onSuccess: (response) => {
          prizes.forEach((prize) => {
            if (prize.previewUrl) {
              URL.revokeObjectURL(prize.previewUrl);
              objectUrls.current.delete(prize.previewUrl);
            }
          });
          initialSignature.current = getPrizeSignature([]);
          setPrizes([]);
          toast.success(response.message || "Prizes updated");
        },
        onError: (error) => {
          promiseErrorFunction(error as ApiErrorResponse);
        },
      },
    );
  };

  return {
    prizes,
    isPending: mutation.isPending,
    addPrize,
    updatePrize,
    setPrizeImage,
    clearPrizeImage,
    removePrize,
    handleSubmit,
  };
};
