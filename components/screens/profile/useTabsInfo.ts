import { AuctionProps } from "@/components/Auction";
import { useAuth } from "@/hooks/useAuth";
import { AuctionService } from "@/services/auction.service";
import { FavoriteAuctionService } from "@/services/favorite-auction.service";
import { useQuery } from "@tanstack/react-query";

export const useTabsInfo = () => {
  const user = useAuth();

  const { data: dataMyAuctions, isLoading: isLoadingMyAuctions, refetch: myAuctionsRefetch } = useQuery( {
    queryKey: [`my-auctions ${user?._id}`],
    queryFn: () => AuctionService.getByUserId( user?._id || "" ),
    select: ( { data } ) => data,
    enabled: !!user
  } )

  const myAuctions: AuctionProps[] = dataMyAuctions
    ? dataMyAuctions.map( ( auction ) => ( {
      _id: auction._id,
      title: auction.title,
      image: Array.isArray(auction.images) ? auction.images[0] : "",
      currentBid: auction.currentBid,
      endTime: auction.endTime,
      isFavourite: auction.isFavourite,
    } ) )
    : [];

  const {data: dataMyFavoriteAuctions, isLoading: isLoadingMyFavoriteAuctions, refetch: myFavoriteAuctionsRefetch} = useQuery({
    queryKey: [`favorite-auctions ${user?._id}`],
    queryFn: () => FavoriteAuctionService.getAll( ),
    select: ( { data } ) => data,
    enabled: !!user
  })

  const myFavoriteAuctions: AuctionProps[] = dataMyFavoriteAuctions
    ? dataMyFavoriteAuctions.map( ( item ) => ( {
      _id: item.auction._id,
      title: item.auction.title,
      image: Array.isArray(item.auction.images) ? item.auction.images[0] : "",
      currentBid: item.auction.currentBid,
      endTime: item.auction.endTime,
      isFavourite: true,
    } ) )
    : [];

  const {data: dataBidedAuctions, isLoading: isLoadingBidedAuctions, refetch: bidedAuctionsRefetch} = useQuery({
    queryKey: [`bided-auctions ${user?._id}`],
    queryFn: () => AuctionService.getBided(),
    select: ( { data } ) => data,
    enabled: !!user
  })

  const bidedAuctions: AuctionProps[] = dataBidedAuctions
    ? dataBidedAuctions.map( ( auction ) => ( {
      _id: auction._id,
      title: auction.title,
      image: Array.isArray(auction.images) ? auction.images[0] : "",
      currentBid: auction.currentBid,
      endTime: auction.endTime,
      isFavourite: auction.isFavourite,
    } ) )
    : [];

  const refetchAllAuctions = () => {
    myAuctionsRefetch();
    myFavoriteAuctionsRefetch();
    bidedAuctionsRefetch();
  }

  return { myAuctions, myFavoriteAuctions, isLoadingMyAuctions, isLoadingMyFavoriteAuctions, refetchAllAuctions, bidedAuctions, isLoadingBidedAuctions };
};