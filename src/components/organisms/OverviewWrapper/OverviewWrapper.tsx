"use client";

import AllEventWrapper from "@/components/molecules/AllEventWrapper/AllEventWrapper";
import CurrentEventWrapper from "@/components/molecules/CurrentEventWrapper/CurrentEventWrapper";
import DynamicTabs from "@/components/molecules/DynamicTabs/DynamicTabs";

import { useTab } from "@/lib/hooks/useTab";

const OverviewWrapper = () => {
  const { tab, handleSwitchTab } = useTab();

  const tabs = [
    {
      value: "current-event",
      label: "Current event",
      content: <CurrentEventWrapper />,
    },
    {
      value: "all-event",
      label: "All event",
      content: <AllEventWrapper />,
    },
  ];

  const defaultTab = "all-event";

  return (
    <>
      <DynamicTabs
        tabs={tabs}
        defaultTab={tab || defaultTab}
        onClick={handleSwitchTab}
        title="Overview"
      />
    </>
  );
};

export default OverviewWrapper;
