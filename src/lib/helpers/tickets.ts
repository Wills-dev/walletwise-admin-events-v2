import type { PartnerTicketRow } from "@/lib/types/tickets";

interface TicketFilters {
  search: string;
  ticketType: string;
}

export interface TicketTypeOption {
  label: string;
  value: string;
}

const missingTicketTypeValue = "missing";

export const getTicketTypeLabel = (ticketType: string | null) =>
  ticketType?.trim() || "Unspecified";

const getTicketTypeFilterValue = (ticketType: string | null) => {
  const normalizedTicketType = ticketType?.trim();

  return normalizedTicketType
    ? `type:${normalizedTicketType}`
    : missingTicketTypeValue;
};

export const getTicketTypeOptions = (
  tickets: PartnerTicketRow[],
): TicketTypeOption[] => {
  const options = new Map<string, TicketTypeOption>();

  tickets.forEach((ticket) => {
    const value = getTicketTypeFilterValue(ticket.ticketType);
    const isMissing = value === missingTicketTypeValue;

    options.set(value, {
      label: isMissing
        ? "Unspecified (missing type)"
        : getTicketTypeLabel(ticket.ticketType),
      value,
    });
  });

  return Array.from(options.values()).sort((first, second) =>
    first.label.localeCompare(second.label),
  );
};

export const filterTickets = (
  tickets: PartnerTicketRow[],
  { search, ticketType }: TicketFilters,
) => {
  const normalizedSearch = search.trim().toLocaleLowerCase();

  return tickets.filter((ticket) => {
    const matchesTicketType =
      !ticketType ||
      getTicketTypeFilterValue(ticket.ticketType) === ticketType;
    const searchableValues = [
      ticket.transactionId,
      `#${ticket.transactionId}`,
      ticket.name,
      ticket.email,
      ticket.phone,
      getTicketTypeLabel(ticket.ticketType),
    ]
      .filter((value) => value !== null && value !== undefined)
      .map(String)
      .join(" ")
      .toLocaleLowerCase();
    const matchesSearch =
      !normalizedSearch || searchableValues.includes(normalizedSearch);

    return matchesTicketType && matchesSearch;
  });
};
