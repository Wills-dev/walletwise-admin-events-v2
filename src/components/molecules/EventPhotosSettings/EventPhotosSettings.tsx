"use client";

import { Images, RefreshCw, Trash2, Upload } from "lucide-react";
import Image from "next/image";

import Button from "@/components/atoms/Button/Button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEventGallery } from "@/lib/hooks/useEventGallery";
import {
  GALLERY_IMAGE_ACCEPT,
  MAX_GALLERY_IMAGES_PER_UPLOAD,
} from "@/lib/types/gallery";

interface EventPhotosSettingsProps {
  eventId: string;
}

const GallerySkeleton = () => (
  <div className="space-y-6" aria-label="Loading event photos" role="status">
    <div className="space-y-2">
      <Skeleton className="h-5 w-44 bg-gray-200" />
      <Skeleton className="h-4 w-full max-w-lg bg-gray-200" />
    </div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }, (_, index) => (
        <Skeleton
          key={index}
          className="aspect-square w-full rounded-xl bg-gray-200"
        />
      ))}
    </div>
    <Skeleton className="h-36 w-full rounded-2xl bg-gray-200" />
  </div>
);

const EventPhotosSettings = ({ eventId }: EventPhotosSettingsProps) => {
  const gallery = useEventGallery(eventId);
  const inputId = `event-gallery-images-${eventId}`;

  if (gallery.status === "loading") {
    return <GallerySkeleton />;
  }

  return (
    <div className="space-y-7">
      <div className="space-y-1">
        <h2 className="font-medium text-[#262626]">Event photos</h2>
        <p className="text-sm leading-6 text-[#737373]">
          Upload JPG, PNG, or WEBP photos from this event. You can upload up
          to {MAX_GALLERY_IMAGES_PER_UPLOAD} images at once, with a maximum
          size of 10 MB each.
        </p>
      </div>

      {gallery.status === "error" && (
        <div
          className="flex flex-col items-center gap-3 rounded-[16px] border border-[#F0F0F0] px-6 py-7 text-center"
          role="alert"
        >
          <div className="flex size-11 items-center justify-center rounded-full bg-[#F5F5F5] text-[#5A27CC]">
            <Images className="size-5" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-[#262626]">
              Unable to load existing photos
            </h3>
            <p className="text-sm text-[#737373]">
              You can retry the gallery request or continue selecting new
              photos below.
            </p>
          </div>
          <button
            type="button"
            onClick={gallery.retry}
            className="mt-1 flex cursor-pointer items-center gap-2 rounded-lg border border-[#E5E5E5] px-4 py-2 text-sm font-medium text-[#262626] hover:bg-[#F9FAFB]"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            Try again
          </button>
        </div>
      )}

      {gallery.images.length > 0 && (
        <section className="space-y-3" aria-labelledby="uploaded-photos-title">
          <div className="flex items-center justify-between gap-3">
            <h3
              id="uploaded-photos-title"
              className="text-sm font-medium text-[#262626]"
            >
              Uploaded photos ({gallery.images.length})
            </h3>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.images.map((image, index) => (
              <li
                key={`${image.id}:${index}`}
                className="relative aspect-square overflow-hidden rounded-xl bg-[#F5F5F5]"
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  unoptimized
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {gallery.stagedImages.length > 0 && (
        <section className="space-y-3" aria-labelledby="selected-photos-title">
          <div className="flex items-center justify-between gap-3">
            <h3
              id="selected-photos-title"
              className="text-sm font-medium text-[#262626]"
            >
              Ready to upload ({gallery.stagedImages.length}/
              {MAX_GALLERY_IMAGES_PER_UPLOAD})
            </h3>
            <button
              type="button"
              onClick={gallery.clearStagedImages}
              disabled={gallery.isUploading}
              className="cursor-pointer text-sm font-medium text-[#5A27CC] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear all
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.stagedImages.map((image) => (
              <li
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-xl bg-[#F5F5F5]"
              >
                <Image
                  src={image.previewUrl}
                  alt={`Selected photo ${image.file.name}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  unoptimized
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => gallery.removeImage(image.id)}
                  disabled={gallery.isUploading}
                  aria-label={`Remove ${image.file.name}`}
                  className="absolute right-2 top-2 flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/95 text-[#525252] shadow-sm transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </button>
                <p className="absolute inset-x-2 bottom-2 truncate rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                  {image.file.name}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {gallery.canAddMore && (
        <div className="rounded-[16px] border border-dashed border-[#DADADA] px-6 py-9 text-center">
          <div className="mx-auto flex max-w-md flex-col items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-[#F5F5F5] text-[#5A27CC]">
              <Upload className="size-5" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-[#262626]">
                {gallery.status === "empty"
                  || gallery.images.length === 0
                  ? "Add photos from this event"
                  : "Add more photos"}
              </p>
              <p className="text-sm text-[#737373]">
                Select one or multiple images from your device.
              </p>
            </div>
            <input
              id={inputId}
              type="file"
              accept={GALLERY_IMAGE_ACCEPT}
              multiple
              disabled={gallery.isUploading}
              onChange={(event) => {
                gallery.addImages(event.target.files);
                event.currentTarget.value = "";
              }}
              className="peer sr-only"
            />
            <label
              htmlFor={inputId}
              aria-disabled={gallery.isUploading}
              className={`mt-1 rounded-lg border border-[#E5E5E5] px-4 py-2 text-sm font-medium text-[#262626] transition-colors peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[#6637CF] peer-focus-visible:ring-offset-2 ${gallery.isUploading ? "pointer-events-none cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-[#F9FAFB]"}`}
            >
              Choose images
            </label>
          </div>
        </div>
      )}

      {gallery.stagedImages.length > 0 && (
        <div className="flex justify-end">
          <Button
            onClick={gallery.uploadImages}
            width="w-full sm:w-auto"
            height="h-11"
            loading={gallery.isUploading}
            loadingLabel="Uploading event photos"
            className="relative flex items-center justify-center gap-2 rounded-lg px-6 font-semibold whitespace-nowrap"
          >
            <Upload className="size-4" aria-hidden="true" />
            Upload {gallery.stagedImages.length} photo
            {gallery.stagedImages.length === 1 ? "" : "s"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventPhotosSettings;
