"use client";

import { Pie, PieChart } from "recharts";
import { CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import ChartTitle from "@/components/atoms/ChartTitle/ChartTitle";
import ChartDesc from "@/components/atoms/ChartDesc/ChartDesc";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";

const chartData = [
  { "ticket type": "Regular", revenue: 2275, fill: "#2B7FFF" },
  { "ticket type": "VIP", revenue: 2000, fill: "#E17100" },
  { "ticket type": "VVIP", revenue: 187, fill: "#00C950" },
];
const chartConfig = {
  revenue: {
    label: "Revenue",
  },
  regular: {
    label: "Regular",
    color: "var(--chart-1)",
  },
  VIP: {
    label: "VIP",
    color: "var(--chart-2)",
  },
  VVIP: {
    label: "VVIP",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const PieChartContent = () => {
  return (
    <div className="max-w-112.25 w-full min-w-72.5 h-full">
      <div className="flex flex-col border border-[#F5F5F5] rounded-[16px] py-6 h-full">
        <CardHeader className="items-center pb-0">
          <ChartTitle title="Ticket Breakdown" />
          <ChartDesc>
            <>
              <span className="text-sm text-[#737373]">₦</span>
              {`501k`}
            </>
          </ChartDesc>
        </CardHeader>
        <div className="flex-1 pb-0 flex items-center gap-2">
          <ChartContainer
            config={chartConfig}
            className="aspect-square h-[255px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="revenue"
                nameKey="ticket type"
                innerRadius={60}
              />
            </PieChart>
          </ChartContainer>
          <div className="space-y-2 flex-1 w-full">
            {chartData?.map((item) => (
              <div
                key={item?.revenue}
                className="flex items-center gap-2 w-full"
              >
                <div className="flex items-center gap-1 flex-1 w-full">
                  <div
                    className="w-2.25 h-2.25 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  <p className="text-xs text-[#737373] font-medium">
                    {item?.["ticket type"]}
                  </p>
                </div>

                <p className="text-xs font-medium text-[#262626] flex-1 w-full">
                  ₦{item?.revenue && numberWithCommas(item?.revenue)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChartContent;
