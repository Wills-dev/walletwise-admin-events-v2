import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import { useEventStore } from "@/store/useEventStore";

const TicketFormCard = ({ ticketKey }: { ticketKey: string }) => {
  const {
    ticketTypes,
    handleTicketChange,
    confirmTicketType,
    editTicketType,
    removeTicketType,
  } = useEventStore();

  const ticket = ticketTypes[ticketKey];
  const isRegular = ticketKey === "regular";

  if (ticket.confirmed) {
    return (
      <div className="flex items-center justify-between border rounded px-3 py-2 mb-2 bg-gray-50">
        <div className="flex items-center gap-4">
          <span className="font-medium text-sm capitalize">{ticket.name}</span>
          <span className="text-sm text-gray-500">₦{ticket.price}</span>
          <span className="text-sm text-gray-500">{ticket.quantity} slots</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => editTicketType(ticketKey)}
            className="text-xs text-blue-500"
          >
            Edit
          </button>
          {!isRegular && (
            <button type="button" onClick={() => removeTicketType(ticketKey)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="space-y-2 w-full">
        <Label htmlFor="name" title="Name" />
        <Input
          type="text"
          name="name"
          placeholder="Ticket name (e.g. VIP)"
          value={ticket.name}
          onChange={(e) =>
            handleTicketChange(ticketKey, "name", e.target.value)
          }
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="space-y-2 w-full flex-1">
          <Label htmlFor="price" title="Price (₦)" />
          <Input
            type="number"
            name="price"
            placeholder="0"
            value={ticket.price}
            onChange={(e) =>
              handleTicketChange(ticketKey, "price", e.target.value)
            }
          />
        </div>
        <div className="space-y-2 w-full flex-1">
          <Label htmlFor="quantity" title="Capacity" />
          <Input
            type="text"
            name="quantity"
            placeholder="0"
            value={ticket.quantity}
            onChange={(e) =>
              handleTicketChange(ticketKey, "quantity", Number(e.target.value))
            }
          />
        </div>
        <button
          type="button"
          onClick={() => {
            if (
              ticket.name.trim() &&
              ticket.price.trim() &&
              ticket.quantity > 0
            ) {
              confirmTicketType(ticketKey);
            }
          }}
          className="bg-[#6637CF] text-white px-3 h-6 flex justify-center items-center text-center rounded text-sm mt-6"
        >
          Add
        </button>
        {!isRegular && (
          <button
            type="button"
            onClick={() => removeTicketType(ticketKey)}
            className="mt-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default TicketFormCard;
