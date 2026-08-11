"use client";

import type { ColumnDef } from "@tanstack/react-table";

import SearchForm from "@/components/atoms/SearchForm/SearchForm";
import { Button } from "@/components/ui/button";
import type { MonthlyRevenueBreakdown } from "@/lib/types/revenue";

import { Column } from "./Column";
import TableWrapper from "../TableWrapper/TableWrapper";

interface RevenueBreakdownTableProps {
  data: MonthlyRevenueBreakdown[];
  totalPages: number;
  currentPage: number;
  limit: number;
  search: string;
  submittedSearch?: string;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSearch: (search: string) => void;
  submitSearch: () => void;
  clearSearch: () => void;
}

const RevenueBreakdownTable = ({
  data,
  totalPages,
  currentPage,
  limit,
  search,
  submittedSearch,
  setPage,
  setLimit,
  setSearch,
  submitSearch,
  clearSearch,
}: RevenueBreakdownTableProps) => {
  return (
    <div className="overflow-hidden rounded-[16px] border border-[#F5F5F5]">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
        <h2 className="font-medium text-[#262626]">Monthly Breakdown</h2>
        <form
          className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:min-w-80 sm:flex-nowrap"
          onSubmit={(event) => {
            event.preventDefault();
            submitSearch();
          }}
        >
          <SearchForm
            id="revenue-search"
            label="Search revenue breakdown"
            placeholder="Search revenue records"
            value={search}
            onChange={setSearch}
          />
          <Button type="submit" variant="outline" className="h-10">
            Search
          </Button>
          {(search || submittedSearch) && (
            <Button
              type="button"
              variant="ghost"
              className="h-10"
              onClick={clearSearch}
            >
              Clear
            </Button>
          )}
        </form>
      </div>
      <TableWrapper
        columns={Column as ColumnDef<MonthlyRevenueBreakdown>[]}
        data={data}
        totalPages={totalPages}
        currentPage={currentPage}
        prevPage={() => setPage(Math.max(currentPage - 1, 1))}
        nextPage={(lastPage) =>
          setPage(Math.min(currentPage + 1, lastPage))
        }
        goToFirstPage={() => setPage(1)}
        goToLastPage={(lastPage) => setPage(lastPage)}
        isFirstPage={() => currentPage <= 1}
        isLastPage={(lastPage) => currentPage >= lastPage}
        limit={limit}
        setLimit={setLimit}
      />
    </div>
  );
};

export default RevenueBreakdownTable;
