"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { useGetPartnerEventGallery } from "@/lib/hooks/useGetPartnerEventGallery";
import { useUploadPartnerEventGallery } from "@/lib/hooks/useUploadPartnerEventGallery";
import type { ApiErrorResponse } from "@/lib/types";
import { promiseErrorFunction } from "@/lib/types";
import type { StagedGalleryImage } from "@/lib/types/gallery";
import {
  getGalleryImageValidationError,
  MAX_GALLERY_IMAGES_PER_UPLOAD,
} from "@/lib/types/gallery";

export const useEventGallery = (eventId: string) => {
  const normalizedEventId = eventId.trim();
  const galleryQuery = useGetPartnerEventGallery(
    normalizedEventId || null,
  );
  const uploadMutation = useUploadPartnerEventGallery();
  const [stagedImages, setStagedImages] = useState<StagedGalleryImage[]>([]);
  const stagedImagesRef = useRef(stagedImages);

  useEffect(() => {
    stagedImagesRef.current = stagedImages;
  }, [stagedImages]);

  useEffect(
    () => () => {
      stagedImagesRef.current.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
    },
    [],
  );

  const clearStagedImages = () => {
    setStagedImages((current) => {
      current.forEach((image) => URL.revokeObjectURL(image.previewUrl));
      return [];
    });
  };

  const addImages = (fileList: FileList | null) => {
    const files = Array.from(fileList ?? []);

    if (files.length === 0) return;

    if (stagedImages.length + files.length > MAX_GALLERY_IMAGES_PER_UPLOAD) {
      toast.error(
        `You can upload up to ${MAX_GALLERY_IMAGES_PER_UPLOAD} images at once`,
      );
      return;
    }

    for (const file of files) {
      const validationError = getGalleryImageValidationError(file);

      if (validationError) {
        toast.error(`${file.name} ${validationError}`);
        return;
      }
    }

    const nextImages = files.map((file) => {
      const previewUrl = URL.createObjectURL(file);

      return {
        id: previewUrl,
        file,
        previewUrl,
      };
    });

    setStagedImages((current) => [...current, ...nextImages]);
  };

  const removeImage = (imageId: string) => {
    setStagedImages((current) =>
      current.filter((image) => {
        if (image.id === imageId) {
          URL.revokeObjectURL(image.previewUrl);
          return false;
        }

        return true;
      }),
    );
  };

  const uploadImages = () => {
    if (!normalizedEventId) {
      toast.error("Select an event before uploading photos");
      return;
    }

    if (stagedImages.length === 0) {
      toast.error("Choose at least one image to upload");
      return;
    }

    uploadMutation.mutate(
      {
        eventId: normalizedEventId,
        images: stagedImages.map((image) => image.file),
      },
      {
        onSuccess: (response) => {
          clearStagedImages();
          toast.success(response.message || "Event photos uploaded");
        },
        onError: (error) => {
          const apiError = error as ApiErrorResponse;

          if (apiError.response) {
            promiseErrorFunction(apiError);
            return;
          }

          toast.error(
            error instanceof Error && error.message
              ? error.message
              : "Unable to upload event photos",
          );
        },
      },
    );
  };

  const status = !normalizedEventId
    ? ("error" as const)
    : galleryQuery.isLoading
      ? ("loading" as const)
      : galleryQuery.isError || galleryQuery.hasUnsupportedResponse
        ? ("error" as const)
        : galleryQuery.images?.length
          ? ("ready" as const)
          : ("empty" as const);

  return {
    status,
    images: galleryQuery.images ?? [],
    stagedImages,
    isUploading: uploadMutation.isPending,
    canAddMore: stagedImages.length < MAX_GALLERY_IMAGES_PER_UPLOAD,
    addImages,
    removeImage,
    clearStagedImages,
    uploadImages,
    retry: () => void galleryQuery.refetch(),
  };
};
