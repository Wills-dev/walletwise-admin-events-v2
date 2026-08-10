"use client";

import { Pie, PieChart } from "recharts";

import ChartDesc from "@/components/atoms/ChartDesc/ChartDesc";
import ChartTitle from "@/components/atoms/ChartTitle/ChartTitle";
import { CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";
import type { ChartDataPoint } from "@/lib/types/charts";
import { cn } from "@/lib/utils";

const DEFAULT_COLORS = ["#2B7FFF", "#E17100", "#00C950", "#8B5CF6"];

interface PieChartContentProps {
  data: ChartDataPoint[];
  title: string;
  total?: number;
  valueLabel?: string;
  valuePrefix?: string;
  className?: string;
  emptyMessage?: string;
}

const PieChartContent = ({
  data,
  title,
  total,
  valueLabel = "Revenue",
  valuePrefix = "₦",
  className,
  emptyMessage = "No revenue recorded yet",
}: PieChartContentProps) => {
  const displayedTotal =
    total ?? data.reduce((sum, item) => sum + item.value, 0);
  const hasPositiveValue = data.some((item) => item.value > 0);
  const chartData = data.map((item, index) => ({
    ...item,
    fill: item.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length],
  }));
  const displayedChartData = hasPositiveValue
    ? chartData
    : [{ label: emptyMessage, value: 1, fill: "#E5E7EB" }];
  const chartConfig: ChartConfig = {
    value: {
      label: valueLabel,
    },
  };

  return (
    <div
      className={cn(
        "max-w-112.25 w-full min-w-72.5 h-full",
        className,
      )}
    >
      <div className="flex h-full flex-col rounded-[16px] border border-[#F5F5F5] py-6">
        <CardHeader className="items-center pb-0">
          <ChartTitle title={title} />
          <ChartDesc>
            <span>
              {valuePrefix}
              {numberWithCommas(displayedTotal)}
            </span>
          </ChartDesc>
        </CardHeader>
        <div className="flex flex-1 items-center gap-2 pb-0 max-sm:flex-col">
          <div className="relative">
            <ChartContainer
              config={chartConfig}
              className="aspect-square h-[255px]"
            >
              <PieChart>
                {hasPositiveValue && (
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        hideLabel
                        formatter={(value, _name, item) => (
                          <div className="flex min-w-28 flex-1 items-center justify-between gap-4">
                            <span className="text-muted-foreground">
                              {item.payload?.label ?? valueLabel}
                            </span>
                            <span className="font-mono font-medium tabular-nums">
                              {valuePrefix}
                              {numberWithCommas(Number(value))}
                            </span>
                          </div>
                        )}
                      />
                    }
                  />
                )}
                <Pie
                  data={displayedChartData}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={60}
                />
              </PieChart>
            </ChartContainer>
            {!hasPositiveValue && (
              <p className="pointer-events-none absolute inset-0 flex items-center justify-center px-12 text-center text-xs text-[#737373]">
                {emptyMessage}
              </p>
            )}
          </div>
          <div className="w-full flex-1 space-y-2">
            {chartData.map((item, index) => (
              <div
                key={item.id ?? `${item.label}-${index}`}
                className="flex w-full items-center gap-2"
              >
                <div className="flex w-full flex-1 items-center gap-1">
                  <div
                    className="h-2.25 w-2.25 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  <p className="text-xs font-medium text-[#737373]">
                    {item.label}
                  </p>
                </div>
                <p className="w-full flex-1 text-xs font-medium text-[#262626]">
                  {valuePrefix}
                  {numberWithCommas(item.value)}
                </p>
              </div>
            ))}
            {data.length === 0 && (
              <p className="text-xs font-medium text-[#737373]">
                {emptyMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChartContent;
