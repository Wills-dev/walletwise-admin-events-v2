"use client";

import { useState } from "react";

import Label from "@/components/atoms/Label/Label";
import Input from "@/components/atoms/Input/Input";
import Textarea from "@/components/atoms/TextArea/TextArea";
import Select from "@/components/atoms/Select/Select";
import Button from "@/components/atoms/Button/Button";

const SettingDetails = () => {
  const [testing, setTesting] = useState("");

  const type = [{ label: "Events", value: "events" }];

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" title="Event name" />
        <Input
          type="text"
          value={testing}
          name="name"
          onChange={(e) => setTesting(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="Description" title="Description" />
        <Textarea
          rows={4}
          value={testing}
          name="Description"
          onChange={(e) => setTesting(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="Venue" title="Venue" />
        <Input
          type="text"
          value={testing}
          name="Venue"
          onChange={(e) => setTesting(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="Date" title="Date" />
        <Input
          type="date"
          value={testing}
          name="Date"
          onChange={(e) => setTesting(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="Category" title="Category" />
        <Select
          value={testing}
          name="Category"
          onChange={(e) => setTesting(e.target.value)}
          options={type}
        />
      </div>
      <Button width="w-fit">Save changes</Button>
    </div>
  );
};

export default SettingDetails;
