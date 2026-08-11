import { Skeleton } from "@/components/ui/skeleton";

const SettingsPageSkeleton = () => (
  <div
    className="flex min-h-40 items-center gap-4 rounded-[16px] border border-[#F5F5F5] px-6 py-8"
    role="status"
    aria-label="Loading event settings"
  >
    <Skeleton className="size-11 shrink-0 rounded-full bg-gray-200" />
    <div className="w-full max-w-md space-y-2">
      <Skeleton className="h-5 w-40 bg-gray-200" />
      <Skeleton className="h-4 w-full bg-gray-200" />
      <Skeleton className="h-4 w-3/4 bg-gray-200" />
    </div>
  </div>
);

export default SettingsPageSkeleton;
