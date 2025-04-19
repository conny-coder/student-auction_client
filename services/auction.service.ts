import { getAuctionsUrl } from "@/config/api.config";
import { IAuction } from "@/types/auction.types";
import axios from "@/api/interceptors";

export const AuctionService = {
  async getAll(params?: Record<string, any>) {
    return axios.get<IAuction[]>(getAuctionsUrl(""), { params });
  },

  async create(auction: Omit<IAuction , "_id" | "ownerId" | "highestBidderId" | "status" | "currentBid" | "isFavourite">) {
    return axios.post<IAuction>(getAuctionsUrl(""), auction);
  },

  async getById(id: string) {
    return axios.get<IAuction>(getAuctionsUrl(`/${id}`));
  },

  async getByUserId(userId: string) {
    return axios.get<IAuction[]>(getAuctionsUrl(`/user/${userId}`));
  },

  async delete(id: string) {
    return axios.delete<void>(getAuctionsUrl(`/${id}`));
  }
};
