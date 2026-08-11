import { ArrowUpDown } from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";
import { getTicketTypeLabel } from "@/lib/helpers/tickets";
import type { PartnerTicketRow } from "@/lib/types/tickets";

const columnHelper = createColumnHelper<PartnerTicketRow>();
const ticketDateFormatter = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Africa/Lagos",
});

const fallbackText = (value: string | null) => value?.trim() || "—";

const formatTicketDate = (date: string) => {
  const parsedDate = new Date(date);

  return Number.isNaN(parsedDate.getTime())
    ? date || "—"
    : ticketDateFormatter.format(parsedDate);
};

export const Column = [
  columnHelper.accessor("transactionId", {
    header: "Transaction ID",
    cell: ({ getValue }) => `#${getValue()}`,
  }),

  columnHelper.accessor("name", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => fallbackText(getValue()),
  }),

  columnHelper.accessor("email", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => fallbackText(getValue()),
  }),

  columnHelper.accessor("phone", {
    header: "Phone Number",
    cell: ({ getValue }) => fallbackText(getValue()),
  }),

  columnHelper.accessor("ticketType", {
    header: "Ticket Type",
    cell: ({ getValue }) => (
      <span className="inline-flex rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-xs font-medium text-[#5A27CC]">
        {getTicketTypeLabel(getValue())}
      </span>
    ),
  }),

  columnHelper.accessor("count", {
    header: "Quantity",
    cell: ({ getValue }) => numberWithCommas(getValue()),
  }),

  columnHelper.accessor("totalAmount", {
    header: "Total Amount",
    cell: ({ getValue }) => {
      const amount = getValue();

      return amount === null ? "—" : `₦${numberWithCommas(amount)}`;
    },
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
    cell: ({ getValue }) => formatTicketDate(getValue()),
  }),
];
