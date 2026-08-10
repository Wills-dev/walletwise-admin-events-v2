import { ArrowUpDown } from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";

import StatusBubble from "@/components/atoms/StatusBubble/StatusBubble";
import { Button } from "@/components/ui/button";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";
import type { PartnerAnalyticsEvent } from "@/lib/types/analytics";

const columnHelper = createColumnHelper<PartnerAnalyticsEvent>();
const eventDateFormatter = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const formatEventDate = (date: string) => {
  const parsedDate = new Date(`${date}T00:00:00Z`);

  return Number.isNaN(parsedDate.getTime())
    ? date
    : eventDateFormatter.format(parsedDate);
};

export const Column = [
  columnHelper.accessor("title", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Event
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  }),

  columnHelper.accessor("date", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => formatEventDate(getValue()),
  }),

  columnHelper.accessor("category", {
    header: "Category",
  }),

  columnHelper.accessor("ticketsSold", {
    header: "Tickets Sold",
    cell: ({ getValue }) => numberWithCommas(getValue()),
  }),

  columnHelper.accessor("revenue", {
    header: "Revenue",
    cell: ({ getValue }) => `₦${numberWithCommas(getValue())}`,
  }),

  columnHelper.accessor("status", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => <StatusBubble status={getValue()} />,
  }),
];
