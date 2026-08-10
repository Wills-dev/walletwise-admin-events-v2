import { Skeleton } from "@/components/ui/skeleton";

const summaryCards = Array.from({ length: 4 });
const tableColumns = Array.from({ length: 8 });
const tableRows = Array.from({ length: 6 });

const TicketPageSkeleton = () => {
  return (
    <div
      className="space-y-4"
      role="status"
      aria-label="Loading ticket data"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {summaryCards.map((_, index) => (
          <div
            key={index}
            className="w-full rounded-[16px] border border-[#F5F5F5] px-6 py-5.5"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-4 w-28 bg-gray-200" />
                <Skeleton className="h-9 w-9 rounded-[10px] bg-gray-200" />
              </div>
              <Skeleton className="h-9 w-32 bg-gray-200" />
              <Skeleton className="h-3 w-36 max-w-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-[16px] border border-[#F5F5F5]">
        <div className="flex flex-wrap items-center gap-2 px-6 py-4">
          <Skeleton className="h-10 min-w-52 flex-1 bg-gray-200" />
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
            <Skeleton className="h-10 w-44 bg-gray-200" />
            <Skeleton className="h-4 w-16 bg-gray-200" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-225">
            <div className="grid grid-cols-8 gap-5 bg-[#00000005] px-4 py-3">
              {tableColumns.map((_, index) => (
                <Skeleton key={index} className="h-4 w-20 bg-gray-200" />
              ))}
            </div>
            {tableRows.map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-8 gap-5 border-t border-[#F5F5F5] px-4 py-4"
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

export default TicketPageSkeleton;
