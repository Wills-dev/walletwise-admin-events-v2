"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabType } from "@/lib/types";

interface DynamicTabsProps {
  defaultTab: string;
  className?: string;
  tabs: TabType[];
  onClick: (value: string) => void;
  title?: string;
}

const DynamicTabs = ({
  tabs,
  defaultTab,
  className = "spacey-y-6",
  onClick,
  title,
}: DynamicTabsProps) => {
  return (
    <div className={`flex w-full flex-col gap-6 `}>
      <Tabs
        defaultValue={defaultTab || tabs[0]?.value}
        className={`${className}`}
      >
        <div className="flex justify-between items-center gap-10">
          {title && <h5 className="text-sm font-medium">{title}</h5>}
          <TabsList className="">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                onClick={() => onClick(tab?.value)}
                className="cursor-pointer"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DynamicTabs;
