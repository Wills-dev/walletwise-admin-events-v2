"use client";

import { CircleAlert, Plus, Trash2 } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import Select from "@/components/atoms/Select/Select";
import { Switch } from "@/components/ui/switch";
import { useContestantFormSettings } from "@/lib/hooks/useContestantFormSettings";
import type { CustomInputType } from "@/lib/types/events";
import type { PartnerEventSettings } from "@/lib/types/settings";

interface ContestantFormSettingsProps {
  event: PartnerEventSettings;
}

const defaultFields = [
  {
    key: "fullNameRequired",
    label: "Full Name",
    description: "Contestant's legal full name",
  },
  {
    key: "dateOfBirthRequired",
    label: "Date of Birth",
    description: "Contestant's date of birth",
  },
  {
    key: "stateOfOriginRequired",
    label: "State of Origin",
    description: "Contestant's state of origin",
  },
] as const;

const customFieldTypes = ["Text", "Number", "Date", "Image"].map(
  (type) => ({ label: type, value: type }),
);

const ContestantFormSettings = ({
  event,
}: ContestantFormSettingsProps) => {
  const form = useContestantFormSettings(event);

  if (event.hasUnsupportedFormSettings) {
    return (
      <div className="flex min-h-52 flex-col items-center justify-center gap-3 rounded-[16px] border border-[#F5F5F5] px-6 py-10 text-center">
        <CircleAlert className="size-6 text-[#737373]" aria-hidden="true" />
        <div className="space-y-1">
          <h2 className="font-medium text-[#262626]">
            Contestant form unavailable
          </h2>
          <p className="mx-auto max-w-md text-sm leading-6 text-[#737373]">
            This event contains form fields that this editor cannot safely
            update. No existing fields have been changed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit}>
      <fieldset disabled={form.isPending} className="min-w-0 space-y-6">
        <div className="space-y-1">
          <h2 className="font-medium text-[#262626]">Contestant form</h2>
          <p className="text-sm text-[#737373]">
            Choose the default information and custom fields contestants must
            submit.
          </p>
        </div>

        <div className="space-y-2">
          {defaultFields.map((field) => {
            const labelId = `settings-${field.key}-label`;

            return (
              <div
                key={field.key}
                className="flex items-center justify-between gap-4 rounded-lg border border-[#F5F5F5] bg-[#F9FAFB] p-4"
              >
                <div className="min-w-0">
                  <p id={labelId} className="text-sm font-medium">
                    {field.label}
                  </p>
                  <p className="text-sm text-[#737373]">
                    {field.description}
                  </p>
                </div>
                <Switch
                  checked={form.settings[field.key]}
                  onCheckedChange={() =>
                    form.toggleDefaultField(field.key)
                  }
                  aria-labelledby={labelId}
                  className="data-[state=checked]:bg-[#6637CF]"
                />
              </div>
            );
          })}
        </div>

        <section className="space-y-3" aria-labelledby="custom-fields-title">
          <div className="space-y-1">
            <h3 id="custom-fields-title" className="text-sm font-medium">
              Custom fields
            </h3>
            <p className="text-sm text-[#737373]">
              Add any extra information required for this pageant.
            </p>
          </div>

          {form.settings.customFields.map((field, index) => {
            const inputPrefix = `settings-custom-field-${index}`;
            const requiredLabelId = `${inputPrefix}-required-label`;

            return (
              <div
                key={field.clientId}
                className="grid grid-cols-1 gap-3 rounded-xl border border-[#F0F0F0] bg-[#FAFAFA] p-4 sm:grid-cols-[minmax(0,1fr)_10rem_auto] sm:items-end"
              >
                <div className="min-w-0 space-y-2">
                  <Label htmlFor={`${inputPrefix}-name`} title="Field name" />
                  <Input
                    id={`${inputPrefix}-name`}
                    type="text"
                    name={`${inputPrefix}-name`}
                    value={field.name}
                    placeholder="e.g. Height (cm)"
                    onChange={(changeEvent) =>
                      form.updateCustomField(
                        field.clientId,
                        "name",
                        changeEvent.target.value,
                      )
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${inputPrefix}-type`} title="Field type" />
                  <Select
                    id={`${inputPrefix}-type`}
                    name={`${inputPrefix}-type`}
                    value={field.type}
                    options={customFieldTypes}
                    onChange={(changeEvent) =>
                      form.updateCustomField(
                        field.clientId,
                        "type",
                        changeEvent.target.value as CustomInputType,
                      )
                    }
                  />
                </div>

                <div className="flex h-10 items-center justify-end gap-4 sm:h-11">
                  <div className="flex items-center gap-2">
                    <span
                      id={requiredLabelId}
                      className="text-sm text-[#737373]"
                    >
                      Required
                    </span>
                    <Switch
                      checked={field.required}
                      onCheckedChange={(checked) =>
                        form.updateCustomField(
                          field.clientId,
                          "required",
                          checked,
                        )
                      }
                      aria-labelledby={requiredLabelId}
                      className="data-[state=checked]:bg-[#6637CF]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      form.removeCustomField(field.clientId)
                    }
                    aria-label={`Remove ${field.name || `custom field ${index + 1}`}`}
                    className="flex size-10 cursor-pointer items-center justify-center rounded-lg border border-[#E5E5E5] text-[#737373] transition-colors hover:border-red-200 hover:text-red-600"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={form.addCustomField}
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-[#F9FAFB] px-4 py-3 text-start text-sm font-medium text-[#6637CF]"
          >
            <Plus className="size-4" aria-hidden="true" />
            Add custom field
          </button>
        </section>

        <Button
          width="w-full sm:w-fit"
          type="submit"
          loading={form.isPending}
          loadingLabel="Saving contestant form"
        >
          Save contestant form
        </Button>
      </fieldset>
    </form>
  );
};

export default ContestantFormSettings;
