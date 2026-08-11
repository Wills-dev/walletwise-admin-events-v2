import { CalendarSearch, CircleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SettingsContextNoticeProps {
  variant: "no-event" | "error" | "unknown-event";
  onRetry?: () => void;
}

const SettingsContextNotice = ({
  variant,
  onRetry,
}: SettingsContextNoticeProps) => {
  const isError = variant === "error";
  const isUnknownEvent = variant === "unknown-event";
  const Icon = isError ? CircleAlert : CalendarSearch;

  return (
    <div
      className="flex flex-col items-center gap-3 rounded-[16px] border border-[#F5F5F5] px-6 py-8 text-center"
      role={isError ? "alert" : "status"}
    >
      <Icon className="size-6 text-[#737373]" aria-hidden="true" />
      <div className="space-y-1">
        <p className="font-medium text-[#262626]">
          {isError
            ? "We couldn’t load this event"
            : isUnknownEvent
              ? "Event settings unavailable"
              : "Select an event"}
        </p>
        <p className="text-sm text-[#737373]">
          {isError
            ? "Try again to load its settings. Password settings remain available below."
            : isUnknownEvent
              ? "We couldn’t determine whether this event can be edited. Password settings remain available below."
              : "Choose an event from the sidebar to manage its details, tickets, and policy."}
        </p>
      </div>
      {isError && onRetry && (
        <Button type="button" variant="outline" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
};

export default SettingsContextNotice;
