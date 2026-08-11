import { axiosInstance } from "@/lib/axiosInstance";
import type {
  PartnerEventGalleryImage,
  PartnerEventGalleryResponse,
  UploadPartnerEventGalleryInput,
  UploadPartnerEventGalleryResponse,
} from "@/lib/types/gallery";
import {
  getGalleryImageValidationError,
  MAX_GALLERY_IMAGES_PER_UPLOAD,
} from "@/lib/types/gallery";

const getGalleryPath = (eventId: string) => {
  const normalizedEventId = eventId.trim();

  if (!normalizedEventId) {
    throw new Error("An event ID is required");
  }

  return `/partner-event/gallery/${encodeURIComponent(normalizedEventId)}`;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const getString = (
  record: Record<string, unknown>,
  keys: readonly string[],
) => {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return null;
};

const getImageEntries = (data: unknown): unknown[] | null => {
  if (Array.isArray(data)) {
    return data;
  }

  if (!isRecord(data)) {
    return null;
  }

  const directCollections = [
    "images",
    "gallery",
    "photos",
    "gallery_images",
    "event_gallery",
  ] as const;

  for (const key of directCollections) {
    if (Array.isArray(data[key])) {
      return data[key];
    }
  }

  for (const containerKey of ["gallery", "event_gallery"] as const) {
    if (!isRecord(data[containerKey])) continue;

    const nestedGallery = data[containerKey];

    for (const key of ["images", "photos", "gallery_images"] as const) {
      if (Array.isArray(nestedGallery[key])) {
        return nestedGallery[key];
      }
    }
  }

  return null;
};

const normalizeGalleryImage = (
  value: unknown,
  index: number,
): PartnerEventGalleryImage | null => {
  if (typeof value === "string") {
    const url = value.trim();

    return url
      ? { id: `url:${url}`, url, alt: `Event photo ${index + 1}` }
      : null;
  }

  if (!isRecord(value)) {
    return null;
  }

  const url = getString(value, [
    "url",
    "image_url",
    "imageUrl",
    "secure_url",
    "file_url",
    "photo_url",
  ]);

  if (!url) {
    return null;
  }

  const rawId =
    value.id ??
    value.gallery_id ??
    value.image_id ??
    value.event_gallery_id ??
    value.public_id;
  const id =
    typeof rawId === "string" || typeof rawId === "number"
      ? String(rawId)
      : `url:${url}`;
  const alt =
    getString(value, ["alt", "caption", "name", "title"]) ??
    `Event photo ${index + 1}`;

  return { id, url, alt };
};

export const normalizePartnerEventGallery = (
  response: PartnerEventGalleryResponse,
): PartnerEventGalleryImage[] | null => {
  if (!response.success) {
    return null;
  }

  const entries = getImageEntries(response.data);

  if (entries === null) {
    return null;
  }

  const images = entries.map(normalizeGalleryImage);

  return images.some((image) => image === null)
    ? null
    : (images as PartnerEventGalleryImage[]);
};

export const getPartnerEventGallery = async (
  eventId: string,
): Promise<PartnerEventGalleryResponse> => {
  const { data } = await axiosInstance.get<PartnerEventGalleryResponse>(
    getGalleryPath(eventId),
  );

  if (!data.success) {
    throw new Error(data.message || "Unable to fetch event photos");
  }

  return data;
};

export const uploadPartnerEventGallery = async ({
  eventId,
  images,
}: UploadPartnerEventGalleryInput): Promise<UploadPartnerEventGalleryResponse> => {
  if (images.length === 0) {
    throw new Error("Choose at least one image to upload");
  }

  if (images.length > MAX_GALLERY_IMAGES_PER_UPLOAD) {
    throw new Error(
      `You can upload up to ${MAX_GALLERY_IMAGES_PER_UPLOAD} images at once`,
    );
  }

  for (const image of images) {
    const validationError = getGalleryImageValidationError(image);

    if (validationError) {
      throw new Error(`${image.name} ${validationError}`);
    }
  }

  const formData = new FormData();

  images.forEach((image) => {
    formData.append("images", image, image.name);
  });

  const { data } = await axiosInstance.post<UploadPartnerEventGalleryResponse>(
    getGalleryPath(eventId),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  if (!data.success) {
    throw new Error(data.message || "Unable to upload event photos");
  }

  return data;
};
