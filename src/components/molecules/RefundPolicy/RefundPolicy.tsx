"use client";

import { useState } from "react";

import Label from "@/components/atoms/Label/Label";
import Textarea from "@/components/atoms/TextArea/TextArea";
import Button from "@/components/atoms/Button/Button";

const RefundPolicy = () => {
  const [testing, setTesting] = useState("");
  return (
    <div className="space-y-6">
      {" "}
      <div className="space-y-2">
        <Label htmlFor="policy" title="Policy details" />
        <Textarea
          rows={4}
          value={testing}
          name="policy"
          onChange={(e) => setTesting(e.target.value)}
          placeholder="e.g. No refunds within 48 hours of the event."
        />
      </div>
      <Button width="w-fit">Save changes</Button>
    </div>
  );
};

export default RefundPolicy;
