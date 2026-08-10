import { CalendarX } from "lucide-react";

const EventDropdownEmptyState = () => (
  <div className="flex flex-col items-center gap-1 px-3 py-4 text-center">
    <CalendarX className="h-5 w-5 text-[#A3A3A3]" />
    <p className="text-xs font-medium text-[#737373]">No events yet</p>
    <p className="text-[10px] text-[#A3A3A3]">
      Create an event to start managing it.
    </p>
  </div>
);

export default EventDropdownEmptyState;
