"use client";

import Image from "next/image";
import { ImageIcon, Trash2, Upload } from "lucide-react";

import Label from "@/components/atoms/Label/Label";

interface EventImageUploadProps {
  id: string;
  label: string;
  required?: boolean;
  file: File | null;
  preview: string | null;
  existingFileName?: string;
  onChange: (file: File | null) => void;
  onClear: () => void;
}

const EventImageUpload = ({
  id,
  label,
  required = false,
  file,
  preview,
  existingFileName,
  onChange,
  onClear,
}: EventImageUploadProps) => {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        title={`${label} (${required ? "Required" : "Optional"})`}
      />
      <div className="flex min-h-15 items-center gap-3 rounded-[10px] border border-[#E5E5E5] p-2">
        <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#F5F5F5] text-[#737373]">
          {preview ? (
            <Image
              src={preview}
              alt=""
              fill
              sizes="40px"
              unoptimized
              className="object-cover"
            />
          ) : (
            <ImageIcon className="size-4" aria-hidden="true" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">
            {file?.name ?? existingFileName ?? "No image chosen"}
          </p>
          <p className="text-xs text-[#737373]">
            {file
              ? `${Math.max(1, Math.round(file.size / 1024))} KB • Ready to upload`
              : preview
                ? "Current image • Choose a file to replace it"
              : "JPG, JPEG, PNG & WEBP • Max 10 MB"}
          </p>
        </div>

        {file ? (
          <button
            type="button"
            onClick={onClear}
            aria-label={`Remove ${label.toLowerCase()}`}
            className="flex size-9 cursor-pointer items-center justify-center rounded-md bg-[#F5F5F5] text-[#737373] transition-colors hover:text-red-600"
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        ) : (
          <label
            htmlFor={id}
            className="flex h-9 cursor-pointer items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-colors hover:bg-[#F9FAFB]"
          >
            <Upload className="size-4" aria-hidden="true" />
            {preview ? "Replace" : "Upload"}
          </label>
        )}

        <input
          key={file?.name ?? "empty"}
          id={id}
          name={id}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => {
            onChange(event.target.files?.[0] ?? null);
            event.currentTarget.value = "";
          }}
          className="sr-only"
        />
      </div>
    </div>
  );
};

export default EventImageUpload;
