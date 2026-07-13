"use client";

import { Switch } from "@/components/ui/switch";
import { DefaultFieldKey } from "@/lib/types/events";
import { useEventStore } from "@/store/useEventStore";

const DefaultEventFields = () => {
  const { formSettings, handleDefaultFieldToggle } = useEventStore();

  return (
    <div className="space-y-2">
      {formSettings !== null && (
        <>
          {Object.entries(formSettings.defaultFields).map(([key, meta]) => (
            <div
              key={key}
              className="flex justify-between items-center bg-[#F9FAFB] border border-[#F5F5F5]  p-4 rounded-lg text-sm"
            >
              <div>
                <p className="font-medium">{meta.label}</p>
                <p className="text-sm text-gray-500">{meta.description}</p>
              </div>
              <Switch
                id={`switch-${key}`}
                checked={meta.value}
                onCheckedChange={() =>
                  handleDefaultFieldToggle(key as DefaultFieldKey)
                }
                className="data-[state=checked]:bg-[#6637CF]"
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DefaultEventFields;
