"use client";

import { Plus, Trash2 } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import { useEventTicketsForm } from "@/lib/hooks/useEventTicketsForm";
import type { PartnerEventSettings } from "@/lib/types/settings";

interface SettingsTicketsProps {
  event: PartnerEventSettings;
}

const SettingsTickets = ({ event }: SettingsTicketsProps) => {
  const form = useEventTicketsForm(event);

  return (
    <form onSubmit={form.handleSubmit}>
      <fieldset disabled={form.isPending} className="min-w-0 space-y-6">
      <div className="space-y-1">
        <h2 className="font-medium text-[#262626]">Ticket details</h2>
        <p className="text-sm text-[#737373]">
          Manage every ticket tier for this event. Ticket names can be any
          partner-defined value.
        </p>
      </div>

      <div className="space-y-3">
        {form.tickets.map((ticket, index) => {
          const inputPrefix = `settings-ticket-${index}`;

          return (
            <div
              key={ticket.clientId}
              className="grid grid-cols-1 gap-3 rounded-xl border border-[#F0F0F0] bg-[#FAFAFA] p-4 md:grid-cols-[minmax(0,2fr)_minmax(8rem,1fr)_minmax(7rem,1fr)_auto] md:items-end"
            >
              <div className="min-w-0 space-y-2">
                <Label htmlFor={`${inputPrefix}-name`} title="Name" />
                <Input
                  id={`${inputPrefix}-name`}
                  type="text"
                  name={`${inputPrefix}-name`}
                  value={ticket.name}
                  onChange={(changeEvent) =>
                    form.updateTicket(
                      ticket.clientId,
                      "name",
                      changeEvent.target.value,
                    )
                  }
                  placeholder="e.g. VIP experience"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${inputPrefix}-price`} title="Price (₦)" />
                <Input
                  id={`${inputPrefix}-price`}
                  type="number"
                  name={`${inputPrefix}-price`}
                  value={ticket.price}
                  min="0"
                  step="0.01"
                  onChange={(changeEvent) =>
                    form.updateTicket(
                      ticket.clientId,
                      "price",
                      changeEvent.target.value,
                    )
                  }
                  placeholder="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor={`${inputPrefix}-capacity`}
                  title="Capacity"
                />
                <Input
                  id={`${inputPrefix}-capacity`}
                  type="number"
                  name={`${inputPrefix}-capacity`}
                  value={ticket.capacity}
                  min="1"
                  onChange={(changeEvent) =>
                    form.updateTicket(
                      ticket.clientId,
                      "capacity",
                      changeEvent.target.value,
                    )
                  }
                  placeholder="0"
                  required
                />
              </div>

              <button
                type="button"
                onClick={() => form.removeTicket(ticket.clientId)}
                aria-label={`Remove ${ticket.name || `ticket ${index + 1}`}`}
                className="flex size-10 cursor-pointer items-center justify-center justify-self-end rounded-lg border border-[#E5E5E5] text-[#737373] transition-colors hover:border-red-200 hover:text-red-600 md:mb-0.5"
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </button>
            </div>
          );
        })}

        {form.tickets.length === 0 && (
          <div className="rounded-xl border border-dashed border-[#DADADA] px-4 py-8 text-center text-sm text-[#737373]">
            No ticket types yet. Add one before saving.
          </div>
        )}

        <button
          type="button"
          onClick={form.addTicket}
          className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-[#F9FAFB] px-4 py-3 text-start text-sm font-medium text-[#6637CF]"
        >
          <Plus className="size-4" aria-hidden="true" />
          Add ticket tier
        </button>
      </div>

      <div className="max-w-sm space-y-2">
        <Label htmlFor="settings-service-fee" title="Service fee (₦)" />
        <Input
          id="settings-service-fee"
          type="number"
          name="serviceFee"
          value={form.serviceFee}
          min="0"
          step="0.01"
          onChange={(changeEvent) =>
            form.setServiceFee(changeEvent.target.value)
          }
          placeholder="0"
          required
        />
      </div>

      <Button
        width="w-full sm:w-fit"
        type="submit"
        loading={form.isPending}
        loadingLabel="Saving ticket details"
      >
        Save changes
      </Button>
      </fieldset>
    </form>
  );
};

export default SettingsTickets;
