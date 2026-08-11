"use client";

import FilterWrapper from "@/components/molecules/FilterWrapper/FilterWrapper";
import TicketEmptyState from "@/components/molecules/TicketEmptyState/TicketEmptyState";
import TicketTable from "@/components/molecules/TicketTable/TicketTable";
import type { TicketTableView } from "@/lib/hooks/useTicketTableView";
import type { PartnerTicketRow } from "@/lib/types/tickets";

interface TicketTablePanelProps {
  tickets: PartnerTicketRow[];
  tableView: TicketTableView;
}

const TicketTablePanel = ({
  tickets,
  tableView,
}: TicketTablePanelProps) => {
  const { filteredTickets, filters, pagination } = tableView;

  if (tickets.length === 0) {
    return (
      <div className="rounded-[16px] border border-[#F5F5F5]">
        <TicketEmptyState variant="no-tickets" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[16px] border border-[#F5F5F5]">
      <div className="px-6 py-4">
        <FilterWrapper
          search={filters.search}
          onSearchChange={filters.setSearch}
          ticketTypeOptions={filters.ticketTypeOptions}
          selectedTicketType={filters.ticketType}
          onTicketTypeChange={filters.setTicketType}
          resultsCount={filters.resultsCount}
        />
      </div>

      {filteredTickets.length === 0 ? (
        <TicketEmptyState variant="no-results" />
      ) : (
        <TicketTable
          data={filteredTickets}
          totalPages={pagination.totalPages}
          currentPage={pagination.currentPage}
          paginationMode="client"
          prevPage={pagination.previousPage}
          nextPage={pagination.nextPage}
          goToFirstPage={pagination.firstPage}
          goToLastPage={pagination.lastPage}
          isFirstPage={pagination.isFirstPage}
          isLastPage={pagination.isLastPage}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
        />
      )}
    </div>
  );
};

export default TicketTablePanel;
