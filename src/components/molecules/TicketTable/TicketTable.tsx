"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { TableWrapperProps } from "@/lib/types";
import type { PartnerTicketRow } from "@/lib/types/tickets";

import TableWrapper from "../TableWrapper/TableWrapper";
import { Column } from "./Column";

type TicketTableProps = Omit<
  TableWrapperProps<PartnerTicketRow>,
  "columns" | "isLoading"
>;

const TicketTable = (props: TicketTableProps) => {
  return (
    <TableWrapper
      columns={Column as ColumnDef<PartnerTicketRow>[]}
      {...props}
    />
  );
};

export default TicketTable;
