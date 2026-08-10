import Select from "@/components/atoms/Select/Select";

interface SelectWrapperProps {
  ticketTypes: string[];
  value: string;
  onChange: (value: string) => void;
}

const SelectWrapper = ({
  ticketTypes,
  value,
  onChange,
}: SelectWrapperProps) => {
  const options = ticketTypes.map((ticketType) => ({
    label: ticketType,
    value: ticketType,
  }));

  return (
    <Select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Filter by ticket type"
      placeholder="All ticket types"
      placeholderDisabled={false}
      options={options}
      variant="secondary"
    />
  );
};

export default SelectWrapper;
