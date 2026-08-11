import type { ApiResponse } from ".";
import type {
  CustomInputType,
  EventCategory,
  EventPayload,
} from "./events";

export type EventApiNumber = string | number;

export interface PartnerEventTicketDto {
  type: string;
  price: EventApiNumber;
  capacity: EventApiNumber;
}

export interface PartnerEventDetailsDto {
  id: number;
  event_id: string;
  title: string;
  date: string;
  time: string;
  address: string;
  description: string;
  promo: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  ticket_types: PartnerEventTicketDto[];
  user_id: string | number | null;
  end_time: string;
  category: string;
  service_fee: EventApiNumber;
  refund_policy: string;
  form_settings: Record<string, unknown>;
  partner_id: string;
  created_by_type: string;
  status: string;
  banner_image_url: string | null;
  headliner: unknown[];
  prizes: unknown[];
}

export interface PartnerEventDetailsData {
  event: PartnerEventDetailsDto;
  stats?: unknown;
}

export type PartnerEventDetailsResponse =
  ApiResponse<PartnerEventDetailsData>;
export type UpdatePartnerEventResponse = ApiResponse<unknown>;

export interface EventSettingsTicket {
  clientId: string;
  name: string;
  price: number | null;
  capacity: number | null;
}

export interface EventSettingsCustomField {
  clientId: string;
  name: string;
  type: CustomInputType;
  required: boolean;
}

export interface EventSettingsFormSettings {
  fullNameRequired: boolean;
  dateOfBirthRequired: boolean;
  stateOfOriginRequired: boolean;
  customFields: EventSettingsCustomField[];
}

export interface PartnerEventSettings {
  eventId: string;
  title: string;
  description: string;
  category: EventCategory | "";
  address: string;
  date: string;
  startTime: string;
  endTime: string;
  thumbnailUrl: string | null;
  bannerUrl: string | null;
  ticketTypes: EventSettingsTicket[];
  serviceFee: number | null;
  refundPolicy: string;
  updatedAt: string;
  hasExistingHeadliners: boolean;
  hasExistingPrizes: boolean;
  formSettings: EventSettingsFormSettings | null;
  hasUnsupportedFormSettings: boolean;
}

export interface EventMutationMedia {
  thumbnail?: File;
  banner?: File;
  headlinerImages?: File[];
  prizeImages?: File[];
}

export interface UpdatePartnerEventInput extends EventMutationMedia {
  eventId: string;
  patch: Partial<EventPayload>;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
}
