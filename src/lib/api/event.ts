import { axiosInstance } from "../axiosInstance";
import { EventPayload } from "../types/events";

export const getPartnerEventAnalytics = async (): Promise<unknown> => {
  try {
    const { data } = await axiosInstance.get("/partner-event");
    return data;
  } catch (error) {
    throw error;
  }
};

export const createEvent = async ({
  buildPayload,
  thumbnail,
  banner,
}: {
  thumbnail: File;
  banner: File | null;
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
