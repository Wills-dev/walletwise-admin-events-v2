"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";

import ChartDesc from "@/components/atoms/ChartDesc/ChartDesc";
import ChartTitle from "@/components/atoms/ChartTitle/ChartTitle";
import { CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";
import type { ChartDataPoint } from "@/lib/types/charts";
import { cn } from "@/lib/utils";

interface BarChartContentProps {
  data: ChartDataPoint[];
  title: string;
  total?: number;
  valueLabel?: string;
  valuePrefix?: string;
  color?: string;
  className?: string;
  emptyMessage?: string;
}

const BarChartContent = ({
  data,
  title,
  total,
  valueLabel = "Revenue",
  valuePrefix = "₦",
  color = "#2B7FFF",
  className,
  emptyMessage = "No revenue recorded yet",
}: BarChartContentProps) => {
  const displayedTotal =
    total ?? data.reduce((sum, item) => sum + item.value, 0);
  const hasPositiveValue = data.some((item) => item.value > 0);
  const chartConfig: ChartConfig = {
    value: {
      label: valueLabel,
      color,
    },
  };

  return (
    <div
      className={cn("max-w-167.5 w-full min-w-72.5", className)}
    >
      <div className="border border-[#F5F5F5] py-6 rounded-[16px]">
        <CardHeader>
          <ChartTitle title={title} />
          <ChartDesc>
            <span>
              {valuePrefix}
              {numberWithCommas(displayedTotal)}
            </span>
          </ChartDesc>
        </CardHeader>
        <CardContent>
          {data.length > 0 ? (
            <div className="relative">
              <ChartContainer
                config={chartConfig}
                className="h-[250px] w-full"
              >
                <BarChart accessibilityLayer data={data}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value: string) => value.slice(0, 30)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        indicator="dot"
                        formatter={(value) => (
                          <div className="flex min-w-28 flex-1 items-center justify-between gap-4">
                            <span className="text-muted-foreground">
                              {valueLabel}
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
                  <Bar dataKey="value" fill={color} radius={8}>
                    {data.map((item, index) => (
                      <Cell
                        key={item.id ?? `${item.label}-${index}`}
                        fill={item.color ?? color}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
              {!hasPositiveValue && (
                <p className="pointer-events-none absolute inset-0 flex items-center justify-center pb-8 text-sm text-[#737373]">
                  {emptyMessage}
                </p>
              )}
            </div>
          ) : (
            <div className="flex h-[250px] items-center justify-center text-sm text-[#737373]">
              {emptyMessage}
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
};

export default BarChartContent;
