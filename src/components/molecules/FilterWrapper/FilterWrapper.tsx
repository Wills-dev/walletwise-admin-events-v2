import SearchForm from "@/components/atoms/SearchForm/SearchForm";
import type { TicketTypeOption } from "@/lib/helpers/tickets";

import SelectWrapper from "../SelectWrapper/SelectWrapper";

interface FilterWrapperProps {
  search: string;
  onSearchChange: (value: string) => void;
  ticketTypeOptions: TicketTypeOption[];
  selectedTicketType: string;
  onTicketTypeChange: (value: string) => void;
  resultsCount: number;
}

const FilterWrapper = ({
  search,
  onSearchChange,
  ticketTypeOptions,
  selectedTicketType,
  onTicketTypeChange,
  resultsCount,
}: FilterWrapperProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <SearchForm value={search} onChange={onSearchChange} />
      <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
        <SelectWrapper
          ticketTypeOptions={ticketTypeOptions}
          value={selectedTicketType}
          onChange={onTicketTypeChange}
        />
        <p className="text-sm font-medium text-[#737373]">
          {resultsCount} {resultsCount === 1 ? "result" : "results"}
        </p>
      </div>
    </div>
  );
};

export default FilterWrapper;
