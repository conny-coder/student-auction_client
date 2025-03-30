import { useState } from "react";
import { AuctionProps } from "@/components/Auction";
import { AuctionService } from "@/services/auction.service";
import { useQuery } from "@tanstack/react-query";

export interface AuctionParams {
  category?: string;
  search?: string;
  price?: string;
  condition?: "new" | "used" | "";
  sortBy: 'newest' | 'popularity' | 'priceUp' | 'priceDown';
}

export const useAuctions = (initialParams?: AuctionParams) => {
  const [params, setParams] = useState<AuctionParams | undefined>(initialParams);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-auctions", params],
    queryFn: () => AuctionService.getAll(params),
    select: ({ data }) => data,
  });

  const auctions: AuctionProps[] = data
    ? data.map((auction) => ({
        _id: auction._id,
        title: auction.title,
        image: auction.images[0],
        currentBid: auction.currentBid,
        endTime: auction.endTime,
        isFavourite: auction.isFavourite,
      }))
    : [];

  const refetchWithParams = (newParams: AuctionParams) => {
    setParams(newParams);
  };

  return {
    auctions,
    isLoading,
    refetch,
    refetchWithParams, 
  };
};
