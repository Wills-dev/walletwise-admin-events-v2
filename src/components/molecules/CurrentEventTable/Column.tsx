import { ArrowUpDown } from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

const columnHelper = createColumnHelper();

export const Column = [
  columnHelper.accessor("id", {
    header: "Ticket ID",
  }),

  columnHelper.accessor("fullName", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),

  columnHelper.accessor("email", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),

  columnHelper.accessor("phone", {
    header: "Phone Number",
  }),

  columnHelper.accessor("VIP", {
    header: "VIP Tickets",
  }),

  columnHelper.accessor("regular", {
    header: "Regular Tickets",
  }),
];
