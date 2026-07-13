import { TrendingUp, Banknote } from "lucide-react";

import SummaryCardWrapper from "../SummaryCardWrapper/SummaryCardWrapper";
import SummaryCard from "@/components/atoms/SummaryCard/SummaryCard";

const RevenueSummary = () => {
  return (
    <SummaryCardWrapper variant="maxThree">
      <SummaryCard
        title="Gross Revenue"
        value={"4.5m"}
        currency="NGN"
        icon={Banknote}
      >
        <div className="flex items-center gap-1 text-green-500">
          <TrendingUp className="w-3.25 h-3.25" />
          <span className="text-xs font-medium">+3.5% vs last periodh</span>
        </div>
      </SummaryCard>
      <SummaryCard
        title="Average Order Value"
        value={"14,849.00"}
        currency="NGN"
        icon={Banknote}
      >
        <div className="flex items-center gap-1 text-green-500">
          <TrendingUp className="w-3.25 h-3.25" />
          <span className="text-xs font-medium">Per transactions</span>
        </div>
      </SummaryCard>
      <SummaryCard
        title="Confirmed Revenue"
        value={"162k"}
        currency="NGN"
        icon={Banknote}
      >
        <div className="flex items-center gap-1 text-green-500">
          <TrendingUp className="w-3.25 h-3.25" />
          <span className="text-xs font-medium">Locked in</span>
        </div>
      </SummaryCard>
    </SummaryCardWrapper>
  );
};

export default RevenueSummary;
