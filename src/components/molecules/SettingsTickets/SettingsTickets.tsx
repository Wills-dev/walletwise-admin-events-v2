"use client";

import { useState } from "react";

import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import Button from "@/components/atoms/Button/Button";

const SettingsTickets = () => {
  const [testing, setTesting] = useState("");

  return (
    <div className="space-y-6">
      <h6 className="text-sm text-[#737373]">
        Manage ticket tiers for this event
      </h6>
      <div className="flex items-center gap-2 lg:flex-wrap w-full">
        <div className="space-y-2 flex-1 w-full">
          <Label htmlFor="Name" title="Name" />
          <Input
            type="text"
            value={testing}
            name="name"
            onChange={(e) => setTesting(e.target.value)}
            placeholder="Regular"
          />
        </div>
        <div className="flex items-center gap-2 flex-1 w-full">
          <div className="space-y-2">
            <Label htmlFor="price" title="Price (₦)" />
            <Input
              type="text"
              value={testing}
              name="price"
              onChange={(e) => setTesting(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Capacity" title="Capacity" />
            <Input
              type="text"
              value={testing}
              name="Capacity"
              onChange={(e) => setTesting(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="space-y-2 flex-1 w-full">
        <Label htmlFor="service" title="Service fee (%)" />
        <Input
          type="text"
          value={testing}
          name="service"
          onChange={(e) => setTesting(e.target.value)}
        />
      </div>
      <Button width="w-fit">Save changes</Button>
    </div>
  );
};

export default SettingsTickets;
