import { Search } from "lucide-react";

interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchForm = ({ value, onChange }: SearchFormProps) => {
  return (
    <div
      className="flex h-10 w-full flex-1 items-center gap-2 rounded-[12px] border border-[#F5F5F5] bg-[#00000005] px-3 py-2"
      role="search"
    >
      <Search className="h-5 w-5 text-[#A1A1A1]" aria-hidden="true" />
      <label htmlFor="ticket-search" className="sr-only">
        Search tickets
      </label>
      <input
        type="search"
        name="ticket-search"
        id="ticket-search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-full w-full flex-1 text-sm font-medium outline-none placeholder:text-[#A1A1A1]"
        placeholder="Search by name, email, ID or ticket type"
      />
    </div>
  );
};

export default SearchForm;
