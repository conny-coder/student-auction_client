import {ProfileService} from "@/services/profile.service";
import {useQuery} from "@tanstack/react-query";

export const useProfile = (id: string) => {
   const { data, isLoading, refetch } = useQuery({
    queryKey: [`profile-${id}`],
    queryFn: () => ProfileService.getById(id),
    select: ({ data }) => data,
  });

  return { data, isLoading, refetch };
}