import { getBidsUrl } from "@/config/api.config";
import axios from "@/api/interceptors";
import { IBid } from "@/types/bid.types";

export const BidService = {
  async create(auctionId: string, amount: number) {
    return axios.post<IBid>(getBidsUrl(""), { auctionId, amount });
  },
};
