"use client";

import { CircleAlert, Plus, Trash2 } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import EventImageUpload from "@/components/molecules/EventImageUpload/EventImageUpload";
import { useEventHeadlinersForm } from "@/lib/hooks/useEventHeadlinersForm";
import type { PartnerEventSettings } from "@/lib/types/settings";

interface EventHeadlinerSettingsProps {
  event: PartnerEventSettings;
}

const EventHeadlinerSettings = ({
  event,
}: EventHeadlinerSettingsProps) => {
  const form = useEventHeadlinersForm(event);

  if (event.hasExistingHeadliners) {
    return (
      <div className="flex min-h-52 flex-col items-center justify-center gap-3 rounded-[16px] border border-[#F5F5F5] px-6 py-10 text-center">
        <CircleAlert className="size-6 text-[#737373]" aria-hidden="true" />
        <div className="space-y-1">
          <h2 className="font-medium text-[#262626]">Existing headliners</h2>
          <p className="mx-auto max-w-md text-sm leading-6 text-[#737373]">
            Existing headliner media cannot be safely changed until the API
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
          <h2 className="font-medium text-[#262626]">Headliners</h2>
          <p className="text-sm text-[#737373]">
            Add each artist and the matching image for this event.
          </p>
        </div>

        <div className="space-y-4">
          {form.headliners.map((headliner, index) => (
            <div
              key={headliner.clientId}
              className="space-y-4 rounded-xl border border-[#F0F0F0] bg-[#FAFAFA] p-4"
            >
              <div className="flex items-end gap-3">
                <div className="min-w-0 flex-1 space-y-2">
                  <Label
                    htmlFor={`settings-headliner-${index}`}
                    title="Artist name"
                  />
                  <Input
                    id={`settings-headliner-${index}`}
                    type="text"
                    name={`headliner-${index}`}
                    value={headliner.artistName}
                    placeholder="e.g. Burna Boy"
                    onChange={(changeEvent) =>
                      form.updateHeadliner(
                        headliner.clientId,
                        changeEvent.target.value,
                      )
                    }
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => form.removeHeadliner(headliner.clientId)}
                  aria-label={`Remove ${headliner.artistName || `headliner ${index + 1}`}`}
                  className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#E5E5E5] text-[#737373] transition-colors hover:border-red-200 hover:text-red-600"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </button>
              </div>

              <EventImageUpload
                id={`settings-headliner-image-${index}`}
                label="Headliner image"
                required
                file={headliner.imageFile}
                preview={headliner.previewUrl}
                onChange={(file) =>
                  form.setHeadlinerImage(headliner.clientId, file)
                }
                onClear={() =>
                  form.clearHeadlinerImage(headliner.clientId)
                }
              />
            </div>
          ))}

          <button
            type="button"
            onClick={form.addHeadliner}
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-[#F9FAFB] px-4 py-3 text-start text-sm font-medium text-[#6637CF]"
          >
            <Plus className="size-4" aria-hidden="true" />
            Add headliner
          </button>
        </div>

        <Button
          width="w-full sm:w-fit"
          type="submit"
          loading={form.isPending}
          loadingLabel="Saving headliners"
        >
          Save headliners
        </Button>
      </fieldset>
    </form>
  );
};

export default EventHeadlinerSettings;
