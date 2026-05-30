import SearchForm from "@/components/atoms/SearchForm/SearchForm";
import SelectWrapper from "../SelectWrapper/SelectWrapper";

const FilterWrapper = () => {
  return (
    <div className="flex items-center flex-wrap gap-2">
      <SearchForm />
      <div className="flex gap-2 items-center">
        <SelectWrapper />
        <p className="font-medium text-sm text-[#737373] max-sm:hidden block">
          40 results
        </p>
      </div>
    </div>
  );
};

export default FilterWrapper;
