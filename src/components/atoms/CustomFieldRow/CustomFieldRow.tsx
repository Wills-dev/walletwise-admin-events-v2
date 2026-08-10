"use client";

import { Switch } from "@/components/ui/switch";
import { CustomField } from "@/lib/types/events";
import { useEventStore } from "@/store/useEventStore";

const CustomFieldRow = ({ index }: { index: number }) => {
  const {
    formSettings,
    updateCustomField,
    toggleCustomFieldRequired,
    confirmCustomField,
    editCustomField,
    removeCustomField,
  } = useEventStore();

  const field = formSettings?.customFields[index];
  if (!field) return null;

  if (field.confirmed) {
    return (
      <div className="flex items-center justify-between gap-4 border border-[#F5F5F5]  bg-[#F9FAFB] p-4 rounded-lg">
        <div className="">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{field.name}</span>
            <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded">
              {field.type}
            </span>
          </div>
          <p className="w-fit text-sm text-gray-500">Custom field</p>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            id={`switch-${index}`}
            checked={field.required}
            onCheckedChange={() => toggleCustomFieldRequired(index)}
            className="data-[state=checked]:bg-[#6637CF]"
          />
          <button
            type="button"
            onClick={() => editCustomField(index)}
            className="text-xs text-[#6637CF]"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => removeCustomField(index)}
            className="text-xs text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center border border-[#F5F5F5]  bg-[#F9FAFB] p-4 rounded-lg">
      <input
        type="text"
        placeholder="Field name"
        value={field.name}
        onChange={(e) => updateCustomField(index, "name", e.target.value)}
        className="border rounded px-2 py-2 text-sm flex-1 w-full bg-white h-6 outline-none"
      />
      <div className="px-2 bg-white border rounded  h-6">
        <select
          value={field.type}
          onChange={(e) =>
            updateCustomField(
              index,
              "type",
              e.target.value as CustomField["type"],
            )
          }
          className="outline-none w-fit text-sm"
        >
          <option value="Text">Text</option>
          <option value="Number">Number</option>
          <option value="Date">Date</option>
          <option value="Image">Image</option>
        </select>
      </div>

      <button
        type="button"
        onClick={() => {
          if (field.name.trim()) confirmCustomField(index);
        }}
        className="bg-[#6637CF] text-white px-3 h-6 flex justify-center items-center text-center rounded text-sm"
      >
        Add
      </button>

      <button
        type="button"
        onClick={() => removeCustomField(index)}
        className="text-gray-500 text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default CustomFieldRow;
