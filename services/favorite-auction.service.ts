import { getFavoriteAuctionsUrl } from "@/config/api.config";
import axios from "@/api/interceptors";
import { IAuction, IFavouriteAuction } from "@/types/auction.types";

export const FavoriteAuctionService = {
  async set(auctionId: string) {
    return await axios.post<void>(getFavoriteAuctionsUrl(`/${auctionId}`));
  },
  async delete(auctionId: string) {
    return await axios.delete<void>(getFavoriteAuctionsUrl(`/${auctionId}`));
  },
  async getAll() {
    return await axios.get<IFavouriteAuction[]>(getFavoriteAuctionsUrl(""));
  },
};
