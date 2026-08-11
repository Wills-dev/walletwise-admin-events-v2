"use client";

import { useState, type ReactNode } from "react";

import ChangePasswordForm from "@/components/molecules/ChangePasswordForm/ChangePasswordForm";
import ContestantFormSettings from "@/components/molecules/ContestantFormSettings/ContestantFormSettings";
import EventHeadlinerSettings from "@/components/molecules/EventHeadlinerSettings/EventHeadlinerSettings";
import EventPhotosSettings from "@/components/molecules/EventPhotosSettings/EventPhotosSettings";
import EventPrizeSettings from "@/components/molecules/EventPrizeSettings/EventPrizeSettings";
import RefundPolicy from "@/components/molecules/RefundPolicy/RefundPolicy";
import SettingDetails from "@/components/molecules/SettingDetails/SettingDetails";
import SettingsTickets from "@/components/molecules/SettingsTickets/SettingsTickets";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useSettingsDashboard } from "@/lib/hooks/useSettingsDashboard";

import SettingsContextNotice from "./SettingsContextNotice";
import SettingsPageSkeleton from "./SettingsPageSkeleton";

interface SettingsTab {
  value: string;
  label: string;
  content: ReactNode;
  width: string;
}

const SettingWrapper = () => {
  const [tab, setTab] = useState<string | null>(null);
  const dashboard = useSettingsDashboard();

  const changePasswordTab: SettingsTab = {
    value: "change-password",
    label: "Change password",
    content: (
      <div onFocusCapture={() => setTab("change-password")}>
        <ChangePasswordForm />
      </div>
    ),
    width: "max-w-130",
  };
  let tabs: SettingsTab[] = [changePasswordTab];
  let notice: ReactNode =
    dashboard.status === "loading" ? <SettingsPageSkeleton /> : null;

  if (dashboard.status === "ready") {
    const formKey = dashboard.event.eventId;
    const editableTabs: SettingsTab[] = [
      {
        value: "details",
        label: "Details",
        content: (
          <SettingDetails
            key={`details:${formKey}`}
            event={dashboard.event}
          />
        ),
        width: "max-w-3xl",
      },
      {
        value: "headliners",
        label: "Headliners",
        content: (
          <EventHeadlinerSettings
            key={`headliners:${formKey}`}
            event={dashboard.event}
          />
        ),
        width: "max-w-3xl",
      },
      ...(dashboard.event.category === "Beauty Pageant"
        ? [
            {
              value: "pageant-setup",
              label: "Pageant setup",
              content: (
                <div className="space-y-10">
                  <EventPrizeSettings
                    key={`prizes:${formKey}`}
                    event={dashboard.event}
                  />
                  <div className="border-t border-[#F0F0F0] pt-10">
                    <ContestantFormSettings
                      key={`contestant-form:${formKey}`}
                      event={dashboard.event}
                    />
                  </div>
                </div>
              ),
              width: "max-w-4xl",
            },
          ]
        : []),
      {
        value: "tickets",
        label: "Tickets",
        content: (
          <SettingsTickets
            key={`tickets:${formKey}`}
            event={dashboard.event}
          />
        ),
        width: "max-w-4xl",
      },
      {
        value: "refund-policy",
        label: "Refund policy",
        content: (
          <RefundPolicy
            key={`refund-policy:${formKey}`}
            event={dashboard.event}
          />
        ),
        width: "max-w-130",
      },
      changePasswordTab,
    ];

    tabs = dashboard.phase === "past"
      ? [
          {
            value: "event-photos",
            label: "Upload event photos",
            content: (
              <EventPhotosSettings
                key={`event-photos:${formKey}`}
                eventId={dashboard.event.eventId}
              />
            ),
            width: "max-w-3xl",
          },
          changePasswordTab,
        ]
      : editableTabs;

    if (dashboard.phase === "unknown") {
      tabs = [changePasswordTab];
      notice = <SettingsContextNotice variant="unknown-event" />;
    }
  } else if (dashboard.status === "error") {
    notice = (
      <SettingsContextNotice variant="error" onRetry={dashboard.retry} />
    );
  } else if (dashboard.status === "no-event") {
    notice = <SettingsContextNotice variant="no-event" />;
  }

  const activeTab = tab && tabs.some((item) => item.value === tab)
    ? tab
    : tabs[0].value;

  return (
    <div className="space-y-8">
      {notice}
      <Tabs value={activeTab} onValueChange={setTab} className="gap-8">
        <div className="overflow-x-auto border-b border-[#F0F0F0]">
          <TabsList
            variant="line"
            aria-label="Settings sections"
            className="h-10 w-max min-w-full justify-start gap-6 p-0"
          >
            {tabs.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="h-10 shrink-0 cursor-pointer rounded-none px-0 capitalize data-[state=active]:text-[#5A27CC] data-[state=active]:after:opacity-100"
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabs.map((item) => (
          <TabsContent
            key={item.value}
            value={item.value}
            forceMount
            className={`mt-0 w-full ${item.width} data-[state=inactive]:hidden`}
          >
            {item.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SettingWrapper;
