import { ArrowUpDown } from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";
import { formatRevenuePeriod } from "@/lib/helpers/revenue";
import type { MonthlyRevenueBreakdown } from "@/lib/types/revenue";

const columnHelper = createColumnHelper<MonthlyRevenueBreakdown>();

export const Column = [
  columnHelper.accessor("period", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Month
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => formatRevenuePeriod(getValue()),
  }),

  columnHelper.accessor("ticketsSold", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tickets Sold
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const ticketsSold = getValue();

      return ticketsSold === null ? "—" : numberWithCommas(ticketsSold);
    },
  }),

  columnHelper.accessor("revenue", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Revenue
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => `₦${numberWithCommas(getValue())}`,
  }),
];
