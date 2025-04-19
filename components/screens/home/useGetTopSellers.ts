import { UserService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useGetTopSellers = () => {
  const {data, isLoading} = useQuery({
    queryKey: ["top-sellers"],
    queryFn: () => UserService.getTopSellers(),
    select: ({ data }) => data,
  });

  const topSellers = data ? data : [];

  return {topSellers, isLoading};
};