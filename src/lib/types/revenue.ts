import type { ApiResponse } from ".";

export interface PartnerRevenueParams {
  page: number;
  limit: number;
  period: string;
  eventId?: string;
  search?: string;
}

export type RevenueAmount = string | number | null;

export interface RevenueByTicketTypeDto {
  type: string | null;
  revenue: RevenueAmount;
  ticketsSold: RevenueAmount;
  color: string | null;
}

export interface MonthlyRevenueBreakdownDto {
  period: string;
  revenue: RevenueAmount;
  ticketsSold?: RevenueAmount;
}

export interface RevenuePagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export interface PartnerRevenueData {
  total_revenue: RevenueAmount;
  total_tickets_sold: RevenueAmount;
  revenue_by_ticket_type: RevenueByTicketTypeDto[];
  monthly_breakdown: MonthlyRevenueBreakdownDto[];
  pagination?: RevenuePagination;
}

export interface RevenueByTicketType {
  type: string;
  revenue: number;
  ticketsSold: number | null;
  averageRevenuePerTicket: number | null;
  color: string;
}

export interface MonthlyRevenueBreakdown {
  period: string;
  revenue: number;
  ticketsSold: number | null;
}

export interface RevenueDashboardData {
  totalRevenue: number;
  totalTicketsSold: number | null;
  averageOrderValue: number | null;
  revenueByTicketType: RevenueByTicketType[];
  monthlyBreakdown: MonthlyRevenueBreakdown[];
  pagination?: RevenuePagination;
}

export type PartnerRevenueResponse = ApiResponse<PartnerRevenueData>;
