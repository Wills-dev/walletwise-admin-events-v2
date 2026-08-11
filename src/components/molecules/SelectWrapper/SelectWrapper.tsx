import Select from "@/components/atoms/Select/Select";
import type { TicketTypeOption } from "@/lib/helpers/tickets";

interface SelectWrapperProps {
  ticketTypeOptions: TicketTypeOption[];
  value: string;
  onChange: (value: string) => void;
}

const SelectWrapper = ({
  ticketTypeOptions,
  value,
  onChange,
}: SelectWrapperProps) => {
  return (
    <Select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Filter by ticket type"
      placeholder="All ticket types"
      placeholderDisabled={false}
      options={ticketTypeOptions}
      variant="secondary"
    />
  );
};

export default SelectWrapper;
