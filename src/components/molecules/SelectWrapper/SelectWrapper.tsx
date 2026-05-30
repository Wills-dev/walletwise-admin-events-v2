"use client";

import Select from "@/components/atoms/Select/Select";
import { useState } from "react";

const SelectWrapper = () => {
  const [isSelect, setIsSelect] = useState("");

  const eventStatus = [
    {
      label: "Ongoing",
      value: "ongoing",
    },
    {
      label: "Upcoming",
      value: "upcoming",
    },
    {
      label: "Completed",
      value: "completed",
    },
  ];

  const ticketType = [
    {
      label: "Regular",
      value: "regular",
    },
    {
      label: "VIP",
      value: "vip",
    },
    {
      label: "VVIP",
      value: "vvip",
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <Select
        value={isSelect}
        onChange={(e) => setIsSelect(e.target.value)}
        placeholder="Filter by status"
        options={eventStatus}
        variant="secondary"
      />
      <Select
        value={isSelect}
        onChange={(e) => setIsSelect(e.target.value)}
        placeholder="Filter by type"
        options={ticketType}
        variant="secondary"
      />
    </div>
  );
};

export default SelectWrapper;
