import { axiosInstance } from "@/lib/axiosInstance";
import type {
  PartnerRevenueParams,
  PartnerRevenueResponse,
} from "@/lib/types/revenue";

export const getPartnerRevenue = async (
  params: PartnerRevenueParams,
): Promise<PartnerRevenueResponse> => {
  const eventId = params.eventId?.trim();
  const search = params.search?.trim();
  const { data } = await axiosInstance.get("/partner-event/revenue", {
    params: {
      page: params.page,
      limit: params.limit,
      period: params.period,
      eventId: eventId || undefined,
      search: search || undefined,
    },
  });

  return data;
};
