import { Search } from "lucide-react";

const SearchForm = () => {
  return (
    <form className="flex-1 w-full h-10- rounded-[12px] py-2 px-3 flex gap-2 items-center border border-[#F5F5F5] bg-[#00000005]">
      <button className="text-[#A1A1A1] cursor-pointer">
        <Search className="w-5 h-5" />
      </button>
      <input
        type="search"
        name=""
        id=""
        className="h-full flex-1 w-full placeholder:text-[#A1A1A1] text-sm font-medium"
        placeholder="Search by name, email, ID"
      />
    </form>
  );
};

export default SearchForm;
