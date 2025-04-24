import { AuctionProps } from "@/components/Auction";
import { useAuth } from "@/hooks/useAuth";
import { AuctionService } from "@/services/auction.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAuctions = (id: string) => {
  const {data, isLoading, refetch} = useQuery({
    queryKey: ["my-auctions"],
    queryFn: () => AuctionService.getByUserId(id || ""),
    select: ({ data }) => data,
  })

  const myAuctions: AuctionProps[] = data
    ? data.map( ( auction ) => ( {
      _id: auction._id,
      title: auction.title,
      image: auction.images[0],
      currentBid: auction.currentBid,
      endTime: auction.endTime,
      isFavourite: auction.isFavourite,
    } ) )
    : [];


  return {myAuctions, isLoading, refetch};
};