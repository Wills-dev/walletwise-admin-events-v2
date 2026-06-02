"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Column } from "./Column";

import { tickets } from "@/lib/constants/dummy";
import { useGetCurrentTicket } from "@/lib/hooks/useGetCurrentTicket";

import TableWrapper from "../TableWrapper/TableWrapper";

const TicketTable = () => {
  const {
    currentPage,
    limit,
    setLimit,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    isFirstPage,
    isLastPage,
  } = useGetCurrentTicket();

  const typedColumns = Column as ColumnDef<unknown>[];

  return (
    <TableWrapper
      columns={typedColumns}
      data={tickets || []}
      totalPages={1}
      currentPage={currentPage}
      prevPage={prevPage}
      nextPage={nextPage}
      goToFirstPage={goToFirstPage}
      goToLastPage={goToLastPage}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
      limit={limit}
      setLimit={setLimit}
    />
  );
};

export default TicketTable;
