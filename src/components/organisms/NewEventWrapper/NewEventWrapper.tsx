"use client";

import { EVENT_CATEGORIES, EventCategory } from "@/lib/types/events";
import { useEventStore } from "@/store/useEventStore";
import { useSubmitEvent } from "@/lib/hooks/useSubmitEvent";
import { getLocalDate } from "@/lib/helpers/getLocalDate";

import Label from "@/components/atoms/Label/Label";
import Input from "@/components/atoms/Input/Input";
import Textarea from "@/components/atoms/TextArea/TextArea";
import Select from "@/components/atoms/Select/Select";
import Button from "@/components/atoms/Button/Button";
import CustomFieldRow from "@/components/atoms/CustomFieldRow/CustomFieldRow";
import DefaultEventFields from "@/components/molecules/DefaultEventFields/DefaultEventFields";
import EventImageGuide from "@/components/molecules/EventImageGuide/EventImageGuide";
import EventImageUpload from "@/components/molecules/EventImageUpload/EventImageUpload";
import EventSubmissionSuccess from "@/components/molecules/EventSubmissionSuccess/EventSubmissionSuccess";
import TicketFormCard from "@/components/molecules/TicketFormCard/TicketFormCard";
import HeadlinerFields from "@/components/molecules/HeadlinerFields/HeadlinerFields";
import PrizeFields from "@/components/molecules/PrizeFields/PrizeFields";

const categoryOptions = EVENT_CATEGORIES.map((category) => ({
  label: category,
  value: category,
}));

const NewEventWrapper = () => {
  const {
    ticketTypes,
    title,
    description,
    category,
    address,
    date,
    time,
    endTime,
    serviceFee,
    refundPolicy,
    formSettings,
    thumbnailFile,
    thumbnailPreview,
    bannerFile,
    bannerPreview,
    handleChange,
    handleCategoryChange,
    handleThumbnailChange,
    clearThumbnail,
    handleBannerChange,
    clearBanner,
    addTicketType,
    addCustomField,
  } = useEventStore();

  const {
    isPending,
    isSuccess,
    redirectSeconds,
    handleSubmit,
    goToAllEvents,
  } = useSubmitEvent();

  if (isSuccess) {
    return (
      <EventSubmissionSuccess
        redirectSeconds={redirectSeconds}
        onViewEvents={goToAllEvents}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full items-start gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]"
    >
      <div className="max-w-158 space-y-8">
        <section className="space-y-5">
          <h2 className="font-medium">Event Details</h2>
          <div className="space-y-2">
            <Label htmlFor="title" title="Event name" />
            <Input
              type="text"
              name="title"
              value={title}
              onChange={(event) => handleChange("title", event.target.value)}
              placeholder="Event name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" title="Description" />
            <Textarea
              rows={5}
              name="description"
              value={description}
              onChange={(event) =>
                handleChange("description", event.target.value)
              }
              placeholder="Enter event description"
            />
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="font-medium">Details</h2>
          <div className="space-y-2">
            <Label htmlFor="category" title="Category" />
            <Select
              name="category"
              value={category}
              placeholder="Select"
              onChange={(event) =>
                handleCategoryChange(event.target.value as EventCategory)
              }
              options={categoryOptions}
            />
          </div>

          <EventImageUpload
            id="thumbnail"
            label="Thumbnail image"
            required
            file={thumbnailFile}
            preview={thumbnailPreview}
            onChange={handleThumbnailChange}
            onClear={clearThumbnail}
          />
          <EventImageUpload
            id="banner"
            label="Event page image"
            file={bannerFile}
            preview={bannerPreview}
            onChange={handleBannerChange}
            onClear={clearBanner}
          />
        </section>

        <HeadlinerFields />

        {category === "Beauty Pageant" && <PrizeFields />}

        {category === "Beauty Pageant" && formSettings && (
          <section className="space-y-4">
            <div className="space-y-1">
              <h2 className="font-medium">Contestant form</h2>
              <p className="text-sm text-gray-500">
                Choose which fields appear on the registration form.
              </p>
            </div>
            <DefaultEventFields />
            {formSettings.customFields.map((_, index) => (
              <CustomFieldRow key={index} index={index} />
            ))}
            <button
              type="button"
              onClick={addCustomField}
              className="w-full cursor-pointer rounded-lg bg-[#F9FAFB] px-4 py-2 text-start text-sm text-[#6637CF]"
            >
              + Add custom field
            </button>
          </section>
        )}

        <section className="space-y-5">
          <h2 className="font-medium">Date &amp; Time</h2>
          <div className="space-y-2">
            <Label htmlFor="date" title="Date" />
            <Input
              type="date"
              name="date"
              value={date}
              min={getLocalDate()}
              onChange={(event) => handleChange("date", event.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="time" title="Start time" />
              <Input
                name="time"
                type="time"
                value={time}
                onChange={(event) => handleChange("time", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime" title="End time" />
              <Input
                name="endTime"
                type="time"
                value={endTime}
                min={time || undefined}
                onChange={(event) =>
                  handleChange("endTime", event.target.value)
                }
              />
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="font-medium">Location</h2>
          <div className="space-y-2">
            <Label htmlFor="address" title="Venue" />
            <Input
              type="text"
              name="address"
              value={address}
              onChange={(event) => handleChange("address", event.target.value)}
              placeholder="e.g. Eko Convention Centre, Lagos"
            />
          </div>
        </section>

        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="font-medium">Tickets</h2>
            <p className="text-sm text-gray-500">
              Add one or more ticket tiers for the event.
            </p>
          </div>
          <div className="space-y-3">
            {Object.keys(ticketTypes).map((key) => (
              <TicketFormCard key={key} ticketKey={key} />
            ))}
            <button
              type="button"
              onClick={addTicketType}
              className="w-full cursor-pointer rounded-lg bg-[#F9FAFB] px-4 py-2 text-start text-sm text-[#6637CF]"
            >
              + Add ticket tier
            </button>
          </div>
        </section>

        <div className="space-y-2">
          <Label htmlFor="serviceFee" title="Service fee (₦)" />
          <Input
            type="number"
            name="serviceFee"
            value={serviceFee}
            onChange={(event) =>
              handleChange("serviceFee", Number(event.target.value))
            }
            placeholder="0"
          />
        </div>

        <section className="space-y-4">
          <h2 className="font-medium">Refund Policy</h2>
          <div className="space-y-2">
            <Label htmlFor="refundPolicy" title="Policy details" />
            <Textarea
              rows={4}
              name="refundPolicy"
              value={refundPolicy}
              onChange={(event) =>
                handleChange("refundPolicy", event.target.value)
              }
              placeholder="Enter the refund policy"
            />
          </div>
        </section>

        <Button width="w-full sm:w-50" type="submit" loading={isPending}>
          Publish event
        </Button>
      </div>

      <EventImageGuide />
    </form>
  );
};

export default NewEventWrapper;
