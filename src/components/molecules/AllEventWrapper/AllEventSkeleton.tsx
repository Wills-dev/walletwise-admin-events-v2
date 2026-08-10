import { Skeleton } from "@/components/ui/skeleton";

const summaryCards = Array.from({ length: 7 });
const tableRows = Array.from({ length: 6 });
const tableColumns = Array.from({ length: 6 });
const barHeights = [42, 68, 54, 82, 48];

const AllEventSkeleton = () => {
  return (
    <div
      className="space-y-4"
      role="status"
      aria-label="Loading event analytics"
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
              <Skeleton className="h-3 w-40 max-w-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="w-full min-w-72.5 max-w-167.5">
          <div className="rounded-[16px] border border-[#F5F5F5] py-6">
            <div className="space-y-2 px-4">
              <Skeleton className="h-4 w-20 bg-gray-200" />
              <Skeleton className="h-9 w-32 bg-gray-200" />
            </div>
            <div className="mt-4 flex h-[250px] items-end gap-4 px-4 pb-6">
              {barHeights.map((height, index) => (
                <Skeleton
                  key={index}
                  className="w-full rounded-t-lg rounded-b-none bg-gray-200"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="h-full w-full min-w-72.5 max-w-112.25">
          <div className="flex h-full flex-col rounded-[16px] border border-[#F5F5F5] py-6">
            <div className="flex flex-col items-center gap-2 px-4">
              <Skeleton className="h-4 w-36 bg-gray-200" />
              <Skeleton className="h-9 w-28 bg-gray-200" />
            </div>
            <div className="flex min-h-[250px] flex-1 items-center gap-4 max-sm:flex-col max-sm:px-4">
              <Skeleton className="aspect-square h-[255px] max-w-full rounded-full bg-gray-200" />
              <div className="w-full flex-1 space-y-3">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Skeleton className="h-2.5 w-2.5 rounded-full bg-gray-200" />
                    <Skeleton className="h-3 w-full bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[16px] border border-[#F5F5F5]">
        <div className="px-6 py-4">
          <Skeleton className="h-5 w-24 bg-gray-200" />
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-190">
            <div className="grid grid-cols-6 gap-6 bg-[#00000005] px-4 py-3">
              {tableColumns.map((_, index) => (
                <Skeleton key={index} className="h-4 w-20 bg-gray-200" />
              ))}
            </div>
            {tableRows.map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-6 gap-6 border-t border-[#F5F5F5] px-4 py-4"
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
      <span className="sr-only">Loading event analytics</span>
    </div>
  );
};

export default AllEventSkeleton;
