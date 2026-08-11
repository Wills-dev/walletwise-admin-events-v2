"use client";

import { CircleAlert, Plus, Trash2 } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import Textarea from "@/components/atoms/TextArea/TextArea";
import EventImageUpload from "@/components/molecules/EventImageUpload/EventImageUpload";
import { useEventPrizesForm } from "@/lib/hooks/useEventPrizesForm";
import type { PartnerEventSettings } from "@/lib/types/settings";

interface EventPrizeSettingsProps {
  event: PartnerEventSettings;
}

const EventPrizeSettings = ({ event }: EventPrizeSettingsProps) => {
  const form = useEventPrizesForm(event);

  if (event.hasExistingPrizes) {
    return (
      <div className="flex min-h-52 flex-col items-center justify-center gap-3 rounded-[16px] border border-[#F5F5F5] px-6 py-10 text-center">
        <CircleAlert className="size-6 text-[#737373]" aria-hidden="true" />
        <div className="space-y-1">
          <h2 className="font-medium text-[#262626]">Existing prizes</h2>
          <p className="mx-auto max-w-md text-sm leading-6 text-[#737373]">
            Existing prize media cannot be safely changed until the API
            provides its image identifiers. No existing data has been altered.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit}>
      <fieldset disabled={form.isPending} className="min-w-0 space-y-6">
        <div className="space-y-1">
          <h2 className="font-medium text-[#262626]">Prizes</h2>
          <p className="text-sm text-[#737373]">
            Add the prizes and images displayed for this pageant.
          </p>
        </div>

        <div className="space-y-4">
          {form.prizes.map((prize, index) => (
            <div
              key={prize.clientId}
              className="space-y-4 rounded-xl border border-[#F0F0F0] bg-[#FAFAFA] p-4"
            >
              <div className="flex items-end gap-3">
                <div className="min-w-0 flex-1 space-y-2">
                  <Label
                    htmlFor={`settings-prize-${index}`}
                    title="Prize name"
                  />
                  <Input
                    id={`settings-prize-${index}`}
                    type="text"
                    name={`prize-${index}`}
                    value={prize.name}
                    placeholder="e.g. Crown"
                    onChange={(changeEvent) =>
                      form.updatePrize(
                        prize.clientId,
                        "name",
                        changeEvent.target.value,
                      )
                    }
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => form.removePrize(prize.clientId)}
                  aria-label={`Remove ${prize.name || `prize ${index + 1}`}`}
                  className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#E5E5E5] text-[#737373] transition-colors hover:border-red-200 hover:text-red-600"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor={`settings-prize-description-${index}`}
                  title="Description"
                />
                <Textarea
                  id={`settings-prize-description-${index}`}
                  rows={3}
                  name={`prize-description-${index}`}
                  value={prize.description}
                  placeholder="Describe the prize"
                  onChange={(changeEvent) =>
                    form.updatePrize(
                      prize.clientId,
                      "description",
                      changeEvent.target.value,
                    )
                  }
                  required
                />
              </div>

              <EventImageUpload
                id={`settings-prize-image-${index}`}
                label="Prize image"
                required
                file={prize.imageFile}
                preview={prize.previewUrl}
                onChange={(file) =>
                  form.setPrizeImage(prize.clientId, file)
                }
                onClear={() => form.clearPrizeImage(prize.clientId)}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={form.addPrize}
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-[#F9FAFB] px-4 py-3 text-start text-sm font-medium text-[#6637CF]"
          >
            <Plus className="size-4" aria-hidden="true" />
            Add prize
          </button>
        </div>

        <Button
          width="w-full sm:w-fit"
          type="submit"
          loading={form.isPending}
          loadingLabel="Saving prizes"
        >
          Save prizes
        </Button>
      </fieldset>
    </form>
  );
};

export default EventPrizeSettings;
