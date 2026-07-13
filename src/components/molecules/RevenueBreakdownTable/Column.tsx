import { ArrowUpDown } from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

export interface RevenueBreakdownType {
  month: string;
  ticketSold: number;
  revenue: string;
  percentageTotal: string;
}

const columnHelper = createColumnHelper<RevenueBreakdownType>();

export const Column = [
  columnHelper.accessor("month", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Month
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  }),

  columnHelper.accessor("ticketSold", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tickets Sold
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
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
  }),

  columnHelper.accessor("percentageTotal", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        % of Total Revenue
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  }),
];
