import { getFavoriteAuctionsUrl } from "@/config/api.config";
import { IAuction } from "@/types/auction.types";
import axios from "@/api/interceptors";

export const FavoriteAuctionService = {
  async set(auctionId: string) {
    return axios.post<IAuction[]>(getFavoriteAuctionsUrl(`/${auctionId}`));
  },
  async delete(auctionId: string) {
    return axios.delete<IAuction[]>(getFavoriteAuctionsUrl(`/${auctionId}`));
  },
};
