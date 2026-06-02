"use client";

import { useState } from "react";

import Label from "@/components/atoms/Label/Label";
import Input from "@/components/atoms/Input/Input";
import Textarea from "@/components/atoms/TextArea/TextArea";
import Select from "@/components/atoms/Select/Select";
import Button from "@/components/atoms/Button/Button";
import { CloudUpload, Plus } from "lucide-react";

const NewEventWrapper = () => {
  const [testing, setTesting] = useState("");

  const type = [{ label: "Events", value: "events" }];

  return (
    <div className="max-w-130 w-full space-y-8">
      <h6 className="font-medium">Event Details</h6>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" title="Event name" />
          <Input
            type="text"
            value={testing}
            name="name"
            onChange={(e) => setTesting(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="Description" title="Description" />
          <Textarea
            rows={4}
            value={testing}
            name="Description"
            onChange={(e) => setTesting(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="Category" title="Category" />
          <Select
            value={testing}
            name="Category"
            onChange={(e) => setTesting(e.target.value)}
            options={type}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="event-image" title="Cover Image" />

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
              name="event-image"
              id="event-image"
              className="h-0 w-0 invisible"
            />
          </div>
          <button className="flex items-center justify-center gap-2 bg-[#F5F5F5] py-3 rounded-[10px] w-full">
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
              value={testing}
              name="Date"
              onChange={(e) => setTesting(e.target.value)}
              placeholder="Regular"
            />
          </div>
          <div className="flex items-center gap-2 w-full">
            <div className="space-y-2 flex-1 w-full">
              <Label htmlFor="startTime" title="Start time" />
              <Input
                type="time"
                value={testing}
                name="startTime"
                onChange={(e) => setTesting(e.target.value)}
                placeholder="Regular"
              />
            </div>
            <div className="space-y-2 flex-1 w-full">
              <Label htmlFor="endTime" title="End time" />
              <Input
                type="time"
                value={testing}
                name="endTime"
                onChange={(e) => setTesting(e.target.value)}
                placeholder="Regular"
              />
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <h6 className="font-medium">Location</h6>
          <div className="space-y-2">
            <Label htmlFor="Venue" title="Venue" />
            <Input
              type="Venue"
              value={testing}
              name="Venue"
              onChange={(e) => setTesting(e.target.value)}
              placeholder="Regular"
            />
          </div>
        </div>
        <Button width="w-fit">Submit</Button>
      </div>
    </div>
  );
};

export default NewEventWrapper;
