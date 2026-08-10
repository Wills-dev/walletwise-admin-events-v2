import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { createAuthCookie, readAuthCookie } from "../helpers/cookie";

export const useTableState = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const savedLimit = readAuthCookie("limit");

  const initialPage = Number(searchParams.get("page")) || 1;
  const initialLimit =
    Number(searchParams.get("limit")) || Number(savedLimit) || 10;
  const initialSearch = searchParams.get("search") || "";
  const initialStatus = searchParams.get("status") || "";
  const initialTab = searchParams.get("tab") || "";

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [search, setSearch] = useState(initialSearch);
  const [filter, setFilter] = useState<{ [key: number]: string }>({});
  const [status, setStatus] = useState(initialStatus);
  const [tab, setTab] = useState(initialTab);
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(
    initialSearch || null,
  );

  const updateParams = (
    updates: Record<string, string | number | null | undefined>,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "" || !value) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    const nextQuery = params.toString();

    if (nextQuery !== searchParams.toString()) {
      router.replace(`?${nextQuery}`, { scroll: false });
    }
  };

  const handleSwitchTab = (newTab: string) => {
    setTab(newTab);
    setCurrentPage(1);

    updateParams({
      tab: newTab,
      page: 1,
    });
  };

  const handleSortChange = (values: { [key: number]: string }) => {
    setFilter(values);
    setCurrentPage(1);

    updateParams({
      page: 1,
    });
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setCurrentPage(1);

    updateParams({
      status: newStatus,
      page: 1,
    });
  };

  const nextPage = (totalPages: number) => {
    if (currentPage < totalPages) {
      const page = currentPage + 1;

      setCurrentPage(page);

      updateParams({
        page,
      });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const page = currentPage - 1;

      setCurrentPage(page);

      updateParams({
        page,
      });
    }
  };

  const goToLastPage = (totalPages: number) => {
    setCurrentPage(totalPages);

    updateParams({
      page: totalPages,
    });
  };

  const goToFirstPage = () => {
    setCurrentPage(1);

    updateParams({
      page: 1,
    });
  };

  const goToPage = (page: number) => {
    const nextPage = Math.max(page, 1);

    setCurrentPage(nextPage);
    updateParams({
      page: nextPage,
    });
  };

  const isLastPage = (totalPages: number) => {
    return currentPage === totalPages;
  };

  const isFirstPage = () => {
    return currentPage === 1;
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleClear = () => {
    setSearch("");
    setSubmittedQuery(null);
    setCurrentPage(1);

    updateParams({
      search: null,
      page: 1,
    });
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setSubmittedQuery(search);

    updateParams({
      search,
      page: 1,
    });
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1);

    createAuthCookie("limit", String(newLimit));

    updateParams({
      limit: newLimit,
      page: 1,
    });
  };

  return {
    currentPage,
    limit,
    setLimit: handleLimitChange,

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
    handleStatusChange,

    tab,
    handleSwitchTab,

    handleSortChange,
    setCurrentPage,
  };
};
