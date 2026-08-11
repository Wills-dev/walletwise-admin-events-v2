import { Banknote } from "lucide-react";

import SummaryCard from "@/components/atoms/SummaryCard/SummaryCard";
import { numberWithCommas } from "@/lib/helpers/formatNumbers";

import SummaryCardWrapper from "../SummaryCardWrapper/SummaryCardWrapper";

interface RevenueSummaryProps {
  totalRevenue: number;
  averageOrderValue: number | null;
}

const RevenueSummary = ({
  totalRevenue,
  averageOrderValue,
}: RevenueSummaryProps) => {
  return (
    <SummaryCardWrapper variant="maxThree">
      <SummaryCard
        title="Gross Revenue"
        value={numberWithCommas(totalRevenue)}
        currency="NGN"
        icon={Banknote}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">Across ticket sales</span>
        </div>
      </SummaryCard>
      <SummaryCard
        title="Average Order Value"
        value={
          averageOrderValue === null
            ? "—"
            : numberWithCommas(averageOrderValue)
        }
        currency={averageOrderValue === null ? undefined : "NGN"}
        icon={Banknote}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">
            {averageOrderValue === null
              ? "No sold tickets yet"
              : "Based on tickets sold"}
          </span>
        </div>
      </SummaryCard>
      <SummaryCard
        title="Confirmed Revenue"
        value={numberWithCommas(totalRevenue)}
        currency="NGN"
        icon={Banknote}
      >
        <div className="flex items-center gap-1 text-[#737373]">
          <span className="text-xs font-medium">Locked in</span>
        </div>
      </SummaryCard>
    </SummaryCardWrapper>
  );
};

export default RevenueSummary;
