import { UserService } from "@/services/user.service";
import {useQuery} from "@tanstack/react-query";
import { useAuth } from "./useAuth";

export const useGetBalance = () => {
  const user = useAuth();

   const { data, isLoading } = useQuery({
    queryKey: [`my balance`],
    queryFn: () => UserService.getById(user?._id || ""),
    select: ({ data }) => data.balance,
    enabled: !!user
  });

  return { data, isLoading };
}