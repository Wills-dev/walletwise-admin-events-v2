import { axiosInstance } from "../axiosInstance";
import { EventPayload } from "../types/events";
import type {
  PartnerEventAnalyticsParams,
  PartnerEventAnalyticsResponse,
} from "../types/analytics";
import type {
  EventMutationMedia,
  PartnerEventDetailsResponse,
  UpdatePartnerEventInput,
  UpdatePartnerEventResponse,
} from "../types/settings";

const getEventPath = (eventId: string) => {
  const normalizedEventId = eventId.trim();

  if (!normalizedEventId) {
    throw new Error("An event ID is required");
  }

  return `/partner-event/events/${encodeURIComponent(normalizedEventId)}`;
};

const buildEventFormData = ({
  payload,
  thumbnail,
  banner,
  headlinerImages,
  prizeImages,
}: EventMutationMedia & { payload: Partial<EventPayload> }) => {
  const formData = new FormData();
  const appendScalar = (key: string, value: string | number | undefined) => {
    if (value !== undefined) {
      formData.append(key, String(value));
    }
  };

  appendScalar("title", payload.title);
  appendScalar("description", payload.description);
  appendScalar("category", payload.category);
  appendScalar("address", payload.address);
  appendScalar("date", payload.date);
  appendScalar("time", payload.time);
  appendScalar("end_time", payload.end_time);
  appendScalar("service_fee", payload.service_fee);
  appendScalar("refund_policy", payload.refund_policy);

  if (payload.ticket_types !== undefined) {
    formData.append("ticket_types", JSON.stringify(payload.ticket_types));
  }

  if (payload.headliner !== undefined) {
    formData.append("headliner", JSON.stringify(payload.headliner));
  }

  if (payload.prizes !== undefined) {
    formData.append("prizes", JSON.stringify(payload.prizes));
  }

  if (payload.form_settings !== undefined) {
    formData.append("form_settings", JSON.stringify(payload.form_settings));
  }

  if (thumbnail) {
    formData.append("thumbnail", thumbnail, thumbnail.name);
  }

  if (banner) {
    formData.append("banner", banner, banner.name);
  }

  headlinerImages?.forEach((image) => {
    formData.append("headliner_images", image, image.name);
  });

  prizeImages?.forEach((image) => {
    formData.append("prize_images", image, image.name);
  });

  return formData;
};

export const getPartnerEventAnalytics = async (
  params: PartnerEventAnalyticsParams = {},
): Promise<PartnerEventAnalyticsResponse> => {
  try {
    const { data } = await axiosInstance.get<PartnerEventAnalyticsResponse>(
      "/partner-event",
      { params },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentEventAnalytics = async ({
  eventId,
  filter,
}: {
  eventId: string;
  filter?: string;
}) => {
  // if (eventId.trim() === "") {
  //   return;
  // }

  try {
    const { data } = await axiosInstance.get(
      `/partner-event/events/${eventId}/analytics`,
      { params: { period: filter } },
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
};

export const createEvent = async ({
  buildPayload,
  thumbnail,
  banner,
  headlinerImages,
  prizeImages,
}: {
  thumbnail: File;
  banner: File | null;
  headlinerImages: File[];
  prizeImages: File[];
  buildPayload: EventPayload;
}) => {
  const formData = buildEventFormData({
    payload: buildPayload,
    thumbnail,
    banner: banner ?? undefined,
    headlinerImages,
    prizeImages,
  });
  const { data } = await axiosInstance.post("/partner-event/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const getPartnerEvent = async (
  eventId: string,
): Promise<PartnerEventDetailsResponse> => {
  const { data } = await axiosInstance.get<PartnerEventDetailsResponse>(
    getEventPath(eventId),
  );

  if (!data.success) {
    throw new Error(data.message || "Unable to fetch event details");
  }

  return data;
};

export const updatePartnerEvent = async ({
  eventId,
  patch,
  thumbnail,
  banner,
  headlinerImages,
  prizeImages,
}: UpdatePartnerEventInput): Promise<UpdatePartnerEventResponse> => {
  const formData = buildEventFormData({
    payload: patch,
    thumbnail,
    banner,
    headlinerImages,
    prizeImages,
  });
  const { data } = await axiosInstance.patch<UpdatePartnerEventResponse>(
    getEventPath(eventId),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  if (!data.success) {
    throw new Error(data.message || "Unable to update event");
  }

  return data;
};
