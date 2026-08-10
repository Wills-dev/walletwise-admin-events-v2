import { useTableState } from "./useTableState";

export const useGetCurrentTicket = () => {
  const {
    currentPage,
    limit,
    setLimit,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    goToPage,
    isFirstPage,
    isLastPage,
    search,
    handleSearchChange,
    handleClear,
    submittedQuery,
    handleSearch,
    setFilter,
    filter,
    status,
  } = useTableState();

  return {
    currentPage,
    limit,
    setLimit,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    goToPage,
    isFirstPage,
    isLastPage,
    search,
    handleSearchChange,
    handleClear,
    submittedQuery,
    handleSearch,
    setFilter,
    filter,
    status,
  };
};
