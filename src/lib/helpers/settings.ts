import {
  EVENT_CATEGORIES,
  type CustomInputType,
  type EventCategory,
} from "@/lib/types/events";
import type {
  PartnerEventDetailsResponse,
  PartnerEventSettings,
} from "@/lib/types/settings";

const DATE_PATTERN = /^(\d{4}-\d{2}-\d{2})/;
const ISO_TIME_PATTERN = /T(\d{2}:\d{2})/;
const PLAIN_TIME_PATTERN = /^(\d{2}:\d{2})/;

const getCustomFieldType = (value: unknown): CustomInputType | undefined => {
  if (typeof value !== "string") return undefined;

  switch (value.toLowerCase()) {
    case "text":
      return "Text";
    case "number":
      return "Number";
    case "date":
      return "Date";
    case "file":
      return "Image";
    default:
      return undefined;
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const hasOnlyKeys = (
  value: Record<string, unknown>,
  allowedKeys: readonly string[],
) => Object.keys(value).every((key) => allowedKeys.includes(key));

const parseFiniteNumber = (value: unknown) => {
  if (typeof value !== "string" && typeof value !== "number") {
    return null;
  }

  const normalizedValue =
    typeof value === "string" ? value.trim() : String(value);

  if (!/^-?\d+(?:\.\d+)?$/.test(normalizedValue)) {
    return null;
  }

  const parsed = Number(normalizedValue);
  return Number.isFinite(parsed) ? parsed : null;
};

export const getSettingsDate = (value: string) =>
  DATE_PATTERN.exec(value.trim())?.[1] ?? "";

export const getSettingsTime = (value: string) =>
  ISO_TIME_PATTERN.exec(value.trim())?.[1] ??
  PLAIN_TIME_PATTERN.exec(value.trim())?.[1] ??
  "";

const isEventCategory = (value: string): value is EventCategory =>
  EVENT_CATEGORIES.some((category) => category === value);

const getRequiredSetting = (
  value: unknown,
  fallback: boolean,
) =>
  isRecord(value) && typeof value.is_required === "boolean"
    ? value.is_required
    : fallback;

const isSupportedDefaultSetting = (
  value: unknown,
  inputType: "text" | "date",
) =>
  value === undefined ||
  (isRecord(value) &&
    hasOnlyKeys(value, ["input_type", "is_required"]) &&
    value.input_type === inputType &&
    typeof value.is_required === "boolean");

const normalizeFormSettings = (
  value: unknown,
  eventId: string,
) => {
  const settings = isRecord(value) ? value : {};
  const hasMalformedRoot = value !== undefined && !isRecord(value);
  const rawCustomFields = Array.isArray(settings.custom_fields)
    ? settings.custom_fields
    : [];
  const hasMalformedCustomFields =
    settings.custom_fields !== undefined &&
    !Array.isArray(settings.custom_fields);
  const customFields = rawCustomFields.flatMap((field, index) => {
    if (
      !isRecord(field) ||
      !hasOnlyKeys(field, ["field_name", "input_type", "is_required"])
    ) {
      return [];
    }

    const name =
      typeof field.field_name === "string" ? field.field_name : "";
    const type = getCustomFieldType(field.input_type);

    if (!name || !type || typeof field.is_required !== "boolean") {
      return [];
    }

    return [
      {
        clientId: `existing-custom:${eventId}:${index}`,
        name,
        type,
        required: field.is_required,
      },
    ];
  });
  const supportedTopLevelKeys = new Set([
    "full_name",
    "date_of_birth",
    "state_of_origin",
    "custom_fields",
  ]);
  const hasUnsupportedTopLevelKey = Object.keys(settings).some(
    (key) => !supportedTopLevelKeys.has(key),
  );
  const malformedDefaultField =
    !isSupportedDefaultSetting(settings.full_name, "text") ||
    !isSupportedDefaultSetting(settings.date_of_birth, "date") ||
    !isSupportedDefaultSetting(settings.state_of_origin, "text");

  return {
    settings: {
      fullNameRequired: getRequiredSetting(settings.full_name, true),
      dateOfBirthRequired: getRequiredSetting(
        settings.date_of_birth,
        true,
      ),
      stateOfOriginRequired: getRequiredSetting(
        settings.state_of_origin,
        true,
      ),
      customFields,
    },
    hasUnsupportedFields:
      hasMalformedRoot ||
      hasUnsupportedTopLevelKey ||
      malformedDefaultField ||
      hasMalformedCustomFields ||
      customFields.length !== rawCustomFields.length,
  };
};

export const normalizePartnerEventDetails = (
  response: PartnerEventDetailsResponse,
): PartnerEventSettings | null => {
  const event = response.data?.event;

  if (!response.success || !event || typeof event.event_id !== "string") {
    return null;
  }

  const eventId = event.event_id.trim();

  if (!eventId) {
    return null;
  }

  const normalizedFormSettings =
    event.category === "Beauty Pageant"
      ? normalizeFormSettings(event.form_settings, eventId)
      : null;

  return {
    eventId,
    title: typeof event.title === "string" ? event.title : "",
    description:
      typeof event.description === "string" ? event.description : "",
    category:
      typeof event.category === "string" &&
      isEventCategory(event.category)
        ? event.category
        : "",
    address: typeof event.address === "string" ? event.address : "",
    date: typeof event.date === "string" ? getSettingsDate(event.date) : "",
    startTime:
      typeof event.time === "string" ? getSettingsTime(event.time) : "",
    endTime:
      typeof event.end_time === "string"
        ? getSettingsTime(event.end_time)
        : "",
    thumbnailUrl:
      typeof event.image_url === "string" ? event.image_url : null,
    bannerUrl:
      typeof event.banner_image_url === "string"
        ? event.banner_image_url
        : null,
    ticketTypes: Array.isArray(event.ticket_types)
      ? event.ticket_types.map((ticket, index) => ({
          clientId: `existing:${eventId}:${index}`,
          name: typeof ticket.type === "string" ? ticket.type : "",
          price: parseFiniteNumber(ticket.price),
          capacity: parseFiniteNumber(ticket.capacity),
        }))
      : [],
    serviceFee: parseFiniteNumber(event.service_fee),
    refundPolicy:
      typeof event.refund_policy === "string" ? event.refund_policy : "",
    updatedAt:
      typeof event.updated_at === "string" ? event.updated_at : "",
    hasExistingHeadliners:
      Array.isArray(event.headliner) && event.headliner.length > 0,
    hasExistingPrizes:
      Array.isArray(event.prizes) && event.prizes.length > 0,
    formSettings:
      normalizedFormSettings?.settings ?? null,
    hasUnsupportedFormSettings:
      normalizedFormSettings?.hasUnsupportedFields ?? false,
  };
};

export const validateSettingsImage = (file: File) => {
  const supportedTypes = ["image/jpeg", "image/png", "image/webp"];
  const maximumSize = 10 * 1024 * 1024;

  if (!supportedTypes.includes(file.type)) {
    return "Image must be a JPG, PNG, or WEBP file";
  }

  if (file.size > maximumSize) {
    return "Image must not exceed 10 MB";
  }

  return null;
};
