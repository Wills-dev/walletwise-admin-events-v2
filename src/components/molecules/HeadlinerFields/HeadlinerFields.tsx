"use client";

import { Trash2 } from "lucide-react";

import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import EventImageUpload from "@/components/molecules/EventImageUpload/EventImageUpload";
import { useEventStore } from "@/store/useEventStore";

const HeadlinerFields = () => {
  const {
    headliners,
    addHeadliner,
    updateHeadliner,
    setHeadlinerImage,
    removeHeadliner,
  } = useEventStore();

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="font-medium">Headliners</h2>
        <p className="text-sm text-gray-500">
          Optional. Add each artist and their matching image.
        </p>
      </div>

      {headliners.map((headliner, index) => (
        <div
          key={index}
          className="space-y-4 rounded-xl border border-[#F0F0F0] p-4"
        >
          <div className="flex items-end gap-2">
            <div className="flex-1 space-y-2">
              <Label
                htmlFor={`headliner-${index}`}
                title="Artist name"
              />
              <Input
                type="text"
                name={`headliner-${index}`}
                value={headliner.artistName}
                placeholder="e.g. Burna Boy"
                onChange={(event) =>
                  updateHeadliner(index, event.target.value)
                }
              />
            </div>
            <button
              type="button"
              onClick={() => removeHeadliner(index)}
              aria-label={`Remove headliner ${index + 1}`}
              className="mb-1 flex size-9 items-center justify-center text-gray-500 hover:text-red-600"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
          <EventImageUpload
            id={`headliner-image-${index}`}
            label="Headliner image"
            required
            file={headliner.imageFile}
            preview={headliner.imagePreview}
            onChange={(file) => setHeadlinerImage(index, file)}
            onClear={() => setHeadlinerImage(index, null)}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addHeadliner}
        className="w-full cursor-pointer rounded-lg bg-[#F9FAFB] px-4 py-2 text-start text-sm text-[#6637CF]"
      >
        + Add headliner
      </button>
    </section>
  );
};

export default HeadlinerFields;
