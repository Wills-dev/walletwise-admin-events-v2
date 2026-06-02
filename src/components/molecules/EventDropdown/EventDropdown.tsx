"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ChevronDown, Plus } from "lucide-react";

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
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelectEvent = (name: string) => {
    setEventName(name);
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    router.push(`${pathname}?event=${slug}`);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full space-y-2 border border-[#E5E5E5] bg-white py-2.25  rounded-[10px] px-1"
    >
      <label className="text-[10px] font-medium text-[#737373] px-2">
        Event name
      </label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between p-0 m-0 px-2"
      >
        <span className="text-[#262626] hover:text-gray-950 cursor-pointer text-sm truncate">
          {eventName || "Choose company event"}
        </span>
        <ChevronDown className="w-4 h-4 opacity-70" />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute left-0 top-full mt-2 w-full bg-white rounded-2xl shadow-lg z-50
          "
        >
          <div className="">
            <p className="text-gray-400 text-xs py-2 px-3">Switch event</p>
            {events.map((event) => (
              <button
                key={event}
                onClick={() => handleSelectEvent(event)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors border-b border-[#F5F5F5]"
              >
                {event}
              </button>
            ))}

            <div className="px-3 py-2">
              <button className="w-full rounded-xl text-[#5c24cc] text-sm font-semibold flex gap-2 items-center">
                <Plus className="w-4 h-4" />
                New Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDropdown;
