import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationComponentProps {
  totalPages: number;
  currentPage: number;
  prevPage: () => void;
  nextPage: (totalPages: number) => void;
  goToLastPage: (totalPages: number) => void;
  goToFirstPage: () => void;
  isFirstPage: () => boolean;
  isLastPage: (totalPages: number) => boolean;
  limit: number;
  setLimit: (limit: number) => void;
  setCurrentPage?: (page: number) => void;
}

const PaginationComponent = ({
  totalPages,
  currentPage,
  prevPage,
  nextPage,
  goToLastPage,
  goToFirstPage,
  isFirstPage,
  isLastPage,
  limit,
  setLimit,
}: PaginationComponentProps) => {
  const noPrevPage = isFirstPage();
  const noNextPage = () => isLastPage(totalPages);

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-2 max-sm:hidden">
        <p className="text-sm font-medium">Show</p>
        <Select
          value={`${limit}`}
          onValueChange={(value) => {
            setLimit(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-17.5">
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent side="top" className="bg-white dark:bg-gray-800">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm font-medium">entries</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex w-25 items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={goToFirstPage}
            disabled={noPrevPage}
            type="button"
          >
            <span className="sr-only">Go to first page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={prevPage}
            disabled={noPrevPage}
          >
            <span className="sr-only">Go to previous page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </Button>
          <span className="h-8 max-w-16 min-w-8 w-full rounded flex  text-center border border-gray-300 ">
            {currentPage}
          </span>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => nextPage(totalPages)}
            disabled={noNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => goToLastPage(totalPages)}
            disabled={noNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
