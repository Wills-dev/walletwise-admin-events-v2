import type { ApiResponse } from ".";

export interface PartnerEventAnalyticsSummary {
  totalEvents: number;
  totalRevenue: number;
  totalTicketsSold: number;
  totalAttendees: number;
  averageRevenuePerEvent: number;
  averageTicketsPerEvent: number;
}

export interface TopPerformingEvent {
  eventId: string;
  title: string;
  ticketsSold: number;
  revenue: number;
}

export interface RevenueByCategory {
  category: string;
  revenue: number;
  color: string;
}

export interface RevenueByEvent {
  event: string;
  eventId: string;
  revenue: number;
}

export interface PartnerAnalyticsEvent {
  eventId: string;
  title: string;
  createdAt: string;
  date: string;
  category: string;
  ticketsSold: number;
  revenue: number;
  status: string;
  timelineStatus: string;
}

export interface AnalyticsPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export interface PartnerEventAnalyticsData {
  summary: PartnerEventAnalyticsSummary;
  topPerformingEvent: TopPerformingEvent | null;
  revenueByCategory: RevenueByCategory[];
  revenueByEvent: RevenueByEvent[];
  eventsTable: PartnerAnalyticsEvent[];
  pagination: AnalyticsPagination;
}

export type PartnerEventAnalyticsResponse =
  ApiResponse<PartnerEventAnalyticsData>;

export interface PartnerEventAnalyticsParams {
  page?: number;
  limit?: number;
}
