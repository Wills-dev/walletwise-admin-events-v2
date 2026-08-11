"use client";

import Button from "@/components/atoms/Button/Button";
import Label from "@/components/atoms/Label/Label";
import Textarea from "@/components/atoms/TextArea/TextArea";
import { useRefundPolicyForm } from "@/lib/hooks/useRefundPolicyForm";
import type { PartnerEventSettings } from "@/lib/types/settings";

interface RefundPolicyProps {
  event: PartnerEventSettings;
}

const RefundPolicy = ({ event }: RefundPolicyProps) => {
  const form = useRefundPolicyForm(event);

  return (
    <form onSubmit={form.handleSubmit}>
      <fieldset disabled={form.isPending} className="min-w-0 space-y-6">
      <div className="space-y-1">
        <h2 className="font-medium text-[#262626]">Refund policy</h2>
        <p className="text-sm text-[#737373]">
          Explain the refund terms that apply to this event.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="settings-refund-policy" title="Policy details" />
        <Textarea
          id="settings-refund-policy"
          rows={5}
          value={form.refundPolicy}
          name="refundPolicy"
          onChange={(changeEvent) =>
            form.setRefundPolicy(changeEvent.target.value)
          }
          placeholder="e.g. No refunds within 48 hours of the event."
        />
      </div>
      <Button
        width="w-full sm:w-fit"
        type="submit"
        loading={form.isPending}
        loadingLabel="Saving refund policy"
      >
        Save changes
      </Button>
      </fieldset>
    </form>
  );
};

export default RefundPolicy;
