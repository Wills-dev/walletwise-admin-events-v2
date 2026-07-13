export type EventCategory =
  | "beauty_pageant"
  | "concert"
  | "conference"
  | "sports"
  | "religion";

export interface TicketType {
  name: string;
  price: string;
  quantity: number;
  confirmed: boolean;
}

export type TicketTypePayload = Omit<TicketType, "confirmed" | "name">;

export interface CustomField {
  name: string;
  type: "Text" | "Number" | "Date" | "Select";
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

export type DefaultFieldsPayload = Record<DefaultFieldKey, boolean>;

export type CustomFieldPayload = Omit<CustomField, "confirmed">;

export interface FormSettings {
  defaultFields: DefaultFields;
  customFields: CustomField[];
}

export interface EventPayload {
  title: string;
  description: string;
  category: EventCategory;
  address: string;
  date: string;
  time: string;
  endTime: string;
  serviceFee: number;
  refundPolicy: string;
  ticketTypes: Record<string, TicketTypePayload>;
  formSettings: {
    defaultFields: DefaultFieldsPayload;
    customFields: CustomFieldPayload[];
  } | null;
}

export interface EventFormState {
  title: string;
  description: string;
  category: EventCategory;
  address: string;
  date: string;
  time: string;
  endTime: string;
  imageFile: File | null;
  imagePreview: string | null;
  serviceFee: number;
  refundPolicy: string;
  ticketTypes: Record<string, TicketType>;
  formSettings: FormSettings | null;
}
