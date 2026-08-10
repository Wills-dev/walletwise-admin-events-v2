"use client";

import { Trash2 } from "lucide-react";

import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import Textarea from "@/components/atoms/TextArea/TextArea";
import EventImageUpload from "@/components/molecules/EventImageUpload/EventImageUpload";
import { useEventStore } from "@/store/useEventStore";

const PrizeFields = () => {
  const { prizes, addPrize, updatePrize, setPrizeImage, removePrize } =
    useEventStore();

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="font-medium">Prizes</h2>
        <p className="text-sm text-gray-500">
          Optional. Add each prize and its matching image.
        </p>
      </div>

      {prizes.map((prize, index) => (
        <div
          key={index}
          className="space-y-4 rounded-xl border border-[#F0F0F0] p-4"
        >
          <div className="flex items-end gap-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor={`prize-${index}`} title="Prize name" />
              <Input
                type="text"
                name={`prize-${index}`}
                value={prize.name}
                placeholder="e.g. Crown"
                onChange={(event) =>
                  updatePrize(index, "name", event.target.value)
                }
              />
            </div>
            <button
              type="button"
              onClick={() => removePrize(index)}
              aria-label={`Remove prize ${index + 1}`}
              className="mb-1 flex size-9 items-center justify-center text-gray-500 hover:text-red-600"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor={`prize-description-${index}`}
              title="Description"
            />
            <Textarea
              rows={3}
              name={`prize-description-${index}`}
              value={prize.description}
              placeholder="Describe the prize"
              onChange={(event) =>
                updatePrize(index, "description", event.target.value)
              }
            />
          </div>
          <EventImageUpload
            id={`prize-image-${index}`}
            label="Prize image"
            required
            file={prize.imageFile}
            preview={prize.imagePreview}
            onChange={(file) => setPrizeImage(index, file)}
            onClear={() => setPrizeImage(index, null)}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addPrize}
        className="w-full cursor-pointer rounded-lg bg-[#F9FAFB] px-4 py-2 text-start text-sm text-[#6637CF]"
      >
        + Add prize
      </button>
    </section>
  );
};

export default PrizeFields;
