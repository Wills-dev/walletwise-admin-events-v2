import type { ApiResponse } from ".";

export const MAX_GALLERY_IMAGES_PER_UPLOAD = 20;
export const MAX_GALLERY_IMAGE_SIZE = 10 * 1024 * 1024;
export const GALLERY_IMAGE_ACCEPT = "image/jpeg,image/png,image/webp";
export const GALLERY_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export interface PartnerEventGalleryImage {
  id: string;
  url: string;
  alt: string;
}

export interface StagedGalleryImage {
  id: string;
  file: File;
  previewUrl: string;
}

export type PartnerEventGalleryResponse = ApiResponse<unknown>;
export type UploadPartnerEventGalleryResponse = ApiResponse<unknown>;

export interface UploadPartnerEventGalleryInput {
  eventId: string;
  images: File[];
}

export const getGalleryImageValidationError = (file: File) => {
  if (!(GALLERY_IMAGE_TYPES as readonly string[]).includes(file.type)) {
    return "must be a JPG, PNG, or WEBP image";
  }

  if (file.size > MAX_GALLERY_IMAGE_SIZE) {
    return "must not exceed 10 MB";
  }

  return null;
};
