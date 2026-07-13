"use client";

import Image from "next/image";

import { CloudUpload, Plus } from "lucide-react";

import { EventCategory } from "@/lib/types/events";
import { useEventStore } from "@/store/useEventStore";
import { useSubmitEvent } from "@/lib/hooks/useSubmitEvent";

import Label from "@/components/atoms/Label/Label";
import Input from "@/components/atoms/Input/Input";
import Textarea from "@/components/atoms/TextArea/TextArea";
import Select from "@/components/atoms/Select/Select";
import Button from "@/components/atoms/Button/Button";
import DefaultEventFields from "@/components/molecules/DefaultEventFields/DefaultEventFields";
import CustomFieldRow from "@/components/atoms/CustomFieldRow/CustomFieldRow";
import TicketFormCard from "@/components/molecules/TicketFormCard/TicketFormCard";

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
    handleChange,
    handleCategoryChange,
    handleImageChange,
    clearImage,
    imagePreview,
    addTicketType,
    addCustomField,
  } = useEventStore();

  const { isPending, handleSubmit } = useSubmitEvent();

  const type = [
    { label: "Beauty Pageant", value: "beauty_pageant" },
    { label: "Concert", value: "concert" },
    { label: "Conference", value: "conference" },
    { label: "Sports", value: "sports" },
    { label: "Religion", value: "religion" },
  ];

  return (
    <div className="max-w-130 w-full space-y-8">
      <h6 className="font-medium">Event Details</h6>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title" title="Event name" />
          <Input
            type="text"
            name="title"
            value={title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" title="Description" />
          <Textarea
            rows={4}
            name="description"
            value={description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="Category" title="Category" />
          <Select
            name="Category"
            value={category}
            onChange={(e) =>
              handleCategoryChange(e.target.value as EventCategory)
            }
            options={type}
          />
        </div>
        {category === "beauty_pageant" && formSettings && (
          <div className="space-y-4 py-6">
            <div className="space-y-2">
              <h6>Contestant form</h6>
              <p className="text-sm text-gray-500">
                Choose which fields appear on the registration form
              </p>
            </div>
            <div className="space-y-2">
              <DefaultEventFields />
              {formSettings.customFields.map((_, i) => (
                <CustomFieldRow key={i} index={i} />
              ))}
              <button
                type="button"
                onClick={addCustomField}
                className="bg-[#F9FAFB] p-4 px-4 py-1 rounded-lg text-sm w-full text-start cursor-pointer"
              >
                + Add custom field
              </button>
            </div>
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="event-image" title="Cover Image" />

          <label htmlFor="event-image" className="w-full">
            <div className="w-full border-dashed border-[#E5E5E5] bg-[#FAFAFA] px-6 py-10 gap-2 flex justify-center items-center flex-col rounded-2xl">
              <CloudUpload className="w-5 h-5" />
              <p className="font-medium text-sm">Upload documents</p>
              <p className="text-xs text-[#737373] font-medium">
                PNG, JPG, WEBP{" "}
              </p>
              <p className="text-xs text-[#737373] font-medium">
                Max file size: 10mb
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
                name="event-image"
                id="event-image"
                className="h-0 w-0 invisible"
              />
            </div>
          </label>
          {imagePreview && (
            <div className="w-20 h-20 rounded-2xl relative">
              <Image
                src={imagePreview}
                alt="event image"
                width={80}
                height={80}
                className="w-full h-full rounded-2xl"
              />
              <button
                type="button"
                onClick={clearImage}
                className="text-red-500 absolute top-2 right-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-[#F5F5F5] py-3 rounded-[10px] w-full"
          >
            <Plus className="w-4 h-4" />
            <span>Add more images</span>
          </button>
        </div>
        <div className="space-y-8">
          <h6 className="font-medium">Date & Time</h6>
          <div className="space-y-2">
            <Label htmlFor="Date" title="Date" />
            <Input
              type="date"
              name="Date"
              value={date}
              onChange={(e) => handleChange("date", e.target.value)}
              placeholder="Regular"
            />
          </div>
          <div className="flex items-center gap-2 w-full">
            <div className="space-y-2 flex-1 w-full">
              <Label htmlFor="startTime" title="Start time" />
              <Input
                name="startTime"
                type="datetime-local"
                value={time}
                onChange={(e) => handleChange("time", e.target.value)}
                placeholder="Regular"
              />
            </div>
            <div className="space-y-2 flex-1 w-full">
              <Label htmlFor="endTime" title="End time" />
              <Input
                name="endTime"
                type="datetime-local"
                value={endTime}
                onChange={(e) => handleChange("endTime", e.target.value)}
                placeholder="Regular"
              />
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <h6 className="font-medium">Location</h6>
          <div className="space-y-2">
            <Label htmlFor="address" title="Venue" />
            <Input
              type="text"
              name="address"
              value={address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="e.g Eko Hotels and Suits"
            />
          </div>
        </div>
        <div className="space-y-4 pb-6">
          <div className="space-y-2">
            <h6>Ticket</h6>
            <p className="text-sm text-gray-500">
              Add one or more ticket tiers for the event
            </p>
          </div>
          <div className="space-y-2">
            {" "}
            {Object.keys(ticketTypes).map((key) => (
              <TicketFormCard key={key} ticketKey={key} />
            ))}
            <button
              type="button"
              onClick={addTicketType}
              className="bg-[#F9FAFB] p-4 px-4 py-1 rounded-lg text-sm w-full text-start cursor-pointer"
            >
              + Add ticket tier
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name" title="Service fee (%)" />
          <Input
            type="number"
            name="name"
            value={serviceFee}
            onChange={(e) => handleChange("serviceFee", Number(e.target.value))}
          />
        </div>
        <div className="space-y-4 pb-6">
          <div className="space-y-2">
            <h6>Refund Policy</h6>
          </div>
          <div className="space-y-2">
            <Label htmlFor="refundPolicy" title="Policy details" />
            <Textarea
              rows={4}
              name="refundPolicy"
              value={refundPolicy}
              onChange={(e) => handleChange("refundPolicy", e.target.value)}
            />
          </div>
        </div>
        <Button width="w-50" type="submit" loading={isPending}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewEventWrapper;
