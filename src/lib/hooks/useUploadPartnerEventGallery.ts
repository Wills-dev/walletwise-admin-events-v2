"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadPartnerEventGallery } from "@/lib/api/gallery";
import { getPartnerEventGalleryQueryKey } from "@/lib/hooks/useGetPartnerEventGallery";
import type { UploadPartnerEventGalleryInput } from "@/lib/types/gallery";

export const useUploadPartnerEventGallery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadPartnerEventGallery,
    onSuccess: async (_, variables: UploadPartnerEventGalleryInput) => {
      await queryClient.invalidateQueries({
        queryKey: getPartnerEventGalleryQueryKey(variables.eventId.trim()),
        exact: true,
      });
    },
  });
};
