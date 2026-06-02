import { ArrowUpDown } from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

export interface TicketType {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  regular: number;
  vip: number;
}

const columnHelper = createColumnHelper<TicketType>();

export const Column = [
  columnHelper.accessor("id", {
    header: "ID",
  }),

  columnHelper.accessor("fullName", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Full Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
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
  }),

  columnHelper.accessor("phoneNumber", {
    header: "Phone Number",
  }),

  columnHelper.accessor("regular", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Regular
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  }),

  columnHelper.accessor("vip", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        VIP
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  }),
];
