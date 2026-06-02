"use client";

import RefundPolicy from "@/components/molecules/RefundPolicy/RefundPolicy";
import SettingDetails from "@/components/molecules/SettingDetails/SettingDetails";
import SettingsTickets from "@/components/molecules/SettingsTickets/SettingsTickets";
import { useState } from "react";

const SettingWrapper = () => {
  const [tab, setTab] = useState("details");

  const tabs = ["details", "tickets", "refund policy"];

  return (
    <div className="space-y-8">
      <div className="flex items-center w-full border-b border-[#F0F0F0] gap-6">
        {tabs?.map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`text-sm pb-2 cursor-pointer capitalize ${item === tab ? "text-[#5A27CC] border-b border-[#5A27CC] font-semibold" : "text-[#737373] hover:text-gray-700 transition-colors duration-300"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="max-w-130 w-full">
        {tab === "details" && <SettingDetails />}
        {tab === "tickets" && <SettingsTickets />}
        {tab === "refund policy" && <RefundPolicy />}
      </div>
    </div>
  );
};

export default SettingWrapper;
