"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { CardContent, CardHeader } from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";

import ChartTitle from "@/components/atoms/ChartTitle/ChartTitle";
import ChartDesc from "@/components/atoms/ChartDesc/ChartDesc";
import { ChartDataPoint } from "@/lib/types/charts";

const chartConfig = {
  value: {
    label: "Revenue",
    color: "#b4f7b4",
  },
} satisfies ChartConfig;

const AreaChartContent = ({
  data,
  filter,
  setFilter,
  totalRevenue,
}: {
  data: ChartDataPoint[];
  filter: string;
  setFilter: (filter: string) => void;
  totalRevenue: number;
}) => {
  const filterOPtions = [
    { label: "7 days", value: "7days" },
    { label: "30 days", value: "30days" },
    { label: "All time", value: "all" },
  ];

  return (
    <div className="max-w-167.5 w-full  min-w-72.5">
      <div className="border border-[#F5F5F5] py-6 rounded-[16px]">
        <CardHeader>
          <div className="flex gap-10 justify-between w-full">
            <ChartTitle title="  Revenue" />
            <div className="flex bg-[#F5F5F5] border border-[#F5F5F5] p-0.5 rounded-[8px]">
              {filterOPtions?.map((item) => (
                <button
                  onClick={() => setFilter(item.value)}
                  key={item?.label}
                  className={`px-2 py-1 font-medium text-xs cursor-pointer rounded-[6px] ${item.value !== filter ? "text-[#737373]" : "bg-white text-[#262626]"}`}
                >
                  {item?.label}
                </button>
              ))}
            </div>
          </div>
          <ChartDesc>
            <span>₦{totalRevenue && numberWithCommas(totalRevenue)}</span>
          </ChartDesc>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value: string) => value.slice(0, 30)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Area
                dataKey="value"
                type="linear"
                fill="#acecbe"
                fillOpacity={0.4}
                stroke="#24A148"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </div>
    </div>
  );
};

export default AreaChartContent;
