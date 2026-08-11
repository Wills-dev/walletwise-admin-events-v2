import { Skeleton } from "@/components/ui/skeleton";

const summaryCards = Array.from({ length: 3 });
const ticketTypeCards = Array.from({ length: 3 });
const tableColumns = Array.from({ length: 3 });
const tableRows = Array.from({ length: 9 });

const RevenuePageSkeleton = () => {
  return (
    <div className="space-y-7" role="status" aria-label="Loading revenue data">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summaryCards.map((_, index) => (
          <div
            key={index}
            className="w-full rounded-[16px] border border-[#F5F5F5] px-6 py-5.5"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-4 w-32 bg-gray-200" />
                <Skeleton className="h-9 w-9 rounded-[10px] bg-gray-200" />
              </div>
              <Skeleton className="h-9 w-36 bg-gray-200" />
              <Skeleton className="h-3 w-40 max-w-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[16px] border border-[#F5F5F5] px-4 py-5 sm:px-6">
        <Skeleton className="h-5 w-48 bg-gray-200" />
        <Skeleton className="mt-5 h-3 w-full rounded-full bg-gray-200" />
        <div className="mt-4.5 grid grid-cols-[repeat(auto-fit,minmax(min(18rem,100%),1fr))] gap-2">
          {ticketTypeCards.map((_, index) => (
            <div
              key={index}
              className="flex min-h-20 items-center gap-3 rounded-xl bg-[#F5F5F5] px-5 py-4"
            >
              <Skeleton className="h-10 w-1 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-3">
                  <Skeleton className="h-4 w-20 bg-gray-200" />
                  <Skeleton className="h-5 w-20 bg-gray-200" />
                </div>
                <div className="flex flex-wrap justify-between gap-x-3 gap-y-1">
                  <Skeleton className="h-3 w-16 bg-gray-200" />
                  <Skeleton className="h-3 w-20 bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[16px] border border-[#F5F5F5]">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
          <Skeleton className="h-5 w-44 bg-gray-200" />
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:min-w-80 sm:flex-nowrap">
            <Skeleton className="h-10 min-w-48 flex-1 bg-gray-200" />
            <Skeleton className="h-10 w-20 bg-gray-200" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-150">
            <div className="grid grid-cols-3 gap-6 bg-[#00000005] px-4 py-3">
              {tableColumns.map((_, index) => (
                <Skeleton key={index} className="h-4 w-24 bg-gray-200" />
              ))}
            </div>
            {tableRows.map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-3 gap-6 border-t border-[#F5F5F5] px-4 py-4"
              >
                {tableColumns.map((__, columnIndex) => (
                  <Skeleton
                    key={columnIndex}
                    className="h-4 w-full max-w-28 bg-gray-200"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenuePageSkeleton;
