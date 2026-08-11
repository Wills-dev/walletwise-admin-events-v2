import type {
  PartnerRevenueData,
  RevenueAmount,
  RevenueDashboardData,
  RevenuePagination,
} from "@/lib/types/revenue";

const fallbackTicketTypeColor = "#A1A1AA";
const hexColorPattern =
  /^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i;

export const parseRevenueAmount = (value: RevenueAmount) => {
  if (value === null) {
    return 0;
  }

  const parsedValue =
    typeof value === "string"
      ? Number(value.replaceAll(",", "").trim())
      : value;

  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

export const formatCompactRevenue = (value: number) => {
  const absoluteValue = Math.abs(value);
  const compactValue = (divisor: number, suffix: string) => {
    const formattedValue = new Intl.NumberFormat("en-NG", {
      maximumFractionDigits: 1,
    }).format(value / divisor);

    return `${formattedValue}${suffix}`;
  };

  if (absoluteValue >= 1_000_000_000) {
    return compactValue(1_000_000_000, "B");
  }

  if (absoluteValue >= 1_000_000) {
    return compactValue(1_000_000, "M");
  }

  if (absoluteValue >= 1_000) {
    return compactValue(1_000, "k");
  }

  return new Intl.NumberFormat("en-NG", {
    maximumFractionDigits: 2,
  }).format(value);
};

const parseTicketCount = (value: RevenueAmount | undefined) => {
  if (value === null || value === undefined) {
    return null;
  }

  const normalizedValue =
    typeof value === "string" ? value.trim() : value;

  if (
    typeof normalizedValue === "string" &&
    !/^(?:\d+|\d{1,3}(?:,\d{3})+)$/.test(normalizedValue)
  ) {
    return null;
  }

  const parsedValue =
    typeof normalizedValue === "string"
      ? Number(normalizedValue.replaceAll(",", ""))
      : normalizedValue;

  return Number.isSafeInteger(parsedValue) && parsedValue >= 0
    ? parsedValue
    : null;
};

const getAverageRevenuePerTicket = (
  revenue: number,
  ticketsSold: number | null,
) => (ticketsSold !== null && ticketsSold > 0 ? revenue / ticketsSold : null);

const normalizePagination = (
  pagination: RevenuePagination | undefined,
): RevenuePagination | undefined => {
  if (!pagination) {
    return undefined;
  }

  const totalPages = Math.max(pagination.totalPages, 1);

  return {
    total: Math.max(pagination.total, 0),
    page: Math.min(Math.max(pagination.page, 1), totalPages),
    limit: Math.max(pagination.limit, 1),
    totalPages,
    hasMore: pagination.hasMore,
  };
};

export const normalizePartnerRevenueData = (
  data: PartnerRevenueData,
): RevenueDashboardData => {
  const totalRevenue = parseRevenueAmount(data.total_revenue);
  const totalTicketsSold = parseTicketCount(data.total_tickets_sold);

  return {
    totalRevenue,
    totalTicketsSold,
    averageOrderValue: getAverageRevenuePerTicket(
      totalRevenue,
      totalTicketsSold,
    ),
    revenueByTicketType: (data.revenue_by_ticket_type ?? []).map(
      (item) => {
        const revenue = parseRevenueAmount(item.revenue);
        const ticketsSold = parseTicketCount(item.ticketsSold);

        return {
          type: item.type?.trim() || "Unknown",
          revenue,
          ticketsSold,
          averageRevenuePerTicket: getAverageRevenuePerTicket(
            revenue,
            ticketsSold,
          ),
          color:
            item.color && hexColorPattern.test(item.color.trim())
              ? item.color.trim()
              : fallbackTicketTypeColor,
        };
      },
    ),
    monthlyBreakdown: (data.monthly_breakdown ?? []).map((item) => ({
      period: item.period,
      revenue: parseRevenueAmount(item.revenue),
      ticketsSold: parseTicketCount(item.ticketsSold),
    })),
    pagination: normalizePagination(data.pagination),
  };
};

export const formatRevenuePeriod = (period: string) => {
  const match = /^(\d{4})-(\d{2})$/.exec(period.trim());

  if (!match) {
    return period || "—";
  }

  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;

  if (monthIndex < 0 || monthIndex > 11) {
    return period;
  }

  return new Intl.DateTimeFormat("en-NG", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, monthIndex, 1)));
};
