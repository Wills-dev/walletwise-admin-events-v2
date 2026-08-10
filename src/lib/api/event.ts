import { axiosInstance } from "../axiosInstance";
import { EventPayload } from "../types/events";
import type {
  PartnerEventAnalyticsParams,
  PartnerEventAnalyticsResponse,
} from "../types/analytics";

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
  try {
    const url = `/partner-event/create`;

    const formData = new FormData();

    formData.append("title", buildPayload.title);
    formData.append("description", buildPayload.description);
    formData.append("category", buildPayload.category);
    formData.append("address", buildPayload.address);
    formData.append("date", buildPayload.date);
    formData.append("time", buildPayload.time);
    formData.append("end_time", buildPayload.end_time);
    formData.append("service_fee", String(buildPayload.service_fee));
    formData.append("refund_policy", buildPayload.refund_policy);

    formData.append("ticket_types", JSON.stringify(buildPayload.ticket_types));
    formData.append("thumbnail", thumbnail, thumbnail.name);

    if (buildPayload.headliner) {
      formData.append("headliner", JSON.stringify(buildPayload.headliner));
      headlinerImages.forEach((image) => {
        formData.append("headliner_images", image, image.name);
      });
    }

    if (buildPayload.prizes) {
      formData.append("prizes", JSON.stringify(buildPayload.prizes));
      prizeImages.forEach((image) => {
        formData.append("prize_images", image, image.name);
      });
    }

    if (banner) {
      formData.append("banner", banner, banner.name);
    }

    if (buildPayload.form_settings) {
      formData.append(
        "form_settings",
        JSON.stringify(buildPayload.form_settings),
      );
    }

    const { data } = await axiosInstance.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
