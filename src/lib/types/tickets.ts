import type { ApiResponse } from ".";

export type ApiNumeric = string | number;

export interface PartnerTicketRow {
  transactionId: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  ticketType: string | null;
  count: number;
  totalAmount: ApiNumeric | null;
  date: string;
}

export interface PartnerTicketsData {
  unique_attendees: ApiNumeric;
  total_tickets_sold: ApiNumeric;
  total_revenue: ApiNumeric;
  average_spending: ApiNumeric;
  tickets_table: PartnerTicketRow[];
}

export type PartnerTicketsResponse = ApiResponse<PartnerTicketsData>;
