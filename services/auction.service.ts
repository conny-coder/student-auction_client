import { getAuctionsUrl } from "@/config/api.config";
import { IAuction } from "@/types/auction.types";
import axios from "@/api/interceptors";
import { IAuctionFormOutput } from "@/components/screens/create/Create";

export const AuctionService = {
  async getAll(params?: Record<string, any>) {
    return axios.get<IAuction[]>(getAuctionsUrl(""), { params });
  },

  async getBided() {
    return axios.get<IAuction[]>(getAuctionsUrl("/bided"));
  },

  async create(auction: IAuctionFormOutput) {
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
