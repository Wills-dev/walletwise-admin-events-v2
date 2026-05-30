"use client";

import { useRouter, usePathname } from "next/navigation";

import { ChevronDown, Plus } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const events = [
  "Annual Conference",
  "Tech Meetup",
  "Product Launch",
  "Board Meeting",
];

const EventDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [eventName, setEventName] = useState("");

  const handleSelectEvent = (eventName: string) => {
    setEventName(eventName);
    const slug = eventName.toLowerCase().replace(/\s+/g, "-");

    router.push(`${pathname}?event=${slug}`);
  };

  return (
    <div className="w-full space-y-2 border border-[#E5E5E5] bg-white py-2.25 px-3 rounded-[10px]">
      <label className="text-[10px] font-medium text-[#737373]">
        Select Event
      </label>
      <Popover>
        <PopoverTrigger asChild className="p-0 border-0 w-full">
          <Button variant="outline" className="w-full justify-between p-0 m-0">
            <span className="text-[#262626] text-sm leading-5.25 font-geist truncate">
              {eventName || "Choose company event"}
            </span>

            <ChevronDown className="w-4 h-4 opacity-70" />
          </Button>
        </PopoverTrigger>

        {/* Dropdown */}
        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-full rounded-2xl p-2  max-w-64"
        >
          <div className="space-y-1">
            {/* Event List */}
            {events.map((event) => (
              <button
                key={event}
                onClick={() => handleSelectEvent(event)}
                className="
                  w-full
                  text-left
                  px-3
                  py-2.5
                  rounded-xl
                  text-sm
                  hover:bg-gray-100
                  transition-colors
                "
              >
                {event}
              </button>
            ))}

            <div className="border-t my-2" />

            <Button className="w-full rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Create New Event
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EventDropdown;
