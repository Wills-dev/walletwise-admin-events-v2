"use client";

import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { toast } from "sonner";

import { validateSettingsImage } from "@/lib/helpers/settings";
import { useUpdatePartnerEvent } from "@/lib/hooks/useUpdatePartnerEvent";
import type { ApiErrorResponse } from "@/lib/types";
import { promiseErrorFunction } from "@/lib/types";
import type { PartnerEventSettings } from "@/lib/types/settings";

export interface EventHeadlinerDraft {
  clientId: string;
  artistName: string;
  imageFile: File | null;
  previewUrl: string | null;
}

const getHeadlinerSignature = (headliners: EventHeadlinerDraft[]) =>
  JSON.stringify(
    headliners.map((headliner) => [
      headliner.artistName,
      headliner.imageFile?.name ?? "",
      headliner.imageFile?.size ?? 0,
      headliner.imageFile?.lastModified ?? 0,
    ]),
  );

export const useEventHeadlinersForm = (event: PartnerEventSettings) => {
  const [headliners, setHeadliners] = useState<EventHeadlinerDraft[]>([]);
  const initialSignature = useRef(getHeadlinerSignature([]));
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

  const addHeadliner = () => {
    nextId.current += 1;
    setHeadliners((current) => [
      ...current,
      {
        clientId: `new-headliner:${Date.now()}:${nextId.current}`,
        artistName: "",
        imageFile: null,
        previewUrl: null,
      },
    ]);
  };

  const updateHeadliner = (clientId: string, artistName: string) => {
    setHeadliners((current) =>
      current.map((headliner) =>
        headliner.clientId === clientId
          ? { ...headliner, artistName }
          : headliner,
      ),
    );
  };

  const setHeadlinerImage = (clientId: string, file: File | null) => {
    if (!file) return;

    const error = validateSettingsImage(file);

    if (error) {
      toast.error(error);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    objectUrls.current.add(previewUrl);
    setHeadliners((current) =>
      current.map((headliner) => {
        if (headliner.clientId !== clientId) return headliner;

        if (headliner.previewUrl) {
          URL.revokeObjectURL(headliner.previewUrl);
          objectUrls.current.delete(headliner.previewUrl);
        }

        return { ...headliner, imageFile: file, previewUrl };
      }),
    );
  };

  const clearHeadlinerImage = (clientId: string) => {
    setHeadliners((current) =>
      current.map((headliner) => {
        if (headliner.clientId !== clientId) return headliner;

        if (headliner.previewUrl) {
          URL.revokeObjectURL(headliner.previewUrl);
          objectUrls.current.delete(headliner.previewUrl);
        }

        return { ...headliner, imageFile: null, previewUrl: null };
      }),
    );
  };

  const removeHeadliner = (clientId: string) => {
    setHeadliners((current) => {
      const removed = current.find(
        (headliner) => headliner.clientId === clientId,
      );

      if (removed?.previewUrl) {
        URL.revokeObjectURL(removed.previewUrl);
        objectUrls.current.delete(removed.previewUrl);
      }

      return current.filter(
        (headliner) => headliner.clientId !== clientId,
      );
    });
  };

  const handleSubmit = (submitEvent: SubmitEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

    if (event.hasExistingHeadliners) return;

    if (getHeadlinerSignature(headliners) === initialSignature.current) {
      toast.info("There are no headliner changes to save");
      return;
    }

    if (headliners.some((headliner) => !headliner.artistName.trim())) {
      toast.error("Every headliner needs an artist name");
      return;
    }

    if (headliners.some((headliner) => !headliner.imageFile)) {
      toast.error("Every new headliner needs an image");
      return;
    }

    mutation.mutate(
      {
        eventId: event.eventId,
        patch: {
          headliner: headliners.map((headliner) => ({
            artist_name: headliner.artistName.trim(),
          })),
        },
        headlinerImages: headliners.map(
          (headliner) => headliner.imageFile as File,
        ),
      },
      {
        onSuccess: (response) => {
          headliners.forEach((headliner) => {
            if (headliner.previewUrl) {
              URL.revokeObjectURL(headliner.previewUrl);
              objectUrls.current.delete(headliner.previewUrl);
            }
          });
          initialSignature.current = getHeadlinerSignature([]);
          setHeadliners([]);
          toast.success(response.message || "Headliners updated");
        },
        onError: (error) => {
          promiseErrorFunction(error as ApiErrorResponse);
        },
      },
    );
  };

  return {
    headliners,
    isPending: mutation.isPending,
    addHeadliner,
    updateHeadliner,
    setHeadlinerImage,
    clearHeadlinerImage,
    removeHeadliner,
    handleSubmit,
  };
};
