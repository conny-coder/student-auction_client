import { useAuth } from "@/hooks/useAuth";
import { ReviewService } from "@/services/review.service";
import { useQuery } from "@tanstack/react-query";

export const useGetReviews = (userId: string) => {
  const {data, isLoading, refetch} = useQuery({
    queryKey: [`reviews ${userId}`],
    queryFn: () => ReviewService.getByUser(userId || ""),
    select: ({ data }) => data,
    enabled: !!userId
 })

  return { data, isLoading, refetch }
};