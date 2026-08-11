import { Search } from "lucide-react";

interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  label?: string;
  placeholder?: string;
}

const SearchForm = ({
  value,
  onChange,
  id = "ticket-search",
  label = "Search tickets",
  placeholder = "Search by name, email, ID or ticket type",
}: SearchFormProps) => {
  return (
    <div
      className="flex h-10 w-full flex-1 items-center gap-2 rounded-[12px] border border-[#F5F5F5] bg-[#00000005] px-3 py-2"
      role="search"
    >
      <Search className="h-5 w-5 text-[#A1A1A1]" aria-hidden="true" />
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        type="search"
        name={id}
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-full w-full flex-1 text-sm font-medium outline-none placeholder:text-[#A1A1A1]"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchForm;
