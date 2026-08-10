export const EVENT_CATEGORIES = [
  "Concert",
  "Beauty Pageant",
  "Sports",
  "Conference",
  "Religion",
  "Others",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export interface TicketType {
  name: string;
  price: string;
  quantity: number;
  confirmed: boolean;
}

export interface TicketTypePayload {
  type: string;
  price: number;
  capacity: number;
}

export type CustomInputType = "Text" | "Number" | "Date" | "Image";

export interface CustomField {
  name: string;
  type: CustomInputType;
  required: boolean;
  confirmed: boolean;
}

export interface DefaultFieldMeta {
  label: string;
  description: string;
  value: boolean;
}

export type DefaultFieldKey = "fullName" | "dob" | "stateOfOrigin";
export type DefaultFields = Record<DefaultFieldKey, DefaultFieldMeta>;

export interface CustomFieldPayload {
  field_name: string;
  input_type: "text" | "number" | "date" | "file";
  is_required: boolean;
}

export interface Headliner {
  artistName: string;
  imageFile: File | null;
  imagePreview: string | null;
}

export interface Prize {
  name: string;
  description: string;
  imageFile: File | null;
  imagePreview: string | null;
}

export interface HeadlinerPayload {
  artist_name: string;
}

export interface PrizePayload {
  name: string;
  description: string;
}

export interface FormSettings {
  defaultFields: DefaultFields;
  customFields: CustomField[];
}

export interface FormSettingsPayload {
  full_name: { input_type: "text"; is_required: boolean };
  date_of_birth: { input_type: "date"; is_required: boolean };
  state_of_origin: { input_type: "text"; is_required: boolean };
  custom_fields: CustomFieldPayload[];
}

export interface EventPayload {
  title: string;
  description: string;
  category: EventCategory;
  date: string;
  time: string;
  end_time: string;
  address: string;
  service_fee: number;
  refund_policy: string;
  ticket_types: TicketTypePayload[];
  headliner?: HeadlinerPayload[];
  prizes?: PrizePayload[];
  form_settings?: FormSettingsPayload;
}

export interface EventFormState {
  title: string;
  description: string;
  category: EventCategory | "";
  address: string;
  date: string;
  time: string;
  endTime: string;
  thumbnailFile: File | null;
  thumbnailPreview: string | null;
  bannerFile: File | null;
  bannerPreview: string | null;
  serviceFee: number;
  refundPolicy: string;
  ticketTypes: Record<string, TicketType>;
  headliners: Headliner[];
  prizes: Prize[];
  formSettings: FormSettings | null;
}
