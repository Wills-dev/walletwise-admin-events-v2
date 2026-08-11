"use client";

import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { toast } from "sonner";

import { getLocalDate } from "@/lib/helpers/getLocalDate";
import { validateSettingsImage } from "@/lib/helpers/settings";
import { useUpdatePartnerEvent } from "@/lib/hooks/useUpdatePartnerEvent";
import type { ApiErrorResponse } from "@/lib/types";
import { promiseErrorFunction } from "@/lib/types";
import type { EventCategory, EventPayload } from "@/lib/types/events";
import type { PartnerEventSettings } from "@/lib/types/settings";

interface EventDetailsFormState {
  title: string;
  description: string;
  category: EventCategory | "";
  address: string;
  date: string;
  startTime: string;
  endTime: string;
}

type EventDetailsField = keyof EventDetailsFormState;

const getInitialForm = (
  event: PartnerEventSettings,
): EventDetailsFormState => ({
  title: event.title,
  description: event.description,
  category: event.category,
  address: event.address,
  date: event.date,
  startTime: event.startTime,
  endTime: event.endTime,
});

export const useEventDetailsForm = (event: PartnerEventSettings) => {
  const initialFormValue = getInitialForm(event);
  const initialForm = useRef(initialFormValue);
  const [form, setForm] = useState(() => initialFormValue);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [thumbnailObjectUrl, setThumbnailObjectUrl] = useState<string | null>(
    null,
  );
  const [bannerObjectUrl, setBannerObjectUrl] = useState<string | null>(null);
  const mutation = useUpdatePartnerEvent();

  useEffect(
    () => () => {
      if (thumbnailObjectUrl) URL.revokeObjectURL(thumbnailObjectUrl);
    },
    [thumbnailObjectUrl],
  );

  useEffect(
    () => () => {
      if (bannerObjectUrl) URL.revokeObjectURL(bannerObjectUrl);
    },
    [bannerObjectUrl],
  );

  const setField = (field: EventDetailsField, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const setReplacementImage = (
    kind: "thumbnail" | "banner",
    file: File | null,
  ) => {
    if (!file) return;

    const error = validateSettingsImage(file);

    if (error) {
      toast.error(error);
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    if (kind === "thumbnail") {
      setThumbnailFile(file);
      setThumbnailObjectUrl(objectUrl);
      return;
    }

    setBannerFile(file);
    setBannerObjectUrl(objectUrl);
  };

  const clearReplacementImage = (kind: "thumbnail" | "banner") => {
    if (kind === "thumbnail") {
      setThumbnailFile(null);
      setThumbnailObjectUrl(null);
      return;
    }

    setBannerFile(null);
    setBannerObjectUrl(null);
  };

  const handleSubmit = (submitEvent: SubmitEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

    if (!form.title.trim()) {
      toast.error("Event name is required");
      return;
    }

    if (!form.description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (!form.category) {
      toast.error("Category is required");
      return;
    }

    if (!form.address.trim()) {
      toast.error("Venue is required");
      return;
    }

    if (!form.date || form.date < getLocalDate()) {
      toast.error("Choose today or a future event date");
      return;
    }

    if (!form.startTime || !form.endTime) {
      toast.error("Start and end times are required");
      return;
    }

    if (!event.thumbnailUrl && !thumbnailFile) {
      toast.error("A thumbnail image is required");
      return;
    }

    const patch: Partial<EventPayload> = {};
    const baseline = initialForm.current;
    const normalizedTitle = form.title.trim();
    const normalizedAddress = form.address.trim();

    if (form.title !== baseline.title) patch.title = normalizedTitle;
    if (form.description !== baseline.description) {
      patch.description = form.description;
    }
    if (form.category !== baseline.category) patch.category = form.category;
    if (form.address !== baseline.address) {
      patch.address = normalizedAddress;
    }
    if (form.date !== baseline.date) patch.date = form.date;
    if (form.startTime !== baseline.startTime) patch.time = form.startTime;
    if (form.endTime !== baseline.endTime) patch.end_time = form.endTime;

    if (Object.keys(patch).length === 0 && !thumbnailFile && !bannerFile) {
      toast.info("There are no changes to save");
      return;
    }

    mutation.mutate(
      {
        eventId: event.eventId,
        patch,
        ...(thumbnailFile && { thumbnail: thumbnailFile }),
        ...(bannerFile && { banner: bannerFile }),
      },
      {
        onSuccess: (response) => {
          toast.success(response.message || "Event details updated");
          const submittedForm: EventDetailsFormState = {
            ...form,
            ...(patch.title !== undefined && { title: patch.title }),
            ...(patch.address !== undefined && { address: patch.address }),
          };

          initialForm.current = submittedForm;
          setForm(submittedForm);
          clearReplacementImage("thumbnail");
          clearReplacementImage("banner");
        },
        onError: (error) => {
          promiseErrorFunction(error as ApiErrorResponse);
        },
      },
    );
  };

  return {
    ...form,
    thumbnailFile,
    bannerFile,
    thumbnailPreview: thumbnailObjectUrl ?? event.thumbnailUrl,
    bannerPreview: bannerObjectUrl ?? event.bannerUrl,
    isPending: mutation.isPending,
    setField,
    setThumbnail: (file: File | null) =>
      setReplacementImage("thumbnail", file),
    setBanner: (file: File | null) =>
      setReplacementImage("banner", file),
    clearThumbnail: () => clearReplacementImage("thumbnail"),
    clearBanner: () => clearReplacementImage("banner"),
    handleSubmit,
  };
};
