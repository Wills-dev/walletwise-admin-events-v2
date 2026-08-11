"use client";

import { useRef, useState, type SubmitEvent } from "react";
import { toast } from "sonner";

import { useUpdatePartnerEvent } from "@/lib/hooks/useUpdatePartnerEvent";
import type { ApiErrorResponse } from "@/lib/types";
import { promiseErrorFunction } from "@/lib/types";
import type { CustomInputType } from "@/lib/types/events";
import type {
  EventSettingsCustomField,
  EventSettingsFormSettings,
  PartnerEventSettings,
} from "@/lib/types/settings";

type DefaultSettingField =
  | "fullNameRequired"
  | "dateOfBirthRequired"
  | "stateOfOriginRequired";
type CustomSettingField = "name" | "type" | "required";

const CUSTOM_INPUT_PAYLOAD_MAP = {
  Text: "text",
  Number: "number",
  Date: "date",
  Image: "file",
} as const;

const getFallbackSettings = (): EventSettingsFormSettings => ({
  fullNameRequired: true,
  dateOfBirthRequired: true,
  stateOfOriginRequired: true,
  customFields: [],
});

const getSettingsSignature = (settings: EventSettingsFormSettings) =>
  JSON.stringify({
    fullNameRequired: settings.fullNameRequired,
    dateOfBirthRequired: settings.dateOfBirthRequired,
    stateOfOriginRequired: settings.stateOfOriginRequired,
    customFields: settings.customFields.map(
      ({ name, type, required }) => ({ name, type, required }),
    ),
  });

export const useContestantFormSettings = (
  event: PartnerEventSettings,
) => {
  const initialSettingsValue = event.formSettings ?? getFallbackSettings();
  const [settings, setSettings] = useState(() => initialSettingsValue);
  const initialSignature = useRef(
    getSettingsSignature(initialSettingsValue),
  );
  const nextId = useRef(0);
  const mutation = useUpdatePartnerEvent();

  const toggleDefaultField = (field: DefaultSettingField) => {
    setSettings((current) => ({ ...current, [field]: !current[field] }));
  };

  const addCustomField = () => {
    nextId.current += 1;
    setSettings((current) => ({
      ...current,
      customFields: [
        ...current.customFields,
        {
          clientId: `new-custom:${Date.now()}:${nextId.current}`,
          name: "",
          type: "Text",
          required: false,
        },
      ],
    }));
  };

  const updateCustomField = <TField extends CustomSettingField>(
    clientId: string,
    field: TField,
    value: TField extends "required"
      ? boolean
      : TField extends "type"
        ? CustomInputType
        : string,
  ) => {
    setSettings((current) => ({
      ...current,
      customFields: current.customFields.map((customField) =>
        customField.clientId === clientId
          ? { ...customField, [field]: value }
          : customField,
      ),
    }));
  };

  const removeCustomField = (clientId: string) => {
    setSettings((current) => ({
      ...current,
      customFields: current.customFields.filter(
        (customField) => customField.clientId !== clientId,
      ),
    }));
  };

  const handleSubmit = (submitEvent: SubmitEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

    if (event.hasUnsupportedFormSettings) return;

    if (getSettingsSignature(settings) === initialSignature.current) {
      toast.info("There are no contestant form changes to save");
      return;
    }

    const names = settings.customFields.map((field) => field.name.trim());

    if (names.some((name) => !name)) {
      toast.error("Every custom field needs a name");
      return;
    }

    mutation.mutate(
      {
        eventId: event.eventId,
        patch: {
          form_settings: {
            full_name: {
              input_type: "text",
              is_required: settings.fullNameRequired,
            },
            date_of_birth: {
              input_type: "date",
              is_required: settings.dateOfBirthRequired,
            },
            state_of_origin: {
              input_type: "text",
              is_required: settings.stateOfOriginRequired,
            },
            custom_fields: settings.customFields.map((field) => ({
              field_name: field.name.trim(),
              input_type: CUSTOM_INPUT_PAYLOAD_MAP[field.type],
              is_required: field.required,
            })),
          },
        },
      },
      {
        onSuccess: (response) => {
          const submitted: EventSettingsFormSettings = {
            ...settings,
            customFields: settings.customFields.map(
              (field): EventSettingsCustomField => ({
                ...field,
                name: field.name.trim(),
              }),
            ),
          };

          initialSignature.current = getSettingsSignature(submitted);
          setSettings(submitted);
          toast.success(
            response.message || "Contestant form settings updated",
          );
        },
        onError: (error) => {
          promiseErrorFunction(error as ApiErrorResponse);
        },
      },
    );
  };

  return {
    settings,
    isPending: mutation.isPending,
    toggleDefaultField,
    addCustomField,
    updateCustomField,
    removeCustomField,
    handleSubmit,
  };
};
