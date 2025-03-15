import { AuctionProps } from "@/components/Auction";
import { AuctionService } from "@/services/auction.service";
import { useQuery } from "@tanstack/react-query";

export const useHomeAuctions = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["home-auctions"],
    queryFn: () => AuctionService.getAll(),
    select: ({ data }) => data.slice(0, 8),
  });

  const auctions: AuctionProps[] = data
    ? data.map((auction) => ({
        _id: auction._id,
        title: auction.title,
        image: auction.images[0],
        currentBid: auction.currentBid,
        endTime: auction.endTime,
        isFavorite: auction.isFavorite,
      }))
    : [];

  return {
    auctions,
    isLoading,
  };
};
