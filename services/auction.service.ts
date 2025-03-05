import { getAuctionsUrl } from "@/config/api.config";
import { IAuction } from "@/types/auction.types";
import axios from "@/api/interceptors";

export const AuctionService = {
  async getAll() {
    return axios.get<IAuction[]>(getAuctionsUrl(""));
  },
};
