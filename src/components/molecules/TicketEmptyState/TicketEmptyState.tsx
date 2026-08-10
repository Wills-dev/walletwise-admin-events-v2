import { CalendarSearch, SearchX, TicketX } from "lucide-react";

import { cn } from "@/lib/utils";

type TicketEmptyStateVariant = "no-event" | "no-tickets" | "no-results";

interface TicketEmptyStateProps {
  variant: TicketEmptyStateVariant;
}

const emptyStates = {
  "no-event": {
    icon: CalendarSearch,
    title: "Select an event to view tickets",
    description:
      "Choose an event from the event selector to see its ticket sales and attendees.",
  },
  "no-tickets": {
    icon: TicketX,
    title: "No tickets sold yet",
    description: "Ticket purchases for this event will appear here.",
  },
  "no-results": {
    icon: SearchX,
    title: "No matching tickets",
    description: "Try another search or ticket type.",
  },
} as const;

const TicketEmptyState = ({ variant }: TicketEmptyStateProps) => {
  const { icon: Icon, title, description } = emptyStates[variant];

  return (
    <div
      className={cn(
        "flex min-h-72 flex-col items-center justify-center gap-3 px-6 py-12 text-center",
        variant === "no-event" &&
          "min-h-96 rounded-[16px] border border-[#F5F5F5]",
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-[#5A27CC]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="max-w-md space-y-1">
        <p className="font-medium text-[#262626]">{title}</p>
        <p className="text-sm text-[#737373]">{description}</p>
      </div>
    </div>
  );
};

export default TicketEmptyState;
