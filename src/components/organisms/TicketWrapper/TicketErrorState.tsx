import { Button } from "@/components/ui/button";

interface TicketErrorStateProps {
  onRetry: () => void;
}

const TicketErrorState = ({ onRetry }: TicketErrorStateProps) => {
  return (
    <div
      className="flex min-h-72 flex-col items-center justify-center gap-3 rounded-[16px] border border-[#F5F5F5] px-6 py-10 text-center"
      role="alert"
    >
      <div className="space-y-1">
        <p className="font-medium text-[#262626]">
          We couldn&apos;t load ticket data
        </p>
        <p className="text-sm text-[#737373]">
          Check your connection and try again.
        </p>
      </div>
      <Button type="button" variant="outline" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
};

export default TicketErrorState;
