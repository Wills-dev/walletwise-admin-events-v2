"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { TableWrapperProps } from "@/lib/types";
import type { PartnerAnalyticsEvent } from "@/lib/types/analytics";

import TableWrapper from "../TableWrapper/TableWrapper";
import { Column } from "./Column";

type AllEventTableProps = Omit<
  TableWrapperProps<PartnerAnalyticsEvent>,
  "columns" | "isLoading"
>;

const AllEventTable = (props: AllEventTableProps) => {
  return (
    <div className="rounded-[16px] border border-[#F5F5F5]">
      <div className="px-6 py-4">
        <h6 className="font-medium text-[#737373]">Events</h6>
      </div>
      <TableWrapper
        columns={Column as ColumnDef<PartnerAnalyticsEvent>[]}
        {...props}
      />
    </div>
  );
};

export default AllEventTable;
