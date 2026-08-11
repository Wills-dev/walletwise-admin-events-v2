import { numberWithCommas } from "@/lib/helpers/formatNumbers";
import { formatCompactRevenue } from "@/lib/helpers/revenue";
import type { RevenueByTicketType as RevenueByTicketTypeItem } from "@/lib/types/revenue";

interface RevenueByTicketTypeProps {
  items: RevenueByTicketTypeItem[];
  totalRevenue: number;
}

const percentageFormatter = new Intl.NumberFormat("en-NG", {
  maximumFractionDigits: 1,
});

const RevenueByTicketType = ({
  items,
  totalRevenue,
}: RevenueByTicketTypeProps) => {
  const segmentWeights = items.map((item) => Math.max(item.revenue, 0));
  const totalWeight = segmentWeights.reduce(
    (total, revenue) => total + revenue,
    0,
  );
  const visibleSegments = items.flatMap((item, index) =>
    segmentWeights[index] > 0
      ? [{ item, index, weight: segmentWeights[index] }]
      : [],
  );
  const percentageBase = Math.max(totalRevenue, 0) || totalWeight;

  return (
    <section className="rounded-[16px] border border-[#F5F5F5] px-4 py-5 sm:px-6">
      <h2 className="text-base font-medium text-[#262626]">
        Revenue by Ticket Type
      </h2>

      <div
        className="mt-5 flex h-3 overflow-hidden rounded-full bg-gray-200"
        aria-hidden="true"
      >
        {items.length > 0 &&
          visibleSegments.map(({ item, index, weight }) => (
            <span
              key={`${item.type}-${item.color}-${index}`}
              className="h-full border-r border-white last:border-r-0"
              style={{
                backgroundColor: item.color,
                flexBasis: 0,
                flexGrow: weight,
              }}
              title={`${item.type}: ₦${numberWithCommas(item.revenue)}`}
            />
          ))}
      </div>

      {items.length === 0 ? (
        <div className="mt-[18px] flex min-h-20 items-center justify-center rounded-xl bg-[#F5F5F5] px-5 py-4 text-center text-sm text-[#737373]">
          No ticket-type revenue yet.
        </div>
      ) : (
        <div className="mt-[18px] grid grid-cols-[repeat(auto-fit,minmax(min(18rem,100%),1fr))] gap-2">
          {items.map((item, index) => {
            const share =
              percentageBase > 0
                ? (segmentWeights[index] / percentageBase) * 100
                : 0;
            const formattedShare = percentageFormatter.format(share);
            const soldLabel =
              item.ticketsSold === null
                ? "— sold"
                : `${numberWithCommas(item.ticketsSold)} sold`;
            const revenueFormula =
              item.ticketsSold !== null &&
              item.averageRevenuePerTicket !== null
                ? `${numberWithCommas(item.ticketsSold)}X₦${numberWithCommas(item.averageRevenuePerTicket)}`
                : "—";
            const breakdownLabel = `${revenueFormula} • ${formattedShare}%`;

            return (
              <article
                key={`${item.type}-${item.color}-${index}`}
                className="flex min-h-20 min-w-0 items-center gap-3 rounded-xl bg-[#F5F5F5] px-5 py-4"
              >
                <span
                  className="h-10 w-1 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                    <p
                      className="min-w-0 truncate text-sm text-[#737373]"
                      title={item.type}
                    >
                      {item.type}
                    </p>
                    <p
                      className="shrink-0 whitespace-nowrap text-lg font-medium text-[#262626]"
                      title={`₦${numberWithCommas(item.revenue)}`}
                    >
                      ₦{formatCompactRevenue(item.revenue)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-sm text-[#737373]">
                    <span className="shrink-0 whitespace-nowrap">
                      {soldLabel}
                    </span>
                    <span
                      className="min-w-0 max-w-full whitespace-normal text-right [overflow-wrap:anywhere]"
                      title={breakdownLabel}
                    >
                      {breakdownLabel}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RevenueByTicketType;
