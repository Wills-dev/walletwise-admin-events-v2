"use client";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import Select from "@/components/atoms/Select/Select";
import Textarea from "@/components/atoms/TextArea/TextArea";
import EventImageUpload from "@/components/molecules/EventImageUpload/EventImageUpload";
import { getLocalDate } from "@/lib/helpers/getLocalDate";
import { useEventDetailsForm } from "@/lib/hooks/useEventDetailsForm";
import {
  EVENT_CATEGORIES,
  type EventCategory,
} from "@/lib/types/events";
import type { PartnerEventSettings } from "@/lib/types/settings";

interface SettingDetailsProps {
  event: PartnerEventSettings;
}

const categoryOptions = EVENT_CATEGORIES.map((category) => ({
  label: category,
  value: category,
}));

const SettingDetails = ({ event }: SettingDetailsProps) => {
  const form = useEventDetailsForm(event);

  return (
    <form onSubmit={form.handleSubmit}>
      <fieldset disabled={form.isPending} className="min-w-0 space-y-8">
      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="font-medium text-[#262626]">Event details</h2>
          <p className="text-sm text-[#737373]">
            Update the information guests see for this event.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="settings-event-title" title="Event name" />
          <Input
            id="settings-event-title"
            type="text"
            name="title"
            value={form.title}
            onChange={(changeEvent) =>
              form.setField("title", changeEvent.target.value)
            }
            placeholder="Event name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="settings-event-description"
            title="Description"
          />
          <Textarea
            id="settings-event-description"
            rows={5}
            name="description"
            value={form.description}
            onChange={(changeEvent) =>
              form.setField("description", changeEvent.target.value)
            }
            placeholder="Enter event description"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="settings-event-category" title="Category" />
          <Select
            id="settings-event-category"
            name="category"
            value={form.category}
            placeholder="Select a category"
            onChange={(changeEvent) =>
              form.setField(
                "category",
                changeEvent.target.value as EventCategory,
              )
            }
            options={categoryOptions}
            disabled
            required
          />
          <p className="text-xs text-[#737373]">
            Category changes are unavailable while category-specific event
            fields are being finalized.
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="font-medium text-[#262626]">Event images</h2>
          <p className="text-sm text-[#737373]">
            Existing images are retained unless you choose replacements.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <EventImageUpload
            id="settings-thumbnail"
            label="Thumbnail image"
            required
            file={form.thumbnailFile}
            preview={form.thumbnailPreview}
            existingFileName={event.thumbnailUrl ? "Current thumbnail" : undefined}
            onChange={form.setThumbnail}
            onClear={form.clearThumbnail}
          />
          <EventImageUpload
            id="settings-banner"
            label="Event page image"
            file={form.bannerFile}
            preview={form.bannerPreview}
            existingFileName={event.bannerUrl ? "Current event page image" : undefined}
            onChange={form.setBanner}
            onClear={form.clearBanner}
          />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-medium text-[#262626]">Date, time and venue</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="settings-event-date" title="Date" />
            <Input
              id="settings-event-date"
              type="date"
              name="date"
              value={form.date}
              min={getLocalDate()}
              onChange={(changeEvent) =>
                form.setField("date", changeEvent.target.value)
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="settings-event-start-time" title="Start time" />
            <Input
              id="settings-event-start-time"
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={(changeEvent) =>
                form.setField("startTime", changeEvent.target.value)
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="settings-event-end-time" title="End time" />
            <Input
              id="settings-event-end-time"
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={(changeEvent) =>
                form.setField("endTime", changeEvent.target.value)
              }
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="settings-event-address" title="Venue" />
          <Input
            id="settings-event-address"
            type="text"
            name="address"
            value={form.address}
            onChange={(changeEvent) =>
              form.setField("address", changeEvent.target.value)
            }
            placeholder="e.g. Eko Convention Centre, Lagos"
            required
          />
        </div>
      </section>

      <Button
        width="w-full sm:w-fit"
        type="submit"
        loading={form.isPending}
        loadingLabel="Saving event details"
      >
        Save changes
      </Button>
      </fieldset>
    </form>
  );
};

export default SettingDetails;
