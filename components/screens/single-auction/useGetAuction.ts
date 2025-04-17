import { AuctionService } from "@/services/auction.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAuction = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [`auction-${id}`],
    queryFn: () => AuctionService.getById(id),
    select: ({ data }) => data,
    refetchInterval: 10000,
  });

  return { data, isLoading };
};