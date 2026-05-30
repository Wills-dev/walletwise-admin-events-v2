"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { CardContent, CardHeader } from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { useGetCurrentEventChart } from "@/lib/hooks/useGetCurrentEventChart";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";

import ChartTitle from "@/components/atoms/ChartTitle/ChartTitle";
import ChartDesc from "@/components/atoms/ChartDesc/ChartDesc";

const chartData = [
  { month: "January", revenue: 186 },
  { month: "February", revenue: 305 },
  { month: "March", revenue: 237 },
  { month: "April", revenue: 73 },
  { month: "May", revenue: 209 },
  { month: "June", revenue: 214 },
];
const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#b4f7b4",
  },
} satisfies ChartConfig;

const AreaChartContent = () => {
  const totalRevenue = 501000;
  const { handleFilterChange, filter } = useGetCurrentEventChart();

  const filterOPtions = [
    { label: "Today", value: "today" },
    { label: "7 days", value: "7days" },
    { label: "30 days", value: "30days" },
    { label: "All time", value: "" },
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
                  onClick={() => handleFilterChange(item.value)}
                  key={item?.label}
                  className={`px-2 py-1 font-medium text-xs cursor-pointer rounded-[6px] ${item.value !== filter ? "text-[#737373]" : "bg-white text-[#262626]"}`}
                >
                  {item?.label}
                </button>
              ))}
            </div>
          </div>
          <ChartDesc>
            <span>₦${totalRevenue && numberWithCommas(totalRevenue)}</span>
          </ChartDesc>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Area
                dataKey="revenue"
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
