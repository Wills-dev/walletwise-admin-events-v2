import { ColumnDef } from "@tanstack/react-table";

import { Column } from "./Column";
import { dummyTickets } from "@/lib/constants/dummy";
import { useGetCurrentTicket } from "@/lib/hooks/useGetCurrentTicket";

import TableWrapper from "../TableWrapper/TableWrapper";

const CurrentEventTable = () => {
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
    <div className="border border-[#F5F5F5] rounded-[16px]">
      <div className="py-4 px-6">
        <h6 className="text-[#737373] font-medium">Recent Registrations</h6>
      </div>
      <TableWrapper
        columns={typedColumns}
        data={dummyTickets || []}
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
    </div>
  );
};

export default CurrentEventTable;
