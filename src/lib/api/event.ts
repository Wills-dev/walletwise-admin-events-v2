import { axiosInstance } from "../axiosInstance";
import { EventPayload } from "../types/events";

export const createEvent = async ({
  buildPayload,
  imageFile,
}: {
  imageFile: File;
  buildPayload: EventPayload;
}) => {
  try {
    const url = ``;

    const formData = new FormData();

    formData.append("title", buildPayload.title);
    formData.append("description", buildPayload.description);
    formData.append("category", buildPayload.category);
    formData.append("address", buildPayload.address);
    formData.append("date", buildPayload.date);
    formData.append("time", buildPayload.time);
    formData.append("endTime", buildPayload.endTime);
    formData.append("serviceFee", String(buildPayload.serviceFee));
    formData.append("refundPolicy", buildPayload.refundPolicy);

    formData.append("ticketTypes", JSON.stringify(buildPayload.ticketTypes));

    if (imageFile) {
      formData.append("image", imageFile, imageFile.name);
    }

    if (buildPayload.formSettings) {
      formData.append(
        "formSettings",
        JSON.stringify(buildPayload.formSettings),
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
