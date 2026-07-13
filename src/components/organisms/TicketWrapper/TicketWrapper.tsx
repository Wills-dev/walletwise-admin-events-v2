import FilterWrapper from "@/components/molecules/FilterWrapper/FilterWrapper";
import TicketSummary from "@/components/molecules/TicketSummary/TicketSummary";
import TicketTable from "@/components/molecules/TicketTable/TicketTable";

const TicketWrapper = () => {
  return (
    <div className="space-y-4">
      <TicketSummary />
      <div className="border border-[#F5F5F5] rounded-[16px]">
        <div className="py-4 px-6">
          <FilterWrapper />
        </div>
        <TicketTable />
      </div>
    </div>
  );
};

export default TicketWrapper;
