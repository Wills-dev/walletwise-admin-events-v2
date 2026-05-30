"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import ChartTitle from "@/components/atoms/ChartTitle/ChartTitle";
import ChartDesc from "@/components/atoms/ChartDesc/ChartDesc";

const chartData = [
  { event: "Davido Concert", revenue: 186 },
  { event: "Tems&friends", revenue: 305 },
  { event: "Miss Nigeria", revenue: 237 },
  { event: "End of year ...", revenue: 73 },
];
const chartConfig = {
  revenue: {
    label: "Desktop",
    color: "#2B7FFF",
  },
} satisfies ChartConfig;

const BarChartContent = () => {
  return (
    <div className="max-w-167.5 w-full  min-w-72.5">
      <div className="border border-[#F5F5F5] py-6 rounded-[16px]">
        <CardHeader>
          <ChartTitle title="  Revenue" />
          <ChartDesc>
            <span>₦6.4M</span>
          </ChartDesc>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="event"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 30)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="revenue" fill="#2B7FFF" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </div>
    </div>
  );
};

export default BarChartContent;
