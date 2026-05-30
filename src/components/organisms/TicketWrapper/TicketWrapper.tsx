import FilterWrapper from "@/components/molecules/FilterWrapper/FilterWrapper";
import TicketSummary from "@/components/molecules/TicketSummary/TicketSummary";

const TicketWrapper = () => {
  return (
    <div className="space-y-4">
      <TicketSummary />
      <div className="">
        <FilterWrapper />
      </div>
    </div>
  );
};

export default TicketWrapper;
