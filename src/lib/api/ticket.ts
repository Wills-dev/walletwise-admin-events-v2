import { axiosInstance } from "@/lib/axiosInstance";
import type { PartnerTicketsResponse } from "@/lib/types/tickets";

export const getTickets = async (
  eventId: string,
): Promise<PartnerTicketsResponse> => {
  const { data } = await axiosInstance.get<PartnerTicketsResponse>(
    "/partner-event/tickets",
    {
      params: { eventId },
    },
  );

  return data;
};
