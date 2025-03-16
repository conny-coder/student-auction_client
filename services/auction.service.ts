import { getAuctionsUrl } from "@/config/api.config";
import { IAuction } from "@/types/auction.types";
import axios from "@/api/interceptors";

export const AuctionService = {
  async getAll(params?: Record<string, any>) {
    return axios.get<IAuction[]>(getAuctionsUrl(""), { params });
  },
};
